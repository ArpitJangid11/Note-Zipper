
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../component/MainScreen"
import { Accordion, Badge, Button, Card } from "react-bootstrap";
// import notes  from "../../../../backend/data/notes"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../component/Loading";
import ErrorMessage from "../../component/ErrorMessage";
// import LandingPage from "../LandingPage/LandingPage";
// import LandingPage from "../LandingPage/LandingPage";
import type { RootState } from "../../store";

const MyNote = ({ search }: { search: string }) => {

  const dispatch =useDispatch()
  const  noteList = useSelector((state: RootState) => state.noteList)
  const {loading, notes,error} = noteList
  
  const  userLogin = useSelector((state: RootState) => state.userLogin)
  const {userInfo} = userLogin
  
  const  noteCreate = useSelector((state: RootState) => state.noteCreate)
  const {success : successCreate} = noteCreate
  
  const  noteUpdate = useSelector((state: RootState) => state.noteUpdate)
  const {success : successUpdate} = noteUpdate
  
  const  noteDelete = useSelector((state: RootState) => state.noteDelete)
  
  const {loading: loadingDelete, error: errorDelete} = noteDelete
  
  const navigate = useNavigate()
  const deleteHandler =(id: any)=>{
    if(window.confirm("Are you sure. You want to delete this Note")){
      dispatch(deleteNoteAction(id))
    }
  }
  
  console.log(notes);
  
  useEffect(()=>{
    dispatch(listNotes())
    if(!userInfo){
     navigate("/")
    }
  },[dispatch, navigate, successCreate, successUpdate, noteDelete, userInfo])
  return (
      <MainScreen title = {`Welcome Back ${userInfo ? userInfo.name : ""}`}>
        <Link to='/createnote'>
          <Button style={{marginLeft:10, marginBottom:6 }} size="lg">
            Create New Note
          </Button>
        </Link>
        {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
        {loadingDelete && <Loading/>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading/>}
          {
            Array.isArray(notes) && [...notes].reverse().filter(filteredNote => {
             return filteredNote.title.toLowerCase().includes(search.toLowerCase())
            }).map(note =>(
              <Accordion key={note._id}>
                <Card style={{margin:10}}>
                  <Card.Header style={{display:'flex'}}>
                    <span style={{
                      color:"black",
                      textDecoration:"none",
                      flex:1,
                      cursor:'pointer',
                      alignSelf:"center",
                      fontSize:18
                    }}>
                      <Accordion.Button as={Card.Text} variant='link' >
                        {note.title}
                      </Accordion.Button>
                    </span>
                    <div>
                      <Link to={`/note/${note._id}`}>
                        <Button>Edit</Button>
                      </Link>
                      <Button variant="danger" className="mx-2"
                        onClick={() =>deleteHandler(note._id)}>
                          Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Body >

                    <Card.Body>
                      <h4>
                        <Badge bg="success" style={{color:"white"}}>
                          Category - {note.category}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>
                          {note.content}
                        </p>
                        <footer className="blockquote-footer">
                          Created On Date {" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0,10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Body>
                </Card>
              </Accordion>
            ))
          }
          
      </MainScreen>
    
  );
}

export default MyNote