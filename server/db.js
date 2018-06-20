const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/auth_example', { logging: false });

conn.sync({ force: true })

const User = conn.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  googleId: Sequelize.STRING,
  githubId: Sequelize.STRING
});

module.exports = User;

