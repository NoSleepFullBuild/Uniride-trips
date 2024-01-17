import { Request, Response } from 'express';
import { TripsService } from "../services/trips.service";

export class TripsController{
    private tripsService: TripsService;
    constructor() {
        this.tripsService = new TripsService();
    }

    async getTrips(req: Request, res: Response) {
        try {
            const trips = await this.tripsService.getTrips();
            res.status(200).json(trips);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getTripById(req: Request, res: Response) {
        try {
            const trip = await this.tripsService.getTripById(parseInt(req.params.id));
            if (trip) {
                res.status(200).json(trip);
            } else {
                res.status(404).json({ error: 'Trip not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createTrip(req: Request, res: Response) {
        try {
            const trip = await this.tripsService.createTrip(req.body);
            res.status(201).json(trip);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateTrip(req: Request, res: Response) {
        try {
            const trip = await this.tripsService.updateTrip(parseInt(req.params.id), req.body);
            if (trip) {
                res.status(200).json(trip);
            } else {
                res.status(404).json({ error: 'Trip not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteTrip(req: Request, res: Response) {
        try {
            await this.tripsService.deleteTrip(parseInt(req.params.id));
            res.status(200).json({ message: 'Trip deleted successfully' });
        } catch (error) {
            if (error.message === 'Trip not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }
    


}