const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 3000
const products = [
    {
        id: 1,
        name: "Macbook Pro",
        price: 3000
    }
]

app.use(morgan('dev'))
app.use(express.json())

app.get('/products', (req, res) => {
    res.send(products)
})


app.post('/products', (req, res) => {
    var newProduct = {id: products.length + 1, ...req.body}
    products.push(newProduct)
    res.send(newProduct)
})


app.put('/products', (req, res) => {
    res.send('Actualizando Productos')
})


app.delete('/products', (req, res) => {
    res.send('Eliminado Productos')
})


app.get('/products/:id', (req, res) => {
    
    const productFound = products.find(
        (p) => p.id === parseInt(req.params.id)
    );

    if (!productFound) return res.status(404).json({
        message: "Product not Found"
    });

    console.log(productFound)
    res.json(productFound)
   
})


app.listen(port, () => console.log(`Servidor Escuchando en el puerto ${port}`)) 