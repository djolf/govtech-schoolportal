import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, notification } from "antd";
import { useLoaderData, useNavigate } from "react-router-dom";
import { addClass } from "../../common/loaders";
import { Level, Teacher } from "../../common/types";

const { Option } = Select;

export const CreateClassPage = () => {
  const navigate = useNavigate();
  const { teachers } = useLoaderData() as { teachers: Teacher[] };

  const [form] = Form.useForm();

  const addTeacher = () => {
    navigate("/teachers/create");
  };

  const back = () => {
    navigate(-1);
  };

  const submit = async () => {
    try {
      const values = await form.validateFields();
      const response = await addClass(values);
      if (response.ok) {
        notification.success({
          message: "Class added successfully."
        });
        navigate(-1);
      } else {
        notification.error({
          message: "Error adding class.",
          description: response.statusText,
        })
      }
    } catch (error) {
      console.log("failed: ", error);
    }
  };

  return (
    <>
      <div className="title-container">
        <h1>Add Class</h1>
      </div>
      <Form form={form} name="createClass" layout="vertical">
        <div className="container">
          <div className="form-container">
            <Form.Item label="Class Level" name="level" rules={[{ required: true }]}>
              <Select placeholder="Select a level">
                {Object.values(Level).map((level) => {
                  return (
                    <Option key={level} value={level}>
                      {level}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Class Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Class Name" />
            </Form.Item>
            <Form.Item label="Form Teacher" name="teacherEmail" rules={[{ required: true }]}>
              <Select placeholder="Assign a form teacher">
                {teachers?.length ? (
                  teachers.map((teacher) => {
                    return (
                      <Option key={teacher.email} value={teacher.email}>
                        {teacher.name}
                      </Option>
                    );
                  })
                ) : (
                  <Option className="add-teacher" disabled key="add">
                    <div>No existing teachers.</div>
                    <Button type="link" onClick={addTeacher}>
                      Add a teacher
                    </Button>
                  </Option>
                )}
              </Select>
            </Form.Item>
          </div>
        </div>
      <div className="action-buttons">
        <Button type="default" onClick={back}>
          <ArrowLeftOutlined />
          Back
        </Button>
        <Button type="primary" onClick={submit}>
          Add Class
        </Button>
      </div>
      </Form>
    </>
  );
};
