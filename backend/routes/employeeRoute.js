const express = require("express");
const { createEmployee, getEmployees, getEmployee, deleteEmployee, updateEmployee } = require("../controllers/employeeController");
const protect = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");
const router = express.Router();

router.post("/",protect,upload.single("image"), createEmployee);
router.get("/",protect,getEmployees);
router.get("/:id",protect,getEmployee);
router.delete("/:id",protect,deleteEmployee);
router.patch("/:id",protect,upload.single("image"), updateEmployee);

module.exports = router;