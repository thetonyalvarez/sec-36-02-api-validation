/** Integration tests for books route */

process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

// isbn of sample book
let book_isbn;

beforeEach(async () => {
	let result = await db.query(`
    INSERT INTO
      books (isbn, amazon_url,author,language,pages,publisher,title,year)
      VALUES(
        '123432122',
        'https://amazon.com/taco',
        'Elie',
        'English',
        100,
        'Nothing publishers',
        'my first book', 2008)
      RETURNING isbn`);

	book_isbn = result.rows[0].isbn;
});

describe("GET /books", () => {
    test("Get all books", async () => {
        const response = await request(app)
            .get(`/books`)

        expect(response.body.books[0].isbn).toEqual('123432122')
        expect(response.body.books.length).toBeGreaterThan(0)
    })
    test("Cannot get books from empty database", async () => {
        await db.query("DELETE FROM books;")
        try {
            await request(app)
                .get(`/books`)
        } catch (err) {
            expect(err).toEqual(err)
        }
    })
});

describe("GET /books/id", () => {
    test("Get a single book", async () => {
        const response = await request(app)
            .get(`/books/123432122`)

        expect(response.body.book.isbn).toEqual('123432122')
    })
    test("Cannot get book with invalid isbn", async () => {
        try {
            await request(app)
                .get(`/books/99999`)
        } catch (err) {
            expect(err).toEqual(err)
        }
    })
});

describe("POST /books", () => {
    test("Create a new book", async () => {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '32794782',
                amazon_url: "https://taco.com",
                author: "mctest",
                language: "english",
                pages: 1000,
                publisher: "yeah right",
                title: "amazing times",
                year: 2000
            })
        
        expect(response.statusCode).toEqual(201)
        expect(response.body.book.isbn).toEqual('32794782')
    })
    test("Cannot create a new book with missing schema info", async () => {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '32794782',
                amazon_url: "https://taco.com",
                author: "mctest",
                language: "english",
                pages: 1000,
                publisher: "yeah right",
                title: "amazing times",
            })
        
        expect(response.statusCode).toEqual(400)
    })
});

describe("PUT /books", () => {
    test("Update a book", async () => {
        const response = await request(app)
            .put(`/books/123432122`)
            .send({
                author: "mctest",
                language: "english",
                pages: 1000,
                title: "amazing times",
                year: 2000
            })
        
        expect(response.body.book.isbn).toEqual('123432122')
        expect(response.body.book.author).toEqual('mctest')
    })
    test("Cannot update a book with missing schema info", async () => {
        const response = await request(app)
            .put(`/books/123432122`)
            .send({
                author: "mctest",
                language: "english",
                pages: 1000,
                title: "amazing times"
            })
        
        expect(response.statusCode).toEqual(400)
    })
});

describe("DELETE /books/id", () => {
    test("Delete a book", async () => {
        const response = await request(app)
            .delete(`/books/123432122`)
        
        expect(response.body.message).toEqual('Book deleted')
    })
    test("Cannot delete a book that does not exist", async () => {
        try {
            const response = await request(app)
                .delete(`/books/9999`)
        } catch (err) {
            expect(err).toEqual(err)
        }
        
    })
});

afterEach(async function () {
	await db.query("DELETE FROM BOOKS");
});

afterAll(async function () {
	await db.end();
});
