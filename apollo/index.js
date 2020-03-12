const { ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const VacancyAPI = require('./datasource/vacancy');
const UserAPI = require('./datasource/user');
const JwtAuth = require('./auth/jwtAuth');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      if(token){
        try{
          const user = JwtAuth.verify(token)
          return { user };
        }catch(err){
          console.log(`parse token err: ${err.message}`)
        }
      }
    },
    dataSources: () => ({
        vacancyAPI: new VacancyAPI(),
        userAPI: new UserAPI()
    }) 
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

