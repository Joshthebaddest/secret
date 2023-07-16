const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const { render } = require('ejs');

const app = express();

app.set('view engine' ,'ejs')
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(__dirname + "/public/favicon.ico"));

// mongoose database

mongoose.connect('mongodb+srv://gabrielmarvelous1:Josiah1705@cluster0.d19wtz8.mongodb.net/secretDB', {useNewUrlParser: true});
const userSchema = new mongoose.Schema({
  name: String,
  link: String,
  sessionId: String,
  message: [Object]
});


const secret = mongoose.model('Secretmessage', userSchema);

// const user = new secret({}); 

// Set up session middleware
app.use(session({
  secret: '1266ydbcw79po;8473H',
  resave: false,
  saveUninitialized: true,
}));


// Generate a link with session ID
app.get('/', async (req, res) => {
  const sessionId = req.session.id;
  let foundOne = await secret.find({sessionId}).exec();
  const url = req.protocol + '://' + req.get('host') + '/secret' + req.originalUrl;
  const home = req.protocol + '://' + req.get('host');

    if(foundOne.length >= 1){
      let link = `${url}${sessionId}`;
      const getOneUser = foundOne[0];
      const whatsapp = `https://wa.me/?text=%20send%20a%20secret%20message%20to%20${getOneUser.name}%20want%20to%20tell%20me%20anything%20?%20now%20is%20the%20time%20i%20will%20never%20know%20its%20you%20${link}`
      const validateMessage = getOneUser.message;
      res.render('link', {user : validateMessage, link: getOneUser.link, message: validateMessage, whatsapp, home});
    }
    else{
      res.render('index', {home});
    };
});

app.post('/', async(req, res) => {
    let name = req.body.name;
    const sessionId = req.session.id;
    const url = req.protocol + '://' + req.get('host') + '/secret' + req.originalUrl;
    let link = `${url}${sessionId}`;
    const home = req.protocol + '://' + req.get('host');
    const user = new secret({name, link, sessionId, message: []}); 
    let foundOne = await secret.find({sessionId}).exec();

    if(foundOne.length <= 0){
      await secret.create(user);
      foundOne = await secret.find({sessionId}).exec();
    }
    const getOneUser = foundOne[0];
    const whatsapp = `https://wa.me/?text=%20send%20a%20secret%20message%20to%20${getOneUser.name}%20want%20to%20tell%20me%20anything%20?%20now%20is%20the%20time%20i%20will%20never%20know%20its%20you%20${link}`
    const validateMessage = getOneUser.message;
    // res.redirect("/");
    res.render('link', {user : validateMessage, link: getOneUser.link, message: validateMessage, whatsapp, home});
});

app.get('/secret/:sessionId', async(req, res) => {
  const sessionId = req.params.sessionId;
  const home = req.protocol + '://' + req.get('host');
    const foundOne = await secret.find({sessionId}).exec();
    const getOneUser = foundOne[0];
    const name = getOneUser.name;
    req.session.id = sessionId;
    res.render('message', {name, home});
});

// Route to the specific HTML page with the same session ID
app.post('/secret/:sessionId', async(req, res) => {
    const sessionId = req.params.sessionId;
    const home = req.protocol + '://' + req.get('host');
    const myMessage = req.body.message;
    const date = new Date();
    const link = req.url;
    const user = await secret.find({sessionId}).exec();
    user[0].message.push({message: myMessage, date});
    await user[0].save();
    res.render('generate', {link, home});
});
app.post('/delete', async(req, res) => {
    const sessionId = req.session.id;
    const message = req.body.message;
    const url = req.protocol + '://' + req.get('host') + '/secret/';
    let link = `${url}${sessionId}`;
    const user = await secret.find({sessionId}).exec();
    const newMessage = user[0].message.filter(b => b.message !== message);
    await secret.updateOne({sessionId}, {$set: {message: newMessage}});
    const newUser = await secret.find({sessionId});
    await newUser[0].save();
    res.redirect('/')
});

let port = process.env.PORT;
if(port === null || port === ""){
  port = 3000;
}
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port 3000`);
});
