import { Repository } from "typeorm";
import { DriverTrip } from "../entities/driverTrip.entity";
import { AppDataSource } from "../app-data-source";

export class DriverTripService {
    
    private repository: Repository<DriverTrip>;

    constructor() {
        this.repository = AppDataSource.getRepository(DriverTrip);
    }

    async getDriverTrips() {
        try {
            const trips = await this.repository.find();
            return trips;
        } catch (error) {
            throw error;
        }
    }

    async getDriverTripById(id: number)
    {
        try {
            const trip = await this.repository.findOneBy({ id });
            if (!trip) {
                throw new Error('Trip not found');
            }
            return trip;
        } catch (error) {
            throw error;
        }
    }

    async createDriverTrip(tripData: Partial<DriverTrip>) {
        try {
            const newTrip = this.repository.create(tripData);
            await this.repository.save(newTrip);
            return newTrip;
        } catch (error) {
            throw error;
        }
    }

    async updateDriverTrip(id: number, tripData: Partial<DriverTrip>) {
        try {
            const trip = await this.repository.findOneBy({ id });
            if (!trip) {
                throw new Error('Trip not found');
            }

            const updatedTrip = await this.repository.update(id, tripData);
            return updatedTrip;
        } catch (error) {
            throw error;
        }
    }

    async deleteDriverTrip(id: number) {
        try {
            const trip = await this.repository.findOneBy({ id });
            if (!trip) {
                throw new Error('Trip not found');
            }

            await this.repository.delete(id);
            return trip;
        } catch (error) {
            throw error;
        }
    }
}