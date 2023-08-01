const { res_creator } = require("../helpers/HELPER_res_creator");
const Product = require("../models/MODEl_product");
const { error_printer } = require("../helpers/HELPER_error_printer");
const Mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

exports.fetch_all_products = (req, res, next) => {
  const products = Product.find()
    .then((result) => {
      error = res_creator(result, 0, "Getting all products!!");
      res.status(200).send(error);
      console.log("All products send!");
    })
    .catch((err) => {
      error = res_creator({ err }, 1, "Error fetching all products!!");
      res.status(404).send(JSON.stringify(error));
    });
};

exports.add_product = (req, res, next) => {
  const image = req.file;

  const PROD = {
    name: req.body.name,
    price: req.body.price,
    desc: req.body.desc,
  };
  const PROD_OBJ = PROD;
  if (
    PROD.name.trim().length < 0 ||
    PROD.price < 0 ||
    PROD.desc.trim().length < 0 ||
    !req.file
  ) {
    error = res_creator(
      { PROD },
      1,
      "Invalid credentials! or insufficient data!!"
    );
  } else {
    const NewOBj = {
      //PROD_OBJ,
      name: req.body.name,
      price: req.body.price,
      image: image.path,
      desc: req.body.desc,
    };
    const product = new Product(NewOBj)
      .save()
      .then((result) => {
        error = res_creator({ result }, 0, "Product added successfully!!");
        res.status(200).send(JSON.stringify(error));
      })
      .catch((err) => {
        error_printer("Adding product", err);
      });
  }
};

exports.del_product = (req, res) => {
  //let id = Mongoose.ObjectId(req.params.productId);
  Product.findByIdAndDelete(req.params.productId)
    .then((deleted) => {
      console.log(deleted);
      error = res_creator(deleted, 0, "Product deleted!!");
      console.log(error);
      res.status(200).send(JSON.stringify(error));
    })
    .catch((err) => {
      error = res_creator({}, 1, "Not getting unique id");
      console.log(err);
      res.status(404).send(JSON.stringify(error));
    });
};

exports.get_product = (req, res) => {
  const ID = req.body.id;
  Product.find({ _id: ObjectId(ID) })
    .then((res) => {
      error = res_creator(res, 0, "Got a single product!!");
      res.status(404).send(JSON.stringify(error));
    })
    .catch((err) => {
      error = res_creator({}, 1, "Not getting a unique id");
      res.status(404).send(JSON.stringify(error));
    });
};

// exports.edit_product = (req, res) => {
//   console.log(req.params.productId);
// };
