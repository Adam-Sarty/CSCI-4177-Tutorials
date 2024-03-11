/**
 * ==============================================================================
 * User Management Module
 * @author Adam Sarty, B00794681
 * Handles operations related to user data including fetching, adding, and updating.
 * ==============================================================================
 */

let users = [
    { email: "abc@abc.ca", firstName: "ABC", id: 1 },
    { email: "xyz@xyz.ca", firstName: "XYZ", id: 2 }
];
let nextId = 3; // Initializes ID sequence after predefined users.

/**
 * Retrieves all users from the "database".
 * @returns Array of all user objects.
 */
function getAllUsers() {
    return users;
}

/**
 * Finds a user by their unique ID.
 * @param {number} id - The ID of the user to find.
 * @returns The user object if found, otherwise undefined.
 */
function getUserById(id) {
    return users.find(user => user.id === id);
}

/**
 * Adds a new user to the "database".
 * @param {string} email - The email of the user.
 * @param {string} firstName - The first name of the user.
 * @returns The newly added user object.
 */
function addUser(email, firstName) {
    const user = { email, firstName, id: nextId++ }; // Increment nextId for each new user.
    users.push(user);
    return user;
}

/**
 * Updates an existing user's email and firstName by their ID.
 * @param {number} id - The ID of the user to update.
 * @param {string} email - The new email for the user.
 * @param {string} firstName - The new first name for the user.
 * @returns The updated user object, or null if the user was not found.
 */
function updateUserById(id, email, firstName) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return null; // User not found.
    }

    users[userIndex].email = email;
    users[userIndex].firstName = firstName;
    return users[userIndex];
}

module.exports = { getAllUsers, getUserById, addUser, updateUserById };
