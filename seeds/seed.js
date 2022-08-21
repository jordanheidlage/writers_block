const sequelize = require('../config/connection');
const { User, Writings } = require('../models');

const userData = require('./userData.json');
const writingsData = require('./writingsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const writings of writingsData) {
    await Writings.create({
      ...writings,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
