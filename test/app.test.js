const request = require("supertest");
const app = require("../app");
const Users = require("../models/users");


jest.mock('../models/users', () => {
    const mUsers = { findAll: jest.fn() };
    return jest.fn(() => mUsers);
});

describe("Test route /", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("It should response the GET method", () => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    it('It should response the GET method', () => {
        const mUsers = new Users();
        mUsers.findAll.mockResolvedValueOnce([{id: 1}]);

        return request(app)
            .get('/users')
            .then((res) => {
                expect(JSON.stringify(res.body.message)).toBe(JSON.stringify([{id: 1}]));
                expect(res.statusCode).toBe(200);
            });
    });


    afterAll(() => {

    });


});
