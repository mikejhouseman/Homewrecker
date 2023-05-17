'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Images.belongsTo(models.Review, {
        foreignKey: 'imageableId',
        constraints: false,
        as: 'review',
      });
      Images.belongsTo(models.Spot, {
        foreignKey: 'imageableId',
        constraints: false,
        as: 'spot',
      });
    }
  }
  Images.init({
    imageableId: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    imageableType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Review', 'Spot']]
      }
    }
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};
