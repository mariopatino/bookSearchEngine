const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
 Query: {
    me: async(parent, args, context) => {
        if (context.user){
            const foundUser = await User.findOne({_id: context.user_id}).populate('savedBooks');
            return foundUser;
        } else {
            throw new AuthenticationError('You need to be login first!');
        }
    }
  },
  Mutations: {
    login: async (parent, { email, password }) => {
        const userLogin =  await User.findOne({ email });
        if (!userLogin) {
            throw new AuthenticationError('Something is wrong!');
        }
        const isValidPasswd = await userLogin.isCorrectPassword(password);
        if (!isValidPasswd) {
            throw new AuthenticationError('User not found!');
        }
        const token = signToken(userLogin);
        return token;
    }, 
        
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return {token, user};
    },

    saveBook: async (parent, {newBook}, context) => {
        if (context.user){
            const userNewBook = await findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBook: newBook}},
                { new: true, runValidators: true }
            );
            return userNewBook;
        };
        throw new AuthenticationError('You need to be login first!');
    },

    removeBook: async (parent, bookId, context) => {
        if (context.user){
            const userDeleteBook = await findOneAndUpdate(
                {_id: context.user._id},
                {$pull: {savedBooks: { bookId: bookId }}},
                { new: true }
            ); 
            return userDeleteBook;
        }
        throw new AuthenticationError('You need to be login first!');
    }
  }
};

module.export = resolvers;