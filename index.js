const express = require('express')
const cors = require('cors')
const {Sequelize , DataTypes} = require('sequelize')

// Configuração da conexão com banco de dados - MySQL
const sequelize = new Sequelize('db_projeto' , 'root' , '' ,{
    host: 'localhost',
    dialect: 'mysql'
})

const Usuario = sequelize.define('Usuario' , {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        unique: true
    }
        
})