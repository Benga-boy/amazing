const Product = require("../models/Product");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

// * Create a product with file uploads
function createProd(req, res) {
  try {
    // * Create instance of formidable
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "Image could not be uploaded" });
      }

      // * Validate all fields
      const { name, description, price, category, quantity } = fields;

      if (!name || !description || !price || !category || !quantity) {
        return res.status(422).json({ error: "All fields must be completed" });
      }

      // * Create the product using the fields parsed from form
      const prod = await Product.create(fields);

      if (files.picture) {
        // * Only upload files with a size of up to 2MB
        if (files.picture.size > 2000000) {
          return res
            .status(400)
            .json({ error: "Image should be less than 2MB in size" });
        }
        prod.picture.data = fs.readFileSync(files.picture.path);
        prod.picture.contentType = files.picture.type;
      }

      // * Save the product
      prod.save();

      res.status(201).json({ message: "New product added", prod });
    });
  } catch (err) {
    res.status(422).json(err.message);
  }
}

// * Get a single product
async function getSingleProduct(req, res) {
  try {
    const prodId = req.params.productId;
    const prod = await Product.findById(prodId);
    // * If product not found, return not found message
    if (!prod) {
      return res.status(404).json({ message: "Product not found" });
    }
    prod.picture = undefined;
    res.status(200).json(prod);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// * Get all products
async function getAllProducts(req, res) {
  try {
    const prods = await Product.find();
    // * Set products pictures to undefined
    const prodEdit = prods.map((prod) => {
      return { ...prod, picture: undefined };
    });
    // If length of product is less than one. Return no products in list. Start adding products
    if (prodEdit.length === 0) {
      return res
        .status(400)
        .json({
          message: "No products in the list. Start adding products now",
        });
    }

    res.status(200).json(prodEdit);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// * Delete a product
async function deleteProduct(req, res) {
  try {
    const prodId = req.params.productId;
    const prodToDelete = await Product.findByIdAndDelete(prodId);
    if (!prodToDelete) {
      return res.status(404).json({message: ' Product not found'})
    }
    res.status(204);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// * Update/Edit a product
async function editProduct(req, res) {
  try {
    const prodId = req.params.productId
    const prodToEdit = await Product.findByIdAndUpdate(prodId, req.body, {new: true, runValidators: true})
    res.status(202).json({message: 'Product has been updated', prodToEdit})
  } catch (err) {
    res.status(400).json(err.message)
  }
}

module.exports = {
  createProd,
  getSingleProduct,
  getAllProducts,
  deleteProduct,
};
