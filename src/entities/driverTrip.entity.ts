import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@nosleepfullbuild/uniride-library/dist/entity/base.entity';

// Enum for the status of the trip
export enum TripStatus {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}

@Entity()
export class DriverTrip extends BaseEntity {

    @Column({ type: 'int'})
    userId: number;

    @Column({ type: 'int'})
    driverId: number;

    @Column({ type: 'varchar', length: 255 })
    startLocation: string;

    @Column({ type: 'varchar', length: 255 })
    endLocation: string;

    @Column({ type: 'varchar', length: 255 })
    startTime: string;

    @Column({ type: 'varchar', length: 255 })
    endTime: string;

    @Column({ type: 'varchar', length: 255 })
    date: string;

    @Column({ type: 'int'})
    price: number;

    @Column({ type: 'int' })
    distance: number;

    @Column({ type: 'enum', enum: TripStatus, default: TripStatus.ACCEPTED })
    status: TripStatus;
}
