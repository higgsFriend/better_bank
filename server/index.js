const express = require('express');
const cors = require('cors');
const dal = require('./dal');
const app = express();
const UserModel = require("./models/User");

app.use(express.json());
app.use(cors());

// Route use dal (returns a Promise)
app.get("/allUsers", async (req, res) => {
    console.log('Request all users via dal.');
    dal.allUsers().then((result) => {
        res.send(result);
    })

});

// Route use dal (returns a Promise)
app.post("/createUser", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    console.log(`Request new user '${name}' via dal.`);
    dal.createUser(name, email, 0, false).then((result) => {
        res.send(result);
    })

});



app.put("/updateUser", async (req, res) => {
    const email = req.body.email;
    
    if( email !== null) {
        const newBalance = req.body.balance;
        console.log(`Request to update ${email} with new balance of ${newBalance}`);
        dal.updateUser(email, newBalance).then((result) => {
            res.send(result);
        });
    } else {
        console.log(`Request to log-out the current user.`);
        res.send('User logged out.')
    }
});

// Route use dal (returns a Promise)
app.get('/getUser', function(req,res) {
    const email = req.query.email;   
    console.log(`Requesting access to user ${email} ${JSON.stringify(req.query)}`);
    dal.getUser(email).then((result) => {
        res.send(result);
    })
});

app.get('/doesUserExist', function(req,res) {
    const email = req.query.email;   
    console.log(`Requesting existence of user ${email} ${JSON.stringify(req.query)}`);
    dal.getUser(email).then((result) => {
        if( result.length == 1) {
            res.send(true);
        } else {
            res.send(false);
        }
    })
});

// Get all users using Mongoose lib
app.get("/allUsers2", async (req,res) => {
    UserModel.find({}, (err, result) => {
        if(err) {
            console.log(`Got this error ${err}`);
            res.send('Error: ' + err);
        } else {
            console.log(`Got this result: ${result}`)
            res.send(result);
        }
    })
});


// Get all users from Data access layer
// Using MongoClient lib
app.get("/allUsers_alt", async (req, res) => {
    dal.allUsers_alt().
    then((docs) => {
        console.log(docs);
        res.send(docs);
    })
});


app.listen(3001, () => {
    console.log("Running server on port 3001");
});
