import React, { useEffect, useState } from 'react'
import { Container,Button,Table } from 'react-bootstrap'
import bookDataService from "../services/Books.services";
import '../index.css'

function BookList({getBookId}) {
  const[books,setBooks]=useState([])
    useEffect(()=>{
        getBooks();
    },[])

    const getBooks=async()=>{
        const data= await bookDataService.getAllBooks()
        console.log(data.docs);
        setBooks(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        
    }

    const handleDelete=async(id)=>{
      let bookDelete=  await bookDataService.deleteBook(id)
      getBooks()
      return bookDelete;
      
    }

    const handleRefresh=()=>{
        getBooks();
    }

  return (
    <Container>
        {/* <pre>{JSON.stringify(books,undefined,1)}</pre> */}
        <div className= 'm-4' style={{display:'flex',justifyContent:'flex-end'}}>
            <Button className='shadow-lg myBtn' onClick={handleRefresh}>Refresh Page</Button>
        </div>

        <Table striped bordered hover size='sm' style={{textAlign:'center'}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Book Title</th>
                    <th>Author Name</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {books.map((doc, index)=>{
                    return(
                        <tr key={doc.id}>
                        <td>{index+1}</td>
                        <td>{doc.title}</td>
                        <td>{doc.author}</td>
                        <td>{doc.status}</td>
                        <td>
                            <Button variant='secondary' className='edit shadow-lg' onClick={(e)=>{getBookId(doc.id)}} >Edit</Button>
                            <Button variant='danger' className='delete shadow-lg' onClick={(e)=>{handleDelete(doc.id)}}>Delete</Button>
                        </td>
                    </tr>
                    )
                })}
                
            </tbody>
        </Table>
        
    </Container>


  )
}

export default BookList