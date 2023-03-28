import { PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Class } from '../../common/types';

const ClassesPage = () => {
  
  const { classes } = useLoaderData() as { classes: Class[] }; 
  const navigate = useNavigate();

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Class Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Class Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Form Teacher",
      dataIndex: "formTeacher",
      key: "formTeacher",
    },
  ];
  
  const dataSource = classes.map( (element: Class, index) => {
    return {
      key: index + 1,
      level: element.level,
      name: element.name,
      formTeacher: element.formTeacher.name
    }
  })

  const create = () => {
    navigate("/classes/create");
  }

  return (
    <>
      <div className="title-container">
        <h1>Classes</h1>
        {classes.length && <Button type="primary" icon={<PlusOutlined />} onClick={create}>Add Class</Button>}
      </div>
      <div className="container">
      { classes?.length ? (
        <Table className="table" columns={columns} dataSource={dataSource} />
      ) : (
        <div className="empty">
          <span>There are no existing classes yet.</span>
          <Button type="primary" icon={<PlusOutlined />} onClick={create}>Add Class</Button>
        </div>
      )}
      </div>
    </>
  )
}

export default ClassesPage;