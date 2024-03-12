import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { IQAirData } from '../model/iqair-data.model';
import axios from 'axios';
import { environment } from '../../environment/environment';

@Injectable()
export class ExternalIQAirService {
	private readonly base_url = environment.iqair.base_url;
	private readonly key = environment.iqair.key;
	async getIQAirData(
		latitude: number,
		longitude: number
	): Promise<IQAirData> {
		try {
			const response: AxiosResponse<IQAirData> = await axios.get(
				`${this.base_url}/nearest_city?lat=${latitude}&lon=${longitude}&key=${this.key}`
			);
			return response.data;
		} catch (error) {
			throw new NotFoundException(
				'No data found for the given coordinates.'
			);
		}
	}
}
