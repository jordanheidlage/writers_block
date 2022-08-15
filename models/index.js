const User = require('./User');
const Writings = require('./Writings');

User.hasMany(Writings, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Writings.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User,Writings };