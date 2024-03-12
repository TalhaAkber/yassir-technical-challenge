import { environment } from '../environment/environment';
import { DataSource } from 'typeorm';

export const databaseProviders = [
	{
		provide: 'DATA_SOURCE',
		useFactory: async () => {
			const dataSource = new DataSource({
				type: environment.database.type,
				host: environment.database.host,
				port: environment.database.port,
				username: environment.database.username,
				password: environment.database.password,
				database: environment.database.database,
				entities: [__dirname + '/../**/*.entity{.ts,.js}'],
				synchronize: true
			});

			return dataSource.initialize();
		}
	}
];
