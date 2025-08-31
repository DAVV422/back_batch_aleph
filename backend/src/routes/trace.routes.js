const express = require("express");
const router = express.Router();
const traceController = require("../controllers/trace.controller");

router.post("/", traceController.addEvent);
router.get("/:batchId", traceController.getEvents);

module.exports = router;
