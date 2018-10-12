# Designing the API

Modern web services follow [RESTFul Design](https://en.wikipedia.org/wiki/Representational_state_transfer) in which communications between the frontend and the backend is done through HTTP verbs that has matching action on data. It is often coined as **CRUD (Create, Read, Update, and Delete).**:

* **POST** - for adding data (CREATE)
* **GET** - for querying data (READ)
* **PUT** - for updating data (UPDATE)
* **DELETE** - for deleting data (DELETE)

In RESTFul design data that gets passed around are formatted in **JavaScript Object Notation Format (JSON)** which can be easily parsed and read in javascript itself.

There's a lot of online docs about RESTFul and we won't be tackling it in detail in this tutorial.

For our project, we will be implementing **three (3)** endpoints for Books, Authors, and Publishers. For example, we will follow this API design for Book

* **GET** /api/v1/books - returns array of books
* **GET** /api/v1/books/:id - return the book object :id
* **PUT** /api/v1/books/:id - updates the book object :id and returns updated object
* **POST** /api/v1/books - creates a new book object and returns the create object
* **DELETE** /api/v1/books/ - return 200 ok if successful



