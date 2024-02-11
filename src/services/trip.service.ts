import { Not, Repository } from 'typeorm';
import {  Trip } from '../entities/trip.entity';
import { AppDataSource } from '../app-data-source';
import { CalculService } from './calcul.service';

import { areEqual } from './utils.service';
import { BaseDTO } from '../entities/dto/trip.create.dto';


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

    async getTripsExceptUser(userId: number) {
        try {
            const trips = await this.repository.find({ where: { userId: Not(userId) } });
            return trips;
        } catch (error) {
            throw error;
        }
    }
    $

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

    async createTrip(tripData: BaseDTO) {

        try {
            if (tripData.data.startTime > tripData.data.endTime) {
                throw new Error('Start time must be less than end time');
            }

            if (tripData.data.date < new Date().toISOString().split('T')[0]) {
                throw new Error('Date must be greater than or equal to today');
            }

            if (areEqual(tripData.data.latitudeStartLocation, tripData.data.latitudeEndLocation)) {
                throw new Error('Start and end latitide location must not be the same');
            }

            if (areEqual(tripData.data.longitudeStartLocation, tripData.data.longitudeEndLocation)) {
                throw new Error('Start and end longitude location must not be the same');
            }

            // Adaptation pour calculer la distance correctement
            const distance = this.calculService.calculateDistance(
                tripData.data.latitudeStartLocation, 
                tripData.data.longitudeStartLocation, 
                tripData.data.latitudeEndLocation, 
                tripData.data.longitudeEndLocation
            );

            const price = this.calculService.calculatePriceForMeters(distance);

            const trip = {
                ...tripData.data,
                userId: tripData.metadata.user.id,
                price,
                distance,
                passengers: [],
                createdBy: tripData.metadata.user.email,
                updatedBy: tripData.metadata.user.email,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const newTrip = this.repository.create(trip);
            const savedTrip = await this.repository.save(newTrip);
            return savedTrip;

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async joinTrip(tripId: number, userId: number): Promise<Trip> {
        try {

            // Verify is the user does not join his own trip, check userId and tripId
            const tripExist = await this.repository.findOneBy({ id: tripId, userId });
            if(tripExist) {
                throw new Error('You cannot join your own trip');
            }

            const trip = await this.repository.findOneBy({ id: tripId });
            if (!trip) {
                throw new Error('Trip not found');
            }

            if (trip.seats < 1) {
                throw new Error('No available seats');
            }

            trip.passengers.push(userId);
            trip.seats -= 1; 

            const updatedTrip = await this.repository.save(trip);
            return updatedTrip;
            
        } catch (error) {
            throw error;
        }
    }

    
    async updateTrip(id: number, updateData: Partial<BaseDTO>) {

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

            const updatedTrip = await this.repository.update(id, updateData.data);
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