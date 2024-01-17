import { Repository } from "typeorm";
import { AppDataSource } from "../app-data-source";
import { Trip } from '../entities/trip/trips.entity';

export class TripsService{

    private repository: Repository<Trip>;

    constructor() {
        this.repository = AppDataSource.getRepository(Trip);
    }

    async getTrips() {
        try {
            const trips = await this.repository.find();
            return trips;
        } catch (error) {
            throw error;
        }
    }

    async getTripById(id: number) {
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

    async addUsersToTrip(id: number, passengers: string[]) {
        try {
            const trip = await this.repository.findOneBy({ id });
            if (!trip) {
                throw new Error('Trip not found');
            }

            const updatedTrip = await this.repository.update(id, { passengers });
            return updatedTrip;
        } catch (error) {
            throw error;
        }
    }

    async createTrip(tripData: { driver: string; passengers: string[]; startLocation: string; endLocation: string, startTime: string, endTime: string, date: string }) {
        try {
            const trip = {
                ...tripData,
                createdBy: "admin",
                updatedBy: "admin",
                createdAt: new Date(),
                updatedAt: new Date()
            }

           const newTrip = this.repository.create(trip);
            const savedTrip = await this.repository.save(newTrip);
            return savedTrip;
        } catch (error) {
            throw error;
        }
    }

    async updateTrip(id: number, updateData: Partial<Trip>) {
        try {
            const tripExist = await this.repository.findOneBy({ id });
            if (!tripExist) {
                throw new Error('Trip not found');
            }

            const trip = {
                ...tripExist,
                updatedBy: "admin",
                updatedDate: new Date()
            }

            const updatedTrip = await this.repository.update(id, updateData);
            return updatedTrip;
        } catch (error) {
            throw error;
        }
    }

    async deleteTrip(id: number) {
        try {
            const trip = await this.repository.findOneBy({ id });
            if (!trip) {
                throw new Error('Trip not found');
            }

            await this.repository.delete({ id });
            return { message: 'Trip deleted successfully' };
        } catch (error) {
            throw error;
        }
    }

}