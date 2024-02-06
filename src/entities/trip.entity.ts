import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@nosleepfullbuild/uniride-library/dist/entity/base.entity';

// Enum for the status of the trip

export enum TripStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}

@Entity()
export class Trip extends BaseEntity {

    @Column({ type: 'int'})
    userId: number;
    
    @Column({ type: 'float'})
    latitudeStartLocation: number;

    @Column({ type: 'float'})
    longitudeStartLocation: number;

    @Column({ type: 'float'})
    latitudeEndLocation: number;

    @Column({ type: 'float'})
    longitudeEndLocation: number;

    @Column({ type: 'varchar', length: 255 })
    startTime: string;

    @Column({ type: 'varchar', length: 255 })
    endTime: string;

    @Column({ type: 'varchar', length: 255 })
    date: string;

    @Column({ type: 'float'})
    price: number;

    @Column({ type: 'float' })
    distance: number;

    @Column({ type: 'int'})
    seats: number;

    // Passengers is an array of user ids, is max size is the number of seats
    @Column({ type: 'simple-array', nullable: true })
    passengers: number[];

    // status of the trip, an ENUM
    @Column({ type: 'enum', enum: TripStatus, default: TripStatus.PENDING })
    status: TripStatus;
}