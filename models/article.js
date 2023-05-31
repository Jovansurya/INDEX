const { defineModel, DataTypes } = require("firestore-sequelize");
exports.Article = defineModel("articles", {
    id: DataTypes.INT,
    judul: DataTypes.STRING,
    URL_article: DataTypes.STRING,
    URL_gambar: DataTypes.STRING
});