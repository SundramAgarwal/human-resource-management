const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Admin",
    },
    name: {
        type: String,
        required: [true,"Please add a name"],
        trim: true,
    },
    sku: {
        type: String,
        default: "SKU",
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Please add a category"],
        trim: true,
    },
    quantity: {
        type: String,
        required: [true, "Please add a quantity"],
        trim: true,
    },
    price: {
        type: String,
        required: [true, "Please add a price"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
    },
    image: {
        type: Object,
        default: {},
    },
}, {
    timestamps: true,
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;