const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Profile = sequelize.define("Profile", {
  platform: {
    type: DataTypes.STRING,
    allowNull: false
  },

  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  data: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

module.exports = Profile;
