const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

let firstTodo;

describe(endpointUrl, () => {
  // integration tests for HTTP GET
  test("GET " + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });

  // integration tests for HTTP GET for an Id body
  test("GET by Id" + endpointUrl + ":todoId", async () => {
    const response = await request(app).get(endpointUrl + firstTodo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });

  // integration tests for when HTTP GET Id doesn't exist
  test("GET todoById doesn't exist" + endpointUrl + ":todoId", async () => {
    const response = await request(app).get(endpointUrl + "5e1554bf72aec03f7f57ebf3");
    expect(response.statusCode).toBe(404);
  });

  // integration tests for HTTP POST
  it("POST" + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
  // error handling for HTTP POST
  it("should return error 500 on malformed data with POST" + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send({ title: "Missing done property" });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message: "Todo validation failed: done: Path `done` is required."
    });
  });
});
