const dateFormat = require('dateformat');
const Presence = require("../models/presence");
const express = require("express");

const router = express.Router();


router.get("/user/:user_id/year/:year", (req, res)=> {
    let user_id = req.params.user_id;
    let year = req.params.year;

    let presenceModel = new Presence();

    presenceModel.findByUserIdAndYear(user_id, year)
        .then(result => {

            return res.json({"message": result});

        }).catch(e => {
        console.log(e);
        return res.status(500).json({"message": []});
    })

});

router.get("/user/:user_id/year/:year/month/:month", (req, res)=> {
    let user_id = req.params.user_id;
    let year = req.params.year;
    let month = req.params.month;

    let presenceModel = new Presence();

    presenceModel.findByUserIdAndYearAndMonth(user_id, year, month)
        .then(result => {

            return res.json({"message": result});

        }).catch(e => {
        console.log(e);
        return res.status(500).json({"message": []});
    })

});

router.post("/", (req, res)=> {
    let params = req.body;

    Object.keys(params).forEach(key => {
        if (params[key] === "" && key !== "user_time"){
            return res.status(401).json({"message": `${key} is required!`});
        }
    });

    if (!params.user_time) {
        params["action_time"] = dateFormat(new Date(), "isoDateTime");
    }

    let presenceModel = new Presence(params);

    presenceModel.insertPresence()
        .then(result => {

            return res.json({"message": (result ? "Presence record was inserted!": Error("Presence record was not inserted!"))});

        }).catch(e => {
        console.log(e);
        return res.status(500).json({"message": e.message});
    })
});


router.put("/", (req, res)=> {
    let params = req.body;

    if (!params.user_id && !params.action_time && !params.action) {
        return res.status(401).json({"message": "user_id, action_time and action information are required!"});
    }

    let presenceModel = new Presence();

    presenceModel.updatePresence(params)
        .then(result => {

            return res.json({"message": (result ? "Presence record was updated!": Error("Presence record was not updated!"))});

        }).catch(e => {
        console.log(e);
        return res.status(500).json({"message": e.message});
    });
});


router.delete("/user/:user_id/time/:action_time", (req, res)=> {
    let userId = req.params.user_id;
    let actionTime = req.params.action_time;

    data = {
        "user_id": userId,
        "action_time": actionTime,
        "action": "del"
    };

    let presenceModel = new Presence();

    presenceModel.updatePresence(data)
        .then(result => {

            return res.json({"message": (result ? "Presence record was deleted!": Error("Presence record was not deleted!"))});

        }).catch(e => {
        console.log(e);
        return res.status(500).json({"message": e.message});
    });
});

module.exports = router;
