var express = require('express');
var path = require('path');
var cors = require("cors");
var app = express();

//routers imports
const usersRouter = require('./routes/users');
//middleware imports
const { handleError, ErrorHandler } = require('./middlewares/error')

//connnect to mongodb
const mongoose = require('mongoose');
const db_url = process.env.LOCALDB;
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db connected");
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/assets",express.static(path.join(__dirname, "assets")));

// routes
app.use('/api/user', usersRouter);

// catch 404 error
app.use('/api/*', async (req,res,next)=>{
  next(new ErrorHandler(404,`cannot ${req.method} ${req.originalUrl}`));
});

//handel erros
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
