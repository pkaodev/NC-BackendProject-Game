process.env.NODE_ENV = "test";

const request = require('supertest')

const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const app = require('../app-controllers-models/app')
const testData = require('../db/data/test-data')

beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    return db.end()
});

describe('Name of the group', () => {
    it('should ', () => {
        
    });
});