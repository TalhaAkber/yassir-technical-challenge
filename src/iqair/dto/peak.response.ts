import { IQAirDataEntity } from "../entity/iqair-data.entity";

export class PeakApiResponse {
    constructor (dataEntity: IQAirDataEntity | null) {
        if (dataEntity) {
            this.result = {
                city: dataEntity.city,
                state: dataEntity.state,
                country: dataEntity.country,
                aqius: dataEntity.aqius,
                iqair_timestamp: dataEntity.ts.toUTCString(),
                peak_pollution_str: `The overall peak pollution recorded in database on: '${dataEntity.created_at.toUTCString()}'`
            }
        } else {
            this.result = {
                city: null,
                state: null,
                country: null,
                aqius: null,
                iqair_timestamp: null,
                peak_pollution_str: 'no record found on the database'
            };
        }
    }
    result: {
        city: string | null;
        state: string | null;
        country: string | null;
        aqius: number | null;
        iqair_timestamp: string | null;
        peak_pollution_str: string;
    }
}
