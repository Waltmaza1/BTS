module.exports = function(sequelize, DataTypes) {
  var quality = sequelize.define("quality", {
    serial_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  },
    {
      freezeTableName: true,
      timestamps: false,
    }
    
  );
  return quality;
};
