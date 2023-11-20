require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override")
const connectDB = require("./server/config/db");

const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const port = process.env.PORT || 5000;

mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


//connect to Database

connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})

app.use(express.urlencoded({ extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

//static files
app.use(express.static("public"));

// Express Session
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie:{
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        }
    })
);

// Flash Messages
app.use(flash({ sessionKeyName: "flashMessage"}));

//templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");



//Routes
app.use("/", require("./server/routes/equipment"))


//Handle 404
app.get("*", (req, res)=>{
    res.status(404).render("404");
})

app.listen(port, ()=> {
    console.log(`App listening on port ${port}`)
});
