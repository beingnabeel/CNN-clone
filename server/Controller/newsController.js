const {
  Type,
  Category,
  Tag,
  News,
  User,
  Role,
  SupportForm,
} = require("../Model/model");
const mongodb = require("mongodb");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const client = new mongodb.MongoClient(
  "mongodb+srv://user2000:test123@cluster0.5euih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
// here for the file storage we are using mongodb grid fs bucket

exports.getNewsType = async function (req, res) {
  try {
    const allTypes = await Type.find();
    res.json(allTypes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNewsCategory = async function (req, res) {
  try {
    const allNewsCategory = await Category.find({}, "name");
    res.json(allNewsCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNewsSubCategory = async function (req, res) {
  const selectCategory = req.params.catName;
  try {
    const newsCategory = await Category.findOne({ name: selectCategory });
    if (!newsCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    // const subCategories = newsCategory.items.map((subCategory) => {
    //   return subCategory.name;
    // });
    res.json(newsCategory.items);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNewsTag = async function (req, res) {
  try {
    const allNewsTag = await Tag.find();
    res.json(allNewsTag);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLastFiveLiveUpdateNewsType = async function (req, res) {
  try {
    const lastFiveLiveUpdates = await News.find({ isLiveUpdate: true })
      .sort({ createdAt: -1 })
      .limit(5); //sort by createdAt timestamp in descending order
    res.json(lastFiveLiveUpdates);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createNews = async function (req, res) {
  // we can access file using request.file
  // console.log("File is : ", req.file);
  // and for all other data we do req.body
  console.log("NesData is : ", req.body);
  try {
    if (req.file) {
      // this block will be executed if there is file.
      client.connect().then(() => {
        const db = client.db("test");
        const bucket = new mongodb.GridFSBucket(db);
        const file = req.file;
        console.log("File is : ", req.file);
        const fileBuffer = file.buffer;
        const uniqueIdentifier = uuid.v4();

        const newFileName = `${uniqueIdentifier}_${file.originalname}`;
        // running open upload stream to the bucket
        bucket
          .openUploadStream(newFileName)
          .end(fileBuffer)
          .on("error", function (error) {
            console.log("Error uploading file: ", error);
          })
          .on("finish", function (file) {
            const news = new News({
              title: req.body.title,
              file: newFileName,
              newsCategory: req.body.newsCategory,
              subCategory: req.body.subCategory,
              type: req.body.type,
              tag: req.body.tag,
              editorText: req.body.editorText,
              authorName: req.body.authorName,
              liveUpdateType: req.body.liveUpdateType,
              liveUpdateHeadLine: req.body.liveUpdateHeadline,
              isLiveUpdate: req.body.isLiveUpdate,
            });
            console.log("News object", news);
            news
              .save(news)
              .then((data) => {
                res.status(200).send("News Submitted Successfully");
              })
              .catch((error) => {
                res.status(500).send({
                  message: "Error saving news",
                  error: error.message,
                });
              });
            console.log("News Submitted Successfully");
          });
      });
    } else {
      // when there is no file this block will be executed
      const news = new News({
        title: req.body.title,
        newsCategory: req.body.newsCategory,
        subCategory: req.body.subCategory,
        type: req.body.type,
        tag: req.body.tag,
        editorText: req.body.editorText,
        authorName: req.body.authorName,
        liveUpdateType: req.body.liveUpdateType,
        liveUpdateHeadLine: req.body.liveUpdateHeadline,
        isLiveUpdate: req.body.isLiveUpdate,
      });
      console.log("News object without file:", news);
      news
        .save(news)
        .then((data) => {
          res.status(200).send("News Submitted Successfully");
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error saving news",
            error: error.message,
          });
        });
    }
  } catch (error) {
    console.log("Internal server error: ", error);
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// grid fs organize files in a bucket, a bucket is a combination of fs.files and fs.chunks collection

// newsList
exports.newsList = async function (req, res) {
  try {
    // this page and pageSize is coming from the params in the response present at NewsList.jsx
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const options = {
      page: page,
      limit: pageSize,
      sort: { createdAt: -1 }, //Adjust the sorting based on your requirements
      // so here minus will show the newest news first and similary +1 will show the oldest news first at the top of the page
    };
    // here these option will be used in the News.Paginate query.(here News is the model coming from db)
    const paginatedNews = await News.paginate({}, options);
    res.json({
      // here we are sending these to the frontend
      news: paginatedNews.docs,
      totalPages: paginatedNews.totalPages,
    });
  } catch (error) {
    console.error("Error fetching news data: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// for deleting the news
exports.deleteNews = async function (req, res) {
  try {
    // whenever we pass data like :id, or :something we can get it using req.params and if it was post request then we can do req.body.id
    const newsId = req.params.id;
    // implement the logic to delete the news item from the database
    await News.findByIdAndDelete(newsId);
    res.json({ message: "News deleted successfully." });
  } catch (error) {
    console.error("Error deleting news: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// updating news
exports.getNewsByID = async function (req, res) {
  const articleId = req.params.id;
  console.log("articleId is: ", articleId);
  try {
    // Find the news document by id
    const news = await News.findById(articleId);
    // return the news data
    res.send(news);
  } catch (error) {
    // handle error
    console.error(error);
    throw error;
  }
};

exports.updatenews = async function (req, res) {
  console.log("filename is: ", req.body.filename);
  // Get the file object from the req.file
  const newsIdToUpdate = req.body.id; //Replace with the actual ID of the news article you want to update
  if (req.file) {
    // Get the database
    const filename = req.body.filename;
    console.log("Mongodb connected");
    const db = client.db("test");
    const bucket = new mongodb.GridFSBucket(db);
    const file = req.file;
    const fileBuffer = file.buffer;
    // Find the existing file in GridFS by filename
    // const existingFile = await db.collection("fs.files").findOne({ filename });

    // if (!existingFile) {
    //   return res.status(404).json({ message: "File not found" });
    // }

    // const fileId = existingFile._id;
    const uniqueIdentifier = uuid.v4();
    // Create a new filename by combining the UUID and the original filename
    const newFileName = `${uniqueIdentifier}_${file.originalname}`;
    // Update the existing file in the gridFS with the specified field
    // Instead of specifying the fieldId, let MongoDB generate a new _id
    const uploadStream = bucket.openUploadStream(newFileName);
    uploadStream.end(fileBuffer);

    uploadStream.on("error", (error) => {
      console.error(error);
      return res.status(500).json({ message: "Error updating image" });
    });
    uploadStream.on("finish", () => {
      News.findOneAndUpdate(
        { _id: newsIdToUpdate },
        {
          $set: {
            title: req.body.title,
            file: newFileName,
            newsCategory: req.body.newsCategory,
            subCategory: req.body.subCategory,
            type: req.body.type,
            editorText: req.body.editorText,
            authorName: req.body.authorName,
          },
        },
        { new: true } // set to true if you want to return the modified document
      )
        .then((updateNews) => {
          if (!updateNews) {
            return res.status(404).send({
              message: `News article with id ${newsIdToUpdate} not found`,
            });
          }
          res.send("News updated successfully");
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occured while updating the news article",
          });
        });
      return res.status(200).json({ message: "Image updated successfully" });
    });
  } else {
    News.findOneAndUpdate(
      { _id: newsIdToUpdate },
      {
        $set: {
          title: req.body.title,
          newsCategory: req.body.newsCategory,
          editorText: req.body.editorText,
          authorName: req.body.authorName,
        },
      },
      { new: true } //Set to true if you want to return the modified document
    )
      .then((updateNews) => {
        if (!updateNews) {
          return res.status(404).send({
            message: `News article with id ${newsIdToUpdate} not found.`,
          });
        }
        res.send("News updated successfully");
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while updating the news article",
        });
      });
  }
};

// funtion to get the categories and sub categories
exports.AllCategoriesWithSubCategories = async function (req, res) {
  try {
    const categories = await Category.find().populate("name", "items");
    console.log(categories);
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error getting categories: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller code for deleting category
exports.deleteCategory = async function (req, res) {
  const { categoryId } = req.params;
  console.log("categoryId: ", categoryId);
  try {
    await Category.findByIdAndDelete(categoryId);
    res.json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ messsage: "Internal server error" });
  }
};

// controller code for deleting subcategories
// exports.deleteSubCategory = async function (req, res) {
//   const { categoryId, subcategoryId } = req.params;
//   try {
//     const category = await Category.findById(categoryId);
//     category.items.pull(subcategoryId);
//     // await category.save();
//     res.json({ message: "Subcategory deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error." });
//   }
// };
// code from claude
exports.deleteSubCategory = async function (req, res) {
  const { categoryId, subcategoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    const subcategoryIndex = category.items.findIndex(
      (item) => item._id.toString() === subcategoryId
    );

    if (subcategoryIndex === -1) {
      return res.status(404).json({ message: "Subcategory not found." });
    }

    category.items.splice(subcategoryIndex, 1);
    await category.save();

    res.json({ message: "Subcategory deleted successfully." });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// controller code to add the categories
exports.addCategory = async function (req, res) {
  const { name, subcategories, parentCategory } = req.body;
  console.log("subCat: ", subcategories);
  console.log("parentCategory: ", parentCategory);
  try {
    if (!subcategories) {
      const newCategory = new Category({
        name: name,
      });
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } else {
      // Find the parent category by its ID
      const category = await Category.findById(parentCategory);
      console.log("category get: ", category);
      // Add the new subcategory to the subcategories array
      category.items.push({ name: subcategories });
      // save the updated category
      const savedCategory = await category.save();
      res.status(201).json(savedCategory);
    }
  } catch (error) {
    console.error("Error adding categories: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// adding new tags
exports.addTag = async function (req, res) {
  const { name } = req.body;
  console.log("tag: ", name);
  try {
    if (name) {
      const newTag = new Tag({ name });
      const savedTag = await newTag.save();
      res.status(201).json(savedTag);
    } else {
      res.status(400).json("Tag not found");
    }
  } catch (error) {
    console.error("Error adding tag: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// deleting the tags
exports.deleteTag = async function (req, res) {
  const { TagId } = req.params;
  console.log("TagId: ", TagId);
  try {
    await Tag.findByIdAndDelete(TagId);
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// getting the users
exports.users = async function (req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRoles = async function (req, res) {
  // console.log("req.session.page_view is: ", req.session.page_view);
  try {
    const role = await Role.find();
    res.json(role);
  } catch (error) {
    console.error("Error fetching role: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// controller code for assigning the role
exports.assignRole = async function (req, res) {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Update the user's role
    user.role = role;
    // Save the updated user
    await user.save();
    res.status(200).json({ message: "User saved." });
  } catch (error) {
    console.error("Error assigning role: ", error.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// deleting user accounts
exports.deleteUserManually = async function (req, res) {
  try {
    const userId = req.params.id;
    // check if uesr exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// getting the user by the id
exports.getUserbyID = async function (req, res) {
  const userId = req.params.userid;
  console.log("userID for user is : ", userId);
  try {
    // find a user by the provided userId
    const user = await User.findById(userId);
    // const user = await User.findOne({_id: userId})
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "user not found" });
    }
    // return the user data
    return res.json(user);
  } catch (error) {
    console.error("Error fetching the user data: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// updating the users information
exports.updateUserData = async function (req, res) {
  const userId = req.params.userid;
  const { username, phone, email, password, confirmPassword, bio, role } =
    req.body;
  console.log("update with userdata is: ", req.body);
  try {
    // Find the user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // update username if provided
    if (username !== undefined) {
      user.username = username;
    }
    // update phone if provided
    if (phone !== undefined) {
      user.phone = phone;
    }
    // update email if provided
    if (email !== undefined) {
      user.email = email;
    }
    // update bio if provided
    if (bio !== undefined) {
      user.bio = bio;
    }
    // update role if provided
    if (role !== undefined) {
      user.role = role;
    }

    // update password if provided and matches confirmPassword
    if (password !== undefined && password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // save the updated user document
    await user.save();
    // Respond with success message or updated user data
    res
      .status(200)
      .json({ message: "User updated successfully", user: user.toObject() });
  } catch (error) {
    console.error("Error updating user", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

// controller code for getting the support form
exports.getSupportForm = async (req, res) => {
  try {
    // Fetch all the support details from the database
    const supportDetails = await SupportForm.find().sort({ timestamp: -1 });
    res.status(200).json(supportDetails);
  } catch (error) {
    console.error("Error fetching support details: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// controller code for setting the support form details
exports.supportForm = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    // Create a new support submission document
    const supportSubmission = new SupportForm({
      name,
      email,
      subject,
      message,
    });
    // save the document to the database
    await supportSubmission.save();
    console.log(
      "Support form submission saved to the database: ",
      supportSubmission
    );
    res.status(200).json({ message: "Form submitted sucessfully!" });
  } catch (error) {
    console.error("Error saving support form submission: ", error);
    // console.error("Error saving support form submission: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.filesForNewsByFilename = async function (req, res) {
  console.log("From filesForNewsByFilename");

  client.connect().then(() => {
    // Get the database and the GridFS bucket
    const db = client.db("test");
    const bucket = new mongodb.GridFSBucket(db);

    // Get the filename from the request params
    const filename = req.params.fileName;
    console.log("filename is :", filename);
    // Find the file by filename
    async function handleFile() {
      const file = await bucket.find({ filename }).toArray();
      console.log("file is: ", file);

      if (file.length > 0) {
        const dataBuffer = [];
        const downloadStream = bucket.openDownloadStreamByName(filename);

        downloadStream.on("data", (chunk) => {
          dataBuffer.push(chunk);
        });

        downloadStream.on("end", () => {
          const data = Buffer.concat(dataBuffer);
          // Now 'data' contains the binary data of the file
          console.log("data is :", data);
          // Send the file data in the response
          res.send(data);
        });
      } else {
        console.log("File not found");
        // Handle accordingly, send an error response, etc.
      }
    }

    handleFile();
  });
};

// live update endpoint
exports.getHeadline = async function (req, res) {
  const { liveUpdateType } = req.params;
  console.log("liveUpdateType is: ", liveUpdateType);
  try {
    // Find the last document with the specified liveUpdateType
    const lastLiveUpdate = await News.findOne({
      liveUpdateType: liveUpdateType,
      isLiveUpdate: true, // Make sure it's a live update
    }).sort({ createdAt: -1 }); // Sort in descending order based on creation time
    console.log(
      "lastLiveUpdate.liveUpdateHeadline is: ",
      lastLiveUpdate.liveUpdateHeadLine
    );
    if (lastLiveUpdate && lastLiveUpdate.liveUpdateHeadLine) {
      console.log(
        "lastliveupdate.liveUpdateHeadLine is: ",
        lastLiveUpdate.liveUpdateHeadLine
      );
      res.json(lastLiveUpdate.liveUpdateHeadLine);
    } else {
      res.status(404).json({ error: "Live update not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// getting the news data dynamically
exports.getNews = async (req, res) => {
  const { category, subcategory, type, tag, limit, order } = req.query;
  console.log("req.query is : ", req.query);
  try {
    let query = {};
    // filter by category
    if (category) {
      query.newsCategory = category;
    }
    // filter by subcategory
    if (subcategory) {
      query.subCategory = subcategory;
    }
    // filter by type
    if (type) {
      query.type = type;
    }
    // filter by tag
    if (tag) {
      query.tag = tag;
    }
    const selectedFields =
      "_id file title tag newsCategory subCategory liveUpdateType";
    let newsQuery = News.find(query)
      .select(selectedFields)
      .limit(limit ? parseInt(limit) : undefined)
      .sort(
        order === "asc"
          ? { createdAt: 1 }
          : order === "desc"
          ? { createdAt: -1 }
          : undefined
      );
    // limit is by default undefined so it will not create an issue
    const news = await newsQuery.exec();
    console.log("news is : ", news);
    res.status(200).json(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Internal Server Error" });
  }
};

// getting the article
exports.getNewsByArticleId = async (req, res) => {
  try {
    const article = await News.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    console.log(error);
  }
};
