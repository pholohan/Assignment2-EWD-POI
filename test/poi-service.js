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

  async getUserStadiums() {
    const response = await axios.get(this.baseUrl + '/api/userstadiums');
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

  async createStadium(newStadium) {
    const response = await axios.post(this.baseUrl + '/api/stadiums', newStadium);
    return response.data;
  }

  async deleteAllStadiums() {
    const response = await axios.delete(this.baseUrl + '/api/stadiums');
    return response.data;
  }

  async deleteOneStadium(id) {
    const response = await axios.delete(this.baseUrl + '/api/stadiums/' + id);
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

  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users/authenticate', user);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth(user) {
    axios.defaults.headers.common['Authorization'] = '';
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
  async getAdmins() {
    const response = await axios.get(this.baseUrl + '/api/admins');
    return response.data;
  }

  async getAdmin(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/admins/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createAdmin(newAdmin) {
    const response = await axios.post(this.baseUrl + '/api/admins', newAdmin);
    return response.data;
  }

  async deleteAllAdmins() {
    const response = await axios.delete(this.baseUrl + '/api/admins');
    return response.data;
  }

  async deleteOneAdmin(id) {
    const response = await axios.delete(this.baseUrl + '/api/admins/' + id);
    return response.data;
  }

}

module.exports = POIService;