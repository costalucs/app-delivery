module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    "sales",
    {
      userId: { type: DataTypes.INTEGER, field: "user_id", },
      sellerId: { type: DataTypes.INTEGER, field: "seller_id" },
      totalPrice: { type: DataTypes.DECIMAL(10, 2), field: "total_price" },
      deliveryAddress: { type: DataTypes.STRING, field: "delivery_address" },
      deliveryNumber: { type: DataTypes.STRING, field: "delivery_number" },
      saleDate: { type: DataTypes.DATE, field: "sale_date" },
      status: { type: DataTypes.STRING, field: "status" },
    },
    {
      timestamps: false,
      tableName: "sales",
    }
  );

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, {
      foreignKey: "userId",
      as: "user",
    });

    Sales.belongsTo(models.users, {
      foreignKey: "sellerId",
      as: "seller",
    });
  };

  return Sales;
};
