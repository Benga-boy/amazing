const Category = require('../models/Category')


// * Create a category
async function createCat(req, res){
  try {
    const cat = await Category.create(req.body)
    await cat.save()
    res.status(201).json({message: 'Category created', cat})
  } catch (err) {
    res.status(422).json(err.message)
  }
}

module.exports = {
  createCat
}