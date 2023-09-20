import './App.css';
import React, { useState } from 'react';
import { Container,Navbar,Row,Col} from 'react-bootstrap';
import AddBook from './components/AddBook';
import BookList from './components/BookList';

function App() {
  const[bookId,setBookId]=useState("");
  const getBookHandler=(id)=>{
    console.log('the id of edit data', id);
    setBookId(id)
  }
  return (
    <>
    <Navbar bg='dark' variant='dark' className='header' >
      <Container>
        <Navbar.Brand href='#home'>Library-Books</Navbar.Brand>
      </Container>
    </Navbar>

    <Container style={{width:'500px'}}>
        <Row>
          <Col>
          <AddBook id={bookId} setBookid={setBookId}/>
          </Col>
        </Row>
    </Container>

    <Container style={{width:'1000px'}}>
        <Row>
          <Col>
          <BookList getBookId={getBookHandler}/>
          </Col>
        </Row>
    </Container>
    </>
  );
}

export default App;
