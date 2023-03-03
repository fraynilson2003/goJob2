const { Service, User, Job } = require("../connection/db");
const { getDbService, paginacion, getServices } = require("../controllers/serviceController");
const axios = require("axios");
const { Op } = require("sequelize");
const { query } = require("express");

require('dotenv').config();
const { DB_HOST, PORT } = process.env;

const getInfoDashboard = async (req, res)=>{
  try {
    //traigo solo servicios de este mes
    // Obtener la fecha actual
    const today = new Date();
    
    // Obtener el primer día del mes actual
    const primerDiaDelMes = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Obtener el último día del mes actual
    const ultimoDiaDelMes = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    /********** GANANCIAS TODO *********** */
    const serviceTodo = await Service.findAll({
      attributes: ["presupuesto"],
      order: [["fecha_publicacion", "DESC", ]],
      where: {state: "terminado"}
    });
    let preciosServicesAll = serviceTodo.map((ele)=>ele.presupuesto.trim())
    let gananciasTodo = 0
    preciosServicesAll.forEach(ele => {
      gananciasTodo += Number(ele)
    });

    /********** ESTE MES************ */
    // Consulta Sequelize que filtra los servicios por la fecha de publicación del mes actual
    const servicesMes = await Service.findAll({
      order: [["fecha_publicacion", "DESC", ]],
      where: {
        fecha_publicacion: {
          [Op.between]: [primerDiaDelMes, ultimoDiaDelMes],
        }
      },
      include: {
        model: Job,
        through: { 
          attributes:[]
        }
      },
    });


    let serviciosFinalizados = servicesMes.filter((ele)=> ele.state == "terminado")
    let preciosServices = serviciosFinalizados.map((ele)=>ele.presupuesto.trim())
    let gananciasEsteMes = 0
    preciosServices.forEach(ele => {
      gananciasEsteMes += Number(ele)
    });

    //ultimos pagos
    let ultimosPagos = [
      serviciosFinalizados[0],
      serviciosFinalizados[1]
    ]
    
    //contamos el total de usuarios
    let userCount = await User.count();
    
    //servicios agregados este mes
    let servicesEsteMesCount = servicesMes.length

    //Ultimo servicio
    let ultimoService = await Service.findOne({
      order: [['fecha_publicacion', 'DESC']],
      attributes: { exclude: ['UserId'] },
      include:{
        model: User,
        as:"userId",
        attributes:["id", "firstName", "lastName", "user", "email", "phone", "role", "imagePerfil"]
      },
    })

    //ultimo usuario
    let ultimoUser = await User.findAll({
      limit: 2,
      order: [['fecha_register', 'DESC']],
      attributes:["id", "firstName", "lastName", "user", "email", "phone", "role", "imagePerfil"]

    })

  
    return res.status(200).json({
      status: "success",
      message: "Extraccion exitosa",
      userTotal: userCount,
      serviciosGananciasTodo: gananciasTodo,
      serviciosEsteMesCount: servicesEsteMesCount,
      gananciasEsteMes: gananciasEsteMes,
      ultimosPagos: ultimosPagos,
      ultimoService: ultimoService,
      ultimoUser: ultimoUser
    })
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    })
  }
}

const deleteUser = async (req, res) => {
    let idUser = req.body.id;
    try {
      idUser = Number(idUser)
      let deleteUser = await User.update(
        { state: false },
        { where: { id: idUser } }
      );
  
      return res.status(200).json({
        status: "success",
        message: "Elimino correctamente el usuario",
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
};

const deleteService = async (req, res)=>{
  let idService = req.body.id
  try {
    idService = Number(idService)
    

  } catch (error) {
    
  }
}



module.exports = {
  getInfoDashboard,
  deleteUser
};
