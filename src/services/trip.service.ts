import { Repository } from 'typeorm';
import {  Trip } from '../entities/trip.entity';
import { AppDataSource } from '../app-data-source';
import { CalculService } from './calcul.service';

export class TripService {

    private repository: Repository<Trip>;
    public calculService: CalculService;

    constructor() {
        this.repository = AppDataSource.getRepository(Trip);
        this.calculService = new CalculService();
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

    async createTrip(tripData: { 
        driver: string; 
        passengers: string[]; 
        latitudeStartLocation: number; 
        longitudeStartLocation: number; 
        latitudeEndLocation: number; 
        longitudeEndLocation: number; 
        startTime: string; 
        endTime: string; 
        date: string; 
    }) {
        try {
            if (tripData.startTime > tripData.endTime) {
                throw new Error('Start time must be less than end time');
            }

            if (tripData.date < new Date().toISOString().split('T')[0]) {
                throw new Error('Date must be greater than or equal to today');
            }

            // Correction de la vérification des coordonnées de localisation
            if (tripData.latitudeStartLocation === tripData.latitudeEndLocation && tripData.longitudeStartLocation === tripData.longitudeEndLocation) {
                throw new Error('Start location and end location must be different');
            }

            // Adaptation pour calculer la distance correctement
            const distance = this.calculService.calculateDistance(
                tripData.latitudeStartLocation, 
                tripData.longitudeStartLocation, 
                tripData.latitudeEndLocation, 
                tripData.longitudeEndLocation
            );

            const price = this.calculService.calculatePriceForMeters(distance);

            const trip = {
                ...tripData,
                price,
                distance,
                passengers: [],
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

    async joinTrip(tripId: number, passengerId: number): Promise<Trip> {
        try {

            const trip = await this.repository.findOneBy({ id: tripId });
            if (!trip) {
                throw new Error('Trip not found');
            }

            if (trip.seats < 1) {
                throw new Error('No available seats');
            }

            trip.passengers.push(passengerId);
            trip.seats -= 1; 

            const updatedTrip = await this.repository.save(trip);
            return updatedTrip;
            
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

    async getTripsByPassengerId(passengerId: number) {
        try {
            const trips = await this.repository.find({ where: { passengers: passengerId } });
            return trips;
        } catch (error) {
            throw error;
        }
    }

    async getPassengersByTripId(tripId: number) {
        try {
            const trip = await this.repository.findOneBy({ id: tripId });
            if (!trip) {
                throw new Error('Trip not found');
            }
            return trip.passengers;
        } catch (error) {
            throw error;
        }
    }

    async getTripsByDriverId(driverId: number) {
        try {
            const trips = await this.repository.find({ where: { userId: driverId } });
            return trips;
        } catch (error) {
            throw error;
        }
    }

}