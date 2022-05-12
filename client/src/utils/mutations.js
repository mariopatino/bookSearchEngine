import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const NEW_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
    }
`;

export const NEW_BOOK = gql`
    mutation saveBook($input: InputBook!) {
    saveBook(input: $input)   {
        _id
        username
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
    }
    }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            _id
            username
            bookCount
            savedBooks {
              bookId
              authors
              description
              title
              image
              link
            } 
        }
    }
`;