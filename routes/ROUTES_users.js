const EXPRESS = require("express");
const USER_CNTRL = require("../controllers/CONTROLLER_users");
const ROUTER = EXPRESS.Router();

ROUTER.post("/sign-up-user", USER_CNTRL.sign_up);

module.exports = ROUTER;
