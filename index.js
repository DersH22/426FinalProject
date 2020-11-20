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

const Secret = require('./Secret.js')

const login_data = require('data-store')( {path: process.cwd() + '/data/users.json'})



app.post('/login', (req, res) => {
    let user = req.body.login
    let password = req.body.password
    let user_data = login_data.get(user)
    if (user_data == null) {
        console.log("got here")
        res.status(404).send("Not Found")
        return
    }
    if (user_data.password == password) {
        console.log("User" + user + "user credentials valid")
        req.session.user = user
        res.json(true)
        return
    }

    res.status(403).send("unathorized")

})

app.get('/secret', (reg, res) => {
    if(req.session.user == undefined) {
        res.status(403).send("unauthorized")
        return
    }
    res.json(Secret.getAllIDsForOwner(req.session.user))
    return
})

app.get('/secret/:id', (req, res) => {
    if(req.session.user == undefined) {
        res.status(403).send("unauthorized")
        return
    }
    let b = Secret.getSecretByID(req.params.id)
    if (b == null) {
        res.status(404).send('secret not found')
        return
    }
    if(b.owner != req.session.user) {
        res.status(403).send("unauthorized")
        return
    }
    res.json(b)
})

app.post('/secret', (req, res) => {
    if(req.session.user == undefined) {
        res.status(403).send("unauthorized")
        return
    }


    let b = Secret.create(req.session.user, req.body.secret)
    if (b == null) {
        res.status(400).send('bad request')
        return
    }
    return res.json(b)
})

app.put('/secret/:id', (req, res) => {
    if(req.session.user == undefined) {
        res.status(403).send("unauthorized")
        return
    }
    let b = Secret.getSecretByID(req.params.id)
    if (b == null) {
        res.status(404).send('secret not found')
        return
    }
    if(b.owner != req.session.user) {
        res.status(403).send("unauthorized")
        return
    }
    let {secret} = req.body;
    b.secret = secret
    b.update()

    res.json(b.id)
})

app.delete('/secret/:id', (req, res) => {
    if(req.session.user == undefined) {
        res.status(403).send("unauthorized")
        return
    }
    let b = Secret.getSecretByID(req.params.id)
    if (b == null) {
        res.status(404).send('secret not found')
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