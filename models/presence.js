const db = require("../db/db");

class Presence {

    action_time;
    user_id;
    action;

    constructor(data) {
        if (data) {
            Object.assign(this, data);
        }
        this.table = "presence";
    }

    generateSqlFieldText = () => {
        let keys = "";
        Object.keys(this.toDbFormat()).forEach(function (key) {
            keys += key + ",";
        });
        keys = keys.slice(0, keys.length - 1);
        return keys;
    };


    toDbFormat = () => {
        return {
            action_time: this.action_time,
            user_id: this.user_id,
            action: this.action
        }
    };


    findByUserIdAndYear = async (userId, year) => {
        let keys = this.generateSqlFieldText();

        let sql = `SELECT ${keys} FROM ${this.table}\n` +
            `WHERE user_id = '${userId}' AND extract(year FROM CAST(action_time AS DATE)) = ${year}`;

        console.log(sql);
        try {

            let result = await db.query(sql);

            return result.rows;

        } catch (e) {
            return e.message;
        }

    };

    findByUserIdAndYearAndMonth = async (userId, year, month) => {
        let keys = this.generateSqlFieldText();

        let sql = `SELECT ${keys} FROM ${this.table}\n` +
            `WHERE user_id = '${userId}' AND extract(year FROM CAST(action_time AS DATE)) = ${year} AND extract(month FROM CAST(action_time AS DATE)) = ${month}`;

        try {

            let result = await db.query(sql);

            return result.rows;

        } catch (e) {
            return e.message;
        }

    };

    insertPresence = async () => {

        let keys = "";
        let values = "";
        let data = this.toDbFormat();

        Object.keys(this.toDbFormat()).forEach(function (key) {
            keys += key + ",";
            values += ((typeof (data[key]) === "string" || typeof (data[key]) === "object") ? `'${data[key]}',` : `${data[key]},`)
        });

        keys = keys.slice(0, keys.length - 1);
        values = values.slice(0, values.length - 1);

        let sql = `INSERT INTO ${this.table} (${keys}) VALUES (${values})`;

        console.log(sql);

        try {

            let result = await db.query(sql);

            return result.rowCount > 0;

        } catch (e) {
            return e.message;
        }

    };

    updatePresence = async (data) => {

        let updateValues = "";

        Object.keys(data).forEach(function (key) {
            if (key !== "user_id" && key !== "action_time") {
                updateValues += key + ((typeof (data[key]) === "string" || typeof (data[key]) === "object") ? `='${data[key]}' AND ` : `=${data[key]} AND `);
            }
        });

        updateValues = updateValues.slice(0, updateValues.length - 4);

        let sql = `UPDATE ${this.table} SET ${updateValues} WHERE user_id='${data.user_id}' AND action_time='${data.action_time}'`;

        console.log(sql);

        try {

            let result = await db.query(sql);

            return result.rowCount > 0;

        } catch (e) {
            return e.message;
        }
    };
}

module.exports = Presence;
