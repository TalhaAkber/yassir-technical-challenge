import { Test, TestingModule } from '@nestjs/testing';
import { ExternalIQAirService } from './external.iqair.service';

describe('ExternalIQAirService', () => {
	let service: ExternalIQAirService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ExternalIQAirService]
		}).compile();

		service = module.get<ExternalIQAirService>(ExternalIQAirService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should fetch IQAir data for given coordinates', async () => {
		const result = await service.getIQAirData(35.98, 140.33);
		expect(result).toBeDefined();
		// Add more assertions based on the actual response structure
	});

	it('should throw NotFoundException for invalid coordinates', async () => {
		await expect(service.getIQAirData(0, 0)).rejects.toThrowError(
			'No data found for the given coordinates.'
		);
	});
});
