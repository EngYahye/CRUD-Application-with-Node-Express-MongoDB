var Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be emtpy!' });
    return;
  }

  // new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
      // res.redirect('/add-user');
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating a create operation',
      });
    });
};

// retrive and return all users /single user
exports.find = (req, res) => {
  Userdb.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'error occured ',
      });
    });
};

//update new identified  user by user id

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Content can not be emtpy!' });

  }
  const id = req.params.id;
  Userdb.findOneAndUpdate(id,req.body,{useFindAndModify: false})
  .then(data =>{
    if(!data){
      return res.status(404).send({ message: `user cannot update with ${id} maybe user not found` });
    }
  })
  .catch(err =>{
    res.status(500).send({ message: 'error update user information'});
    
  })

  
};

// delete user with specified user id by request
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findOneAndDelete(id)
  .then(data =>{
    if(!data){
      return res.status(404).send({ message: `user cannot delete with ${id}. maybe id is wrong`})

    }
    else{
      res.send({
        message: `user successfully delete with ${id}`
      })
    }
  })
  .catch(err =>{
    res.send({
      message: `user cannot delete with ${id}. maybe id is wrong`
    })
  })
};
