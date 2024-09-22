const { response } = require("express");
const { User, Role, News } = require("../Model/model");
const bcrypt = require("bcrypt");
exports.register = async function (req, res) {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long. ",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const error of error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(401).json({ validationErrors });
    }
    console.log(error);
  }
  console.log("Its a post request to register a user.");
  console.log("req is: ", req.body);
};

// here this will be our controller code for the login
exports.Login = async function (req, res) {
  // here we are accepting the values through the axios post method that is the email and password.
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    // here we will check does user has any role(becoz in the model.js role is defined as a parameter) and if present then we will assign a session accordintg to that role
    // so we are doing it because if the user has a role then he or she can access the admin panel else not.
    req.session.userid = user._id;
    if (user.role) {
      req.session.userRole = user.role;
    }
    req.session.save();
    console.log("req.session: ", req.session);
    res.status(200).json({ message: "Login successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// controller code for the /api/isAuth endpoint
// exports.isAuth = function (req, res) {
//   const userid = req.session.userid;
//   console.log("session from isAuth: ", req.session);
//   res.status(200).json({ userid: userid });
// };
// updated isAuth
exports.isAuth = async function (req, res) {
  // console.log("Middleware is running");
  // console.log("Session is ", req.session);
  // console.log("User userrole: ", req.session.userrole);
  // console.log("Middleware is running");
  // console.log("Session is ", req.session);
  // console.log("User userrole: ", req.session.userrole);
  // Later change userRole and uesrId for dynamic get
  const userRole = req.session.userRole;
  // const usreRole = "Admin";
  const userId = req.session.userid;
  // / const userid = "659a832725988cb6842f2b8a";
  // check if the user role is equal to admin, editor or writer
  if (userRole === "Admin") {
    // do something for Admin users
    res.status(200).json({ Role: userRole, userid: userId });
  } else if (userRole === "Editor") {
    // do something for Editor users
    res.status(200).json({ Role: userRole, userid: userId });
  } else if (userRole === "Writer") {
    // do something for writer users
    res.status(200).json({ Role: userRole, userid: userId });
  } else {
    // do something for other users
    res.status(200).json({ Role: false });
  }

  // send userrole and part of the response
};

// for searching
exports.mainSearch = async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const searchText = req.query.searchText;

    const query = {
      $or: [
        { title: { $regex: searchText, $options: "i" } }, //case-insensitive seach on title
        { newsCategory: { $regex: searchText, $options: "i" } }, //case-insensitive seach on news category
        { subCategory: { $regex: searchText, $options: "i" } }, //case-insensitive seach on sub category
        // add more fields as needed
      ],
    };
    const options = {
      page: page,
      limit: pageSize,
      sort: { createdAt: -1 }, //Adjust the sorting based on your requirements
    };
    const paginatedNews = await News.paginate(query, options);
    res.json({
      news: paginatedNews.docs,
      totalPages: paginatedNews.totalPages,
    });
  } catch (error) {
    console.error("Error fetching news data: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// live news section
exports.getNewsByLiveUpdateType = async (req, res) => {
  const { liveUpdateType } = req.params;
  console.log("liveUpdateType: ", liveUpdateType);
  try {
    // find the last document with the specified liveUpdateType
    const newsByLiveUpdateType = await News.find({
      liveUpdateType: liveUpdateType,
      isLiveUpdate: true, //Make sure it's a live update
    }).sort({ createdAt: -1 }); //sort in descending order based on creation time
    console.log("newsbyliveUpdateType: ", newsByLiveUpdateType);
    if (newsByLiveUpdateType) {
      res.json(newsByLiveUpdateType);
    } else {
      res.status(404).json({ error: "Live update not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOldestNewsArticleByType = async (req, res) => {
  try {
    const { liveUpdateType } = req.params;
    console.log("liveUpdateType: ", liveUpdateType);
    // construct the query based on liveUpdateType
    // const query = liveUpdateType ? { const query = liveUpdateType ? { liveUpdateType} : {}};
    const oldestNewsArticle = await News.findOne({
      liveUpdateType: liveUpdateType,
    }).sort({ createdAt: 1 });
    // sorting according to the oldest news first
    if (!oldestNewsArticle) {
      return res.status(404).json({ message: "No news articles found." });
    }
    res.json(oldestNewsArticle);
  } catch (error) {
    console.error("Error fetching oldest news article by type: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
