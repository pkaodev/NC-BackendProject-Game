process.env.NODE_ENV = "test";

const request = require('supertest')


const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const app = require('../app-controllers-models/app')
const testData = require('../db/data/test-data')

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return db.end();
});

describe('GET/api/categories', () => {
    it('200: responds with array of category objects with slug and description properties', () => {
        return request(app).get('/api/categories').expect(200)
        .then(response => {
            expect(response.body.length).toBe(4);
            expect(Array.isArray(response.body)).toBe(true);

            response.body.forEach(category => {
                expect.objectContaining({
                    slug: expect.any(String),
                    descrpition: expect.any(String)
                })
            })
        })
        
    });

    it('404: with "404: Route not found" message', () => {
        return request(app).get('/api/nocategorieshereboss').expect(404)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: '404: Route not found'})
        })
    });
});