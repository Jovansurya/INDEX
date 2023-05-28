
const { defineModel, DataTypes } = require("firestore-sequelize");
exports.User = defineModel("users", {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
});
