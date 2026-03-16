const express = require('express')
const cors = require('cors')
const {Sequelize , DataTypes} = require('sequelize')

// Configuração da conexão com banco de dados - MySQL
const sequelize = new Sequelize('db_projeto' , 'root' , '' ,{
    host: 'localhost',
    dialect: 'mysql'
})