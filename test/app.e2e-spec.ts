import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/GET iqair - should return IQAir data for given coordinates', () => {
		return request(app.getHttpServer())
			.get('/iqair')
			.query({ lat: 35.98, lon: 140.33 })
			.expect(200)
			.expect((response) => {
				expect(response.body).toBeDefined();
			});
	});

	it('/iqair/most-polluted-date-time (GET)', () => {
		return request(app.getHttpServer())
			.get('/iqair/most-polluted-date-time')
			.expect(200)
			.expect((res) => {
				const { mostPollutedDateTime } = res.body;
				expect(mostPollutedDateTime).toBeDefined();
			});
	});


	afterAll(async () => {
		await app.close();
	});
});
