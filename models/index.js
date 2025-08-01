const UserModel = require('./User');
const CategoryModel = require('./Category');
const ProductModel = require('./Product');
const { sequelize } = require('../config/db'); // adjust path as needed

const User = UserModel(sequelize); // ← important: call it with sequelize instance
const Category= CategoryModel(sequelize); // ← important: call it with sequelize instance
const Product= ProductModel(sequelize); // ← important: call it with sequelize instance




Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'product'
});

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});




module.exports = {
  User,
  Category,
  Product
};
