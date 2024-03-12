import { Controller, Get, Query } from '@nestjs/common';
import { ExternalIQAirService } from '../service/external.iqair.service';
import { IQAirResponse } from '../dto/iqair.response';
import { IQAirDataService } from '../service/iqair-data.service';
import { IQAirDataEntity } from '../entity/iqair-data.entity';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PeakApiResponse } from '../dto/peak.response';
import { PollutionQueryDto } from '../dto/pollution-query.dto';

@Controller('pollution')
@ApiTags('Pollution')
export class PollutionController {
	constructor(
		private readonly externalIqAirService: ExternalIQAirService,
		private readonly iqAirDataService: IQAirDataService
	) { }

	@Get()
	@ApiQuery({ name: 'latitude', description: 'Latitude of the location', type: Number, required: true })
	@ApiQuery({ name: 'longitude', description: 'Longitude of the location', type: Number, required: true })
	@ApiResponse({ status: 200, description: 'Successful response', type: IQAirResponse })
	async getPollutionData(@Query() query: PollutionQueryDto): Promise<IQAirResponse> {
		const { latitude, longitude } = query;
		const iqairResponse = await this.externalIqAirService.getIQAirData(latitude, longitude);
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