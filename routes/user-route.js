const express = require(`express`)
const app = express()

app.use(express.json())

const userController = require(`../controllers/user-controller`)

app.get(`/user`, userController.getUser)
app.post(`/user/find`, userController.findUser)
app.post(`/user`, userController.addUser)
app.put(`/user/:id_user`, userController.updateUser)
app.delete(`/user/:id_user`, userController.deleteUser)

module.exports = app