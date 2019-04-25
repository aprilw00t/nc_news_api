process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const { expect } = require("chai");
const chai = require("chai");
const connection = require("../db/connection");
const chaiSorted = require("chai-sorted");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  describe("/topics", () => {
    it("GET status:200 responds with an array of objects with the correct properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics[0]).to.contain.keys("slug", "description");
        });
    });
  });
});

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  describe("/articles", () => {
    it("GET status:200 responds with an array of objects with the correct properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0]).to.contain.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes"
          );
        });
    });
  });
});

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  describe("/:article", () => {
    it("GET status:200 responds with articles of the correct ID", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0].article_id).to.eql(2);
        });
    });
    //ERRRORRRRR
    it("GET for an invalid article_id - status:400 and error message", () => {
      return request(app)
        .get("/api/articles/notAnID")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Invalid ID");
        });
    });
    //ERRROOORRRR
    it("PATCH status: responds with the vote incremented by parameter in body", () => {
      return request(app)
        .patch("/api/articles/2")
        .send({ vote_increment: 2 })
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].votes).to.equal(2);
        });
    });
    it("GET status: responds with all comments with requested articled ID", () => {
      return request(app)
        .get("/api/articles/9/comments")
        .expect(200)
        .then(res => {
          expect(res.body.comments).to.be.an("array");
          expect(res.body.comments.length).to.eql(2);
        });
    });

    it("POST status: posts a comment", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send({ username: "butter_bridge", body: "aasddsaas" })
        .expect(201)
        .then(res => {
          expect(res.body.comments).to.be.an("array");
          expect(res.body.comments[0]).to.contain.keys(
            "comment_id",
            "votes",
            "created_at",
            "author"
          );
          expect(res.body.comments[0].body).to.equal("aasddsaas");
        });
    });
  });
});

describe("/api", () => {
  describe("/comments/:id", () => {
    beforeEach(() => connection.seed.run());
    it("PATCH status:200 changes the vote count for the comment with the correct ID", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ vote_increment: 2 })
        .expect(200)
        .then(res => {
          expect(res.body.comments[0].votes).to.eql(18);
        });
    });
    //ERRRORRRR
    it("GET for an invalid comment id - status:400 and error message", () => {
      return request(app)
        .get("/api/articles/notAnID")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Invali ID");
        });
    });
    //ERRORRRRRRR
    it("DELETE status:204, deletes comment by ID", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(res => {
          console.log("sfdaf");
        });
    });
  });
});
describe("/api", () => {
  beforeEach(() => connection.seed.run());
  describe("/:users", () => {
    it("GET status:200 responds with correct user", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body.user[0]).to.contain.keys(
            "name",
            "avatar_url",
            "username"
          );
        });
    });
    //ERRRORRR
    it("GET for an invalid username - status:400 and error message", () => {
      return request(app)
        .get("/api/users/notAuser")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("Invalid user");
        });
    });
    //ERRROORRR
  });
});
