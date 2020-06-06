'use strict';

const Stadium = require('../models/stadium');
const Boom = require('@hapi/boom');
const utils = require('./utils.js');

const Stadiums = {
  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const stadiums = await Stadium.find();
      return stadiums;
    }
  },

  findUserStadiums: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const userid = utils.getUserIdFromRequest(request);
      const userstadiums = await Stadium.find({contributer: userid});
      return userstadiums;
    }
  },

  findOne: {
    auth: {
      strategy: 'jwt',
    },
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
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const data = request.payload;
      const newStadium = new Stadium({
        name: data.name,
        county: data.county,
        capacity: data.capacity,
        province: data.province,
        stadiumURL: '',
        contributer: utils.getUserIdFromRequest(request)
      });
      const stadium = await newStadium.save();
      if (stadium) {
        return h.response(stadium).code(201);
      }
      return Boom.badImplementation('error creating stadium');
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await Stadium.remove({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
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