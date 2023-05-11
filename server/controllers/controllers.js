require("dotenv").config({ debug: process.env.DEBUG });
const Product = require("../models/product.js");
const moment = require("moment");


// Add new product Api 

exports.newProduct = async (req, res) => {
  const {name, price} = req.body;
  const file = req.file.filename ;

  console.log("body",req.body)
  console.log("file",file)

  if (!(name && price && file)){
    res.status(401).json({ message: "All fields are required" });
  }

  try {
    const preProduct = await Product.findOne({ name: name, price: price });

    if (preProduct) {
      res.status(401).json({ message : "Product already exist"})
    } else {

      const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      const productData = new Product({
        name, price, image: file, dateCreated
      });
      await productData.save();
      res.status(200).json(productData);
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("Catch error",error)
  }
};


// Fetch all products Api 

exports.allProducts = (req, res) => {
  let data;
  Product.find((err, docs) => {
    if (err) {
      res.send("Something went wrong");
    }
    data = docs;
  });
  setTimeout(() => {
    res.status(200).json(JSON.parse(JSON.stringify(data)));
  }, 50);
};


// Update product Api 

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const file =  req.file.filename

  const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
  
  try {
    const updateProduct = await Product.findByIdAndUpdate({ _id: id },{
      name, price, image: file, dateUpdated
    },{
      new: true
    });

    await updateProduct.save();
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(409).json({ msg: error });
  }
};


// Delete product Api 
exports.deleteProduct = async (req, resp) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete({ _id: id });
    resp.status(200).json({ msg : "Product deleted Successfully"});
  } catch (error) {
    resp.status(409).json({ msg: error });
  }
};
