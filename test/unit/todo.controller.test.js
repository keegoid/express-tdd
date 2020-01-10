const chai = require("chai")
const sinon = require("sinon")
const expect = chai.expect
const assert = chai.assert
const TodoController = require("../../controllers/todo.controller")
const TodoModel = require("../../model/todo.model")
const httpMocks = require("node-mocks-http")
const newTodo = require("../mock-data/new-todo.json")
const allTodos = require("../mock-data/all-todos.json")

// access jest by overloading functions
// optionally mock each function rather than the whole model with Jest
////TodoModel.create = jest.fn();
////TodoModel.find = jest.fn();
////TodoModel.findById = jest.fn();
////TodoModel.findByIdAndUpdate = jest.fn();
////TodoModel.findByIdAndDelete = jest.fn();
//jest.mock("../../model/todo.model")
sinon.stub(TodoModel) // wraps the spy

// define API variables
let dt, req, res, next
const todoId = "5e1552216b99753c74631c67"

// make sure variables are initialized before each test
beforeEach(function() {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = sinon.spy()
})

afterEach(function() {
  sinon.restore() // unwraps the spy
})

// unit tests for HTTP DELETE (delete)
describe("TodoController.deleteTodo", function() {
  // expect delete function to exist
  it("should have deleteTodo function", function() {
    assert.typeOf(TodoController.deleteTodo, "function")
  })
})

//   // expect TodoModel.findByIdAndDelete to have been called with deleteTodo
//   it("should be call findByIdAndDelete with todoId", async () => {
//     req.params.todoId = todoId
//     await TodoController.deleteTodo(req, res, next)
//     expect(TodoModel.findByIdAndDelete).toHaveBeenCalledWith(todoId)
//   })

//   // expect deleteTodo to return status 200 and end function call
//   it("should return status 200 and reach the end of the function", async () => {
//     TodoModel.findByIdAndDelete.mockReturnValue(newTodo)
//     await TodoController.deleteTodo(req, res, next)
//     expect(res.statusCode).toBe(200)
//     expect(res._getJSONData()).toStrictEqual(newTodo)
//     expect(res._isEndCalled()).toBeTruthy()
//   })

//   // handle errors in DELETE for the TodoModel
//   it("should handle errors in findByIdAndDelete", async () => {
//     const errorMessage = { message: "Error deleting todo" }
//     const rejectedPromise = Promise.reject(errorMessage)
//     TodoModel.findByIdAndDelete.mockReturnValue(rejectedPromise)
//     await TodoController.deleteTodo(req, res, next)
//     expect(next).toHaveBeenCalledWith(errorMessage)
//   })

//   // handle error if Id doesn't exist
//   it("should return 404 when item doesn't exist", async () => {
//     TodoModel.findByIdAndDelete.mockReturnValue(null)
//     await TodoController.deleteTodo(req, res, next)
//     expect(res.statusCode).toBe(404)
//     expect(res._isEndCalled()).toBeTruthy()
//   })
// })

// // unit tests for HTTP PUT (update)
// describe("TodoController.updateTodo", () => {
//   // expect updateTodo to be a function
//   it("should have an updateTodo function", () => {
//     expect(typeof TodoController.updateTodo).toBe("function")
//   })

//   // expect findByIdAndUpdate to have been called with the Id
//   it("should update with TodoModel.findByIdAndUpdate", async () => {
//     req.params.todoId = todoId
//     req.body = newTodo
//     await TodoController.updateTodo(req, res, next)
//     expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
//       new: true,
//       useFindAndModify: false
//     })
//   })

//   // expect status code 200, json data, and end is returned
//   it("should return a response with json data and http code 200", async () => {
//     req.params.todoId = todoId
//     req.body = newTodo
//     TodoModel.findByIdAndUpdate.mockReturnValue(newTodo)
//     await TodoController.updateTodo(req, res, next)
//     expect(res.statusCode).toBe(200)
//     expect(res._getJSONData()).toStrictEqual(newTodo)
//     expect(res._isEndCalled()).toBeTruthy()
//   })

//   // handle errors in findByIdAndUpdate
//   it("should handle errors in findByIdAndUpdate", async () => {
//     const errorMessage = { message: "Error finding todo" }
//     const rejectedPromise = Promise.reject(errorMessage)
//     TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise)
//     await TodoController.updateTodo(req, res, next)
//     expect(next).toHaveBeenCalledWith(errorMessage)
//   })

