const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const { formatArticle, formatComment } = require("../db/utils/utils");

describe("formatArticle", () => {
  it("returns empty array when passed an empty array", () => {
    const returnedUserData = [];
    const articleData = [];
    const topicData = [];
    const expected = [];
    expect(formatArticle(returnedUserData, topicData, articleData)).to.eql(
      expected
    );
  });
  it("returns correctly formatted array when passed an aray containing 1 object", () => {
    const returnedUserData = [
      {
        username: "rogersop",
        name: "paul",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4"
      }
    ];

    const articleData = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "rogersop",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const topicData = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch"
      }
    ];
    const expected = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "rogersop",
        body: "I find this existence challenging",
        created_at: "2018-11-15",
        votes: 100
      }
    ];

    expect(formatArticle(returnedUserData, topicData, articleData)).to.eql(
      expected
    );
  });
});

describe("formatComment", () => {
  it("returns empty array when passed an empty array", () => {
    const returnedUsersData = [];
    const returnedArticleData = [];
    const commentData = [];
    const expected = [];
    expect(
      formatComment(returnedUsersData, returnedArticleData, commentData)
    ).to.eql(expected);
  });

  it("returns correctly formatted array when passed array", () => {
    const returnedUsersData = [
      {
        username: "rogersop",
        name: "paul",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4"
      }
    ];

    const returnedArticleData = [
      {
        article_id: 8,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "rogersop",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];

    const commentData = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "rogersop",
        votes: 14,
        created_at: 1479818163389
      }
    ];

    const expected = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: 8,
        author: "rogersop",
        votes: 14,
        created_at: "2016-11-22"
      }
    ];

    expect(
      formatComment(returnedUsersData, returnedArticleData, commentData)
    ).to.eql(expected);
  });
});
