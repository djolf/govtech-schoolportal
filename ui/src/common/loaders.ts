import { ClassReq, TeacherReq } from "./types";

const baseUrl = "http://localhost:3070/api";

export const teachersLoader = async () => {
  const teachers = await getTeachers();
  return { teachers };
};

export const classesLoader = async () => {
  const classes = await getClasses();
  return { classes };
};

const getTeachers = async () => {
  const response = await fetch(`${baseUrl}/teachers`);
  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
  return [];
};

const getClasses = async () => {
  const response = await fetch(`${baseUrl}/classes`);
  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
  return [];
};

export const addClass = (data: ClassReq) => {
  return fetch(`${baseUrl}/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const addTeacher = (data: TeacherReq) => {
  return fetch(`${baseUrl}/teachers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}