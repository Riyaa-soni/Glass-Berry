const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    features: String,
    description: String,
    images: [String],
    category: String,
    subcategory: String,
    brand: String,
    date: Date,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
