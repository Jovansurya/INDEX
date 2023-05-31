const dbArticle = require("../models/article").Article
const xlsx = require('xlsx');
const { Article } = require("../models/article");


exports.hello = async function (req, res) {

  const workbook = xlsx.readFile('E:/capstone/article.xlsx'); // Replace with the path to your Excel file
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Assuming the data is in the first sheet

  const data = xlsx.utils.sheet_to_json(worksheet, { header: ["id", "judul", "url_article", "url_thumbnail"] });
  data.forEach(async (element) => {
    await dbArticle.create({
      id: element.id,
      judul: element.judul,
      URL_article: element.url_article,
      URL_gambar: element.url_thumbnail
    });
  });

  res.status(201).json({
    message: "berhasil", status: 201

  })
  console.log(data)
}

exports.getArticles = async function (req, res) {
  try {
    const articles = await Article.findAll();
    res.send(articles);
  } catch (error) {
    console.log('Error retrieving articles:', error);
    res.status(500).send('Internal Server Error');
  }
};