dateTime = timestomp => {
  var d = new Date(timestomp);
  var formattedDate =
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  return formattedDate;
};
//function to take the timestamp and convert it to a date for the 'date' column
exports.formatArticle = (returnedUsersData, returnedTopicData, articleData) => {
  if (articleData.length === 0) {
    return [];
  }
  let articleObject = {};
  const newArticleData = [];
  articleData.forEach(article => {
    articleObject = { ...article };
    articleObject["created_at"] = dateTime(article["created_at"]);
    returnedUsersData.forEach(user => {
      if (user["username"] === article["author"]) {
        articleObject["author"] = user["username"];
      }
    });
    returnedTopicData.forEach(topic => {
      if (article["topic"] === topic["slug"]) {
        articleObject["topic"] = topic["slug"];
      }
    });
    newArticleData.push(articleObject);
  });
  return newArticleData;
};

exports.formatComment = (
  returnedUsersData,
  returnedArticleData,
  commentData
) => {
  if (commentData.length === 0) {
    return [];
  }
  let commentObject = {};

  const newCommentData = [];
  commentData.forEach(comment => {
    commentObject = { ...comment };
    commentObject["created_at"] = dateTime(comment["created_at"]);

    returnedUsersData.forEach(user => {
      if (comment["created_by"] === user["username"]) {
        commentObject["author"] = user["username"];
      }
    });
    returnedArticleData.forEach(article => {
      if (comment["belongs_to"] === article["title"]) {
        commentObject["article_id"] = article["article_id"];
      }
    });
    delete commentObject.created_by;
    delete commentObject.belongs_to;
    newCommentData.push(commentObject);
  });
  return newCommentData;
};
