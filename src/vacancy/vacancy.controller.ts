import { Controller, Get, Post, Body, Param, Put,Delete ,Query} from '@nestjs/common';
import {VacancyService} from './vacancy.service'
import {Vacancy} from './interfaces/vacancy.interface'
import {CreateVacancyDto} from './dto/create-vacancy.dto'
import {UpdateVacancyDto} from './dto/update-vacancy.dto'

@Controller('vacancy')
export class VacancyController {
    constructor(private readonly vacancyService: VacancyService){}

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Vacancy>{
        return this.vacancyService.findById(id)
    }

    @Get()
    async findByCompanyId(@Query('companyId') companyId): Promise<Vacancy[]> {
        if(companyId != undefined){
            return this.vacancyService.findByCompanyId(companyId)
        }else{
            return this.vacancyService.findAll()
        }
    }
    
    @Post()
    async create(@Body() createVacancyDto: CreateVacancyDto): Promise<Vacancy>{
        return this.vacancyService.create(createVacancyDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto): Promise<Vacancy>{
      return this.vacancyService.update(id, updateVacancyDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.vacancyService.delete(id);
    }

}