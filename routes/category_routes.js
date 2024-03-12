const express=require('express')
const router=express.Router()
const Category=require('../models/category_model')
// const { name } = require('ejs')

router.get('/',async(req,res)=>{
    const allcategories=await Category.find()
    res.render('category',{
        categories:allcategories
    })
})

router.get('/add-new',(req,res)=>{
    res.render('addCategory')
})

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.redirect('/');
        }
        res.render('editCategory', {
            category
        });
    } catch (err) {
        console.error(err);
        return res.redirect('/');
    }
});

router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Category.findByIdAndUpdate(id, {
            Name: req.body.Name,
            description: req.body.description,
            url: req.body.url,
        },{ new: true });
        // After successful update, redirect
        res.redirect('/category');
    } catch (err) {
        // If an error occurs, log it and respond with an error message
        console.error(err);
        res.status(500).json({ msg: 'Error updating category' });
    }
});



router.post('/add-new',async(req,res)=>{
    const {Name,description,url}=req.body
    await Category.create({
        Name,
        description,
        url,
    })
    res.redirect('/category')
})



router.get('/delete/:id',async(req,res)=>{
    const id=req.params.id

    try{
        await Category.findOneAndDelete({_id: id} )
        res.redirect('/category')
    }
    catch(error)
    {
        res.status(505).json({msg:'error deleting category'})
    }
})

module.exports=router











