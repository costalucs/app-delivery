module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "products",
    {
      name: { type: DataTypes.STRING, field: 'name' },
      price: { type: DataTypes.DECIMAL(4, 2), field: 'price' },
      urlImage: { type: DataTypes.STRING, field: 'url_image' },
    },
    {
      timestamps: false,
      tableName: "products",
    }
  );

  return Products;
};
