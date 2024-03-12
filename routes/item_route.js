const express=require('express')
const router=express.Router()
const Item=require('../models/item_models')

router.get('/add-new-item',(req,res)=>{
    res.render('additem')
})

router.post('/add-new-item', async (req, res) => {
    const { Name, description,category, price, stock, url } = req.body;
    try {
        await Item.create({
            Name,
            description,
            category,
            price,
            stock,
            url,
        });
        res.redirect('/category/items/shoes'); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'error' });
    }
});

// router.get('/shoes',async(req,res)=>{
//     const allitems=await Item.find()
//     res.render('Shoes',{
//         items:allitems,
//     })
// })

router.get('/shoes',async(req,res)=>{
    const allitems=await Item.find({category:'shoes'})          //to fetch only that data in collection whose category is shoes
    res.render('Shoes',{
        items:allitems,
    })
})

router.get('/jackets',async(req,res)=>{
    try {
            const allitems=await Item.find({category:'jackets'})
            res.render('jackets',{
            items:allitems
        })
        res.render('/category/items/Jackets')
    } catch (error) {
        console.log(error)
        res.status(505).json({msg:'error getting jacket details'})
    }
    
})


router.get('/edit-item/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const item=await Item.findById(id)
        res.render('editItem',{
            item
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(505).json({msg:'error viewing the item'})
    }
})

router.post('/edit-item/:id',async(req,res)=>{
    const id=req.params.id

    try {
        await Item.findByIdAndUpdate(id,{
            Name:req.body.Name,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price,
            stock:req.body.stock,
            url:req.body.url,
        } ,{new:true})
        res.redirect('/category/items/shoes')

    } catch (error) {
        console.log(error)
        res.status(505).json({msg:'error editing the item' })
    }
})


router.get('/delete-item/:id',async(req,res)=>{
    const id=req.params.id
    try {
        await Item.findByIdAndDelete(id)
        res.redirect('/category/items/shoes')
    } catch (error) {
        console.log(error)
        res.status(505).json({msg:'error deleting the item' })
    }
})



// router.get('/watches',(req,res)=>{
//     const allitems=Item.find()
//     res.render('watches',{
//         items:allitems
//     })
// })

module.exports=router