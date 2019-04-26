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

    it("GET status:404 responds with error when there is no article with that ID", () => {
      return request(app)
        .get("/api/articles/87978")
        .expect(404)
        .then(res => {
          console.log(res.body);
        });
    });

    it("GET status:400 responds with error when ID is wrong", () => {
      return request(app)
        .get("/api/articles/ijojgiosdg")
        .expect(400)
        .then(res => {
          console.log(res.body);
        });
    });
    it("GET status:400 responds with error whEN Sort by is invalid", () => {
      return request(app)
        .get("/api/articles?sortBy=ahhsdjo")
        .expect(400)
        .then(res => {
          console.log(res.body);
        });
    });

    it("PATCH status: responds with the vote incremented by parameter in body", () => {
      return request(app)
        .patch("/api/articles/2")
        .send({ vote_increment: 2 })
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].votes).to.equal(2);
        });
    });

    it("PATCH status:400 when object is d", () => {
      return request(app)
        .patch("/api/articles/2")
        .send({})
        .expect(400);
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

    it("GET status:400 responds with error with requested articled ID", () => {
      return request(app)
        .get("/api/articles/pokjkj/comments")
        .expect(400);
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
    //eroeoroeor
    //ERROR
    it("POST error status: 400, comment object is empty", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send({})
        .expect(400);
    });
    it("POST error status: 400, comment is undefined ", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send()
        .expect(400);
    });

    it("POST error status: 400, comment is malformed", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send({ username: "sadafsad" })
        .expect(400);
    });
    //err
    //err
    //erreororoe
    //ERROR
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

    it("PATCH status:400  for the comment with an invalid comment ID", () => {
      return request(app)
        .patch("/api/comments/jvjh")
        .send({ vote_increment: 2 })
        .expect(400);
    });
    it("PATCH status:400  for the comment with a non-numerical vote", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ vote_increment: "adads" })
        .expect(400);
    });

    it("GET for a comment id for a comment that doesn't exist - status:404 and error message", () => {
      return request(app)
        .get("/api/comments/8789")
        .expect(404);
    });
    //ERRORRRRRRR
    //errrrrrrrroroe
    it("DELETE status:204, deletes comment by ID", () => {
      return request(app)
        .delete("/api/comments/2")
        .expect(204);
    });
    it("DELETE status:204, deletes comment by ID", () => {
      return request(app)
        .delete("/api/comments/hjfdshkdhfkj")
        .expect(400);
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
          expect(res.body.user).to.be.an("array");
        });
    });
    it("GET status:200 responds with correct user", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(res => {
          expect(res.body.user[0]).to.contain.keys(
            "name",
            "avatar_url",
            "username"
          );
          expect(res.body.user).to.be.an("array");
          expect(res.body.user[0].username).to.eql("rogersop");
        });
    });
    //eeeeeerrrrroooorrrrrrrooor
    //ERRRORRR
    it("GET for an invalid username - status:400 and error message", () => {
      return request(app)
        .get("/api/users/21371237")
        .expect(404)
        .then(({ body }) => {
          console.log(body);
        });
    });
    //ERRROORRR
    //erreoror
  });
  after(() => connection.destroy());
});
