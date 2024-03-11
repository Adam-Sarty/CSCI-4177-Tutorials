/**
 * ==============================================================================
 * CSCI4177 Tutorial 5
 * @author Adam Sarty, B00794681
 * A simple Express.js API for user management including functionality to 
 * retrieve all users, a single user by ID, add new users, and update existing users.
 * ==============================================================================
 */

const express = require('express');
const { getAllUsers, getUserById, addUser, updateUserById } = require('./users');

const app = express();
app.use(express.json());
const port = 8080;

/**
 * Retrieves all users from the database.
 * GET /users
 */
app.get('/users', (req, res) => {
    res.json({ message: "Users retrieved", success: true, users: getAllUsers() });
});

/**
 * Retrieves a single user by their ID.
 * GET /user/:id
 */
app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = getUserById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
    }

    res.json({ success: true, user });
});

/**
 * Adds a new user to the database.
 * POST /add
 */
app.post('/add', (req, res) => {
    const { email, firstName } = req.body;

    if (!email || !firstName) {
        return res.status(400).json({ message: "Missing email and/or name", success: false });
    }

    const user = addUser(email, firstName);
    res.json({ message: "User added", success: true, user });
});

/**
 * Updates an existing user's information by their ID.
 * PUT /update/:id
 */
app.put('/update/:id', (req, res) => {
    const { email, firstName } = req.body;
    const id = parseInt(req.params.id, 10);

    if (!email || !firstName) {
        return res.status(400).json({ message: "Missing email and/or name", success: false });
    }

    const updatedUser = updateUserById(id, email, firstName);

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found", success: false });
    }

    res.json({ message: "User updated", success: true, updatedUser });
});

/**
 * Handles requests to unsupported routes with a 404 Not Found error.
 */
app.use((req, res, next) => {
    res.status(404).json({ message: "Not found", success: false });
});

/**
 * Global error handler for handling server errors.
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong", success: false });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
