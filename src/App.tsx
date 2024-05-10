import { Layout, Space } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/DogList';

import ApplicationForm from './components/ApplicationForm';
im

const { Header, Content, Footer } = Layout;


export default function App() {
  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/BookList">DogList</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
            <Link to="/ApplicationForm">Application Form</Link>
          </Space>
        </nav>
      </Header>
      <Content>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/BookList" element={<BookList />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ApplicationForm" element={<ApplicationForm />} />
        </Routes>
      </Content>
      <Footer>
        <p>OnLine BookStore</p>
      </Footer>
    </Router>
  )
}

