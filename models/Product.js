const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
    },
    category: {
      type: schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
    },
    sales: {
      type: Number,
      default: 0
    },
    picture: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(require("mongoose-unique-validator"));

module.exports = mongoose.model("Product", productSchema);
