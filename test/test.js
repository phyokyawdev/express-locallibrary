const request = require("supertest");
const app = require("../app");

describe("GET /", ()=>{
  it("responds with 302 found", async()=>{
  await request(app)
      .get("/")
      .expect(302);
  })
})