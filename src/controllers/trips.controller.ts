import { Request, Response } from 'express';
import { UserTripService } from '../services/userTrip.service';
import { DriverTripService } from '../services/driverTrip.service';


export class TripsController{
    private userTrip: UserTripService;
    private driverTrip: DriverTripService;

    constructor() {
        this.userTrip = new UserTripService();
        this.driverTrip = new DriverTripService();
    }

    // Get all trips

    async getUserTrips(req: Request, res: Response) {
        try {
            const trips = await this.userTrip.getUserTrips();
            return res.status(200).json(trips);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getDriverTrips(req: Request, res: Response) {
        try {
            const trips = await this.driverTrip.getDriverTrips();
            return res.status(200).json(trips);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    // Get specific trip

    async getUserTripById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const trip = await this.userTrip.getUserTripById(parseInt(id));
            return res.status(200).json(trip);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getDriverTripById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const trip = await this.driverTrip.getDriverTripById(parseInt(id));
            return res.status(200).json(trip);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    // Create UserTrip

    // async createUserTrip(req: Request, res: Response) {
    //     try {
    //         const trip = await this.userTrip.createUserTrip(req.body);
    //         return res.status(201).json(trip);
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // }

    // Create DriverTrip

    async createDriverTrip(req: Request, res: Response) {
        try {
            const trip = await this.driverTrip.createDriverTrip(req.body);
            return res.status(201).json(trip);
        } catch (error) {
            return res.status(500).json(error);
        }
    }




}