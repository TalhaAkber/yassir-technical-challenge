import { Controller, Get, Query } from '@nestjs/common';
import { ExternalIQAirService } from '../service/external.iqair.service';
import { IQAirResponse } from '../dto/iqair.dto';
import { IQAirDataService } from '../service/iqair-data.service';
import { IQAirDataEntity } from '../entity/iqair-data.entity';

@Controller('pollution')
export class PollutionController {
	constructor(
		private readonly externalIqAirService: ExternalIQAirService,
		private readonly iqAirDataService: IQAirDataService
	) { }

	@Get()
	async getPollutionData(
		@Query('latitude') lat: number,
		@Query('longitude') long: number
	): Promise<IQAirResponse> {
		const iqairResponse = await this.externalIqAirService.getIQAirData(lat, long);
		return {
			result: {
				pollution: iqairResponse.data.current.pollution
			}
		};
	}

	@Get('peak')
	async getPeakDateTime(): Promise<IQAirDataEntity | null> {
		const mostPollutedDateTime = await this.iqAirDataService.getMostPollutedDateTime();
		return mostPollutedDateTime;
	}
}
