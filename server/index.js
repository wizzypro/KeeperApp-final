require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
//const FacebookStrategy = require("passport-facebook");
const fs = require("fs");

const app = express();
const port = process.env.PORT;
const saltRounds = 10;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB);

// create Schema

const notesSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
  notes: [notesSchema],
  photo: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// create models

const Note = mongoose.model("Note", notesSchema);
const User = mongoose.model("User", userSchema);

// create strategies
// passport.use(User.createStrategy());

// Serialize and deserialize users here
passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

// Implementing Google OAuth20 using passport Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/user",
    },
    (accessToken, refreshToken, profile, cb) => {
      // console.log(profile);
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return cb(err, user);
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/user",
    },
    (accessToken, refreshToken, profile, cb) => {
      // console.log(profile);
      User.findOrCreate(
        { googleId: profile.id },
        { username: profile.displayName, photo: profile.photos[0].value },
        (err, user) => {
          return cb(err, user);
        }
      );
    }
  )
);

app.get("/api", (req, res) => {
  if (req.isAuthenticated()) {
    User.find({}, (err, data) => {
      if (err) {
        res.json({ user: false, error: err });
      } else {
        res.json({ user: true, userData: data });
      }
    });
  } else {
    res.json({ user: false });
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/user",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, send data.
    User.find({}, (err, data) => {
      if (err) {
        res.json({ user: false, error: err });
      } else {
        res.json({ user: true, userData: data });
      }
    });
  }
);

app.listen(port, () => {
  console.log(`Port has successfully started on port ${port}`);
});
