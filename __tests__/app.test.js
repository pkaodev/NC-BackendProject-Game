process.env.NODE_ENV = "test";

const request = require('supertest')


const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const app = require('../app')
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

    it('404: "404: Route not found" message when given incorrect url', () => {
        return request(app).get('/api/nocategorieshereboss').expect(404)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: '404: Route not found'})
        })
    });
});
describe('GET/api/reviews/:review_id', () => {
    it('200: responds with review object from given :review_id', () => {
        return request(app).get('/api/reviews/1').expect(200)
        .then(response => {
            const expectedObj = {review: {
                review_id: 1,
                title: 'Agricola',
                designer: 'Uwe Rosenberg',
                owner: 'mallionaire',
                review_img_url:
                  'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                review_body: 'Farmyard fun!',
                category: 'euro game',
                created_at: "2021-01-18T10:00:20.514Z",
                votes: 1
            }};
            expect(response.body).toEqual(expectedObj);
        })
    });
    it('404: "404: ID Out Of Range" when given out of range number for :review_id', () => {
        return request(app).get('/api/reviews/12345').expect(404)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: '404: ID Out Of Range'})
        })
    });
    it('400: "400: Invalid ID Format" when given any non-number character for :review_id', () => {
        return request(app).get('/api/reviews/notanumber').expect(400)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: '400: Invalid ID Format'})
        })
    });
});