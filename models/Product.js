const { DataTypes } = require('sequelize');
const BaseModel = require('../bases/BaseModel');



module.exports = (sequelize) => {
  class Product extends BaseModel {  }

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrl:{
      type:DataTypes.STRING,
      allowNull:false
    },
    price:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    description:
    {
      type:DataTypes.STRING,
    },
    categoryId: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: 'Categories',
    //   key: 'id'
    // }
  }


  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    hooks: {}
  });

  return Product;
};
