module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    "salesProducts",
    { quantity: DataTypes.INTEGER },
    { timestamps: false, tableName: "sales_products", underscored: true }
  );

  SalesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: "products",
      through: SalesProducts,
      foreignKey: { field: "sale_id", name: "saleId" },
      otherKey: { field: "product_id", name: "productId" },
    });

    models.products.belongsToMany(models.sales, {
      as: "sales",
      through: SalesProducts,
      foreignKey: { field: "product_id", name: "productId" },
      otherKey: { field: "sale_id", name: "saleId" },
    });
  };

  return SalesProducts;
};
