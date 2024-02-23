const secret = require('../model/secret')
const { validationResult } = require('express-validator');

const getSessionSecret = async(req, res) => {
    const sessionId = req.params.sessionId;
    const home = req.protocol + 's' + '://' + req.get('host');
    if(sessionId !== req.session.id){
      const foundOne = await secret.findOne({sessionId}).exec();
      const name = foundOne.name;
      const message = '';
       res.status(200).json({name, home, message});
    }
    else{
      res.redirect("/");
    }
};

// Route to the specific HTML page with the same session ID
const createSessionSecret = async(req, res, next) => {
    const errors = validationResult(req);
    const sessionId = req.params.sessionId;
    const myMessage = req.body.message;
    const date = new Date();
    
    if(!errors.isEmpty()) return res.send(422).json({'message': "invalid name field, please enter a valid name "});
    try{
      const foundOne = await secret.findOne({sessionId}).exec();
      foundOne.message.push({message: myMessage, date});
      await foundOne.save();
      res.status(200).json({'message': 'message sent'});
    }catch(err){
      res.sendStatus(500).json({'message': err.message})
    }

};

// Generate a link with session ID
const getSession =  async (req, res) => {
  const sessionId = req.session.id;
  const url = req.protocol + 's' + '://' + req.get('host') + '/secret' + req.originalUrl;
  const home = req.protocol + 's' + '://' + req.get('host');

  try{
    let foundOne = await secret.findOne({sessionId}).exec();

    if(!foundOne) return res.status(404).json({"message": "user not found"})
    let link = `${url}${sessionId}`;
    const whatsapp = `https://wa.me/?text=%20send%20a%20secret%20message%20to%20${foundOne.name}%20want%20to%20tell%20me%20anything%20?%20now%20is%20the%20time%20i%20will%20never%20know%20its%20you%20${link}`;

    res.status(200).json({user: foundOne.name, link: foundOne.link, message: foundOne.message, whatsapp})
  }catch(err){
    res.sendStatus(500).json({'message': err.message})
  }
};

const createSession = async(req, res, next) => {
    const errors = validationResult(req);
    let name = req.body.name;
    const sessionId = req.session.id;
    const url = req.protocol + 's' + '://' + req.get('host') + '/secret' + req.originalUrl;
    let link = `${url}${sessionId}`;
    const user = new secret({name, link, sessionId, message: []}); 
    let foundOne = await secret.findOne({sessionId}).exec();
  
    if(!errors.isEmpty()) return res.send(422).json({'message': "invalid name field, please enter a valid name "});
  
    if(foundOne) return res.status(409).json({'message': 'user exist in the database'})

    try{
      await secret.create(user);
      foundOne = await secret.findOne({sessionId}).exec();

      req.session.id = foundOne._id
      res.status(201).json({'message': 'created'})
    }catch(err){
      res.sendStatus(500).json({'message': err.message})
    }
    
};

 const deleteSession = async(req, res) => {
    const sessionId = req.session.id;
    const message = req.body.message;
    try{
      const user = await secret.findOne({sessionId}).exec();
      if(!user) return res.sendStatus(404)

      const newMessage = user[0].message.filter(b => b.message !== message);

      await secret.updateOne({sessionId}, {$set: {message: newMessage}});
      const newUser = await secret.findOne({sessionId});
      await newUser[0].save();
      res.sendStatus(204)

    }catch(err){
      res.sendStatus(500).json({'message': err.message})
    }
};

module.exports = { getSession, createSession, deleteSession, getSessionSecret, createSessionSecret }
