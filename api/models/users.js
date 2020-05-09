const db = require("../db/db");

class Users {

    constructor(data) {
        if (data) {
            Object.assign(this, data);
        } else {
            this.id = null;
            this.first_name = null;
            this.last_name = null;
            this.dob = null;
            this.gender = null;
            this.phone = null;
            this.email = null;
            this.post_code = null;
            this.address1 = null;
            this.address2 = null;
            this.country = null;
            this.images = null;
            this.devices = null;
            this.password = null;
            this.tag = null;
            this.account_delete = false;
            this.activation_code = null;
        }

        this.table = "users";
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
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name ? this.last_name : null,
            dob: this.dob,
            gender: this.gender,
            phone: this.phone ? this.phone : null,
            email: this.email ? this.email : null,
            post_code: this.post_code ? this.post_code : null ,
            address1: this.address1 ? this.address1 : null,
            address2: this.address2 ? this.address2 : null,
            country: this.country ? this.country : null,
            images: this.images ? this.images : null,
            devices: this.devices ? this.devices : null,
            password: this.password,
            tag: this.tag ? this.tag : null,
            account_delete: false,
            activation_code: this.activation_code
        }
    };


    dbSelect = () => {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            dob: this.dob,
            gender: this.gender,
            phone: this.phone,
            email: this.email,
            post_code: this.pos_code,
            address1: this.address1,
            address2: this.address2,
            country: this.country,
            images: this.images,
            devices: this.devices,
            tag: this.tag,
            account_delete: this.account_delete,
        }
    };

    findAll = async () => {
        let keys = this.generateSqlFieldText();
        let sql = `SELECT ${keys} FROM ${this.table}`;

        try {

            let result = await db.query(sql);

            return result.rows;

        } catch (e) {
            return e.message;
        }

    };

    findById = async (id) => {
        let keys = this.generateSqlFieldText();

        let sql = `SELECT ${keys} FROM ${this.table}\n` +
            `WHERE id = '${id}'`;

        try {

            let result = await db.query(sql);

            return result.rows;

        } catch (e) {
            return e.message;
        }

    };

    getUserPasswordHashById = async (id) => {

        let sql = `SELECT id, password FROM ${this.table}\n` +
            `WHERE id = '${id}'`;

        try {

            let result = await db.query(sql);

            return result.rows[0];

        } catch (e) {
            return e.message;
        }

    };

    getUserPasswordHashByEmail = async (email) => {

        let sql = `SELECT id, password FROM ${this.table}\n` +
            `WHERE email = '${email}'`;

        try {

            let result = await db.query(sql);

            return result.rows[0];

        } catch (e) {
            return e.message;
        }

    };

    findByDevices = async (val) => {
        let keys = this.generateSqlFieldText();

        let sql = `SELECT ${keys} FROM ${this.table}\n` +
            `WHERE devices::text ILIKE '%${val}%'`;

        console.log(sql);
        try {

            let result = await db.query(sql);

            return result.rows;

        } catch (e) {
            return e.message;
        }

    };

    findByAny = async (condition) => {

        let keys = this.generateSqlFieldText();
        let cons = "";

        Object.keys(condition).forEach(function (key) {
            cons += key + (typeof (condition[key]) === "string" ? " ILIKE '" : "ILIKE") + "%" + condition[key] + "%" + (typeof (condition[key]) === "string" ? "'" : "") + " AND "
        });
        cons = cons.slice(0, cons.length - 4);

        let sql = `SELECT ${keys} FROM ${this.table} \n`;

        sql += `WHERE ${cons}`;

        console.log(sql);

        try {

            let result = await db.query(sql);

            return result.rows;

        } catch (e) {
            return e.message;
        }

    };

    insertUser = async (data) => {

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

        try {

            let result = await db.query(sql);

            return result.rowCount > 0;

        } catch (e) {
            return e.message;
        }

    };

    updateUser = async (data) => {

        let updateValues = "";

        Object.keys(data).forEach(function (key) {
            if (key !== "id") {
                updateValues += key + ((typeof (data[key]) === "string" || typeof (data[key]) === "object") && data[key] !== null && data[key] !== 'boolean' ? `='${data[key]}' AND ` : `=${data[key]} AND `);
            }
        });

        updateValues = updateValues.slice(0, updateValues.length - 4);

        let sql = `UPDATE ${this.table} SET ${updateValues} WHERE id='${data.id}'`;

        console.log(sql);

        try {

            let result = await db.query(sql);

            return result.rowCount > 0;

        } catch (e) {
            return e.message;
        }
    };

    deleteOrRestoreUser = async (id, action) => {

        let sql = `UPDATE ${this.table} SET account_delete=${action} WHERE id='${id}'`;

        console.log(sql);

        try {

            let result = await db.query(sql);

            return result.rowCount > 0;

        } catch (e) {
            return e.message;
        }
    };
}

module.exports = Users;
