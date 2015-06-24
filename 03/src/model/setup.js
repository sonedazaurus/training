var Sequelize = require('sequelize');

var db = 'mysql://root:password@10.63.82.28:3306/soneda';
var sequelize = new Sequelize(db);

var Users = sequelize.define('users', {
  id: Sequelize.INTEGER, 
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  timestamps: false
});

var users_data = [
  { username: 'a', password: 'a@@' },
  { username: 'b', password: 'b@@' },
  { username: 'c', password: 'c@@' },
  { username: 'd', password: 'd@@' },
  { username: 'e', password: 'e@@' },
  { username: 'f', password: 'f@@' },
];

sequelize.sync().then(function(result) {
  return Users.findAll();
}).then(function(users) {
  var userDeletePromisies = users.map(function(user) {
    return user.destroy();
  });
  return Promise.all(userDeletePromisies);
}).then(function() {
  var userSavePromisies = users_data.map(function(data) {
    var user = Users.build(data);
    return user.save();
  });
  return Promise.all(userSavePromisies);
}).then(function() {
  return Users.findAll();
}).then(function(users) {
  users.forEach(function(row) {
    var user = row.get({ plain: true });
    console.log(user);
  });
  return users;
}).catch(function(err) {
  console.log(err);
});


