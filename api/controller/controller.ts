import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Logger } from "../logger/logger";
import { body, header, validationResult } from "express-validator";
import { isLevel, isValidPhoneNumber, isSubject } from "../validation/validation";
import { Teacher, Class, Subject, Level } from "../types";

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
    this.teachers = [
      {
        id: 1,
        name: "Mary",
        subject: Subject.MA,
        email: "teachermary@gmail.com",
        contactNumber: "68129414",
      },
      {
        id: 2,
        name: "Ken",
        subject: Subject.MT,
        email: "teacherken@gmail.com",
        contactNumber: "61824191",
      },
    ];
    this.classes = [
      {
        id: 1,
        level: Level.P4,
        name: "Class 4A",
        formTeacher: {
          name: "Ken"
        }
      }
    ];
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors())
  }

  private getTeacherByEmail(email: string): Teacher {
    return this.teachers.find((teacher) => email.toLowerCase() === teacher.email.toLowerCase());
  }

  private routes(): void {

    // request to get all the teachers
    this.express.get("/teachers", (req, res) => {
      this.logger.info("url:::::::" + req.url);
      res.status(200).json({
        data: this.teachers
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
      (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          this.logger.info("Creating teacher: " + JSON.stringify(req.body));
          this.teachers.push({
            id: this.teachers.length + 1,
            ...req.body
          });
          res.sendStatus(201);
        } else {
          this.logger.error("Error creating teacher: " + errors);
          return res.status(400).json({ errors: errors.array() });
        }
      }
    );
    
    // get classes
    this.express.get("/classes", (req, res) => {
      this.logger.info("url:::::::" + req.url);
      res.status(200).json({
        data: this.classes
      });
    });
    
    // add class
    this.express.post(
      "/classes",
      header("content-type").equals("application/json"),
      body("level").notEmpty().custom(isLevel),
      body("name").notEmpty().isString(),
      body("teacherEmail").notEmpty().isEmail(),
      (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          const teacher = this.getTeacherByEmail(req.body.teacherEmail);
          this.logger.info("Creating class: " + JSON.stringify(req.body));
          this.classes.push({
            id: this.classes.length+1,
            level: req.body.level,
            name: req.body.name,
            formTeacher: {
              name: teacher.name,
            }
          });
          this.logger.info("Class created: "+ JSON.stringify(this.classes));
          res.sendStatus(201);
        } else {
          this.logger.error("Error creating class: " + errors);
          return res.status(400).json({ errors: errors.array() });
        }
      }
    );
  }
}

export default new Routes().express;
