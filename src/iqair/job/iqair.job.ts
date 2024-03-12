import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ExternalIQAirService } from '../service/external.iqair.service';
import { IQAirData } from '../model/iqair-data.model';
import { Repository } from 'typeorm';
import { IQAirDataEntity } from '../entity/iqair-data.entity';

@Injectable()
export class IQAirJob {
	
	constructor(
		@Inject('IQAIR_REPOSITORY')
		private iqAirRepository: Repository<IQAirDataEntity>,
		private readonly iqAirService: ExternalIQAirService
	) { }
	private readonly coordinates = [{ lat: 48.856613, lon: 2.352222 }]; // Can be more for different cities

	@Cron(CronExpression.EVERY_MINUTE)
	async handleCron(): Promise<void> {
		for (const { lat, lon } of this.coordinates) {
			try {
				const response: IQAirData =
					await this.iqAirService.getIQAirData(lat, lon);

				const iqAirDataEntity = new IQAirDataEntity();
				iqAirDataEntity.city = response.data.city;
				iqAirDataEntity.state = response.data.state;
				iqAirDataEntity.country = response.data.country;
				iqAirDataEntity.lat = lat;
				iqAirDataEntity.lng = lon;
				iqAirDataEntity.ts = new Date(response.data.current.weather.ts);
				iqAirDataEntity.aqius = response.data.current.pollution.aqius;
				iqAirDataEntity.mainus = response.data.current.pollution.mainus;
				iqAirDataEntity.aqicn = response.data.current.pollution.aqicn;
				iqAirDataEntity.maincn = response.data.current.pollution.maincn;
				await this.iqAirRepository.save(iqAirDataEntity);
			} catch (error) {
				// TODO: report to sentry ?? log it somewhere for alert
				console.error(
					`Error fetching data for coordinates (${lat}, ${lon}):`,
					error.message
				);
			}
		}
	}
}
