'use strict';
const { Model, Validator } = require('sequelize');
// const Booking = require('./bookings');
// const Spot = require('./spots');
// const Review = require('./reviews');
// const Image = require('./images');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations
      User.hasMany(
        models.Booking, {
          foreignKey: 'userId',
          // as: 'bookings'
      });
      User.hasMany(
        models.Spot, {
          foreignKey: 'userId',
          // as: 'spots',
        });
      User.hasMany(
        models.Review, {
          foreignKey: 'userId',
          // as: 'reviews',
      });
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      }
    }
  );
  return User;
};
