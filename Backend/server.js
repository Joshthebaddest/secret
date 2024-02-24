require('dotenv').config()
const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { render } = require('ejs');
const secretRoutes = require('./routes/secret')
const connectDB = require('./config/DbConfig');
const cors = require('cors')
const corsOption = require('./config/corsOptions')
const credentials = require('./middlewares/credentials')


const app = express();

connectDB()
app.set('view engine' ,'ejs')
app.use(express.static(__dirname + "/public"));

app.use(credentials)
app.use(cors(corsOption))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())


// Set up session middleware
app.use(session({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
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
