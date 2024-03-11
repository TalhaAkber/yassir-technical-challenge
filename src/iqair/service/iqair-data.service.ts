import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IQAirDataEntity } from '../entity/iqair-data.entity';

@Injectable()
export class IQAirDataService {
    constructor(
        @Inject('IQAIR_REPOSITORY')
        private iqAirRepository: Repository<IQAirDataEntity>,
    ) { }

    async peakPollutionRecord(): Promise<IQAirDataEntity | null> {
        const mostPollutedData = await this.iqAirRepository.findOne({
            where: {},
            order: {
                aqius: 'DESC', // Assuming 'aqius' is a field representing air pollution level
            },
        });

        return mostPollutedData;
    }
}
