const dateFormat = require('dateformat');
const Users = require("../models/users");
const express = require("express");
const Utils = require("../utils/utils");

const router = express.Router();
const utils = new Utils();


router.get("/", (req, res) => {
    let userModel = new Users();

    userModel.findAll()
        .then(result => {
            return res.json({"message": result});
        }).catch(e => {
        console.log(e);
        return res.status(500).json({"message": []});
    })
});


router.get("/:id", (req, res)=> {
    let id = req.params.id;

    let userModel = new Users();

    userModel.findById(id)
        .then(result => {

            return res.json({"message": result});

        }).catch(e => {
        console.log(e);
        return res.status(500).json({"message": []});
    })

});

router.get("/:field/:val", (req, res)=> {
    let field = req.params.field;
    let val = req.params.val;

    if (field === "images") {
        return res.status(401).json({"message": "Invalid filter option '" + field + "'"})
    }

    let userModel = new Users();

    let find;
    if (field === "devices") {
        find = userModel.findByDevices(val)
    } else {
        find = userModel.findByAny({[field]: val})
    }

        find.then(result => {

            return res.json({"message": result});

        }).catch(e => {
            console.log(e);
            return res.status(500).json({"message": []});
    })

});

router.post("/", (req, res)=> {
    let params = req.body;

    let isInvalid = utils.checkParamValidation(["first_name", "dob", "gender", "password"], params);

    if (isInvalid) {
        return res.json({"message": isInvalid});
    }

    let now = new Date();
    now = dateFormat(now, "isoDateTime");
    now = now.split("-").join("").split(":").join("").split("T").join("").substr(0, 14);
    params["id"] = params.first_name.substr(0,1) + (params.last_name ? params.last_name.substr(0,1) : params.first_name.slice(1,2)) + now;
    params["devices"] = params.devices ? JSON.stringify(params.devices) : null;
    params["password"] = utils.generateHash(params.password);
    params["activation_code"] = utils.generateId(6);

    let userModel = new Users(params);

    userModel.insertUser(userModel.dbModel())
        .then(result => {
            if (result) {
                return res.json({"message": "User record was inserted!"});
            } else {
                return res.status(500).json({"message": "User record was not inserted!"});
            }

        }).catch(e => {
            console.log(e);
            return res.status(500).json({"message": e.message});
        })
});


router.put("/", (req, res)=> {
    let params = req.body;

    if (!params.id) {
        return res.status(401).json({"message": "Id is required!"});
    }

    if (params.password) {
        return res.status(403).json({"message": "Invalid api request!"});
    }

    Object.keys(params).forEach(key => {
        if (params[key] === "") {
            return res.status(401).json({"message": `${key} is required!`});
        }

        if (typeof params[key] === "object") {
            params[key] = JSON.stringify(params[key]);
        }
    });


    let userModel = new Users();

    userModel.updateUser(params)
        .then(result => {
            if (result) {
                return res.json({"message": "User record was updated!"});
            } else {
                return res.status(500).json({"message": "User record was not updated!"});
            }
        }).catch(e => {
            console.log(e);
            return res.status(500).json({"message": e.message});
        });
});


router.post("/change_password", async (req, res) => {
    let params = req.body;

    if (!params.id) {
        return res.status(401).json({"message": "Id is required!"});
    }

    if (!params.old_password && !params.new_password) {
        return res.status(401).json({"message": "Old password and new password are required!"});
    }


    let userModel = new Users();

    let old_hash = await userModel.getUserPasswordHashById(params.id);

    let isPasswordMatched = utils.matchHash(params.old_password, old_hash.password);

    if (!isPasswordMatched) {
        return res.status(403).json({"message": "Old password was not matched!"});
    }

    params = {
        "id": params.id,
        "password": utils.generateHash(params.new_password)
    };


    userModel.updateUser(params)
        .then(result => {
            if (result) {
                return res.json({"message": "Password was updated!"});
            } else {
                return res.status(500).json({"message": "Password was not updated!"});
            }
        }).catch(e => {
        console.log(e);
        return res.status(500).json({"message": e.message});
    });
});


router.delete("/:id", (req, res)=> {
    let id = req.params.id;

    let userModel = new Users();

    // action true means Delete
    userModel.deleteOrRestoreUser(id, true)
        .then(result => {
            if (result) {
                return res.json({"message": "User record was deleted!"});
            } else {
                return res.status(500).json({"message": "User record was not deleted!"});
            }
        }).catch(e => {
        console.log(e);
        return res.status(500).json({"message": e.message});
    })
});


router.put("/restore/:id", (req, res)=> {
    let id = req.params.id;

    let userModel = new Users();

    // action false means restore
    userModel.deleteOrRestoreUser(id, false)
        .then(result => {
            if (result) {
                return res.json({"message": "User record was restored!"});
            } else {
                return res.status(500).json({"message": "User record was not restored!"});
            }
        }).catch(e => {
        console.log(e);
        return res.status(500).json({"message": e.message});
    })
});

module.exports = router;
