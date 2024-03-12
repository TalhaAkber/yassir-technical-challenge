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
        const peakPollutionData = await this.iqAirRepository.findOne({
            where: {},
            order: {
                aqius: 'DESC', // Assuming 'aqius' is a field representing air pollution level
            },
        });
        /* 
            Assuming I am wrong here, because I couldnt understand the optional part, maybe english is a bit weird in the challenge. 
            then there is a way to get the peak hour pollution time based

                SELECT
                    DATE_FORMAT(created_at, '%H:00:00') AS hour,
                    AVG(aqius) AS average_aqius
                FROM
                    iqair_data
                GROUP BY
                    hour
                ORDER BY
                    average_aqius DESC
                LIMIT 1;

            It will give us in which hour the peak pollution, we can add where clause to filter the city before group by 
        */
        return peakPollutionData;
    }
}
