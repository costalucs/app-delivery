module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: 'customer'
      },
    },
    {
      timestamps: false,
      tableName: "users",
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.sales, { foreignKey: "userId", as: "userSales" });
    Users.hasMany(models.sales, { foreignKey: "sellerId", as: "sellerSales" });
  };

  return Users;
};
