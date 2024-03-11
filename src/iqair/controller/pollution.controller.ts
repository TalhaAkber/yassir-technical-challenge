import { Controller, Get, Query } from '@nestjs/common';
import { ExternalIQAirService } from '../service/external.iqair.service';
import { IQAirResponse } from '../dto/iqair.response';
import { IQAirDataService } from '../service/iqair-data.service';
import { IQAirDataEntity } from '../entity/iqair-data.entity';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PeakApiResponse } from '../dto/peak.response';

@Controller('pollution')
@ApiTags('Pollution')
export class PollutionController {
	constructor(
		private readonly externalIqAirService: ExternalIQAirService,
		private readonly iqAirDataService: IQAirDataService
	) { }

	@Get()
	@ApiQuery({ name: 'latitude', description: 'Latitude of the location', type: Number })
	@ApiQuery({ name: 'longitude', description: 'Longitude of the location', type: Number })
	@ApiResponse({ status: 200, description: 'Successful response', type: IQAirResponse })
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
	@ApiResponse({ status: 200, description: 'Successful response', type: PeakApiResponse })
	@ApiResponse({ status: 404, description: 'No data found' })
	async getPeakDateTime(): Promise<PeakApiResponse> {
		const peakPollutionRecord = await this.iqAirDataService.peakPollutionRecord();
		return new PeakApiResponse(peakPollutionRecord)
	}
}