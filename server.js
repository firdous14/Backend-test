const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let products = [];
let id = 1;

app.post("/products", (req,res)=>{
    const product = {
        id: id++,
        name: req.body.name,
        price: req.body.price,
    }
    products.push(product);
    res.status(201).json(product);
});


app.get("/products", (req,res)=>{
    res.status(200).json(products);
});


app.get("/products/:id", (req,res)=>{
    const product = products.find(p => p.id == req.params.id);

    if(!product){
        return res.status(404).json({
            message: "Product not found"
        });
    }
    res.json(product);
});

app.put("/products/:id", (req,res)=>{
    const product = products.find(p => p.id == req.params.id);

    if(!product){
        res.status(404).json({
            message: "Product not found"
        });
    }
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    res.json(product);
});

app.delete("/products/:id", (req,res)=>{
    const index = tasks.findIndex(p => p.id == p.req.params);

    if(index == -1){
        res.status(404).json({
            message: "product not found"
        });
    }
    products.splice(index,1);
    res.json({
        message: "product deleted"
    });
});

app.get("/", (req,res)=>{
    res.send("API is working");
});

app.listen(8080,()=>{
    console.log(`app is listening on port 8080`);
});