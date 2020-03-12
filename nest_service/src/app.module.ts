import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VacancyModule } from './vacancy/vacancy.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

const mongo_url:String = process.env.MONGO_URL || "localhost"
console.log(`mongodb url: ${mongo_url}`)

@Module({
  imports: [VacancyModule,
    MongooseModule.forRoot(`mongodb://${mongo_url}/PredictiveHire`),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
