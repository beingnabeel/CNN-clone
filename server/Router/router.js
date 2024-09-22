const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = multer();
const controller = require("../Controller/controller");
const newsController = require("../Controller/newsController");
route.post("/api/register", controller.register);
route.post("/api/Login", controller.Login);
route.get("/api/isAuth", controller.isAuth);
const { connectDB } = require("../database/connection");

// *****************News route ***********************
// we will create a new controller for the news route : newsController
route.get("/api/types", newsController.getNewsType);
route.get("/api/newsCategory", newsController.getNewsCategory);
route.get("/api/newsSubCategory/:catName", newsController.getNewsSubCategory);
route.get("/api/newsTag", newsController.getNewsTag);
// *****************News route ***********************

// ********************************live news update**********************
route.get(
  "/api/getLastFiveLiveUpdateNewsType",
  newsController.getLastFiveLiveUpdateNewsType
);
// ********************************live news update**********************
// here we will be using middleware to handle the file request.
// route.post("/api/createnews", upload.single("file"), funtion(req, res, next){
//   newsController.createNews(req, res, next, connectDB.client)
// });
route.post("/api/createnews", upload.single("file"), function (req, res, next) {
  newsController.createNews(req, res, next, connectDB.client);
});
// *****************************************
route.get("/newsList", newsController.newsList);

// delete request
route.delete("/api/news/:id", newsController.deleteNews);

route.get("/getNewsByID/:id", newsController.getNewsByID);
// here we are also uploading the file using multer
route.post("/api/updatenews", upload.single("file"), newsController.updatenews);

// getting the categories and subcategories
route.get(
  "/api/AllCategoriesWithSubCategories",
  newsController.AllCategoriesWithSubCategories
);

// deleting the categories
route.delete(
  "/api/deleteCategories/:categoryId",
  newsController.deleteCategory
);
// deleting sub categories
route.delete(
  "/api/categories/:categoryId/subcategories/:subcategoryId",
  newsController.deleteSubCategory
);
// adding the categories
route.post("/api/addCategories", newsController.addCategory);

// adding new tag
route.post("/api/addTag", newsController.addTag);
route.delete("/api/deleteTag/:TagId", newsController.deleteTag);

// getting all the users
route.get("/api/users", newsController.users);

// getting the roles
route.get("/api/getRoles", newsController.getRoles);

// assigning the role
route.post("/api/assignRole/:userId", newsController.assignRole);

// deleting user account
route.delete("/api/deleteUsersManually/:id", newsController.deleteUserManually);

// setting**********************************
route.get("/api/user/:userid", newsController.getUserbyID);
// route.get("/api/isAuth", newsController.isAuth);
// we already have this api endpoint in the controller so we will update it

// updating the user info
route.post("/api/updateUserData/:userid", newsController.updateUserData);

route.get("/api/support", newsController.getSupportForm);
route.post("/api/support", newsController.supportForm);

// search
route.get("/mainSearch", controller.mainSearch);
route.get(
  "/filesForNewsByFilename/:fileName",
  newsController.filesForNewsByFilename
);

// live news
route.get(
  "/api/getNewsByLiveUpdateType/:liveUpdateType",
  controller.getNewsByLiveUpdateType
);
route.get(
  "/api/getOldestNewsArticleByType/:liveUpdateType",
  controller.getOldestNewsArticleByType
);
// live update endpoint
route.get("/api/getHeadline/:liveUpdateType", newsController.getHeadline);

// for dynamic news update:
route.get("/api/news", newsController.getNews);
// article id
route.get(
  "/api/getNewsByArticleId/:articleId",
  newsController.getNewsByArticleId
);
module.exports = route;
