const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // trim: true,
    // required: "First Name is required",
  },
  price:{
    type:String,
    // trim:true,
    // required:"Last Name is required",
    // unique:true 
  },
  image: {
    type: String,
  //   required: true
  },
  file_mimetype: {
    type: String,
  //   required: true
  },
  dateCreated:Date,
  dateUpdated:Date
},{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model("Product", productSchema);
