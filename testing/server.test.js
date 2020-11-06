/**
 * @jest-environment node
 */

const route = require('../app');
const request = require('supertest');

describe("Test get all menu", () => {
    test("It should response with statusCode 200", done => {
     return request(route)
        .get("/menu")
        .then(response => {
        expect(response.statusCode).toBe(200);
          done()
        });
    });

    test("It should respond with 'success:true'", done => {
      return  request(route)
          .get("/menu")
          .then(response => {
           expect(response.body.success).toBeTruthy();
            done()
          });
      });
  });


 

