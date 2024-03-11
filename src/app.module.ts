import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PollutionController } from './iqair/controller/pollution.controller';
import { ExternalIQAirService } from './iqair/service/external.iqair.service';
import { IQAirProvider } from './iqair/provider/iqair.provider';
import { IQAirJob } from './iqair/job/iqair.job';
import { databaseProviders } from './database/database.provider';
import { IQAirDataService } from './iqair/service/iqair-data.service';

@Module({
	imports: [ScheduleModule.forRoot()],
	controllers: [PollutionController],
	providers: [ExternalIQAirService, IQAirDataService, IQAirJob, ...databaseProviders, ...IQAirProvider]
})
export class AppModule { }
