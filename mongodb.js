const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const CONNECTION_URL = 'mongodb+srv://expoadmin:expoadmin123@cluster0.lqrpt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const databaseName = 'expo-manager'

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true}, (error,client) =>{
    if(error){
        return console.log ('unable to connect')
    }
    console.log('COnnected to database correctrly ')

})