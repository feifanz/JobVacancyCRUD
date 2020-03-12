const { RESTDataSource } = require('apollo-datasource-rest');
const { UserInputError} = require('apollo-server');

class VacancyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/';
  }

    // leaving this inside the class to make the class easier to test
    vacancyReducer(vacancy) {
      return {
        _id: vacancy._id || 0,
        title: vacancy.title,
        description: vacancy.description,
        expiredAt: vacancy.expiredAt
      };
    }
  
  async checkVacancyPermission(customerId, vacancyId) {
    const response = await this.get(`vacancy/${vacancyId}`);
    if(!response) throw new UserInputError('invalid vacancy id')
    return response.companyId == customerId
  }

  async getVacancyByCompanyId(companyId) {
    const response = await this.get('vacancy',{"companyId":companyId});
    return Array.isArray(response)
      ? response.map(launch => this.vacancyReducer(launch))
      : [];
  }

  async createVacancy(vacancy){
    const response = await this.post('vacancy',{...vacancy});
    return response
  }

  async updateVacancy(id, vacancy){
    const response = await this.put(`vacancy/${id}`, {...vacancy})
    return response
  }

  async deleteVacancy(id){
    const response = await this.delete(`vacancy/${id}`)
    return response
  }

}

module.exports = VacancyAPI;