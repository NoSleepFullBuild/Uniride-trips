import { Repository } from "typeorm";
import { UserTrip } from "../entities/userTrip.entity";
import { AppDataSource } from "../app-data-source";
import axios from "axios";
import { CalculService } from "./calcul.service";

const GATEWAY_URL = "http://localhost:3002/api/gateway/"

export class UserTripService {

    private repository: Repository<UserTrip>;
    private calculService: CalculService;

    constructor() {
        this.repository = AppDataSource.getRepository(UserTrip);
        this.calculService = new CalculService();
    }

    async getUserTrips() {
        try {
            const trips = await this.repository.find();
            return trips;
        } catch (error) {
            throw error;
        }
    }

    async getUserTripById(id: number)
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

    async createUserTrip(tripData: Partial<UserTrip>, token: string) {
        
        const userResponse = await axios.get(`${GATEWAY_URL}users/${tripData.userId}`, { headers: { Authorization: `Bearer ${token}` } });
        if (userResponse.status !== 200) {
            throw new Error('User not found');
        }

        const driverResponse = await axios.get(`${GATEWAY_URL}drivers/${tripData.driverId}`, { headers: { Authorization: `Bearer ${token}` } });
        if (driverResponse.status !== 200) {
            throw new Error('Driver not found');
        }

        const distance = await this.calculService.getDistance(tripData.startLocation, tripData.endLocation);
        const price = this.calculService.calculatePriceForMeters(distance);

        const newTrip = this.repository.create({ ...tripData, distance, price });

        console.log(newTrip)
    }

    async updateUserTrip(id: number, tripData: Partial<UserTrip>) {
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

    async deleteUserTrip(id: number) {
        try {
            const trip = await this.repository.findOneBy({ id });
            if (!trip) {
                throw new Error('Trip not found');
            }

            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }
    
}