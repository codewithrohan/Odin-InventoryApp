const mongoose=require('mongoose')

const itemSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true,
    }
});

const Item = mongoose.model('Item',itemSchema)

module.exports=Item