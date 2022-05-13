const { AuthenticationError } = require('apollo-server-express');

const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id }).
                populate('savedBooks');
        } 
        throw new AuthenticationError('You need to be login first!');
    },
    },

  Mutation: {
    loginUser: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError('Something is wrong!');
        }
        const isValidPasswd = await user.isCorrectPassword(password);
        if (!isValidPasswd) {
            throw new AuthenticationError('Something is wrong!');
        }
        const token = signToken(user);

        return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);

        return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
        if (context.user) {
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: true }
            );
        }
        throw new AuthenticationError('You need to have sesion. Please login');
    },
    removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
            const userDeleteBook =  User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
            return userDeleteBook;
        }
        throw new AuthenticationError('You need to have sesion. Please login');
    },
},
};

module.exports = resolvers;