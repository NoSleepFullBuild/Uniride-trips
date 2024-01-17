import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@nosleepfullbuild/uniride-library/dist/entity/base.entity';
import { User } from '../users/users.entity';

@Entity()
export class Trip extends BaseEntity {

    @Column({ type: 'varchar', length: 255 })
    driver: string;
    
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

    // List of passengers, stored as a stringified array of user IDs of passengers
    @Column({ type: 'array', default: [] })
    passengers: Array<Number>;
    
    

    
   

    
}