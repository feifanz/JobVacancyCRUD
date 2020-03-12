#### How to Run
- cd to the delpoyment folder
- run ```$ sh ./build-images.sh``` to build docker images
- run ```$ docker-compose up``` to start three services, which are
	- mongodb service: 127.0.0.1:27017
	- apollo graphql service: 127.0.0.1:4000
	- nest.js Restful service: 127.0.0.1:3000


#### 1. apollo graphql service

##### Playground Url
- http://127.0.0.1:4000/
- login first to get the authorization token
- add this authorization token to http header with every query
  {"authorization": {your authorization token} }

##### Authentication and Authorization Rule
- user role can view vacanies belong to his company
- admin role can view, create, update, delete vacanies belong to his company
- users don't no have any access to vacancies belong to other companies

##### Schema
```
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
    // get vacancies belong to current user
    getVacancies: [Vacancy]
	// login, return auth token if success
    login(username:String, password:String):String
  }

  type Mutation{
    // admin role
    createVacancy(input: VacancyInput): createOrUpdateResponse
	// admin role, user belongs to this vacancy's company
    updateVacancy(id:String, input:VacancyInput):  createOrUpdateResponse
	// admin role, user belongs to this vacancy's company
    deleteVacancy(id:String): deleteResponse
  }
```



#### 2. nest.js restful service
##### User api:
| Funtion | Type | Url|
| ------ | ------ | ------ |
| user login |get|/user/login?username={username}&password={password}
##### Job vacancy api:
| Funtion | Type | Url|
| ------ | ------ | ------ |
| get vacancy by id |get|/vacancy/:vacancyId
|get vacancies by company id|get|/vacancy?compnayId={compnayId}
|create a new vacancy|post|/vacancy,  body={ title: String, description: String, companyId:String, expiredAt:String (2020-03-30 00:00:00)}
|update a vacancy|put|/vacancy/:vacancyId,  body={ title: String, description: String, companyId:String, expiredAt: String (2020-03-30 00:00:00)}
|delete a vacancy|delete|/vacancy/:vacancyId


#### 3. mongodb service
- There are total three collections:
	- companies: { name:string ,address:string }
	- users: { name:string, username:string, password:string, role:(admin | user), customerId:ObjectId}
	- vacancies: { title:string, description:string, expiredAt:datetime, companyId:ObjectId}
- some sample data have been inserted
