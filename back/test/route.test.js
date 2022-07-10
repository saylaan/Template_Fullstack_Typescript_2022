const request = require('supertest');
const app = require('../src/app-test');

describe('Post /objects', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .get('/objects')
            // .send({
            //     name: 'new object'
            // })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        // expect(res.statusCode).toEqual(200);
        // expect(res.body).toHaveProperty('get');
    });
});
