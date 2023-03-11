const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const csv = require('csv-parser')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch')
const { ObjectId } = require('mongodb')


router.post('/signup', async (req, res) => {

    const { email, password, confirmPassword } = req.body   

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({
            message: 'All field are required'
        })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: 'Passwords do not match'
        })
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    let hashedPassword = await bcrypt.hash(password, salt)

    const client = new MongoClient(process.env.uri)
    const userCollection = client.db('Contacts-Manager').collection('Users')


    let newUser = {
        email: email,
        password: hashedPassword
    }

    console.log(newUser)

    try {
        let data = await userCollection.insertOne(newUser)
        res.status(201).json({
            message: 'User created successfully',
            data
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
    finally {
        await client.close()
    }
})



router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        })
    }

    const client = new MongoClient(process.env.uri)
    const userCollection = client.db('Contacts-Manager').collection('Users')

    try {
        const user = await userCollection.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: 'Authentication failed. User not found.'
            })
        }

        const passwordMatches = await bcrypt.compare(password, user.password)

        if (!passwordMatches) {
            return res.status(401).json({
                message: 'Authentication failed. Invalid credentials'
            })
        }


        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET)
        localStorage.setItem()


        res.status(200).json({
            message: 'Authentication successful',
            token
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    } finally {
        await client.close()
    }
})



router.get('/contacts', async (req, res) => {
    
    var token = req.headers.authorization.split(' ')[1]
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const userEmail = decodedToken.email

    const client = new MongoClient(process.env.uri)
    const userCollection = client.db('Contacts-Manager').collection(userEmail)
    
    let data = await userCollection.find().toArray()

    res.status(200).json({
        message: 'User contacts retrieved successfully',
        data
    })

    } 
)




router.post('/contacts', upload.single('csv'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'No CSV file provNameed'
            })
        }

        console.log(req.file)

        const results = []

        fs.createReadStream(req.file.path)
            .pipe(csv())

            .on('data', (data) => results.push(data))

            .on('end', async () => {
               
                const client = new MongoClient(process.env.uri)


                const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
                const userEmail = decodedToken.email
                const token = jwt.sign({ email: userEmail }, process.env.JWT_SECRET, { expiresIn: '24h' })


                const contactsCollection = client.db('Contacts-Manager').collection(userEmail)
                const insertedData = await contactsCollection.insertMany(results)

                res.status(200).json({
                    message: 'Contacts inserted successfully',
                    data: insertedData,
                    token
                })

                console.log(insertedData)

                await client.close()
            })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})



router.delete('/contacts', async (req, res) => {
    const {emails} = req.body

    const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
    const userEmail = decodedToken.email

        const client = new MongoClient(process.env.uri)
        const contactsCollection = client.db('Contacts-Manager').collection(userEmail)

        
        await contactsCollection.deleteMany({ Email: { $in: emails } })
        const data = await contactsCollection.find().toArray()

        res.status(200).json({ 
            message: "Contacts deleted successfully",
            deletedCount: data.deletedCount,
            data
        })
    
})

module.exports = router

