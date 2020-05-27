'use strict';

const Admin = require('../models/admin');
const Boom = require('@hapi/boom');

const Admins = {
  find: {
    auth: false,
    handler: async function(request, h) {
      const admins = await Admin.find();
      return admins;
    }
  },
  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const admin = await Admin.findOne({ _id: request.params.id });
        if (!admin) {
          return Boom.notFound('No Admin with this id');
        }
        return admin;
      } catch (err) {
        return Boom.notFound('No Admin with this id');
      }
    }
  },
  create: {
    auth: false,
    handler: async function(request, h) {
      const newAdmin = new Admin(request.payload);
      const admin = await newAdmin.save();
      if (admin) {
        return h.response(admin).code(201);
      }
      return Boom.badImplementation('error creating admin');
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await Admin.remove({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      const response = await Admin.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }
};

module.exports = Admins;