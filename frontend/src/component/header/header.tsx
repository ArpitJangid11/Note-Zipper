
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { logout } from "../../actions/userActions";
import type { RootState } from "../../store";
import { useEffect } from "react";
interface HeaderProps {
  setSearch: (value: string) => void;
}

const Header = ({ setSearch }: HeaderProps) => {
  const navigate=useNavigate()
  const dispatch =useDispatch()

  const userLogin = useSelector((state: RootState)=> state.userLogin)
  const {userInfo} =userLogin

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }
   useEffect(() => {}, [navigate,userInfo]);

  return (
    <>
       <Navbar expand="lg" bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand>
          <Link to={'/'}>
            Note Zipper
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="m-auto"> 
              <Form >
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
          </Nav>
          {userInfo ?(
          <Nav className="me-auto">
            <Nav.Link href="/mynotes">
              <Link to={'/mynotes'}>
                  My Notes
              </Link>
            </Nav.Link>
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout</NavDropdown.Item>
          
            </NavDropdown>
          </Nav>
            ): (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header
