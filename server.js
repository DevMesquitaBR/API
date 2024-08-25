/* 
GET = LISTAR

POST = CRIAR

PUT = EDITAR VARIOS

PATCH = EDITAR UM

DELETE = DELETAR
*/
/* 
    OBJETIVO CRIA API DE USUARIOS

    -CRIAR UM USUARIO
    -LISTAR TODOS OS USUARIOS
    -EDITAR UM USUARIO
    -DELETAR UM USUARIOS

    1) Tipo de Rota / Método HTTP
    2) Endereço
*/

import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()


const app = express()

app.use(express.json())
app.use(cors(['*']))


app.post('/usuarios', async (req, res) => { //CRIA UM USUARIO

    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
        
    })

    res.status(201).json(req.body)
}) 


app.get('/usuarios', async (req, res) => { //LISTA UM USUARIO
    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })

    }else {
        await prisma.user.findMany()
    }

    console.log(req)

    res.status(200).json(users)
}) 


app.put('/usuarios/:id', async (req, res) => { //EDITA UM USUARIO

        await prisma.user.update({
            where: {
                id: req.params.id
            },
            data:{
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req,res) => { // DELETA UM USUARIO
    await prisma.user.delete({
            where: {
                id: req.params.id
            }
    })

    res.status(200).json({ message: "Usuário Foi Deletado Com Sucesso!" })

}) 


app.listen(3000)


