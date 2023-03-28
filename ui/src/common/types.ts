export interface Teacher {
  id: number;
  name: string;
  subject: Subject;
  email: string;
  contactNumber: string;
}

export interface Class {
  id: number;
  level: Level;
  name: string;
  formTeacher: {
    name: string;
  };
}

export interface ClassReq {
  level: Level;
  name: string;
  teacherEmail: string;
}

export interface TeacherReq {
  name: string;
  subject: Subject;
  email: string;
  contactNumber: string;
}

export enum Level {
  P1 = "Primary 1",
  P2 = "Primary 2",
  P3 = "Primary 3",
  P4 = "Primary 4",
  P5 = "Primary 5",
  P6 = "Primary 6"
}

export enum Subject {
  EN = "English Language",
  MT = "Mother Tongue Language",
  MA = "Mathematics",
  SC = "Science",
  AT = "Art",
  MU = "Music",
  PE = "Physical Education",
  SS = "Social Studies",
  CE = "Character and Citizenship Education"
}