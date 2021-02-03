const Category = require("../models/Category");

// * Create a category
async function createCat(req, res) {
  try {
    const cat = await Category.create(req.body);
    await cat.save();
    res.status(201).json({ message: "Category created", cat });
  } catch (err) {
    res.status(422).json(err.message);
  }
}

// * Get all categories
async function getAllCats(req, res) {
  try {
    const cats = await Category.find();
    if (cats.length === 0) {
      return res
        .status(404)
        .json({ message: "No category. Please start adding categories" });
    }
    res.status(200).json(cats);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// * Get a single category
async function getSingleCat(req, res) {
  try {
    const catId = req.params.catId;
    const cat = await Category.findById(catId);
    if (!cat) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// * Update a category
async function editCat(req, res) {
  try {
    // Get the cat id to update
    const catId = req.params.catId;
    const catToEdit = await Category.findByIdAndUpdate(catId, req.body, {
      new: true,
    });
    // if not found then return not found message
    if (!catToEdit) {
      return res.status(404).json({ message: "Category not found" });
    }

    await catToEdit.save();

    res.status(202).json({ message: "Category updated", catToEdit });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

// * Delete a category
async function deleteCat(req, res) {
  try {
    // Get the category id
    const catId = req.params.catId;
    console.log(catId);
    // Find the category and delete it
    const catToDelete = await Category.findByIdAndDelete(catId);
    if (!catToDelete) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(204).json({ message: "Category deleted" });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

module.exports = {
  createCat,
  getAllCats,
  getSingleCat,
  deleteCat,
  editCat,
};
