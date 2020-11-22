const { json } = require("express");
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const expressSession = require('express-session')
app.use(bodyParser.json())
app.use(expressSession({
    name: "sessionCookie",
    secret: "session secret",
    resave: false,
    saveUninitialized: false
}))

const UserData = require('./UserData.js')
const pollData = require('./pollData.js')

const login_data = require('data-store')( {path: process.cwd() + '/data/users.json'})


app.post('/pollEntry', (req, res) => {
    let president = req.body.president
    let governor = req.body.governor
    let NCsenator = req.body.NCsenator
    let ALsenator = req.body.ALsenator
    let AZsenator = req.body.AZsenator
    let MEsenator = req.body.MEsenator
    let approval = req.body.approval
    let data = {"president": president}
    pollData.registerVotes(data)

    return res.json(true)

})

app.get('/pollResults', (req, res) => {
    let results = pollData.getPollData()
    res.json(results)
})

app.post('/createUser', (req, res) => {
    let user = req.body.login
    let password = req.body.password
    let user_data = login_data.get(user)
    if (user_data != null) {
        res.status(401).send("User Already Exists")
        return
    } else {
        let pass = {"password": password} 
        login_data.set(user, pass)
        res.json(true)
        return
    }
})

app.post('/login', (req, res) => {
    let user = req.body.login
    let password = req.body.password
    let user_data = login_data.get(user)
    console.log(user_data)
    if (user_data == null) {
        res.send("Not Found")
        return
    }
    
    if (user_data.password == password) {
        console.log("User" + user + "user credentials valid")
        req.session.user = user
        res.json(true)
        return
    }

    res.send("unauthorized")

})

app.get('/userInfo', (reg, res) => {
    if(req.session.user == undefined) {
        res.status(403).send("unauthorized")
        return
    }
    res.json(UserData.getAllIDsForOwner(req.session.user))
    return
})

app.get('/userInfo/:id', (req, res) => {
    if(req.session.user == undefined) {
        res.status(403).send("unauthorized")
        return
    }
    let b = UserData.getUserDataByID(req.params.id)
    if (b == null) {
        res.status(404).send('UserData not found')
        return
    }
    if(b.owner != req.session.user) {
        res.status(403).send("unauthorized")
        return
    }
    res.json(b)
})

app.post('/userInfo', (req, res) => {
    if(req.session.user == undefined) {
        res.status(403).send("unauthorized")
        return
    }


    let b = UserData.create(req.session.user, req.body.userdata)
    if (b == null) {
        res.status(400).send('bad request')
        return
    }
    return res.json(b)
})

app.put('/userInfo/:id', (req, res) => {
    if(req.session.user == undefined) {
        res.status(403).send("unauthorized")
        return
    }
    let b = UserData.getUserDataByID(req.params.id)
    if (b == null) {
        res.status(404).send('UserData not found')
        return
    }
    if(b.owner != req.session.user) {
        res.status(403).send("unauthorized")
        return
    }
    let info = req.body.info
    b.info = info
    b.update()

    res.json(b.id)
})

app.delete('/userInfo/:id', (req, res) => {
    if(req.session.user == undefined) {
        res.status(403).send("unauthorized")
        return
    }
    let b = UserData.getUserDataByID(req.params.id)
    if (b == null) {
        res.status(404).send('UserData not found')
        return
    }
    if(b.owner != req.session.user) {
        res.status(403).send("unauthorized")
        return
    }
    b.delete();
    res.json(true)
})



app.get('/logout', (req, res) => {
    delete req.session.user
    res.json(true)
})




const port = 3030;
app.listen(port, () => {
    console.log("running")
})