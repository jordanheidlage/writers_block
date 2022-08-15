const sequelize = require('../config/connection');
const { User, Writings } = require('../models');

const userData = require('./userData.json');
const WritingsData = require('./WritingsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const Writings of WritingsData) {
    await Writings.create({
      ...Writings,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
