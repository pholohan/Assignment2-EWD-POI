'use strict';

const Stadium = require('../models/stadium');
const Boom = require('@hapi/boom');

const Stadiums = {
  find: {
    auth: false,
    handler: async function(request, h) {
      const stadiums = await Stadium.find();
      return stadiums;
    }
  },
  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const stadium = await Stadium.findOne({ _id: request.params.id });
        if (!stadium) {
          return Boom.notFound('No Stadium with this id');
        }
        return stadium;
      } catch (err) {
        return Boom.notFound('No Stadium with this id');
      }
    }
  },
  create: {
    auth: false,
    handler: async function(request, h) {
      const newStadium = new Stadium(request.payload);
      const stadium = await newStadium.save();
      if (stadium) {
        return h.response(stadium).code(201);
      }
      return Boom.badImplementation('error creating stadium');
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await Stadium.remove({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      const response = await Stadium.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }
};

module.exports = Stadiums;