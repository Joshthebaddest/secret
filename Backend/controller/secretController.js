const secret = require('../model/secret')
const { validationResult } = require('express-validator');

const getSessionSecret = async(req, res) => {
    const sessionId = req.params.sessionId;
    if(sessionId !== req.session.id){
      const foundOne = await secret.findOne({_id: sessionId}).exec();
      const name = foundOne.name;
      const message = '';
       res.status(200).json({name, message});
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
      res.status(500).json({'message': err.message})
    }

};

// Generate a link with session ID
const getSession =  async (req, res) => {
  const sessionId = req.session.id;
  let foundOne = await secret.find({}).exec();
  console.log(foundOne)
  console.log(req.session.id)
  const url = req.protocol + 's' + '://' + req.get('host') + '/secret' + req.originalUrl;

  try{
    let foundOne = await secret.findOne({ _id: sessionId}).exec();

    if(!foundOne) return res.status(404).json({"message": "user not found"})
    let link = `${url}${sessionId}`;
    const whatsapp = `https://wa.me/?text=%20send%20a%20secret%20message%20to%20${foundOne.name}%20want%20to%20tell%20me%20anything%20?%20now%20is%20the%20time%20i%20will%20never%20know%20its%20you%20`;

    res.status(200).json({id: foundOne._id, user: foundOne.name, message: foundOne.message, whatsapp})
  }catch(err){
    res.status(500).json({'message': err.message})
  }
};

const createSession = async(req, res, next) => {
    const errors = validationResult(req);
    let name = req.body.name;
    const sessionId = req.session.id;
    console.log(sessionId)
    let foundOne = await secret.findOne({_id: sessionId}).exec();
    const user = {name, message: []}; 
  
    if(!errors.isEmpty()) return res.send(422).json({'message': "invalid name field, please enter a valid name "});
  
    if(foundOne) return res.status(409).json({'message': 'user exist in the database'})
    console.log('here')

    try{
     const createUser =  await secret.create(user)
      req.session.id = createUser._id
      res.status(201).json({'message': 'created'})
    }catch(err){
      res.status(500).json({'message': err.message})
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
      res.status(500).json({'message': err.message})
    }
};

module.exports = { getSession, createSession, deleteSession, getSessionSecret, createSessionSecret }
