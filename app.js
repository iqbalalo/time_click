const express = require("express");
const app = express();

const attenRoute = require("./routes/attendance");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(bodyParser.json());
app.use(cors())


app.get("/", (req, res)=> {
    res.send("Time attendance is ready!");
});

app.use("/attendance", attenRoute);


app.listen(3000);
