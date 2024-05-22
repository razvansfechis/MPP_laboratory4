import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mpp_database', 'root', 'password123', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Uncomment to sync models, run this once to create the tables
    // await sequelize.sync({ force: true });

    console.log('Database connection successful, models synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;