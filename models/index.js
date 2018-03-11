const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
    title: Sequelize.STRING,
    urlTitle: {
      type: Sequelize.STRING,
      defaultValue: 'https://placeimg.com/200/200/nature',
      allowNull: false,
      validate: {
        isUrl: true,
      }
    },
    content: Sequelize.STRING,
    status: Sequelize.STRING
  });

  const User = db.define('user', {
    name: Sequelize.STRING,
    email: Sequelize.STRING
  });

module.exports = {
    db,
    Page,
    User,
};