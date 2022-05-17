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
    it('200: responds with a categories object containing an array of category objects with slug and description properties', () => {
        return request(app).get('/api/categories').expect(200)
        .then( ({body}) => {
            const {categories} = body;
            expect(categories.length).toBe(4);
            expect(Array.isArray(categories)).toBe(true);

            categories.forEach(category => {
                expect.objectContaining({
                    slug: expect.any(String),
                    descrpition: expect.any(String)
                })
            })
        })
        
    });

    it('404: "Route not found" message when given incorrect url', () => {
        return request(app).get('/api/nocategorieshereboss').expect(404)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'Route not found'})
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
    it('404: "ID Not Found" when given unusede number for :review_id', () => {
        return request(app).get('/api/reviews/12345').expect(404)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'ID Not Found'});
        })
    });
    it('400: "Invalid Input" when given any non-number character for :review_id', () => {
        return request(app).get('/api/reviews/notanumber').expect(400)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'Invalid Input'});
        })
    });
});
describe('PATCH/api/reviews/:review_id', () => {
    it('200: updates and responds with updated +reviewed object', () => {
        const sentObj = {inc_votes: 7};
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
            votes: 8
        }};

        return request(app)
        .patch('/api/reviews/1')
        .send(sentObj)
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(expectedObj);
        })
    });
    it('200: updates and responds with updated -reviewed object', () => {
        const sentObj = {inc_votes: -7};
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
            votes: -6
        }};

        return request(app).patch('/api/reviews/1').send(sentObj).expect(200)
        .then(response => {
            expect(response.body).toEqual(expectedObj);
        })
    });
    it('200: updates and responds with updated 0reviewed object', () => {
        const sentObj = {inc_votes: 0};
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

        return request(app).patch('/api/reviews/1').send(sentObj).expect(200)
        .then(response => {
            expect(response.body).toEqual(expectedObj);
        })
    });
    it('404: "ID Not Found" when given unused number for :review_id', () => {
        const sentObj = {inc_votes: 1};
        return request(app).patch('/api/reviews/12345').send(sentObj).expect(404)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'ID Not Found'});
        })
    });
    it('400: "Invalid Input" when given any non-number character for :review_id', () => {
        const sentObj = {inc_votes: -7};
        return request(app).patch('/api/reviews/notanumber').send(sentObj).expect(400)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'Invalid Input'})
        })
    });
    it('400: "Invalid Input" when given any non-integer in request object ', () => {
        const sentObj = {inc_votes: 'like a string'};
        return request(app).patch('/api/reviews/1').send(sentObj).expect(400)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'Invalid Input'})
        })
    });
    it('400: "Invalid Input" when given an empty object ', () => {
        const sentObj = {};
        return request(app).patch('/api/reviews/1').send(sentObj).expect(400)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'Invalid Input'})
        })
    });

});
describe('GET /api/users', () => {
    it('200: responds with a users object containing an array of user objects', () => {
        return request(app).get('/api/users').expect(200)
        .then(({body}) => {
            const {users} = body;
            expect(users.length).toBe(4);
            expect(Array.isArray(users)).toBe(true);

            users.forEach(category => {
                expect.objectContaining({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String)
                })
            })
        })
        
    });
    it('404: "Route not found" message when given incorrect url', () => {
        return request(app).get('/api/thisisnotauserssection').expect(404)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'Route not found'})
        })
    });
});