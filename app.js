const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 3000
let products = [
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


app.put('/products/:id', (req, res) => {
    const newData = req.body
    const productFound = products.find(
        (p) => p.id === parseInt(req.params.id)
    );

    if (!productFound) return res.status(404).json({
        message: "Product not Found"
    });

    console.log(newData)

    products = products.map((p) => p.id === parseInt(req.params.id) ? {...p, ...newData} : p)

    res.json({
        message: "Producto Actualizado Exitosamente"
    })
})


app.delete('/products/:id', (req, res) => {

    const productFound = products.find(
        (p) => p.id === parseInt(req.params.id)
    );

    if (!productFound) return res.status(404).json({
        message: "Product not Found"
    });

   products = products.filter(e => e.id !== parseInt(req.params.id))


    console.log(products)
    res.status(200).json({
        message: "Producto Eliminado"
    })
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