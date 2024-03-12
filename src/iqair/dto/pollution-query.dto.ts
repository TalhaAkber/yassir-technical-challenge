import { IsNumber, IsNotEmpty, IsDecimal } from 'class-validator';

export class PollutionQueryDto {
    @IsNotEmpty()
    @IsDecimal()
    latitude: number;

    @IsNotEmpty()
    @IsDecimal()
    longitude: number;
}