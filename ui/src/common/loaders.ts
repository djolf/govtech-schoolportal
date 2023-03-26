const baseUrl = "http://localhost:3070/api";

export const loader = async () => {
  console.log('loader called');
  const teachers = await getTeachers();
  const classes = await getClasses();
  return { teachers, classes };
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
