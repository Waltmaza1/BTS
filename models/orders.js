module.exports = function(sequelize, DataTypes) {
  var orders = sequelize.define("orders", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    station_completed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shipped_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    date_created:{
      type: DataTypes.DATE,
      allowNull:false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serial_id: {
      type: DataTypes.STRING
    }
  },
  { 
    timestamps: false,
  }
  );
  return orders;
};
