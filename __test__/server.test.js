'use strict';

const {server} = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);

describe('middleware server', () => {
    it('should check 404 not found error', async () => {
        //arrange
        let param = '/notfound'
        let status = 404
        // act
        const response = await request.get(param)
        // assert
        expect(response.status).toBe(status);
    });
    it('should check 500 internal server error', async () => {
        //arrange
        let param = '/bad'
        let status = 500
        // act
        const response = await request.get(param)
        // assert
        expect(response.status).toBe(status);
        // expect(response.body.route).toEqual(param);
    });
    it('should check hello url', async () => {
        //arrange
        let param = '/hello'
        let status = 200
        let text = `Hi`
        //act
        const response = await request.get(param)
        // console.log(response)
        //assert
        expect(response.status).toBe(status);
        expect(response.req.path).toBe(param);
        expect(response.text).toBe(text);
    });
});