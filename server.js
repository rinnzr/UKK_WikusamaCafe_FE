const express = require(`express`)
const app = express()

const PORT = 8000

const mejaRoute = require(`./routes/meja-route`)
const menuRoute = require(`./routes/menu-route`)
const userRoute = require(`./routes/user-route`)

app.use(mejaRoute)
app.use(menuRoute)
app.use(userRoute)

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
})