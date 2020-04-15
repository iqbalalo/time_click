const dateFormat = require('dateformat');
const express = require("express");
const router = express.Router();
const db = require("../db/db");


router.get("/", (req, res) => {
    res.send("Attendance posts");
});


router.get("/users/:id", async (req, res)=> {
    var id = req.params.id;

    console.log("/attendance/users/" + id);

    if (id) {
        var sql = "SELECT * FROM attendance WHERE user_id='"+ id + "'";
    } else {
        var sql = "SELECT * FROM attendance";
    }

    new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {

            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    }).then(result => {
        console.log(result);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.json({msg: "No record found!"});
        }
    }).catch(err => {
        console.log(result);
    });

});



router.post("/", async (req, res)=> {
    var params = req.body;

    console.log(params);

    var user_id = params["user_id"];
    var now = new Date();
    var now = dateFormat(now, "isoDateTime")
    var action = params["action"];

    try {
        var sql = "INSERT INTO attendance(attn_time, user_id, action) VALUES(?,?,?)";

        const result = await db.run(sql, [now, user_id, action]);
        console.log(result);

        res.json({msg:"New record has been inserted on " +  now});

    } catch (e) {
        console.log(e);
        res.json({msg:e.message})
    }


});


router.put("/", async (req, res)=> {
    var params = req.body;

    console.log(params);

    var user_id = params["user_id"];
    var attn_time = params["attn_time"];
    var action = params["action"];

    try {
        var sql = "UPDATE attendance SET action=? WHERE user_id=? AND attn_time=?";

        const result = await db.run(sql, [action, user_id, attn_time]);
        console.log(result);

        res.json({"msg": "Record has been updated"});
    } catch (e) {
        console.log(e);
        res.json({msg:e.message})
    }
});


router.delete("/", async (req, res)=> {
    var params = req.body;

    console.log(params);

    var user_id = params["user_id"];
    var attn_time = params["attn_time"];
    var action = params["action"];

    try {
        var sql = "DELETE FROM attendance WHERE user_id=? AND attn_time=?";

        const result = await db.run(sql, [user_id, attn_time]);
        console.log(result);

        res.json({"msg": "Record has been deleted"});
    } catch (e) {
        console.log(e);
        res.json({msg:e.message})
    }

});


module.exports = router;
