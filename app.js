const EXPRESS = require("express");
const MONGOOSE = require("mongoose");
const BODYPARSER = require("body-parser");
const MULTER = require("multer");
const PATH = require("path");
const CORS = require("cors");

const { error_printer } = require("./helpers/HELPER_error_printer");
const { res_creator } = require("./helpers/HELPER_res_creator");
const PRODUCT_ROUTES = require("./routes/ROUTES_products");
const USER_ROUTES = require("./routes/ROUTES_users");

const PORT = 3001;
const FILE_STORAGE = MULTER.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/[/\:]/g, "_") + "-" + file.originalname
    );
  },
});
const FILE_FILTER = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const APP = EXPRESS();
APP.use(CORS());

APP.use("/images", EXPRESS.static(PATH.join(__dirname, "images")));
APP.use(BODYPARSER.json());
APP.use(
  MULTER({
    storage: FILE_STORAGE,
    fileFilter: FILE_FILTER,
  }).single("image")
);
APP.use(
  "/product",
  (req, res, next) => {
    console.log("In the middleware");
    next();
  },
  PRODUCT_ROUTES
);
APP.use(
  "/user",
  (req, res, next) => {
    console.log("IN the middleware");
    next();
  },
  USER_ROUTES
);
APP.use("/*", (req, res) => {
  error = res_creator({}, 1, "page not found!");
  res.status(404).send(JSON.stringify(error));
});

MONGOOSE.connect(
  "mongodb+srv://devanshee2212:admin123@cluster0.nxpmtqg.mongodb.net/shop"
)
  .then(() => {
    APP.listen(PORT);
    console.log("\n_______________________________\n");
    console.log(`Connection to the database is succcessfull!!!
    \n Server listening at ${PORT}
    `);
  })
  .catch((err) => {
    error_printer("Connecting to the database", err);
  });
