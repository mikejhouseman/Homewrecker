const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');
const { sequelize } = require('../../db/models');
const { Spot, User, Review, Image } = require('../../db/models')
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const images = require('../../db/models/images');

const router = express.Router();
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage('Please provide a valid address.'),
  check('city')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage('Please provide a valid city.'),
  check('state')
    .isLength({ min: 2, max: 2 })
    .withMessage('Please enter a valid US postal code.'),
  check('country')
  .exists({ checkFalsy: true })
  .withMessage('Please enter a valid country.'),
check('lat')
  .exists({ checkFalsy: true })
  .withMessage('Please enter a valid latitude.'),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a valid longitude.'),
  check('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Please keep your name between 2 and 50 characters long.'),
  check('price')
    .exists({ checkFalsy: true })
    .isLength({ max: 7 })
    .withMessage('Prices a limited to $100,000.00 per night.'),
  handleValidationErrors
];

const reviewCounter = async (req, res, next) => {
    const spotId = req.params.id;
    const count = await Review.count({ where: { spotId } });
    req.numReviews = count;
    next();
  };
  const reviewAvg = async (req, res, next) => {
    const spotId = req.params.id;
    const count = req.numReviews;
    const sum = await Review.sum('stars', { where: { spotId } });
    const avgStarRating = sum/count;
    req.avgStarRating = avgStarRating;
    next();
  };


// POST a spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price} = req.body;
  const spot = await Spot.create({ userId:req.user.id, address, city, state, country, lat, lng, name, description, price});
  res.json(spot);
})

// Edit a spot by checking if it exists, checking if user is the owner, grabbing data to update, then returning updated spot
router.put('/:id', requireAuth, validateSpot, async (req, res) => {
  const { id } = req.params;
  const { address, city, state, country, lat, lng, name, description, price} = req.body;
  const spot = await Spot.findByPk(id);
  if (!spot) {
    const error = new Error('Spot not found');
    error.status = 404;
    throw error;
    };
  if (spot.userId !== req.user.id) {
      const error = new Error('You are not authorized to edit this spot.');
      error.status = 401;
      throw error;
   }
  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;
  await spot.save();
  const updatedSpot = await Spot.findByPk(id);
  res.json(updatedSpot);
});

// Get all current user spots
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const spots = await Spot.findAll({
    where: {
      userId,
    },
    include: [{
      model: Image,
      as: 'SpotImages',
      attributes: ['url']
    },
    {
      model: Review,
      attributes: [ ],
    }
  ],
  attributes: [[
    sequelize.fn('AVG', sequelize.col('Reviews.stars')),
    'avgRating',
    ]],
  group: [
    'Spot.id',
    'SpotImages.id',
    'Reviews.id'
  ],
  });
  res.json(spots)
});

// Get details for a Spot from an id
router.get('/:id', reviewCounter, reviewAvg, async (req, res) => {
  const spotId = req.params.id;
  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: Image,
        as: 'SpotImages',
        attributes: ['id', 'url', 'preview'],
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName'],
      },
    ],
    group: [
      'Spot.id',
      'SpotImages.id',
      'Owner.id',
    ],
  });
  if(!spot) {
    return res.status(404).json({error: 'Spot does not exist'})
  };
  spot.dataValues.numReviews = req.numReviews;
  spot.dataValues.avgStarRating = req.avgStarRating;

  res.json(spot);
});

// Add an Image to a Spot based on the Spot's id
router.post('/:id/images', requireAuth, async (req, res) => {
  const spotId = req.params.id;
  const userId = req.user.id;
  const spot = await Spot.findByPk(spotId);
  if(!spot) {
    return res.status(404).json({error: 'Spot does not exist'})
  };
  if (spot.userId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  };
  const { url, preview } = req.body;
  const image = await Image.create({spotId, url, preview, imageableId: spot.id, imageableType: 'Spot'});
  res.json({
    id: image.id,
    url: image.url,
    preview: image.preview,
    imageableType: image.imageableType
  })
});

// Delete an Image for a Spot
router.delete('/images/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const image = await Image.findByPk(imageId);
    if(!image) {
      return res.status(404).json({error: 'Image does not exist'})
    };
    await image.destroy();
    res.json({message: "Image successfully deleted"})
});


// Delete a spot by finding spot by id, checking if it exists, then deleting and returning a message
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const spot = await Spot.findByPk(id);
  if (!spot) {
    const error = new Error('Spot not found');
    error.status = 404;
    throw error;
    }
  await spot.destroy();
  res.json({ message: 'Spot successfully deleted' });
  }
);

// GET all spots
router.get('/', async (req, res) => {
  try {
    // destructure query for page, size, etc.
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  // Use given values otherwise provide defaults
  page = Number(page) || 1;
  size = Number(size) || 20;
  minLat = Number(minLat) || -1000;
  maxLat = Number(maxLat) || 1000;
  minLng = Number(minLng) || -1000;
  maxLng = Number(maxLng) || 1000;
  minPrice = Number(minPrice) || 0;
  maxPrice = Number(maxPrice) || 0;
  // construct where with op of between min and maxes
  const where = {};
  if (minLat && maxLat) {
    where.lat = { [Op.between]: [minLat, maxLat] };
  };
  if (minLng && maxLng) {
    where.lng = { [Op.between]: [minLng, maxLng] };
  };
  if (minPrice && maxPrice) {
    where.price = { [Op.between]: [minPrice, maxPrice] };
  };
  // res.cookie('XSRF-TOKEN', req.csrfToken());
  const spots = await Spot.findAll({
    include: [
      {
        model: Image,
        as: 'SpotImages',
        attributes: ['id']
      }
    ],
    where,
    // group: [
    //   'Spot.id',
    //   'SpotImages.id'
    // ],
    // Limit size and offset page (page - 1) * size
    limit: size,
    offset: (page - 1) * size
  });
  res.status(200).json({Spots: spots, page, size});
  } catch (error) {
    console.error('Error retrieving all spots', error);
    res.status(500).json({error: "Failed to retrieve spots"})
  }
});


module.exports = router;
