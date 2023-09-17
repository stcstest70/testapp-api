import fs from 'fs';

const userDataFilePath = './database/Courses.json';

function readCoursesData() {
  try {
    const data = fs.readFileSync(userDataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeCoursesData(data) {
  fs.writeFileSync(userDataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

if (!fs.existsSync(userDataFilePath)) {
  writeCoursesData([]);
}

// Create a new user
function createCourse(name, level, description, image, lecture) {
  const userData = readCoursesData();
  const newCourse = {
    name: name,
    level: level, 
    description: description,
    image: image, 
    lectures: [{lecture}], 
  };
  userData.push(newCourse);
  writeCoursesData(userData);
  return newCourse;
}

// Find a user by password
function findCourseByName(name) {
  const userData = readCoursesData();
  return userData.find((user) => user.name.name === name);
}

// Add a token to a user
function addCourseToCourses(name, lecture) {
  const userData = readCoursesData();
  const user = userData.find((user) => user.name.name === name);
  if (user) {
    user.lectures.push({ lecture });
    writeCoursesData(userData);
  }
}

function getAllCourses() {
    return readCoursesData();
  }

export { createCourse, findCourseByName, addCourseToCourses, getAllCourses };