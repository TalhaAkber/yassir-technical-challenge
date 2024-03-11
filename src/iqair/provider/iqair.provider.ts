import { DataSource } from 'typeorm';
import { IQAirDataEntity } from '../entity/iqair-data.entity';

export const IQAirProvider = [
	{
		provide: 'IQAIR_REPOSITORY',
		useFactory: (dataSource: DataSource) =>
			dataSource.getRepository(IQAirDataEntity),
		inject: ['DATA_SOURCE']
	}
];
