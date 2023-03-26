import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/Mortarboard.svg';
import './navigation.scss';


const TopNav = () => {

  const [current, setCurrent] = useState('classes');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  }

  const items = [
    {
      label: <Link to="/classes">Classes</Link>,
      key: "classes"
    },
    {
      label: <Link to="/teachers">Teachers</Link>,
      key: "teachers"
    },

  ]

  return (
    <div className="header">
      <span className="logo">
        <img src={logo} alt="logo" />
        <span>School Portal</span>
      </span>
      <Menu className="menu" mode="horizontal" items={items} selectedKeys={[current]} onClick={onClick} />
    </div>
  );
}

export default TopNav;