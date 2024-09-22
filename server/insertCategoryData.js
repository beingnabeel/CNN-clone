const { Category } = require("./Model/model");
const mongoose = require("mongoose");

// we will use async funtion to store data to the database.
async function populateDatabase(data) {
  try {
    // we will use await , first delete if we have any data present.
    await Category.deleteMany({});
    await Category.insertMany(data);
    console.log("All data stored successfully");
  } catch (error) {
    console.log(error.message);
  }
}

mongoose
  .connect(
    "mongodb+srv://user2000:test123@cluster0.5euih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB atlas ");
    const categoryData = [
      {
        name: "World",
        items: [
          { name: "Africa" },
          { name: "Americas" },
          { name: "Asia" },
          { name: "Australia" },
          { name: "China" },
          { name: "Europe" },
          { name: "India" },
          { name: "Middle East" },
          { name: "United Kingdom" },
        ],
      },
      {
        name: "US Politics",
        items: [
          { name: "The Biden Presidency" },
          { name: "Facts First" },
          { name: "2024 Elections" },
        ],
      },
      {
        name: "Business",
        items: [
          { name: "Markets" },
          { name: "Tech" },
          { name: "Media" },
          { name: "Calculators" },
          { name: "Videos" },
        ],
      },
      {
        name: "Health",
        items: [
          { name: "Life, But Better" },
          { name: "Fitness" },
          { name: "Food" },
          { name: "Sleep" },
          { name: "Mindfulness" },
          { name: "Relationships" },
        ],
      },
      {
        name: "Entertainment",
        items: [
          { name: "Movies" },
          { name: "Television" },
          { name: "Celebrity" },
        ],
      },
      {
        name: "Tech",
        items: [
          { name: "Innovate" },
          { name: "Gadget" },
          { name: "Foreseeable Future" },
          { name: "Mission: Ahead" },
          { name: "Upstarts" },
          { name: "Work Transformed" },
          { name: "Innovative Cities" },
        ],
      },
      {
        name: "Style",
        items: [
          { name: "Arts" },
          { name: "Design" },
          { name: "Fashion" },
          { name: "Architecture" },
          { name: "Luxury" },
          { name: "Beauty" },
          { name: "Video" },
        ],
      },
      {
        name: "Travel",
        items: [
          { name: "Destinations" },
          { name: "Food & Drink" },
          { name: "Stay" },
          { name: "News" },
          { name: "Videos" },
        ],
      },
      {
        name: "Sports",
        items: [
          { name: "Football" },
          { name: "Tennis" },
          { name: "Golf" },
          { name: "Motorsport" },
          { name: "US Sports" },
          { name: "Olympics" },
          { name: "Climbing" },
          { name: "Esports" },
          { name: "Hockey" },
        ],
      },
      {
        name: "Watch",
        items: [
          { name: "Live TV" },
          { name: "Digital Studios" },
          { name: "CNN Films" },
          { name: "HLN" },
          { name: "TV Schedule" },
          { name: "TV Shows A-Z" },
          { name: "CNNVR" },
        ],
      },
      {
        name: "Features",
        items: [
          { name: "As Equals" },
          { name: "Call to Earth" },
          { name: "Freedom Project" },
          { name: "Impact Your World" },
          { name: "Inside Africa" },
          { name: "2 Degrees" },
          { name: "CNN Heroes" },
          { name: "All Features" },
        ],
      },
      {
        name: "Weather",
        items: [
          { name: "Climate" },
          { name: "Wildfire Tracker" },
          { name: "Video" },
        ],
      },
      {
        name: "More",
        items: [
          { name: "Photos" },
          { name: "Longform" },
          { name: "Investigations" },
          { name: "CNN Profiles" },
          { name: "CNN Leadership" },
          { name: "CNN Newsletters" },
          { name: "Work for CNN" },
        ],
      },
    ];
    populateDatabase(categoryData);
  });
