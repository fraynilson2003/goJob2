const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const userModel = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

    },
    imageurl: {
        type: DataTypes.STRING,
        defaultValue: "sin foto",

    },
    imagePublicId:{
        type: DataTypes.STRING,
        defaultValue: "sin foto",

    },
    phone: {
        type: DataTypes.STRING,
        unique: true,

    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['comun', 'professional', 'admin']]
          }
    },
    rating_promedio: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    rating: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
    },
 
    //si es profesional
    provincia: {
        type: DataTypes.STRING,
    },
    ciudad: {
        type: DataTypes.STRING,
    },
    direccion: {
        type: DataTypes.STRING,
    },
    dias:{
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    horario: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    }

  },{timestamps: false });
};

module.exports = userModel
