const db = require("../db/db");

class UsersPolicy {

    constructor(data) {
        if (data) {
            Object.assign(this, data);
        } else {
            this.user_id = null;
            this.token = null;
            this.privilege = null;
        }
        this.table = "users_policy";
    }

    generateSqlFieldText = () => {
        let keys = "";
        Object.keys(this.dbSelect()).forEach(function (key) {
            keys += key + ",";
        });
        keys = keys.slice(0, keys.length - 1);
        return keys;
    };


    dbModel = () => {
        return {
            user_id: this.user_id,
            token: this.token,
            privilege: this.privilege
        }
    };


    dbSelect = () => {
        return {
            user_id: this.user_id,
            token: this.token,
            privilege: this.privilege
        }
    };

    findByUserPolicyUserId = async (user_id) => {
        let keys = this.generateSqlFieldText();

        let sql = `SELECT ${keys} FROM ${this.table}\n` +
            `WHERE user_id = '${user_id}'`;


        let result = await db.query(sql);

        return result.rows[0] ? result.rows[0] : null;

    };


    insertUserPolicy = async (data) => {

        let keys = "";
        let values = "";

        Object.keys(data).forEach(function (key) {
            keys += key + ",";
            values += ((typeof (data[key]) === "string" || typeof (data[key]) === "object") && data[key] !== null && data[key] !== 'boolean' ? `'${data[key]}',` : `${data[key]},`)
        });

        keys = keys.slice(0, keys.length - 1);
        values = values.slice(0, values.length - 1);

        let sql = `INSERT INTO ${this.table} (${keys}) VALUES (${values})`;

        console.log(sql);

        let result = await db.query(sql);

        return result.rowCount > 0;

    };

    updateUserPolicy = async (data) => {

        let updateValues = "";

        Object.keys(data).forEach(function (key) {
            if (key !== "user_id") {
                updateValues += key + ((typeof (data[key]) === "string" || typeof (data[key]) === "object") && data[key] !== null && data[key] !== 'boolean' ? `='${data[key]}' AND ` : `=${data[key]} AND `);
            }
        });

        updateValues = updateValues.slice(0, updateValues.length - 4);

        let sql = `UPDATE ${this.table} SET ${updateValues} WHERE user_id='${data.user_id}'`;

        console.log(sql);

        try {

            let result = await db.query(sql);

            return result.rowCount > 0;

        } catch (e) {
            return e.message;
        }
    };
}

module.exports = UsersPolicy;
