'use strict';

const User = require('../models/user');
const Admin = require('../models/admin');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

const ImageStore = require('../utils/image-store');

const Accounts = {
    index: {
        auth: false,
        handler: async function(request, h) {
            return h.view('main', { title: 'Welcome to GAA Stadiums' });
        }
    },

    showSignup: {
        auth: false,
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up for GAA Stadiums' });
        }
    },

    signup: {
        auth: false,
        validate: {
            payload: {
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string()
                    .email()
                    .required(),
                password: Joi.string().required()
            },
            options: {
                abortEarly: false,
            },
            failAction: function(request, h, error) {
                return h
                    .view('signup', {
                        title: 'Sign up error',
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },
        handler: async function(request, h) {
            try {
                const payload = request.payload;
                let user = await User.findByEmail(payload.email);
                if (user) {
                    const message = 'Email address is already registered';
                    throw Boom.badData(message);
                }
                const newUser = new User({
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: payload.password
                });
                user = await newUser.save();
                request.cookieAuth.set({id: user.id});
                return h.redirect('/home');
            }catch(err){
                return h.view('signup', { errors: [{ message: err.message }] });
            }
        },
        plugins: {
            disinfect: {
                disinfectPayload: true //Use of disinfectPayLoad to sanitize the inputs from Sign Up page
            }
        }
    },

  showLogin: {
        auth: false,
        handler: function(request, h) {
            return h.view('login', { title: 'Login to GAA Stadiums' });
        }
    },

    login: {
        auth: false,
        validate: {
            payload: {
                email: Joi.string()
                    .email()
                    .required(),
                password: Joi.string().required()
            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h
                    .view('login', {
                        title: 'Log In error',
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },
        handler: async function(request, h) {
            const { email, password } = request.payload;
            try {
                let user = await User.findByEmail(email);
                let admin = await Admin.findByEmail(email);
                if ((!user)&&(!admin)) {
                    const message = 'Email address is not registered';
                    throw Boom.unauthorized(message);
                }
                if(user) {
                    user.comparePassword(password);
                    request.cookieAuth.set({ id: user.id });
                    return h.redirect('/report');
                }
                else if(admin){
                    admin.comparePassword(password);
                    request.cookieAuth.set({ id: admin.id });
                    return h.redirect('/userreport');
                }
            } catch (err) {
                return h.view('login', { errors: [{ message: err.message }] });
            }
        },
        plugins: {
            disinfect: {
                disinfectPayload: true //Section 3.e Use of disinfectPayLoad to sanitize the inputs from Sign Up page
            }
        }
    },

    showSettings: {
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id).lean();
                return h.view('settings', {title: 'Edit Account Settings', user: user});
            }catch(err){
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },

    updateSettings: {
        validate: {
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string()
                        .email()
                        .required(),
                    password: Joi.string().required()
                },
                options: {
                    abortEarly: false
                },
                failAction: function(request, h, error) {
                    return h
                        .view('settings', {
                            title: 'Sign up error',
                            errors: error.details
                        })
                        .takeover()
                        .code(400);
                }
            },
        handler: async function(request, h) {
                try {
                    const userEdit = request.payload;
                    const id = request.auth.credentials.id;
                    const user = await User.findById(id);
                    user.firstName = userEdit.firstName;
                    user.lastName = userEdit.lastName;
                    user.email = userEdit.email;
                    user.password = userEdit.password;
                    await user.save();
                    return h.redirect('/settings');
                } catch (err) {
                    return h.view('main', { errors: [{ message: err.message }] });
                }
            },
        plugins: {
            disinfect: {
                disinfectPayload: true //Use of disinfectPayLoad to sanitize the inputs from Sign Up page
            }
        }
        },

    userreport: {
        handler: async function(request, h) {
            const users = await User.find().lean();
            return h.view('userreport', {
                title: 'Users Added to Date',
                users: users,
            });
        }
    },

    deleteUser: {
        handler: async function(request, h) {
            try {
                const id = request.params.id;
                const user = await User.findById(id).lean();
                await User.deleteOne(user);
                return h.redirect('/userreport');
            }catch(err){
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },

    adminshowSettings: {
        handler: async function(request, h) {
            try {
                const id = request.params.id;
                const user = await User.findById(id).lean();
                return h.view('adminsettings', {title: 'Edit Account Settings', user: user});
            }catch(err){
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },

    adminupdateSettings: {
        validate: {
            payload: {
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string()
                  .email()
                  .required(),
                password: Joi.string().required()
            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h
                  .view('settings', {
                      title: 'Sign up error',
                      errors: error.details
                  })
                  .takeover()
                  .code(400);
            }
        },
        handler: async function(request, h) {
            try {
                const userEdit = request.payload;
                const id = request.params.id;
                const user = await User.findById(id);
                user.firstName = userEdit.firstName;
                user.lastName = userEdit.lastName;
                user.email = userEdit.email;
                user.password = userEdit.password;
                await user.save();
                return h.redirect('/userreport');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        },
        plugins: {
            disinfect: {
                disinfectPayload: true //Section 3.e Use of disinfectPayLoad to sanitize the inputs from Sign Up page
            }
        }
    },


    logout: {
        handler: function(request, h) {
            request.cookieAuth.clear();
            return h.redirect('/');
        }
    }
};

module.exports = Accounts;