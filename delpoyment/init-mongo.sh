#!/bin/bash
mongo <<EOF

use PredictiveHire;

db.companies.insert({_id:ObjectId("507f191e810c19729de860ea"),name:"PredictiveHire",address:"15 Newton St"})
db.companies.insert({_id:ObjectId("507f191e810c19729de860eb"),name:"ANZ",address:"839 Collins St"})

db.users.insert({name:"Bob Markle", username:"bob", password:"bob", role:"user",customerId:ObjectId("507f191e810c19729de860ea")})
db.users.insert({name:"Mark Smith", username:"mark", password:"mark",role:"admin",customerId:ObjectId("507f191e810c19729de860ea")})
db.users.insert({name:"Ted Zhang", username:"ted", password:"ted", role:"admin",customerId:ObjectId("507f191e810c19729de860eb")})
db.users.insert({name:"Jack Zhang", username:"jack", password:"jack", role:"user",customerId:ObjectId("507f191e810c19729de860eb")})

db.vacancies.insert({title:"PredictiveHire Job Title", description:"description of that job", expiredAt:"2020-03-30 00:00:00", companyId:ObjectId("507f191e810c19729de860ea")})
db.vacancies.insert({title:"ANZ Job Title", description:"description of that job", expiredAt:"2020-03-30 00:00:00", companyId:ObjectId("507f191e810c19729de860eb")})



EOF