const { gql } = require('apollo-server');

const typeDefs = gql`
  type Vacancy {
      _id: ID!
      title: String
      description: String
      expiredAt: String
  }

  type deleteResponse {
    ok: Int
    deletedCount: Int
  }

  type createOrUpdateResponse {
    ok: Int
    vacancy: Vacancy
  }

  input VacancyInput {
    title: String
    description: String
    expiredAt: String
  }

  type Query {
    getVacancies: [Vacancy]
    login(username:String, password:String):String
  }

  type Mutation{
    createVacancy(input: VacancyInput): createOrUpdateResponse
    updateVacancy(id:String, input:VacancyInput): createOrUpdateResponse
    deleteVacancy(id:String): deleteResponse
  }
`;

module.exports = typeDefs;