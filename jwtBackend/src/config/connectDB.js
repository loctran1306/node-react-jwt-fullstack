import { Sequelize } from "sequelize";

var sequelize = new Sequelize("jwt", "root", null, {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection Database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connection;
