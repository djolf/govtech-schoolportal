import { ConfigProvider, Layout, ThemeConfig } from 'antd';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.scss';
import TopNav from './header';

const {Header, Content} = Layout;

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme: ThemeConfig = {
    token: {
      colorPrimary: '#135BB4',
      fontFamily: 'Inter',
    }
  }

  // automatically redirect to classes as first page
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/classes");
    }
  }, []);
  
  return (
    <ConfigProvider theme={theme}>
      <Layout className="App">
        <Header className="header">
          <TopNav/>
        </Header>
        <Content className="content">
          <Outlet/>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
