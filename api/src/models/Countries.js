const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('countries', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false, 
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    continents: {
      type: DataTypes.STRING,
      allowNull: false
    },

    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },

    platillo: {
      type:DataTypes.STRING, 
      defaultValue: "Papas Fritas"
    },

    subregion: {
      type: DataTypes.STRING,
    },

    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
    },
    img: {
      type: DataTypes.STRING
    },
    borders: {
      type: DataTypes.STRING,
      allowNull: false
     
    }
  } , {
    timestamps: false
  });
};