const { AuthenticationError} = require('apollo-server');
module.exports = {
    Query: {    
      getVacancies: (_, __, {dataSources, user}) => {
        if(!user) throw new AuthenticationError('No query permission')
        return dataSources.vacancyAPI.getVacancyByCompanyId(user.customerId)
      },

      login: async (_, { username, password }, { dataSources }) => {
        const token = await dataSources.userAPI.login(username, password);
        return token
      }

    },

    Mutation:{
      createVacancy: async (_, {input}, {dataSources, user}) =>{
        if(!user || user.role != 'admin') throw new AuthenticationError('No creating permission')
        const createdVacancy = await dataSources.vacancyAPI.createVacancy({...input,'companyId':user.customerId})
        return {ok:1, vacancy:createdVacancy}
      },

      updateVacancy: async(_,{id, input},{dataSources,user}) =>{
        if(!user || user.role != 'admin') throw new AuthenticationError('No updating permission')
        vacancyPermission = await dataSources.vacancyAPI.checkVacancyPermission(user.customerId, id)
        if(!vacancyPermission) throw new AuthenticationError('No updating permission for this id')
        const oldVacancy = await dataSources.vacancyAPI.updateVacancy(id, {...input})
        return {ok:1, vacancy:oldVacancy}
      },
      deleteVacancy: async(_,{id},{dataSources,user}) =>{
        if(!user || user.role != 'admin') throw new AuthenticationError('No delete permission')
        vacancyPermission = await dataSources.vacancyAPI.checkVacancyPermission(user.customerId, id)
        if(!vacancyPermission) throw new AuthenticationError('No delete permission for this id')
        return await dataSources.vacancyAPI.deleteVacancy(id)
      }
    }
};

