# Books JSON API Validation

This project is an Express JSON API application that allows you to create and update book records to a SQL database.

## Table of Contents
- [Installation and Setup](#installation-and-setup)
    - [Install packages](#install-packages)
    - [Start your local database server](#start-your-local-database-server)
    - [Create databases](#create-databases)
- [Schema Structure](#schema-structure)
    - [New book schema](#new-book-schema)
    - [Update book schema](#update-book-schema)
- [Using The App](#using-the-app)
    - [Start local app server](#start-local-app-server)
    - [Books](#books)
        - [Get all books](#get-all-books)
        - [Get a single book](#get-a-single-book)
        - [Create a new book](#create-a-new-book)
        - [Update an existing book](#update-an-existing-book)
        - [Delete an existing book](#delete-an-existing-book)

## Installation and Setup

### Install packages

Run `npm install` to install all packages.

### Start your local database server

Start your local database server.

### Create databases

You'll create two databases – one for production, and one for testing.

_For production:_
In CLI, run the following command:
```console
$ createdb books
$ psql -d books -f data.sql
```

_For testing:_
In CLI, run the following command:
```console
$ createdb books-test
$ psql -d books-test -f data.sql
```

## Schema Structure
This application uses JSON schema validation to save records to the database.

### New book schema
When creating a new book, your JSON data should contain the following fields:
```json
{
    "isbn": "0691161518",
    "amazon_url": "http://a.co/eobPtX2",
    "author": "Matthew Lane",
    "language": "english",
    "pages": 264,
    "publisher": "Princeton University Press",
    "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    "year": 2017
}
```

Any missing fields will throw an error.

### Update book schema
When updating an existing book, your JSON data should contain the following fields:
```json
{
    "author": "Matthew Lane",
    "language": "english",
    "pages": 264,
    "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    "year": 2017
}
```

Any missing fields will throw an error.

## Using The App

## Start local app server

To start the app server, run the following command:

```console
$ nodemon server
```

This will run the app on your localhost:
```
http://127.0.0.1:3000/
```


## Books

### Get all books
To get all books, send a `GET` request to:
```console
$ curl http://localhost:3000/books
```

### Get a single book
To get a specific book, send a `GET` request with the book's `isbn` in the URL to the following endpoint:
```console
$ curl http://localhost:3000/books/[isbn]
```

### Create a new book
To create a new book, send a `POST` request to the following endpoint:
```console
$ curl http://localhost:3000/books -X POST
```

with the following body:
```json
{
    "isbn": "0691161518",
    "amazon_url": "http://a.co/eobPtX2",
    "author": "Matthew Lane",
    "language": "english",
    "pages": 264,
    "publisher": "Princeton University Press",
    "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    "year": 2017
}
```

### Update an existing book

To update an existing book, send a `PUT` request with the book's `isbn` to the following endpoint:
```console
$ curl http://localhost:3000/books/[isbn] -X PUT
```

with the following body:
```json
{
    "author": "Matthew Lane",
    "language": "english",
    "pages": 264,
    "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    "year": 2017
}
```

### Delete an existing book

To delete an existing book, send a `DELETE` request with the book's `isbn` to the following endpoint:
```console
$ curl http://localhost:3000/books/[isbn] -X DELETE
```
