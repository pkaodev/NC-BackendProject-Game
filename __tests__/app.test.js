process.env.NODE_ENV = "test";

const request = require('supertest')
require('jest-sorted')


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

//#3
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
//#4
describe('GET/api/reviews/:review_id', () => {
    it('200: responds with review object from given :review_id', () => {
        return request(app).get('/api/reviews/1').expect(200)
        .then( ({body}) => {
            const {review} = body;

            expect(review).toEqual(expect.objectContaining({
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
            }));
        })
    });
    it('404: "ID Not Found" when given unused number for :review_id', () => {
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
//#5
describe('PATCH/api/reviews/:review_id', () => {
    it('200: updates and responds with updated +reviewed object', () => {
        const sentObj = {inc_votes: 7};

        return request(app)
        .patch('/api/reviews/1')
        .send(sentObj)
        .expect(200)
        .then( ({body}) => {
            expect(body.review).toEqual(expect.objectContaining({
                votes: 8
            }));
        })
    });
    it('200: updates and responds with updated -reviewed object', () => {
        const sentObj = {inc_votes: -7};

        return request(app).patch('/api/reviews/1').send(sentObj).expect(200)
        .then( ({body}) => {
            expect(body.review).toEqual(expect.objectContaining({
                votes: -6
            }));
        })
    });
    it('200: updates and responds with updated 0reviewed object', () => {
        const sentObj = {inc_votes: 0};

        return request(app).patch('/api/reviews/1').send(sentObj).expect(200)
        .then( ({body}) => {
            expect(body.review).toEqual(expect.objectContaining({
                votes: 1
            }));
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
//#6
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
//#7
describe('Refactor: GET/api/reviews/:review_id to include comment count', () => {
    it('200: responds with review object from given :review_id including a comment_count', () => {
        return request(app).get('/api/reviews/2').expect(200)
        .then(( {body} )=> {
            expect(body.review.comment_count).toBe(3);
        })
    })
});
//#8
describe('GET/api/reviews', () => {
    it('200: responds with a reviews object containing an array of review objects sorted in descending order by date', () => {
        return request(app).get('/api/reviews').expect(200)
        .then( ({body}) => {
            const {reviews} = body;
            expect(reviews.length).toBe(13);
            expect(Array.isArray(reviews)).toBe(true);

            reviews.forEach( (review) => {
                expect(review).toEqual(expect.objectContaining({
                    owner: expect.any(String), //username from users table, same as author from comments table
                    title: expect.any(String),
                    review_id: expect.any(Number),
                    category: expect.any(String),
                    review_img_url:expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(Number)
                }))

            })
            expect(reviews).toBeSortedBy('created_at', {descending: true})
        })
    });
    it('404: "Route not found" message when given incorrect url', () => {
        return request(app).get('/api/noreviewshereboss').expect(404)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'Route not found'})
        })
    });
});
//#9
describe('GET/api/reviews/:review_id/comments', () => {
    it('200: responds with a comments object containing an array of comment objects', () => {
        return request(app).get('/api/reviews/2/comments').expect(200)
        .then( ({body}) => {
            const {comments} = body;
            expect(comments.length).toBe(3);
            expect(Array.isArray(comments)).toBe(true);

            comments.forEach( (comment) => {
                expect(comment).toEqual(expect.objectContaining({
                    comment_id: expect.any(Number),
                    review_id: expect.any(Number),
                    votes: expect.any(Number),
                    author: expect.any(String),
                    body:expect.any(String),
                    created_at: expect.any(String),
                }))
            })
        })
    });
    it.only('404: "Review Not Found" when given number that does not match a :review_id', () => {
        return request(app).get('/api/reviews/99999999/comments').expect(404)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'Review Not Found'})
        })
    });
    it('400: "Invalid Input" when given a non-number as :review_id ', () => {
        return request(app).get('/api/reviews/notanumber/comments').expect(404)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'Invalid Input'})
        })
    });
    it('200: "No Comments Found" when no comments exist for given :review_id', () => {
        return request(app).get('/api/reviews/1/comments').expect(200)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual({msg: 'No Comments Found'})
        })
    });
});
