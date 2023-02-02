const { Router } = require('express');
const axios = require ('axios');
const {Countries, Activities} = require ('../db');
const Activity = require("./activities");
const Country = require("./countries");

const router = Router();

router.use("/" , Activity)
router.use("/", Country)

module.exports = router;
