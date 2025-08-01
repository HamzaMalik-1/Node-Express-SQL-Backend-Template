const { DataTypes } = require('sequelize');
const BaseModel = require('../bases/BaseModel');

module.exports = (sequelize) => {
  class Category extends BaseModel {  }

  Category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    hooks: {}
  });

  return Category;
};
