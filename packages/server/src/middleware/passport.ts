import passport from 'passport';
import { Strategy } from "passport-local";

import { User } from "../db";
import { UserInterface } from '../types';

const strategy = new Strategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({where: {username}});
            if (!user) {
                return done(null, null, {message: `No user found with ${username}`});
            }

            const isValidPassword = user?.comparePassword(password);
            if(!isValidPassword) {
                return done(null, null, {message: 'Password you\'ve entered was invalid'});
            }

            return done(null, user);
        } catch(err) {
            return done(err);
        }
    }
);

passport.serializeUser<UserInterface>((user, done) => done(null, user));
passport.deserializeUser<UserInterface>((user, done) => done(null, user));

passport.use(strategy);

export { passport };