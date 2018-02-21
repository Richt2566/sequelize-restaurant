module.exports = function(sequelize, DataTypes){
  var iceCream = sequelize.define('icecream', {
    flavor: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        len: [1,10]
        
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  return iceCream
};