const express = require("express");
const router = express.Router();
const { getRecommendation } = require("../controller/recommendController");

router.post("/", getRecommendation);

module.exports = router;
