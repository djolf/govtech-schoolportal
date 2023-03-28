import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Logger } from "../logger/logger";
import { body, header, validationResult } from "express-validator";
import { isLevel, isValidPhoneNumber, isSubject } from "../validation/validation";
import { Teacher, Class, Subject, Level } from "../types";

import { db } from '../db';

class Routes {
  public express: express.Application;
  public logger: Logger;

  // array to hold teachers
  teachers: Teacher[];
  classes: Class[];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new Logger();
    // this.teachers = [
    //   {
    //     id: 1,
    //     name: "Mary",
    //     subject: Subject.MA,
    //     email: "teachermary@gmail.com",
    //     contactNumber: "68129414",
    //   },
    //   {
    //     id: 2,
    //     name: "Ken",
    //     subject: Subject.MT,
    //     email: "teacherken@gmail.com",
    //     contactNumber: "61824191",
    //   },
    // ];
    // this.classes = [
    //   {
    //     id: 1,
    //     level: Level.P4,
    //     name: "Class 4A",
    //     formTeacher: {
    //       name: "Ken"
    //     }
    //   }
    // ];
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors())
  }

  private async getTeacherByEmail(email: string) {
    try {
      const { rows } = await db.query('SELECT * FROM teachers WHERE email=$1', [email]);

      return rows[0];
    } catch (err) {
      this.logger.error("error fetching teacher "+err);
      return null;
    }
  }

  private async getTeacherById(id: number) {
    try {
      const { rows } = await db.query('SELECT * FROM teachers WHERE id=$1', [id]);

      return rows[0];
    } catch (err) {
      this.logger.error("error fetching teacher "+err);
      return null;
    }
  }
 

  private routes(): void {

    // request to get all the teachers
    this.express.get("/teachers", async (req, res) => {
      this.logger.info("url:::::::" + req.url);
      const { rows } = await db.query('SELECT * FROM teachers');
      res.status(200).json({
        data: rows
      });
    });

    // create teacher
    this.express.post(
      "/teachers",
      header("content-type").equals("application/json"),
      body("name").notEmpty().isString(),
      body("subject").notEmpty().custom(isSubject),
      body("email").notEmpty().isEmail(),
      body("contactNumber").notEmpty().custom(isValidPhoneNumber),
      async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          this.logger.info("Creating teacher: " + JSON.stringify(req.body));
          try {
            await db.query(
              'INSERT INTO teachers(name, subject, email, contact) VALUES($1, $2, $3, $4)', 
              [
                req.body.name, 
                req.body.subject, 
                req.body.email, 
                req.body.contactNumber
              ]
            );
            res.sendStatus(201);
          } catch (err) {
            this.logger.error("Error creating teacher: " + err);
          return res.status(400).json({ errors: err });
          }

        } else {
          this.logger.error("Error creating teacher: " + errors);
          return res.status(400).json({ errors: errors.array() });
        }
      }
    );
    
    // get classes
    this.express.get("/classes", async (req, res) => {
      this.logger.info("url:::::::" + req.url);
      let { rows:classes } = await db.query('SELECT * FROM classes');
      this.logger.info("classes: "+JSON.stringify(classes));
      const result = [];
      for (let cl of classes) {
        const t = await this.getTeacherById(cl.formteacher);
        result.push({
          level: cl.level,
          name: cl.name,
          formTeacher: {
            name: t.name
          }
        });
      }
      res.status(200).json({
        data: result
      });
    });
    
    // add class
    this.express.post(
      "/classes",
      header("content-type").equals("application/json"),
      body("level").notEmpty().custom(isLevel),
      body("name").notEmpty().isString(),
      body("teacherEmail").notEmpty().isEmail(),
      async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          
          const teacher = await this.getTeacherByEmail(req.body.teacherEmail);
          this.logger.info("teacher retrieved: "+JSON.stringify(teacher));
          if (!teacher) {
           return res.status(400).json({errors: `Teacher with email: ${req.body.teacherEmail} is not found!`});
          }
          this.logger.info("Creating class: " + JSON.stringify(req.body));
          try {
            await db.query(
              'INSERT INTO classes(name, level, formteacher) VALUES($1, $2, $3)', 
              [
                req.body.name, 
                req.body.level, 
                teacher.id
              ]
            );
            this.logger.info(`Class ${req.body.name} created successfully!` );
            res.sendStatus(201);
          } catch (err) {
            this.logger.error("Error creating classes: " + err);
            return res.status(400).json({ errors: err });
          }
        } else {
          this.logger.error("Error creating class: " + errors);
          return res.status(400).json({ errors: errors.array() });
        }
      }
    );
  }
}

export default new Routes().express;
