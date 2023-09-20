import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  InputGroup,
  Row,
  Col,
  Card,
  ButtonGroup,
  Alert,
} from "react-bootstrap";
import bookDataService from "../services/Books.services";

function AddBook({id,setBookid}) {
  const [title, setTitle] = useState("");
  const [author, SetAuthor] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || author === "") {
      setMessage({ error: true, msg: "All fields are mandatory" });
      return;
    }
    const newBook = {
      title,
      author,
      status,
    };
    try{
        if(id !== undefined && id !== ''){
            await bookDataService.updateBooks(id, newBook)
            setBookid('')
            setMessage({error:false,msg:'updated successfully'})
        }else{
            await bookDataService.addBooks(newBook)
            setMessage({error:false, msg:"the new book added successfully"})
        }
    }catch(error){
        setMessage({error:true, msg:error.message})
    }

    setTitle("");
    SetAuthor("");
  };

  const editHandler=async()=>{
    setMessage('');
    try {
        const docData = await bookDataService.getBook(id)
        setTitle(docData.data().title);
        SetAuthor(docData.data().author);
        setStatus(docData.data().status)
    } catch (error) {
        setMessage({error:true,msg: error.message})
    }

  }

  useEffect(()=>{
      if(id !== undefined && id !== '')
        editHandler()
    
  },[id])

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="shadow-lg mt-5">
              {message?.msg && (
                <Alert
                  className="m-4 mb-2"
                  variant={message?.error ? "danger" : "success"}
                  onClose={() => {
                    setMessage("");
                  }}
                  dismissible
                >
                  {message?.msg}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                {/* here i created a from with input feild with group one is text B and Book title */}
                <Form.Group className="m-4" controlId="fromBookTitle">
                  <InputGroup>
                    <InputGroup.Text id="fromBookTitle">B</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Book Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="m-4" controlId="formAuthorName">
                  <InputGroup>
                    <InputGroup.Text id="formAuthorName">A</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Author Name"
                      value={author}
                      onChange={(e) => {
                        SetAuthor(e.target.value);
                      }}
                    />
                  </InputGroup>
                </Form.Group>

                <ButtonGroup
                  aria-label="Basic example"
                  className="shadow-lg"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px",
                  }}
                >
                  <Button
                    variant="success"
                    disabled={flag}
                    onClick={(e) => {
                      setStatus("Available");
                      setFlag(true);
                    }}
                  >
                    Available
                  </Button>
                  <Button
                    variant="danger"
                    disabled={!flag}
                    onClick={(e) => {
                      setStatus("not Available");
                      setFlag(false);
                    }}
                  >
                    Not Available
                  </Button>
                </ButtonGroup>

                <div
                  className="d-grid gap-2 shadow-lg"
                  style={{ margin: "20px" }}
                >
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddBook;
