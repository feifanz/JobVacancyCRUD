import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VacancyModule } from './vacancy/vacancy.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';



@Module({
  imports: [VacancyModule,
    MongooseModule.forRoot('mongodb://localhost/PredictiveHire'),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
