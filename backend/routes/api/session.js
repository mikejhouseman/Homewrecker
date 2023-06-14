const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// 5 Log in
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    await setTokenCookie(res, safeUser);
    return res.json({
      user: safeUser
    });
  }
);

// 04 Get current user
router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.id;
  if (userId === null) {
    return res.status(200).json({ user: null });
  };
  const user = await User.findOne({
    where: {
      id: userId,
    },
    attributes: ['id', 'firstName', 'lastName', 'email'],
  });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ user });
});

// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  (req, res) => {
    const { user } = req;
    if (user) {
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      return res.json({
        user: safeUser
      });
    } else return res.json({ user: null });
  }
);
module.exports = router;
