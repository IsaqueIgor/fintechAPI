const express = require('express')
const { v4: uuidv4 } = require('uuid')
const PORT = 3333

const app = express()
app.use(express.json())

interface customer {
    cpf: string
    id: string
    name: string
    statement: []
}

const customers: customer[] = []

app.post('/account', (request: any, response: any) : any => {
    const {cpf, name} = request.body

    const customerAlreadyExists = customers.some((customer) =>
        customer.cpf === cpf
    )

    if(customerAlreadyExists) {
        return response.status(400).json({
            error: "Customer already exists!"
        })
    }  

    customers.push({
        cpf: cpf,
        id: uuidv4(),
        name: name,
        statement: []
    })

    return response.status(201).send()
})

app.get('/statement/:cpf', (request: any, response: any) : any => {
    const { cpf } = request.params

    const customer = customers.find((customer) => customer.cpf === cpf)

    return customer ? response.json({
        body: customer?.statement
    }) :
    response.status(401).json({
        error: "CPF not registered!"
    })
})


app.listen(PORT)