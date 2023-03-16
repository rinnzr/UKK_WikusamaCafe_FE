const express = require(`express`)
const app = express()

const menuController = require(`../controllers/menu-controller`)

app.get(`/menu`, menuController.getMenu)
app.post(`/menu`, menuController.addMenu)
app.post(`/menu/find`, menuController.filterMenu)
app.put(`/menu/:id_menu`, menuController.updateMenu)
app.delete(`/menu/:id_menu`,menuController.deleteMenu)

module.exports = app