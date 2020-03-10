import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {VacancyController} from './vacancy.controller'
import {VacancySchema} from './schemas/vacancy.schema'
import {VacancyService} from './vacancy.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Vacancy', schema: VacancySchema }])],
    controllers: [VacancyController],
    providers: [VacancyService]
})
export class VacancyModule {}
