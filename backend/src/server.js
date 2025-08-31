const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const batchRoutes = require("./routes/batch.routes");
const traceRoutes = require("./routes/trace.routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/batch", batchRoutes);
app.use("/trace", traceRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
