const Product = require('../models/Product')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

// * Create a product
function createProd(req, res){
  try {
    // * Create instance of formidable
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({error: 'Image could not be uploaded'})
      }
      // * Create the product using the fields parsed from form
      const prod = await Product.create(fields)

      if (files.picture) {
        prod.picture.data = fs.readFileSync(files.picture.path)
        prod.picture.contentType = files.picture.type
      }

      // * Save the product
      prod.save()

      res.status(201).json({message: 'New product added', prod})
    })
  } catch (err) {
    res.status(422).json(err)
  }
}

module.exports = {
  createProd
}