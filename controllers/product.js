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
    const prod = await Product.findById(prodId).populate("category");
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

// * Delete a product
async function deleteProduct(req, res) {
  try {
    const prodId = req.params.productId;
    const prodToDelete = await Product.findByIdAndDelete(prodId);
    if (!prodToDelete) {
      return res.status(404).json({ message: " Product not found" });
    }
    res.status(204);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// * Update/Edit a product
function editProduct(req, res) {
  try {
    // * Create instance of formidable
    const prodId = req.params.productId;
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
      const prod = await Product.findByIdAndUpdate(prodId, fields, {
        new: true,
        runValidators: true,
      });

      if (!prod) {
        return res.status(404).json({ message: "Product not found" });
      }

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

      res.status(201).json({ message: "Product has been updated", prod });
    });
  } catch (err) {
    res.status(422).json(err.message);
  }
}

// ! SALES / NEW ARRIVALS
// * By sales = /products?sortby=sales&order=desc&limit=5
// * By sales = /products?sortby=createdAt&order=desc&limit=5
// * If not params are sent, then all products returned

// * Get all products
async function getAllProducts(req, res) {
  try {
    // * Set Params queries
    const order = req.query.order ? req.query.order : "asc";
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;

    const prods = await Product.find()
      .select("-picture")
      .populate("category", "_id name")
      .sort([[sortBy, order]])
      .limit(limit);
    // * Set products pictures to undefined
    const prodEdit = prods.map((prod) => {
      return { ...prod, picture: undefined };
    });
    // If length of product is less than one. Return no products in list. Start adding products
    if (prodEdit.length === 0) {
      return res.status(404).json({
        message: "No products in the list. Start adding products now",
      });
    }

    res.status(200).json(prodEdit);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// * Function to list related products
async function relatedProducts(req, res) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const prodId = req.params.productId;
    const prodDetails = await Product.findById(prodId).populate(
      "category",
      "_id name"
    );
    // Return products with relative category to the product in params
    const relatedProds = await Product.find({
      _id: { $ne: req.params.productId },
      category: prodDetails.category,
    })
      .select("-picture")
      .populate("category", "_id name")
      .limit(limit);
    return res.status(200).json(relatedProds);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// * List all products by categories
async function getProdCats(req, res) {
  try {
    // Get the categories within all Products
    const prodCat = await Product.distinct("category");
    if (!prodCat)
      return res.status(404).json({ message: "No category found!" });
    res.status(200).json(prodCat);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
}

// * list products by search
async function listProdBySearch(req, res) {
  try {
    // query parameters for search
    const order = req.body.order ? req.body.order : "desc";
    const sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    const limit = req.body.limit ? parseInt(req.body.limit) : 100;
    const skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        if (key === "price") {
          // gte -  greater than price [0-10]
          // lte - less than
          // Grab the keys >= 1st arg and <= 2nd arg
          findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1],
          };
        } else {
          findArgs[key] = req.body.filters[key];
        }
      }
    }

    const prods = await Product.find(findArgs)
      .select("-picture")
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    if (!prods) return res.status(404).json({ message: "No products found" });
    res.status(202).json({
      size: prods.length,
      prods
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// * Get product pictures
async function getPicture(req, res, next){
  try {
    // Get the product using the req params
    const prod = await Product.findById(req.params.productId)
    if (!prod) return res.status(404).json({message: 'No product found'})
    // return the picture for the product
    if (prod.picture.data) {
      res.set('Content-Type', prod.picture.contentType)
      return res.send(prod.picture.data)
    }
    next()
  } catch (err) {
    res.status(400).json(err.message)
  }
}

module.exports = {
  createProd,
  getSingleProduct,
  getAllProducts,
  deleteProduct,
  editProduct,
  relatedProducts,
  getProdCats,
  listProdBySearch,
  getPicture
};
