const express = require("express");
const router = express.Router();
const batchController = require("../controllers/batch.controller");

router.post("/", batchController.createBatch);
router.get("/:batchId", batchController.getBatchMetadata);

module.exports = router;
