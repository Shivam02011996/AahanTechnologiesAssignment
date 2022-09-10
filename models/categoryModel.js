const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'required title'],
        trim:true,
        enum:['Mr','Mrs','Miss']

    },
    name:{
        type:String,
        required:[true,'required name'],
        trim:true
    },
    phone:{
        type:String,
        trim:true,
        required:[true,"required mobile number"],
        pattern:"^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"
    },
    
    address:{
        street:{
            type:String,
            trim:true
        },
        city:{
            type:String,
            trim:true,
            
        },
        pincode:{
            type:String,
            trim:true
        }
    
    },
    Category: {
        type: String,
        required: [true, "required Category"],
        trim:true
    },

    itemImage: { type: String,
         },

    subCategory: {
        itemName:{
            type:String,
            required:true,
            trim:true,            
        },
        itemPrice:{
            type:Number,
            required:true,
            trim:true,
            
        },
        itemDiscountedPrice:{
            type:Number,
            required:true,
            trim:true
        },
        itemDescription:{
            type:String,
            trim:true
        },
        itemColour:{
            type:String,
            trim:true,
            
        },
        itemSKUnumber:{
            type:String,
            unique: true,
            trim:true
        },

        deletedAt: {
            type: Date,
        },

        isDeleted: {
            type: Boolean,
            default: false
        },
    
    },
    

},{timestamps:true})
module.exports = mongoose.model('category', categorySchema)