const express = require('express')
const cors = require('cors')
const {Sequelize , DataTypes} = require('sequelize')

// Configuração da conexão com banco de dados - MySQL
const sequelize = new Sequelize('db_projeto' , 'root' , '' ,{
    host: 'localhost',
    dialect: 'mysql'
})

//Criação do modelo do Usuário
const Usuario = sequelize.define('Usuario' , {
    id:{
        type: DataTypes.INTEGER,
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

// Configuração do servidor express.
const app = express()
app.use(cors()) // Permite o front-end acessar a API.
app.use(express.json()) //Permite o servidor entender JSON.

const port = 3001

// Definição de rotas (endpoints).
// req: request
// res: response
app.get('/usuarios' , async (request , response) =>{
    const listarUsuarios = await Usuario.findAll()
    response.json(listarUsuarios)
})

app.post('/usuarios' , async(request , response) => {
    try{
        const {nome , email  , telefone} = request.body
        const salvarUsuario = await Usuario.create({nome , email , telefone})
        response.status(201).json({
            message: "Usuário criado.",
            usuario: salvarUsuario
        })
    } catch (error){
        response.status(400).json({
            erro: 'Erro ao cadastrar Usuário.'
        })
    }
})

// Iniciando o servidor.
sequelize.sync().then(() =>{
    app.listen(port , () =>{
        console.log(`Servidor rodando na porta: ${port}`)
        console.log(`Banco de dados sincronizado`)
    })
}).catch((error) => {
    console.log('Erro ao conectar ou sincronizar com bancos de dados.')
    console.error(error)
})