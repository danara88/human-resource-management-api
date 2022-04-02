const User = require('../models/user');
const Position = require('../models/position');

/**
 * Validate if the user email is not registered yet
 */
const existsEmailUser = async (email = '') => {
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (user) throw new Error(`The email ${ email } is already registered.`);
}

/**
 * Validate if the user email is not registered yet
 */
 const existsUsername = async (username = '') => {
  username = username.toLowerCase();
  const user = await User.findOne({ username });
  if (user) 
      throw new Error(`The username ${ username } is already registered.`);
}

/**
 * Validates if the user exists
 * @param {*} id 
 */
const existsUser = async (id = '') => {
  const user = await User.findById(id);
  if (!user || !user.isActive) 
      throw new Error(`The user with ID ${ id } does not exist.`);

}

/**
 * Validates if the position exists
 * @param {*} id 
 */
const existsPosition = async (id = '') => {
  const position = await Position.findById(id);
  if (!position || !position.isActive) 
      throw new Error(`The position with ID ${ id } does not exist.`);

}

/**
 * Validates the collection
 * @param {*} collection 
 * @param {*} collections 
 * @returns 
 */
const validCollections = (collection = '', collections = []) => {
  const includeCollection = collections.includes(collection);
  if ( !includeCollection ) {
    throw new Error(`The collection ${collection} is not allowed.`);
  }
  return true;
};

/**
 * Method to validate if the role exists
 * @param {*} role 
 * @param {*} roles 
 * @returns 
 */
const validRoles = (role = '', roles = []) => {
  const includeRole = roles.includes(role);
  if ( !includeRole ) {
    throw new Error(`The role ${role} is not valid.`);
  }
  return true;
}


module.exports = {
    existsEmailUser,
    existsUsername,
    existsUser,
    existsPosition,
    validCollections,
    validRoles,
}