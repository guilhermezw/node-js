const express = require('express')
const cors = require('cors')
const {Sequelize , DataTypes} = require('sequelize')

// Configuração da conexão com banco de dados - MySQL
const sequelize = new Sequelize('db_projeto' , 'root' , '' ,{
    host: 'localhost',
    dialect: 'mysql'
})

// Definição de tabelas (modelo) do Funcionario
const Funcionario = sequelize.define('Funcionario' , {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
        
})

// Definição de tabelas (modelo) do Livro
const Livro = sequelize.define('Livro' , {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    autor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroPaginas:{
        type: DataTypes.STRING,
        allowNull: false
    },
    preco:{
        type: DataTypes.DOUBLE,
        allowNull: false
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
app.get('/funcionarios' , async (request , response) =>{
    const listarFuncionarios = await Funcionario.findAll()
    response.json(listarFuncionarios)
})

app.post('/funcionarios' , async(request , response) => {
    try{
        const {nome , cpf  , dataNascimento , email} = request.body
        const salvarFuncionario = await Funcionario.create({nome , cpf , dataNascimento , email})
        response.status(201).json({
            message: "Funcionário criado.",
            funcionario: salvarFuncionario
        })
    } catch (error){
        response.status(400).json({
            erro: 'Erro ao criar Funcionário.'
        })
    }
})

app.put("/funcionarios/:id" , async (request , response) => {
    try{
        const {id} = request.params
        const {nome , cpf , dataNascimento , email} = request.body

        const[updated] = await Funcionario.update(
            {nome , cpf , dataNascimento , email},
            {where: {id: id}}
        )

        if(updated){
            const funcionarioAtualizado = await Funcionario.findByPk(id)
            return response.status(200).json({
                message: "Funcionário atualizado com sucesso.",
                funcionario: funcionarioAtualizado
            })
        }

        return response.status(404).json({erro: "Funcionário não encontrado."})

    } catch (error){
        response.status(500).json({erro: "Erro ao atualizar funcionário."})
    }
})

app.delete("/funcionarios/:id" , async (request , response) => {
    try{
        const {id} = request.params
        const deleted = await Funcionario.destroy( {where: {id: id}})

        if(deleted){
            return response.status(200).json({message: "Funcionário deletado."})
        }

        return response.status(404).json({message: "Funcionário não encontrado."})
    } catch(error){
        response.status(500).json({erro: "Erro ao deletar funcionário."})
    }
})


// Endpoint - Livro

app.get('/livros' , async (request , response) =>{
    const listarLivros = await Livro.findAll()
    response.json(listarLivros)
})

app.post('/livros' , async(request , response) => {
    try{
        const {titulo , autor  , numeroPaginas , preco} = request.body
        const salvarLivro = await Livro.create({titulo , autor , numeroPaginas , preco})
        response.status(201).json({
            message: "Livro criado.",
            livro: salvarLivro
        })
    } catch (error){
        response.status(400).json({
            erro: 'Erro ao criar livro.'
        })
    }
})

app.put("/livros/:id" , async (request , response) => {
    try{
        const {id} = request.params
        const {titulo , autor , numeroPaginas , preco} = request.body

        const[updated] = await Livro.update(
            {titulo , autor , numeroPaginas , preco},
            {where: {id: id}}
        )

        if(updated){
            const livroAtualizado = await Livro.findByPk(id)
            return response.status(200).json({
                mensage: "Livro atualizado com sucesso.",
                livro: livroAtualizado
            })
        }

        return response.status(404).json({erro: "Livro não encontrado."})

    } catch (error){
        response.status(500).json({erro: "Erro ao atualizar livro."})
    }
})

app.delete("/livros/:id" , async (request , response) => {
    try{
        const {id} = request.params
        const deleted = await Livro.destroy( {where: {id: id}})

        if(deleted){
            return response.status(200).json({message: "Livro deletado"})
        }

        return response.status(404).json({message: "Livro não encontrado"})
    } catch(error){
        response.status(500).json({erro: "Erro ao deletar livro."})
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