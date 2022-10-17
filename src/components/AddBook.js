import React, {useState} from 'react';
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";

const AddBook = ({id, setBookId}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [status, setStatus] = useState('Available')
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });
    
    const handleSubmit = (e) => {
        e.preventDefault()
    }
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
                  <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
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
                  <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
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
                  <InputGroup.Text id="formYearPublished">Y</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Year Published"
                    value={author}
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
                  variant="danger"
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
                <Button variant="primary" type="Submit">
                  Add/ Update
                </Button>
              </div>
            </Form>
          </div>
        </>
      );
}
export default AddBook;