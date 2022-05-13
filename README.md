# Book Search Engine
This is a Google Books API search engine built originaly with a RESTful API, and refactor it to be a GraphQL API built with Apollo Server.

## Description
This is a refactor project, I receive a starter code with a fully functioning Google Books API search engine built with a RESTful API, the work was recodig some specific parts to use GraphQL and Apollo Sever.
I also received a full description with the uses cases and  technical requiremets to fullfil. Because the orginal web app was working perfectly it was no sense to do it from scratches, I respected all the code I can, using the variable names and all that originaly works. Unfortunally I did not upload the original code, but this is what I worked on:

* auth.js: Update the auth middleware function to work with the GraphQL API.

* server.js: Implement the Apollo Server and apply it to the Express server as middleware. Adding requirs for apollo-server-express, Middleware for token validation  eliminating routes because it is not longer need it
adding new server with ApolloServer for typeDefs, resolvers and middleware
the server send some error with 
Error: ENOENT: no such file or directory, stat client/build/index.html
Add 
* remove el app.use(routes)


### Schemas directory:

* index.js: Export my typeDefs and resolvers.

* resolvers.js: Define the query and mutation functionality to work with the Mongoose models. I used the names and variable from the user-controller.js **this was really important**, because I try the first time using my on funtion names and it was a mess, I should start again from the beginig and upload my complete repo.

* typeDefs.js: Define the necessary Query and Mutation using the ones provided on the user history and instructions, this was also important:

### Query type:

*  me: Which returns a User type.
Mutation type:

* login: Accepts an email and password as parameters; returns an Auth type.

* addUser: Accepts a username, email, and password as parameters; returns an Auth type.

* saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)

* removeBook: Accepts a book's bookId as a parameter; returns a User type.

### User type:

* _id

* username

* email

* bookCount

* savedBooks (This will be an array of the Book type.)

### Book type:

* bookId (Not the _id, but the book's id value returned from Google's Book API.) I used a String

* authors (An array of strings, as there may be more than one author.)

* description

* title

* image

* link

### Auth type:

* token

* user (References the User type.)

### Front-End
I also reveive specification to follow and apply to  the fron-end and I create and update these files:


* queries.js: This holds the query GET_ME, which  executes the me query set up using Apollo Server.

* mutations.js:

    - LOGIN_USER executes the loginUser mutation set up using Apollo Server.

    - ADD_USER executes the addUser mutation.

    - SAVE_BOOK will execute the saveBook mutation.

    - REMOVE_BOOK will execute the removeBook mutation.

Some other steps I was requeired to follow
- Modify the existing authentication middleware so that it works in the context of a GraphQL API.

- Create an Apollo Provider so that requests can communicate with an Apollo Server.

- Deploy the application to Heroku with a MongoDB database using MongoDB Atlas.




## Usage & [Deployed Application](https://shrouded-forest-18932.herokuapp.com/)

I deployed the application in Heroku: https://booksearchengine-mp.herokuapp.com/ 

## Conclusions
Refactoring a code to use GraphQL was fun and it was really educational, this is a excellent work to undestand the differences using GraphQL, it also reduce the code, not in a significat way but any line count in coding.
Because the refactoring was more about use another technology I respect the original code and just change and add code for use GraphQL.
 
## Technologies


* Node.js
* NPM
* React.js
* HTML
* CSS
* MongoDB
* Mongoose
* GraphQL 
* Express 
* Apollo Server Express 
* JWT
* bcrypt 
* Heroku

## Contact Information

* GitHub Profile: [mariopatino](https://github.com/mariopatino)