//   // handle error if Id doesn't exist
//   it("should return 404 when item doesn't exist", async () => {
//     TodoModel.findByIdAndUpdate.mockReturnValue(null)
//     await TodoController.updateTodo(req, res, next)
//     expect(res.statusCode).toBe(404)
//     expect(res._isEndCalled()).toBeTruthy()
//   })
// })

// // unit tests for HTTP GET for a particular Id (read)
// describe("TodoController.getTodoById", () => {
//   // expect getTodoById to be a function
//   it("should have a getTodoById function", () => {
//     expect(typeof TodoController.getTodoById).toBe("function")
//   })

//   // expect findById to have been called with the Id
//   it("should call TodoModel.findById with route parameters", async () => {
//     req.params.todoId = todoId
//     await TodoController.getTodoById(req, res, next)
//     expect(TodoModel.findById).toHaveBeenCalledWith(todoId)
//   })

//   // expect return status of 200, json data type, and end of function call reached
//   it("should return json body and response code 200", async () => {
//     TodoModel.findById.mockReturnValue(newTodo)
//     await TodoController.getTodoById(req, res, next)
//     expect(res.statusCode).toBe(200)
//     expect(res._getJSONData()).toStrictEqual(newTodo)
//     expect(res._isEndCalled()).toBeTruthy()
//   })

//   // handle errors in findById
//   it("should handle errors in findById", async () => {
//     const errorMessage = { message: "Error finding todo by Id" }
//     const rejectedPromise = Promise.reject(errorMessage)
//     TodoModel.findById.mockReturnValue(rejectedPromise)
//     await TodoController.getTodoById(req, res, next)
//     expect(next).toHaveBeenCalledWith(errorMessage)
//   })

//   // handle error if Id doesn't exist
//   it("should return 404 when item doesn't exist", async () => {
//     TodoModel.findById.mockReturnValue(null)
//     await TodoController.getTodoById(req, res, next)
//     expect(res.statusCode).toBe(404)
//     expect(res._isEndCalled()).toBeTruthy()
//   })
// })

// // unit tests for HTTP GET for all Ids (read)
// describe("TodoController.getTodos", () => {
//   // expect getTodos to be a function
//   it("should have a getTodos function", () => {
//     expect(typeof TodoController.getTodos).toBe("function")
//   })

//   // expect find function to have been called
//   it("should call TodoModel.find({})", async () => {
//     await TodoController.getTodos(req, res, next)
//     expect(TodoModel.find).toHaveBeenCalledWith({})
//   })

//   // expect todos to return status code 200, json, and end the call
//   it("should return response with status 200 and all todos", async () => {
//     TodoModel.find.mockReturnValue(allTodos)
//     await TodoController.getTodos(req, res, next)
//     expect(res.statusCode).toBe(200)
//     expect(res._getJSONData()).toStrictEqual(allTodos)
//     expect(res._isEndCalled()).toBeTruthy()
//   })

//   // handle errors in find
//   it("should handle errors in find", async () => {
//     const errorMessage = { message: "Error finding todo" }
//     const rejectedPromise = Promise.reject(errorMessage)
//     TodoModel.find.mockReturnValue(rejectedPromise)
//     await TodoController.getTodos(req, res, next)
//     expect(next).toHaveBeenCalledWith(errorMessage)
//   })
// })

// // unit tests for HTTP POST (create)
// describe("TodoController.createTodo", () => {
//   beforeEach(() => {
//     req.body = newTodo
//   })

//   // expect createTodo to be a function
//   it("should have a createTodo function", () => {
//     expect(typeof TodoController.createTodo).toBe("function")
//   })

//   // expect create function to be called with newTodo json object
//   it("should call TodoModel.create", () => {
//     TodoController.createTodo(req, res, next)
//     expect(TodoModel.create).toBeCalledWith(newTodo)
//   })

//   // expect response code of 201 and end of function call reached
//   it("should return 201 response code", async () => {
//     await TodoController.createTodo(req, res, next)
//     expect(res.statusCode).toBe(201)
//     expect(res._isEndCalled()).toBeTruthy()
//   })

//   // expect return body to be json data newTodo
//   it("should return json body in response", async () => {
//     TodoModel.create.mockReturnValue(newTodo)
//     await TodoController.createTodo(req, res, next)
//     expect(res._getJSONData()).toStrictEqual(newTodo)
//   })

//   // handle errors in create
//   it("should handle errors in create", async () => {
//     const errorMessage = { message: "Done property missing" }
//     const rejectedPromise = Promise.reject(errorMessage)
//     TodoModel.create.mockReturnValue(rejectedPromise)
//     await TodoController.createTodo(req, res, next)
//     expect(next).toBeCalledWith(errorMessage)
//   })
//})
