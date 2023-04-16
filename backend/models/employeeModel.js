const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    admin: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Admin",
    },
    first_name: {
        type: String,
        required: [true,"Please add the first name"],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true,"Please add the last name"],
        trim: true,
    },
    employee_code: {
        type: String,
        default: "EMPLOYEE_CODE",
        trim: true,
    },
    department: {
        type: String,
        required: [true, "Please add the department"],
        trim: true,
    },
    designation: {
        type: String,
        required: [true, "Please add the designation"],
        trim: true,
    },
    role: {
        type: String,
        required: [true, "Please add the role"],
        trim: true,
    },
    class_assigned: {
        type: String,
        required: [true],
        trim: true,
    },
    gender: {
        type: String,
        required: [true, "Please specify gender"],
        trim: true,
    },
    blood_group: {
        type: String,
        required: [true, "Please add the blood_group"],
        trim: true,
    },
    contact_number: {
        type: String,
        required: [true],
        default: "+91"
    },
    date_of_birth: {
        type: String,
        required: [true],
        trim: true,
    },
    date_of_joining: {
        type: String,
        required: [true],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please add a email!"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email!."
        ]
    },
    address: {
        type: String,
        required: [true, "Please add the address"],
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