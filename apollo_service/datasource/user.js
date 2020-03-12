const { RESTDataSource } = require('apollo-datasource-rest');
const JwtAuth = require('../auth/jwtAuth');

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.NEST_API || 'http://localhost:3000/';
  }

  async login(username, password) {
      try{
        const response = await this.get(`user/login?username=${username}&password=${password}`);
        const token = JwtAuth.generateToken(response)
        return token
      }catch(err){
        return 'login failed'
      }
  }

}

module.exports = UserAPI;