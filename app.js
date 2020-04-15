const express = require("express");
const app = express();

const attenRoute = require("./routes/attendance");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");


app.get("/", (req, res)=> {
    const message = "Intelligent Attendance Management System";
    res.render("index", {message: message});
});

app.use("/attendance", attenRoute);


app.listen(3000,  () => {
    console.log('app listening on port http://localhost:3000');
});
