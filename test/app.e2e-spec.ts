import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { iqAirMockResponse } from './mock/mock-data.response';
import { IQAirDataEntity } from '../src/iqair/entity/iqair-data.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { databaseProviders } from '../src/database/database.provider';
import { MockType, repositoryMockFactory } from './mock/repository-mock.factory';

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let axiosMock: AxiosMockAdapter;
	let repositoryMock: MockType<Repository<IQAirDataEntity>>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [
				{ provide: getRepositoryToken(IQAirDataEntity), useFactory: repositoryMockFactory },
			]
		}).compile();

		app = moduleFixture.createNestApplication();
		axiosMock = new AxiosMockAdapter(axios);
		axiosMock.onAny().reply(200, iqAirMockResponse); // I used onAny just for the showcase
		repositoryMock = moduleFixture.get(getRepositoryToken(IQAirDataEntity));
		await app.init();
	});

	it('/GET pollution - should return IQAir data for given coordinates', () => {
		return request(app.getHttpServer())
			.get('/pollution')
			.query({ latitude: 35.98, longitude: 140.33 })
			.expect(200)
			.then(response => {
				expect(response.body).toEqual({
					result: {
						pollution: {
							aqicn: 21,
							aqius: 29,
							maincn: "n2",
							mainus: "p2"
						}
					}
				})
			})
			;
	});

	it('/pollution/peak (GET)', () => {
		return request(app.getHttpServer())
			.get('/pollution/peak')
			.expect(200)
			.expect((res) => {
				expect(res.body).toBeDefined();
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
