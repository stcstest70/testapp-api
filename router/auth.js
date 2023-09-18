import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { readAdminData, writeAdminData } from "../controllers/admin/AdminData.js";
import { createAdmin, addTokenToAdmin, findUserByName } from "../controllers/admin/AdminOperations.js";
import { createCourse, findCourseByName, getAllCourses, addCourseToCourses } from "../controllers/courses/CourseOperations.js";
import { createInstructor, getAllInstructors, addCourseLectureDateToUser, findInstructorByName } from "../controllers/instructor/InstructorOperations.js";

import fs from 'fs';

const userDataFilePath = './database/Admin.json';
if (!fs.existsSync(userDataFilePath)) {
    writeAdminData([]);
}

function generateToken(user) {
    try {
        let token = jwt.sign(user, process.env.SECRET_KEY);
        return token;
    } catch (err) {
        console.log(err);
    }
}


router.post('/adminLogin', async function(req, res){
    try {
      const { name, password } = req.body;
      console.log(name);
      if (!name || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }
      const user = findUserByName(name);
      if(user.password === password){
        const token = generateToken(user);
        if(user.tokens.length < 3){
          addTokenToAdmin(name, token);
        }
        
        res.status(201).json({ message: 'User logged in Successfully', token });
        
      }
      else{
        res.status(401).json({ message: 'Invalid user name or password'});
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user.' });
    }
  });

  router.post('/instructorLogin', async function(req, res){
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }
      const user = findInstructorByName(name);
      // console.log(user);
      if(user.password.password === password){
        
        res.status(201).json({ message: 'User logged in Successfully', user });
        
      }
      else{
        res.status(401).json({ message: 'Invalid user name or password'});
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user.' });
    }
  });

  router.post('/checkAdminTokenValid', async function (req, res){
    const {token} = req.body;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        res.status(200).json({ message: 'Token is valid', decoded });
      } catch (error) {
        res.status(401).json({ message: 'Token is invalid' });
      }
    
});

router.post('/upload', (req, res) => {
  
  const data = {
    name: req.body.name,
    level: req.body.level,
    description: req.body.description,
    imageUrl: req.body.image, 
  };
  console.log(data);
  const course = findCourseByName(data.name);
  
  if(course){
      res.status(400).json({ message: 'Data already exist' });
  }
  createCourse(data);
  res.status(200).json({ message: 'Data uploaded successfully' });
});

  router.post('/getCourses', async function (req, res){
    const data = await getAllCourses();
    res.send(data);
  });
  router.post('/getCourse', async function (req, res){
    const name = req.body.userName;
    const data = await findCourseByName(name);
    res.send(data);
  });

  router.post('/getInstructors', async function (req, res){
    const data = await getAllInstructors();
    res.send(data);
  });
  router.post('/getInstructor', async function (req, res){
    const name = req.body;
    const data = await findInstructorByName(name.name);
    // console.log(data);
    res.send(data);
  });

  router.post('/addLecture', async function(req, res){
    const name = req.body.cname;
    const lecture = req.body;
    console.log(name, lecture);
    try {
      addCourseToCourses(name, lecture);
      res.status(201).json({message:"lecture added successfully"});
    } catch (error) {
      console.log(error);
    }
    
  })

  router.post('/addInstructor', async function(req, res){
    const name = req.body;
    const password = req.body;
    try {
      createInstructor(name, password);
      res.status(200).json({message:"Instructor added successfully"});
    } catch (error) {
      console.log(error);
    }
  })

  router.post('/assignLecture', async function(req, res){
    const name = req.body.iname;
    const course = req.body.selectedCourse;
    const lecture = req.body.selectedLecture;
    const date = req.body.selectedDate;
    // console.log(name, course, lecture, date);
    try {
      const result = addCourseLectureDateToUser(name, course, lecture, date);
      if (result.success) {
        // Assignment was successful, send a success response
        res.status(200).json({ message: result.message });
      } else {
        // Assignment failed, send an error response
        res.status(400).json({ error: result.message });
      }
    } catch (error) {
      console.log(error);
    }
  })

export default router;