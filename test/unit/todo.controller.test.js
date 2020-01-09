const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

// access jest
TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();

let req, res, next;

// make sure variables are initialized before each test
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

// unit tests for HTTP GET for a particular Id
describe("TodoController.getTodoById", () => {
  // expect getTodoById to be a function
  it("should have a getTodoById function", () => {
    expect(typeof TodoController.getTodoById).toBe("function");
  });
  // expect findById to have been called with the Id
  it("should call TodoModel.findById with route parameters", async () => {
    req.params.todoId = "5e1552216b99753c74631c67";
    await TodoController.getTodoById(req, res, next);
    expect(TodoModel.findById).toHaveBeenCalledWith("5e1552216b99753c74631c67");
  });
  // expect return status of 200, json data type, and end of function call reached
  it("should return json body and response code 200", async () => {
    TodoModel.findById.mockReturnValue(newTodo);
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
    expect(res._isEndCalled).toBeTruthy();
  });
  // handle errors in GET for the TodoModel
  it("should handle errors in getTodoById", async () => {
    const errorMessage = { message: "Error finding TodoModel" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findById.mockReturnValue(rejectedPromise);
    await TodoController.getTodoById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
  // handle error if Id doesn't exist
  it("should return 404 when item doesn't exist", async () => {
    TodoModel.findById.mockReturnValue(null);
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled).toBeTruthy();
  });
});

// unit tests for HTTP GET for all Ids
describe("TodoController.getTodos", () => {
  // expect getTodos to be a function
  it("should have a getTodos function", () => {
    expect(typeof TodoController.getTodos).toBe("function");
  });
  // expect find function to have been called
  it("should call TodoModel.find({})", async () => {
    await TodoController.getTodos(req, res, next);
    expect(TodoModel.find).toHaveBeenCalledWith({});
  });
  // expect todos to return status code 200, json, and end the call
  it("should return response with status 200 and all todos", async () => {
    TodoModel.find.mockReturnValue(allTodos);
    await TodoController.getTodos(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(allTodos);
    expect(res._isEndCalled).toBeTruthy();
  });
  // handle errors in GET
  it("should handle errors in getTodos", async () => {
    const errorMessage = { message: "Error finding" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.find.mockReturnValue(rejectedPromise);
    await TodoController.getTodos(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

// unit tests for HTTP PUT
describe("TodoController.createTodo", () => {
  beforeEach(() => {
    req.body = newTodo;
  });

  // expect createTodo to be a function
  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });
  // expect create function to be called with newTodo json object
  it("should call TodoModel.create", () => {
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });
  // expect response code of 201 and end of function call reached
  it("should return 201 response code", async () => {
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  // expect return body to be json data newTodo
  it("should return json body in response", async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  // handle errors in createTodo
  it("should handle errors", async () => {
    const errorMessage = { message: "Done property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectedPromise);
    await TodoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
