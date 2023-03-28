import { PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Teacher } from '../../common/types';

const TeachersPage = () => {
  
  const { teachers } = useLoaderData() as { teachers: Teacher[] }; 
  const navigate = useNavigate();

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Work Contact",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
  ];
  
  const dataSource = teachers.map( (element: Teacher, index) => {
    return {
      key: index + 1,
      name: element.name,
      subject: element.subject,
      email: element.email,
      contactNumber: element.contactNumber,
    }
  })

  const create = () => {
    navigate("/teachers/create");
  }

  return (
    <>
      <div className="title-container">
        <h1>Teachers</h1>
        {teachers.length && <Button type="primary" icon={<PlusOutlined />} onClick={create}>Add Teacher</Button>}
      </div>
      <div className="container">
      { teachers?.length ? (
        <Table className="table" columns={columns} dataSource={dataSource} />
      ) : (
        <div className="empty">
          <span>There are no existing teachers yet.</span>
          <Button type="primary" icon={<PlusOutlined />} onClick={create}>Add Teacher</Button>
        </div>
      )}
      </div>
    </>
  )
}

export default TeachersPage;