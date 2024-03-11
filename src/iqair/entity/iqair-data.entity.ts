import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn
} from 'typeorm';

@Entity({ name: 'iqair_data' })
export class IQAirDataEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@Column()
	city: string;

	@Column()
	state: string;

	@Column()
	country: string;

	@Column({ type: 'double precision' })
	lat: number;

	@Column({ type: 'double precision' })
	lng: number;

	@CreateDateColumn({ type: 'timestamp' })
	ts: Date;

	@Column()
	aqius: number;

	@Column()
	mainus: string;

	@Column()
	aqicn: number;

	@Column()
	maincn: string;
}
