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

    if (field === "image_id" || field === "device_id") {
        res.status(401).json({"message": "Invalid filter option '" + field + "'"})
    }

    let userModel = new Users();

    userModel.findByAny({[field]: val})
        .then(result => {

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

    let firstName = params.first_name ? params.first_name : res.status(401).json({"message": "First Name is required!"});
    let lastName = params.last_name ? params.last_name : "";
    let id = firstName.substr(0,1) + (lastName ? lastName.substr(0,1) : firstName.slice(1,2)) + now.split("-").join("").split(":").join("").split("T").join("").substr(0, 14);
    let dob = params.dob ? params.dob : res.status(401).json({"message": "Date of birth is required!"});
    let gender = params.gender ? params.gender : res.status(401).json({"message": "Gender is required!"});
    let phone = params.phone ? params.phone : "";
    let email = params.email ? params.email : "";
    let post = params.post ? params.post : "";
    let address = params.address ? params.address : "";
    let country = params.country ? params.country : "";
    let tag = params.tag ? params.tag : "";

    let userModel = new Users({
        "id": id, "firstName": firstName, "lastName": lastName, "dob": dob, "gender": gender,
        "phone": phone, "email": email, "post": post, "address": address, "country": country,
        "tag": tag
    });

    userModel.insertUser()
        .then(result => {

            res.json({"message": (result ? "Data inserted!": Error("Data could not inserted!"))});

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
    });


    let userModel = new Users();

    userModel.updateUser(params)
        .then(result => {
            res.status(200).json({"message": (result ? "Data updated!": Error("Data could not updated!"))});
        }).catch(e => {
        console.log(e);
        res.status(500).json({"message": e.message});
    })
});


module.exports = router;
