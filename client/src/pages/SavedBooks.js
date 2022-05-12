import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';

//import Auth from '../utils/auth';
import { deleteBookId } from '../utils/localStorage';


const SavedBooks = () => {


  // const token = Auth.loggedIn() ? Auth.getToken() : null;
  const { loading, data } = useQuery(GET_ME);
  const bookData = data?.me || {};

  console.log(bookData.savedBooks);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const [ deleteBook ] = useMutation(DELETE_BOOK);
  const handleDeleteBook = async (bookId) => {
    

   // if (!token) {
   //   return false;
   // }

    try {
      const { data } = await deleteBook({
        variables: { bookId }
      });

      if (!data) {
        throw new Error('something went wrong!');
      }
      
    deleteBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {bookData.savedBooks.length ? `Viewing ${bookData.savedBooks.length} saved ${bookData.savedBooks.length === 1 ? 'book' : 'books'}:` : 'You have no saved books!'}
        </h2>
        <CardColumns>
        {bookData.savedBooks?.map((Book) => 
            { return (
              <Card key={Book.bookId} border='dark'>
               
              <Card.Body>
                <Card.Title>{Book.title}</Card.Title>
                <p className='small'>Authors: {Book.authors}</p>
                <Card.Text>{Book.description}</Card.Text>
                <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(Book.bookId)}>
                  Delete this Book!
                </Button>
              </Card.Body>
            </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;