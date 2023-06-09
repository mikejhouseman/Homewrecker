'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        stars: 5,
        reviewText: 'Loved this spot! Situated by a grassy field and includes baseball bats!!'
        // previewImage: "https://www.incimages.com/uploaded_files/image/1024x576/getty_152414899_97046097045006_68075.jpg"
      },
      {
        spotId: 1,
        userId: 2,
        stars: 3,
        reviewText: 'Great setup, but I find that Xerox machines are harder to destruct that previously thought.'
        // previewImage: "https://www.incimages.com/uploaded_files/image/1024x576/getty_152414899_97046097045006_68075.jpg"
      },
      {
        spotId: 3,
        userId: 3,
        stars: 2,
        reviewText: 'Collapses too easily. I stil have more rage to burn.'
        // previewImage: "https://www.incimages.com/uploaded_files/image/1024x576/getty_152414899_97046097045006_68075.jpg"
      },
      {
        spotId: 2,
        userId: 1,
        stars: 4,
        reviewText: 'Loved set up but not built tall enough. Wanted more destruction.'
        // previewImage: "https://www.incimages.com/uploaded_files/image/1024x576/getty_152414899_97046097045006_68075.jpg"
      },
      {
        spotId: 4,
        userId: 6,
        stars: 1,
        reviewText: 'Listing said it was a 36 degree angle, but is only 23. Reporting to authorities.'
        // previewImage: "https://www.incimages.com/uploaded_files/image/1024x576/getty_152414899_97046097045006_68075.jpg"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
