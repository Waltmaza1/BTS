module.exports = function(sequelize, DataTypes) {
  var products = sequelize.define("products", {
    sku: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    { 
      timestamps: false,
    }
    
  );
  return products;
};
