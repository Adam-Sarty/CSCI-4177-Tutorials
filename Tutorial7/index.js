/**
 * ==============================================================================
 * CSCI4177 Tutorial 7
 * @author Adam Sarty, B00794681
 * ==============================================================================
 */

require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

// MongoDB connection setup
const uri = "mongodb+srv://awcsarty:hrjK0W39qYcDuEuJ@cluster.xljc5xq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
const client = new MongoClient(uri);
const database = client.db("Tutorial7");
const usersCollection = database.collection("users");

// GET endpoint to retrieve all users
app.get('/users', async (req, res) => {
    try {
        const users = await usersCollection.find({}).toArray();
        res.json({ message: "Users retrieved", success: true, users });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", success: false });
    }
});

// GET endpoint to retrieve a single user by ID
app.get('/user/:id', async (req, res) => {
    try {
        const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        res.json({ success: true, user });
    } catch (error) {
        if (error.message.includes('ObjectId')) {
            return res.status(400).json({ message: "Invalid user ID format", success: false });
        }
        res.status(500).json({ message: "Something went wrong", success: false });
    }
});


// POST endpoint to add a new user
app.post('/add', async (req, res) => {
    try {
        const { email, firstName } = req.body;
        if (!email || !firstName) {
            return res.status(400).json({ message: "Missing email and/or name", success: false });
        }
        const user = await usersCollection.insertOne({ email, firstName });
        res.json({ message: "User added", success: true, user });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", success: false });
    }
});

// PUT endpoint to update an existing user's information by ID
app.put('/update/:id', async (req, res) => {
    try {
        const { email, firstName } = req.body;
        const updateResult = await usersCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { email, firstName } }
        );
        if (!updateResult.matchedCount) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        res.json({ message: "User updated", success: true });
    } catch (error) {
        if (error.message.includes('ObjectId')) {
            return res.status(400).json({ message: "Invalid user ID format", success: false });
        }
        res.status(500).json({ message: "Something went wrong", success: false });
    }
});


// DELETE endpoint to delete a user by ID
app.delete('/delete/:id', async (req, res) => {
    try {
        const deleteResult = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (!deleteResult.deletedCount) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        res.json({ success: true, message: "User deleted" });
    } catch (error) {
        if (error.message.includes('ObjectId')) {
            return res.status(400).json({ message: "Invalid user ID format", success: false });
        }
        res.status(500).json({ message: "Something went wrong", success: false });
    }
});


// Catch-all for unsupported routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Not found", success: false });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong", success: false });
});

// Connect to MongoDB and start the server
client.connect()
    .then(() => {
        const port = process.env.PORT;
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(console.error);
