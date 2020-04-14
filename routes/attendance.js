const express = require("express");
const router = express.Router();
const db = require("../db/db");


router.get("/", (req, res) => {
    res.send("Attendance posts");
});

router.get("/users/:id", (req, res)=> {
    var id = req.params.id;

    console.log("/attendance/users/" + id);

    if (id) {
        var sql = "SELECT * FROM attendance WHERE user_id='"+ id + "'";
    } else {
        var sql = "SELECT * FROM attendance";
    }

    db.all(sql, (err, rows) => {
        if (err) {
            throw err;
        }

        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send("No record found!");
        }
    });

});


router.post("/", (req, res)=> {
    var params = req.body;

    console.log(params);

    var user_id = params["user_id"];
    var d = new Date();
    var attn_time = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString();
    var action = params["action"];


    db.run("INSERT INTO attendance(attn_time, user_id, action) VALUES(?,?,?)", [attn_time, user_id, action], function(err) {
        if (err) {
            console.log(err.message);
            res.send(err.message, 500);
        }
        console.log("New record has been inserted");
        res.send({"msg":"New record has been inserted"});
    });

});


router.put("/", (req, res)=> {
    var params = req.body;

    console.log(params);

    var user_id = params["user_id"];
    var attn_time = params["attn_time"];
    var action = params["action"];


    db.run("UPDATE attendance SET action=? WHERE user_id=? AND attn_time=?", [action, user_id, attn_time], function(err) {
        if (err) {
            console.log(err.message);
            res.send(err.message, 500);
        }
        console.log("Record has been updated");
        res.send({"msg": "Record has been updated"});
    });

});


router.delete("/", (req, res)=> {
    var params = req.body;

    console.log(params);

    var user_id = params["user_id"];
    var attn_time = params["attn_time"];

    db.run("DELETE FROM attendance WHERE user_id=? AND attn_time=?", [user_id, attn_time], function(err) {
        if (err) {
            console.log(err.message);
            res.send(err.message, 500);
        }
        console.log("Record has been deleted");
        res.send({"msg": "Record has been deleted"});
    });

});


module.exports = router;
