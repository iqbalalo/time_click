const db = require("../db/db");

class Users {

    id;
    firstName;
    lastName;
    dob;
    gender;
    phone;
    email;
    post;
    address;
    country;
    tag;
    acc_active;

    constructor(data) {
        if (data) {
            Object.assign(this, data);
        }
        this.table = "users";
    }

    toJson = () => {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            dob: this.dob,
            gender: this.gender,
            phone: this.phone,
            email: this.email,
            post: this.post,
            address: this.address,
            country: this.country,
            tag: this.tag,
            acc_active: this.active
        }
    };

    toDbFormat = () => {
        return {
            id: this.id,
            first_name: this.firstName,
            last_name: this.lastName,
            dob: this.dob,
            gender: this.gender,
            phone: this.phone,
            email: this.email,
            post: this.post,
            address: this.address,
            country: this.country,
            tag: this.tag,
            acc_active: this.active
        }
    };

    findAll = async () => {

        let sql = "SELECT id, first_name, last_name, dob, gender, phone, email, post, address, country, tag, acc_active, \n" +
            "to_jsonb(ui) as images, \n" +
            "to_jsonb(ud) as devices\n" +
            "FROM users\n" +
            "LEFT JOIN user_images ui on users.id = ui.user_id \n" +
            "LEFT JOIN user_devices ud on users.id = ud.user_id";

        try {

            await db.connect();

            let result = await db.query(sql);

            return result.rows;

        } catch (e) {
            return e.message;
        }

    };

    findById = async (id) => {
        let keys = "";
        Object.keys(this.toDbFormat()).forEach(function (key) {
            keys += key + ",";
        });
        keys = keys.slice(0, keys.length - 1);


        let sql = `SELECT ${keys}, \n` +
            "to_jsonb(ui) as images, \n" +
            "to_jsonb(ud) as devices\n" +
            `FROM ${this.table}\n` +
            "LEFT JOIN user_images ui on users.id = ui.user_id \n" +
            "LEFT JOIN user_devices ud on users.id = ud.user_id\n" +
            `WHERE id = '${id}'`;

        try {

            await db.connect();

            let result = await db.query(sql);

            return result.rows;

        } catch (e) {
            return e.message;
        }

    };

    findByAny = async (condition) => {

        let keys = "";
        Object.keys(this.toDbFormat()).forEach(function (key) {
            keys += key + ",";
        });
        keys = keys.slice(0, keys.length - 1);


        let cons = "";
        Object.keys(condition).forEach(function (key) {
            cons += key + (typeof (condition[key]) === "string" ? " ILIKE '" : "ILIKE") + condition[key] + (typeof (condition[key]) === "string" ? "'" : "") + " AND "
        });
        cons = cons.slice(0, cons.length - 4);

        let sql = `SELECT ${keys} FROM ${this.table} `;

        sql += "LEFT JOIN user_images ui on users.id = ui.user_id " +
            "LEFT JOIN user_devices ud on users.id = ud.user_id\n";

        sql += `WHERE ${cons}`;

        console.log(sql);

        try {

            await db.connect();

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
            values += (typeof (data[key]) === "string" ? `'${data[key]}',` : `${data[key]},`)
        });

        keys = keys.slice(0, keys.length - 1);
        values = values.slice(0, values.length - 1);

        let sql = `INSERT INTO ${this.table} (${keys}) VALUES (${values})`;

        try {

            await db.connect();

            let result = await db.query(sql);

            return result.rowCount > 0;

        } catch (e) {
            return e.message;
        }

    };

    updateUser = async (data) => {

        let conditions = "";

        Object.keys(data).forEach(function (key) {
            if (key !== "id") {
                conditions += key + (typeof (data[key]) === "string" ? `='${data[key]}' AND ` : `=${data[key]} AND `);
            }
        });

        conditions = conditions.slice(0, conditions.length - 4);

        let sql = `UPDATE ${this.table} SET ${conditions} WHERE id='${data.id}'`;

        try {

            await db.connect();

            let result = await db.query(sql);

            return result.rowCount > 0;

        } catch (e) {
            return e.message;
        }

    }
}

module.exports = Users;
