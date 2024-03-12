
const express = require('express');
const mongoose = require('mongoose');
const route_category=require('./routes/category_routes')
const route_item= require('./routes/item_route')
const app=express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/InventoryApp')
.then(() => {
  console.log('Connected to MongoDB');
})

app.set('view engine','ejs')

app.use('/category',route_category)
app.use('/category/items',route_item)



app.listen(8002,()=>console.log('server started..'))









