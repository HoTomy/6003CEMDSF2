import { Layout, Space } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dogs from './components/Dogs';
import Dogs2 from './components/Dogs2'
import Dogs3 from './components/Dogs3'
import DogAPI from './components/Dogapi1';
import NewDog from './components/NewDog';
import DeleteDog from './components/DeleteDog';
import DetailDog from './components/detailDog';
import ApplicationForm from './components/ApplicationForm';
import ApplM from './components/applm';
import UserM from './components/userm';


const { Header, Content, Footer } = Layout;


export default function App() {
  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">[ Home ]</Link>
            <Link to="/Dogs">[ Available Dog ] </Link>
            <Link to="/Login">[ Login ]</Link>
            <Link to="/Register">[ Register ]</Link>
            <Link to="/Dogapi1">[ Dog Breed ]</Link>
            <Link to="/Dogs2"></Link>
            <Link to="/Dogs3"></Link>
          </Space>
        </nav>
      </Header>
      <Content>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Dogs" element={<Dogs />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ApplicationForm" element={<ApplicationForm />} />
          <Route path="/Dogapi1" element={<DogAPI />} />
          <Route path="/detailDog/:uid" element={<DetailDog />} />
          <Route path="/deleteDog/:id" element={<DeleteDog />} />
          <Route path="/NewDog" element={<NewDog />} />
          <Route path="/Dogs2" element={<Dogs2 />} />
          <Route path="/Dogs3" element={<Dogs3 />} />
          <Route path="/applm" element={<ApplM />} />
          <Route path="/userm" element={<UserM />} />

        </Routes>
      </Content>
      <Footer>
        <p>The Canine Shelter @ May 2024</p>
      </Footer>
    </Router>
  )
}

