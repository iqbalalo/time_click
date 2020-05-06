const express = require("express");
const usersRouter = require("./routes/users");
const presenceRouter = require("./routes/presence");
const bodyParser = require("body-parser");
const cors = require("cors");
const authorize = require("./utils/authorization");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");


app.get("/", (req, res)=> {
    const message = "Intelligent Attendance Management System";
    res.render("index", {message: message});
});

app.post("/token", (req, res) => {
    let params = req.body;

    const payload = {
        id: params.id,
        scope: ["read"]
    };

    const token = jwt.sign(payload, config.SECRET);
    return res.json({ message: token });
});

app.use("/users", usersRouter);
app.use("/presence", presenceRouter);

module.exports = app;

