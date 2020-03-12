import * as mongoose from 'mongoose';

export const VacancySchema = new mongoose.Schema({
  title: String,
  description: String,
  expiredAt: Date,
  companyId:mongoose.Schema.ObjectId
});