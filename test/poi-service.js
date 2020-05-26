'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000';

class POIService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getStadiums() {
    const response = await axios.get(this.baseUrl + '/api/stadiums');
    return response.data;
  }

  async getStadium(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/stadiums/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createStadium(newCandidate) {
    const response = await axios.post(this.baseUrl + '/api/stadium', newStadium);
    return response.data;
  }

  async deleteAllStadiums() {
    const response = await axios.delete(this.baseUrl + '/api/stadiums');
    return response.data;
  }

  async deleteOneStadium(id) {
    const response = await axios.delete(this.baseUrl + '/api/stadium/' + id);
    return response.data;
  }

  async getUsers() {
    const response = await axios.get(this.baseUrl + '/api/users');
    return response.data;
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    const response = await axios.post(this.baseUrl + '/api/users', newUser);
    return response.data;
  }

  async deleteAllUsers() {
    const response = await axios.delete(this.baseUrl + '/api/users');
    return response.data;
  }

  async deleteOneUser(id) {
    const response = await axios.delete(this.baseUrl + '/api/users/' + id);
    return response.data;
  }

}

module.exports = POIService;