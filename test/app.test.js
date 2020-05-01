const request = require("supertest");
const app = require("../app");

describe("Test route /", () => {
    test("It should response the GET method", () => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    test("Test route /users", async done => {
        await request(app)
            .get("/users")
            .then(res => {
                expect(res.statusCode).toBe(200);
            });
        done()

    });

    afterAll(() => {

    });


});
