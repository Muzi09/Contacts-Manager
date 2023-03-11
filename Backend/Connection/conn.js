const MongoClient = require('mongodb').MongoClient

const connectDB = async () => {
    const uri = process.env.uri
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        await client.connect()
        console.log('Connected to MongoDB Atlas')
        
    } 
    catch (err) {
        console.log(err);
    }
}

module.exports = connectDB