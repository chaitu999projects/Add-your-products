const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps:true})

const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default ProductModel;