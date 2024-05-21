const express = require("express");
const { handleNewShortUrl } = require("../controllers/url");

const router = express.Router();

router.post("/", handleNewShortUrl);

module.exports = router;
