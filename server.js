require('dotenv').config()
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { render } = require('ejs');
const secretRoutes = require('./routes/secret')
const connectDB = require('./config/DbConfig');
const cors = require('cors')

const app = express();

connectDB()
app.set('view engine' ,'ejs')
app.use(express.static(__dirname + "/public"));

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())


// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));


app.use('/', secretRoutes)



let port = process.env.PORT;
if(port === null || port === ""){
  port = 3000;
}
// Start the server
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
