import fs from 'fs';

const userDataFilePath = './database/Instructor.json';

function readInstructorData() {
  try {
    const data = fs.readFileSync(userDataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeInstructorData(data) {
  fs.writeFileSync(userDataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

if (!fs.existsSync(userDataFilePath)) {
  writeInstructorData([]);
}

// Create a new user
function createInstructor(name, password, course, lecture, date) {
  const userData = readInstructorData();
  const newUser = {
    name: name,
    password: password, 
    assign:[{course, lecture, date}]
  };
  userData.push(newUser);
  writeInstructorData(userData);
  return newUser;
}

// Find a user by password
function findInstructorByName(name) {
  const userData = readInstructorData();
  return userData.find((user) => user.name.name === name);
}

// Add a token to a user
function addTokenToAdmin(name, token) {
  const userData = readInstructorData();
  const user = userData.find((user) => user.name === name);
  if (user) {
    user.tokens.push({ token });
    writeInstructorData(userData);
  }
}

function addCourseLectureDateToUser(name, course, lecture, date) {
  const userData = readInstructorData();
  const user = userData.find((user) => user.name.name === name);
  if (user) {
    // Check if the date already exists for any lecture
    const isDateAlreadyAssigned = user.assign.some(
      (assignment) => assignment.date === date
    );

    if (isDateAlreadyAssigned) {
      // Handle the case where the date is already assigned
      return { success: false, message: 'Date already assigned for a lecture.' };
    } else {
      // If the date is not assigned, add the new assignment
      user.assign.push({ course, lecture, date });
      writeInstructorData(userData);
      return { success: true, message: 'Assignment added successfully.' };
    }
  } else {
    // Handle the case where the instructor is not found
    return { success: false, message: 'Instructor not found.' };
  }
}

function getAllInstructors() {
  return readInstructorData();
}
export { createInstructor, getAllInstructors, findInstructorByName, addTokenToAdmin, addCourseLectureDateToUser };