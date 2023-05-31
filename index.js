const express = require("express")
const app = express()
app.use(express.json());
const serviceAccount = require("./capstone-2b3b9-firebase-adminsdk-eg070-f495b46dd0.json")

const hello = require("./controller/cops")
const userController = require("./controller/users")
const articleController = require("./controller/articles")
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sequelize = require("firestore-sequelize")
sequelize.initializeApp(admin)


const PORT = process.env.PORT || 8080
app.get("/", hello.hello)

app.post("/register", userController.register)
app.post("/login", userController.login)
app.get("/article", articleController.hello)
app.get("/getArticles", articleController.getArticles)























app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`listening on PORT ${PORT}`)
})
