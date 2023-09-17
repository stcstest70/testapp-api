import fs from 'fs';

const userDataFilePath = './database/Admin.json';

function readAdminData() {
  try {
    const data = fs.readFileSync(userDataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeAdminData(data) {
  fs.writeFileSync(userDataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

if (!fs.existsSync(userDataFilePath)) {
  writeAdminData([]);
}

// Create a new user
function createAdmin(name, password, token) {
  const userData = readAdminData();
  const newUser = {
    name,
    password,
    tokens: [{ token }],
  };
  userData.push(newUser);
  writeAdminData(userData);
  return newUser;
}

// Find a user by password
function findUserByName(name) {
  const userData = readAdminData();
  return userData.find((user) => user.name === name);
}

// Add a token to a user
function addTokenToAdmin(name, token) {
  const userData = readAdminData();
  const user = userData.find((user) => user.name === name);
  if (user) {
    user.tokens.push({ token });
    writeAdminData(userData);
  }
}

export { createAdmin, findUserByName, addTokenToAdmin };