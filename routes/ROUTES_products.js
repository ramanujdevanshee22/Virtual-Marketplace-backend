const EXPRESS = require("express");

const PRODUCT_CNTRL = require("../controllers/CONTROLLER_products");
const ROUTER = EXPRESS.Router();

ROUTER.get("/", (req, res, next) => {}, PRODUCT_CNTRL.fetch_all_products);
ROUTER.post("/add-product", PRODUCT_CNTRL.add_product);
ROUTER.delete("/delete-product/:productId", PRODUCT_CNTRL.del_product);
ROUTER.post("/get-product", PRODUCT_CNTRL.get_product);

module.exports = ROUTER;
