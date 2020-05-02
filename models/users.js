const db = require("../db/db");

class Users {

    id;
    first_name;
    last_name;
    dob;
    gender;
    phone;
    email;
    post;
    address1;
    address2;
    country;
    tag;
    acc_active = false;
    acc_delete = false;
    images;
    devices;

    constructor(data) {
        if (data) {
            Object.assign(this, data);
        }
        this.table = "users";
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
            id: this.id,
            first_name: this.first_name,
            last_name: this.first_name,
            dob: this.dob,
            gender: this.gender,
            phone: this.phone,
            email: this.email,
            post: this.post,
            address1: this.address1,
            address2: this.address2,
            country: this.country,
            tag: this.tag,
            acc_active: this.acc_active,
            acc_delete: this.acc_delete,
            images: this.images,
            devices: this.devices
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

    insertUser = async () => {

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

    updateUser = async (data) => {

        let updateValues = "";

        Object.keys(data).forEach(function (key) {
            if (key !== "id") {
                updateValues += key + ((typeof (data[key]) === "string" || typeof (data[key]) === "object") ? `='${data[key]}' AND ` : `=${data[key]} AND `);
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

        let sql = `UPDATE ${this.table} SET acc_delete=${action} WHERE id='${id}'`;

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
