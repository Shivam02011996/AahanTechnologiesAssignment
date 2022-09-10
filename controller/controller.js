const categoryModel = require('../models/categoryModel')
const aws = require("../aws")

const isValid = function (value) {
    if (typeof value == 'undefined' || value === null) return false
    if (typeof value == 'string' && value.trim().length === 0) return false
    return true
}
const titleValid = function (title) {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1

}



// ItemCategory register==========================================================
const createItemCategory = async function (req, res) {
    try {
        const files = req.files;
        let userData = req.body
        if (Object.keys(userData) == 0) {
            return res.status(400).send({ status: false, msg: "please Enter the details of User" })
        }
        if (!userData.title) {
            return res.status(400).send({ status: false, msg: "title is required" })
        }
        if (!titleValid(userData.title.trim())) {
            return res.status(400).send({ status: false, msg: "please Enter valid title" })
        }
        if (!isValid(userData.name)) {
            return res.status(400).send({ status: false, msg: "name is required" })
        }
        if (!isValid(userData.phone)) {
            return res.status(400).send({ status: false, msg: "mobile number is required" })
        }
        if (!(/^[6-9]\d{9}$/.test(userData.phone.trim()))) {
            return res.status(400).send({ status: false, msg: "invalid mobile Number" })
        }
        
        let itemImage = await aws.uploadFile(files[0]);
  
      if (!itemImage) {
        return res.status(400).send({ status: false, msg: "error in uploading the files" });
      }
        
        let saveData = await categoryModel.create(userData)
        let result = {
            _id: saveData._id,
            title: saveData.title,
            name: saveData.name,
            phone: saveData.phone,
            address: saveData.address,
            Category: saveData.Category,
            itemImage: saveData.itemImage,
            subCategory: saveData.subCategory,
            createdAt: saveData.createdAt,
            updatedAt: saveData.updatedAt
        }
        return res.status(201).send({ status: true, data: result })

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}




//items list ============================================================================
const getItems = async function (req, res) {
    try {
        let queryParam = req.query;
        if (Object.keys(queryParam).length == 0) {
            let itemsData = await categoryModel.find({ isDeleted: false }).sort({ name: 1 }).select({ name: 1, phone: 1, address: 1, category: 1, itemPrice: 1, subCategory: 1 })
            if (!itemsData) {
                return res.status(404).send({ status: false, msg: "item not found" })
            }
            itemsData['data'] = itemsData
            return res.status(200).send({ status: true, msg: "success", data: itemsData })

        }
        //name Validation
        if (Object.keys(queryParam).includes('name')) {
            if (!ObjectId.isValid(queryParam.name)) {
                return res.status(400).send({ status: false, msg: "name is not valid" })
            }
        }
        //category validation
        if (Object.keys(queryParam).includes('category')) {
            let validCat = await categoryModel.findOne({ category: queryParam.category })
            if (!validCat) {
                return res.status(400).send({ status: false, msg: "category data not valid" })
            }
        }
        //subcategory validation
        if (Object.keys(queryParam).includes('subcategory')) {
            let validCat = await categoryModel.findOne({ subcategory: queryParam.subcategory })
            if (!validCat) {
                return res.status(400).send({ status: false, msg: "subcategory data not valid" })
            }
        }
        let filterCondition = { isDeleted: false }
        if (Object.keys(queryParam)) {
            let { name, category, subcategory } = queryParam
            if (isValid(name)) {
                filterCondition['name'] = name.trim()
            }
            if (isValid(category)) {
                filterCondition['category'] = category.trim()
            }
            if (isValid(subcategory)) {
                filterCondition['subcategory'] = subcategory.trim()
            }
        }
        let filterItems = await categoryModel.find(filterCondition).sort({ name: 1 }).select({ name: 1, phone: 1, address: 1, category: 1, itemPrice: 1, subCategory: 1 })
        if (!filterItems) {
            return res.status(404).send({ status: false, msg: "items not found" })
        }
        //filterItems['data'] = filterItems
        return res.status(200).send({ status:true, msg: "success", data: filterItems })

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }


}

module.exports.createItemCategory = createItemCategory
module.exports.getItems = getItems