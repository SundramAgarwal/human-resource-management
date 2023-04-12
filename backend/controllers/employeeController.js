const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

//create employee
const createEmployee = asyncHandler(async(req,res)=> {
    const {name,sku,category,quantity,price,description} = req.body

    //validation of request
    if (!name || !category || !quantity || !price || !description) {
        res.status(400)
        throw new Error("Please fill in all fields!")
    }

    // handle the image upload
    let fileData = {}
    if(req.file) {
        //save image to cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path,
                {
                folder: "human-resource-management", 
                resource_type: "image"
            });
        } catch (error) {
            res.status(500)
            throw new Error("Image could not be uploaded!")
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
            //2 is actually telling the decimal places 
        }
    }

    // create employees
    const employee = await Employee.create({
        user: req.user.id,   
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData
    });

    res.status(201).json(employee);
})


//get all employee
const getEmployees = asyncHandler(async(req,res)=> {
    const employees = await Employee.find({user: req.user.id}).sort("-createdAt")
    res.status(200).json(employees)
})


//get single employee
const getEmployee = asyncHandler(async(req,res)=> {
    const employee = await Employee.findById(req.params.id)
    //if employee doesnot exist
    if(!employee) {
        res.status(404)
        throw new Error("Prouct not found!")
    }
    //match employee to its user
    if (employee.user.toString() != req.user.id) {
        res.status(401)
        throw new Error("User not authorized!")
    }
    res.status(200).json(employee);
})

//delete a employee
const deleteEmployee = asyncHandler(async(req,res)=> {
    const employee = await Employee.findById(req.params.id)
    //if employee doesnot exist
    if(!employee) {
        res.status(404)
        throw new Error("Prouct not found!")
    }
    if (employee.user.toString() != req.user.id) {
        res.status(401)
        throw new Error("User not authorized!")
    }
    await employee.remove();
    res.status(200).json({message: "Employee deleted sucessfully!"});
})

//update a Employee details
const updateEmployee = asyncHandler(async(req,res)=> {
    const {name,category,quantity,price,description} = req.body

    const employee = await Employee.findById(req.params.id)

    //if employee does not exist
    if(!employee) {
        res.status(404)
        throw new Error("Employee not found!")
    }

    //match employee to its user
    if (employee.user.toString() != req.user.id) {
        res.status(401)
        throw new Error("User not authorized!")
    }

    // handle the image upload
    let fileData = {};
    if(req.file) {
        //save image to cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path,
                {
                folder: "inventory-ap", 
                resource_type: "image"
            });
        } catch (error) {
            res.status(500)
            throw new Error("Image could not be uploaded!")
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
            //2 is actually telling the decimal places 
        }
    }

    // update employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
        {_id: req.params.id},
        {
            name,
            category,
            quantity,
            price,
            description,
            image: Object.keys(fileData).length === 0 ?  employee?.image : fileData,
        },
        {
            new: true,
            runValidators: true
        }
    )

    res.status(200).json(updatedEmployee);
})

module.exports = {
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee,
}