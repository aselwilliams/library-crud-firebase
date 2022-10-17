import React, {useState, useEffect} from 'react';
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/book.services";
import "../App.css";

const AddBook = ({id, setBookId, setMessage, message}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [status, setStatus] = useState('Available')
    const [flag, setFlag] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('');
        if(!title || ! author || !year){
            setMessage({error: true, msg: "All fields are mandatory!"});
            return;
        }
        const newBook = {
            title,
            author, year, status
        }
        console.log(newBook)
        try {
            if (id !== undefined && id !== "") {
                await BookDataService.updateBook(id, newBook);
                setBookId("")
                setMessage({error: false, msg: "Book updated successfully"}) 
            } else {
            await BookDataService.addBook(newBook);
            setMessage({error: false, msg: "New Book added successfully"})
            }
        } catch (err) {
            setMessage({error: true, msg: err.message});
        }
        setTitle('');
        setAuthor('');
        setYear('')
    }

    const handleEdit = async () => {
        setMessage("");
        try {
            const docSnap = await BookDataService.getBook(id);
            setTitle(docSnap.data().title);
            setAuthor(docSnap.data().author);
            setYear(docSnap.data().year);
            setStatus(docSnap.data().status)
        } catch (err) {
            setMessage({error: true, msg: err.message});
        }
    }
    useEffect(() => {
        console.log('id for edit', id)
        if(id !==undefined && id!=="") {
            handleEdit()
        }
    }, [id])

    return (
        <>
          <div className="p-4 box">
            {message?.msg && (
              <Alert
                variant={message?.error ? "danger" : "success"}
                dismissible
                onClose={() => setMessage("")}
              >
                {message?.msg}
              </Alert>
            )}
    
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBookTitle">
                <InputGroup>
                  <InputGroup.Text id="formBookTitle" className='bg-dark text-white fw-bold'>BT</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </InputGroup>
              </Form.Group> 
    
              <Form.Group className="mb-3" controlId="formBookAuthor">
                <InputGroup>
                  <InputGroup.Text id="formBookAuthor" className='bg-dark text-white fw-bold'>BA</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Book Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formYearPublished">
                <InputGroup>
                  <InputGroup.Text id="formYearPublished" className='bg-dark text-white fw-bold'>YP</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Year Published"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <ButtonGroup aria-label="Basic example" className="mb-3">
                <Button
                  disabled={flag}
                  variant="success"
                  onClick={(e) => {
                    setStatus("Available");
                    setFlag(true);
                  }}
                >
                  Available
                </Button>
                <Button
                  variant="warning"
                  disabled={!flag}
                  onClick={(e) => {
                    setStatus("Not Available");
                    setFlag(false);
                  }}
                >
                  Not Available
                </Button>
              </ButtonGroup>
              <div className="d-grid gap-2">
                <Button variant="dark" type="Submit" className='fw-bold'>
                  {id ? 'Update' : 'Add'}
                </Button>
              </div>
            </Form>
          </div>
        </>
      );
}
export default AddBook;