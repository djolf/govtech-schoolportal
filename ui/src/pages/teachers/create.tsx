import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, notification, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { addTeacher } from "../../common/loaders";
import { Subject } from "../../common/types";

const { Option } = Select;

export const CreateTeacherPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const back = () => {
    navigate(-1);
  };

  const numberFormatter = (value: string | undefined) => {
    if (value && value.length > 4) {
      return `${value.slice(0, 4)} ${value.slice(4)}`;
    }
    return value || "";
  }

  const submit = async () => {
    try {
      const values = await form.validateFields();
      const response = await addTeacher(values);
      if (response.ok) {
        notification.success({
          message: "Teacher added successfully."
        });
        navigate(-1);
      } else {
        notification.error({
          message: "Error adding teacher.",
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
        <h1>Add Teacher</h1>
      </div>
      <Form form={form} name="createTeacher" layout="vertical">
        <div className="container">
          <div className="form-container">
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Subject" name="subject" rules={[{ required: true }]}>
              <Select placeholder="Select a subject">
                {Object.values(Subject).map((sub) => {
                  return (
                    <Option key={sub} value={sub}>
                      {sub}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Email Address" name="email" rules={[
              {
                required: true, 
                message: "Please enter email"
              }, 
              {
                type: "email", 
                message: "This email address is invalid." 
              }
            ]}>
              <Input type="email" placeholder="Email address" />
            </Form.Item>
            <Form.Item label="Work Contact Number" name="contactNumber" rules={[
              {
                required: true,
                message: "Please enter work contact number"
              },
              {
                pattern: /^(6|8|9)\d{7}$/,
                message: "This work contact number is invalid."
              }
            ]}>
              <InputNumber formatter={numberFormatter} controls={false} maxLength={9} placeholder="Work contact number" />
            </Form.Item>
          </div>
        </div>
      <div className="action-buttons">
        <Button type="default" onClick={back}>
          <ArrowLeftOutlined />
          Back
        </Button>
        <Button type="primary" onClick={submit}>
          Add Teacher
        </Button>
      </div>
      </Form>
    </>
  );
};
