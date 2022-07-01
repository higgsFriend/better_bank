const MongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');
const UserModel = require("./models/User");

// const url = 'mongodb+srv://mongo-master:t1ZTwlkHNhXogoKP@cluster0.spgjtrd.mongodb.net/BetterBank?retryWrites=true&w=majority'
const url = 'mongodb://mongo_db:27017/BetterBank';

let dbConnection = null;
let dbConnection_mongoClient = null;

// connect with MongoClient
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("MongoClient Connected successfully to db server");

    // Connect with MongoClient
    dbConnection_mongoClient = client.db('BetterBank');
});

// Connect with Mongoose
mongoose.connect(url, { useNewUrlParser: true }, (err, client) => {
    console.log("Mongoose Connected to Mongo Db.");

    dbConnection = client;
}
);




// // find user account
// function find(email){
//     return new Promise((resolve, reject) => {    
//         const customers = db
//             .collection('users')
//             .find({email: email})
//             .toArray(function(err, docs) {
//                 err ? reject(err) : resolve(docs);
//         });    
//     })
// }

// // find user account
// function findOne(email){
//     return new Promise((resolve, reject) => {    
//         const customers = db
//             .collection('users')
//             .findOne({email: email})
//             .then((doc) => resolve(doc))
//             .catch((err) => reject(err));    
//     })
// }

// // update - deposit/withdraw amount
// function update(email, amount){
//     return new Promise((resolve, reject) => {    
//         const customers = db
//             .collection('users')            
//             .findOneAndUpdate(
//                 {email: email},
//                 { $inc: { balance: amount}},
//                 { returnOriginal: false },
//                 function (err, documents) {
//                     err ? reject(err) : resolve(documents);
//                 }
//             );            


//     });    
// }

/*********************/
/* Using MongoClient */
/*********************/
function allUsers_alt(){
    return new Promise((resolve, reject) => {    
        const users = dbConnection_mongoClient
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// 
function create_alt(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

/******************/
/* Using Mongoose */
/******************/
async function allUsers(){
    return await UserModel.find({}).exec();
}

async function getUser(email){
    return await UserModel.find({email:email}).exec();
}

async function createUser(name, email) {
    const user = new UserModel({ name: name, email: email, balance: 0, isAdmin: false });
    return await user.save();
}

async function updateUser(email, newBalance) {
    console.log(`dal update request of ${email}, new balance of ${newBalance}`);
    const user = await UserModel.findOne({email:email});
    user.balance = newBalance;
    return await user.save();
}
module.exports = {mongoose, UserModel, allUsers, allUsers_alt, createUser, getUser, updateUser};
