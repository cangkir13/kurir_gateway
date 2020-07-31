const userRoutes = require('./routes/userRoutes');
const protectRoutes = require('./routes/ProtectRoutes')
const config = {
  migrate: true,
  userRoutes,
  protectRoutes,
  port: process.env.PORT || '2017',
};

module.exports = config;
