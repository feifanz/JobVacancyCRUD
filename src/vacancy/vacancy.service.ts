import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Vacancy} from './interfaces/vacancy.interface'
import {CreateVacancyDto} from './dto/create-vacancy.dto'
import {UpdateVacancyDto} from './dto/update-vacancy.dto'

@Injectable()
export class VacancyService {
  constructor(@InjectModel('Vacancy') private readonly vacancyModel: Model<Vacancy>) {}
  /*fetch data*/
  async findAll(): Promise<Vacancy[]> {
    return this.vacancyModel.find().exec();
  }

  async findByCompanyId(companyId: String): Promise<Vacancy[]> {
    console.log(companyId)
    return this.vacancyModel.find({'companyId':companyId}).exec();
  }

  async findById(id: String): Promise<Vacancy> {
    return this.vacancyModel.findById(id);
  }


  /*create*/
  async create(createVacancyDto:CreateVacancyDto ): Promise<Vacancy> {
    const createdCat = new this.vacancyModel(createVacancyDto);
    return createdCat.save();
  }

  /*update*/
  async update(id:String, updateVacancyDto:UpdateVacancyDto): Promise<Vacancy> {
   return this.vacancyModel.findByIdAndUpdate(id, updateVacancyDto)
  }


  /*delete*/
  async delete(id:String): Promise<Vacancy> {
    return this.vacancyModel.deleteOne({'_id':id})
   }

}
