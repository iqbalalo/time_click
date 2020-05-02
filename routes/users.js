const dateFormat = require('dateformat');
const Users = require("../models/users");
const express = require("express");

const router = express.Router();


router.get("/", (req, res) => {
    let userModel = new Users();

    userModel.findAll()
        .then(result => {
            res.json({"message": result});
        }).catch(e => {
        console.log(e);
        res.status(500).json({"message": []});
    })
});


router.get("/:id", (req, res)=> {
    let id = req.params.id;

    let userModel = new Users();

    userModel.findById(id)
        .then(result => {

            res.json({"message": result});

        }).catch(e => {
        console.log(e);
        res.status(500).json({"message": []});
    })

});

router.get("/:field/:val", (req, res)=> {
    let field = req.params.field;
    let val = req.params.val;

    if (field === "images") {
        res.status(401).json({"message": "Invalid filter option '" + field + "'"})
    }

    let userModel = new Users();

    let find;
    if (field === "devices") {
        find = userModel.findByDevices(val)
    } else {
        find = userModel.findByAny({[field]: val})
    }

        find.then(result => {

            res.json({"message": result});

        }).catch(e => {
            console.log(e);
            res.status(500).json({"message": []});
    })

});

router.post("/", (req, res)=> {
    let params = req.body;

    let now = new Date();
    now = dateFormat(now, "isoDateTime");
    now = now.split("-").join("").split(":").join("").split("T").join("").substr(0, 14);

    params["first_name"] = params.first_name ? params.first_name : res.status(401).json({"message": "First Name is required!"});
    params["id"] = params.first_name.substr(0,1) + (params.last_name ? params.last_name.substr(0,1) : params.first_name.slice(1,2)) + now;
    params["dob"] = params.dob ? params.dob : res.status(401).json({"message": "Date of birth is required!"});
    params["gender"] = params.gender ? params.gender : res.status(401).json({"message": "Gender is required!"});
    params["devices"] = params.devices ? JSON.stringify(params.devices) : null;


    let userModel = new Users(params);

    userModel.insertUser()
        .then(result => {

            res.json({"message": (result ? "User record was inserted!": Error("User record was not inserted!"))});

        }).catch(e => {
        console.log(e);
        res.status(500).json({"message": e.message});
    })
});


router.put("/", (req, res)=> {
    let params = req.body;

    if (!params.id) {
        res.status(401).json({"message": "Id is required!"});
    }

    Object.keys(params).forEach(key => {
        if (params[key] === "") {
            res.status(401).json({"message": `${key} is required!`});
        }

        if (typeof params[key] === "object") {
            params[key] = JSON.stringify(params[key]);
        }
    });


    let userModel = new Users();

    userModel.updateUser(params)
        .then(result => {
            res.status(200).json({"message": (result ? "User record was updated!": Error("User record was not updated!"))});
        }).catch(e => {
        console.log(e);
        res.status(500).json({"message": e.message});
    })
});


router.delete("/:id", (req, res)=> {
    let id = req.params.id;

    let userModel = new Users();

    // action true means Delete
    userModel.deleteOrRestoreUser(id, true)
        .then(result => {
            res.status(200).json({"message": (result ? "User record deleted!": Error("User record was not updated!"))});
        }).catch(e => {
        console.log(e);
        res.status(500).json({"message": e.message});
    })
});


router.put("/restore/:id", (req, res)=> {
    let id = req.params.id;

    let userModel = new Users();

    // action false means restore
    userModel.deleteOrRestoreUser(id, false)
        .then(result => {
            res.status(200).json({"message": (result ? "User record restored!": Error("User record was not updated!"))});
        }).catch(e => {
        console.log(e);
        res.status(500).json({"message": e.message});
    })
});

module.exports = router;
