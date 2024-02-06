import { Request, Response } from 'express';
import { TripService } from '../services/trip.service';


export class TripsController{
    private tripService: TripService;

    constructor() {
        this.tripService = new TripService();
    }

    async getTrips(req: Request, res: Response) {
        try {
            const trips = await this.tripService.getTrips();
            res.status(200).json(trips);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getTripById(req: Request, res: Response) {
        try {
            const trip = await this.tripService.getTripById(parseInt(req.params.id));
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
            const trip = await this.tripService.createTrip(req.body);
            res.status(201).json(trip);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async joinTrip(req: Request, res: Response) {
        try {
            const trip = await this.tripService.joinTrip(parseInt(req.params.id), req.body.passengers);
            res.status(200).json(trip);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateTrip(req: Request, res: Response) {
        try {
            const trip = await this.tripService.updateTrip(parseInt(req.params.id), req.body);
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
            await this.tripService.deleteTrip(parseInt(req.params.id));
            res.status(200).json({ message: 'Trip deleted successfully' });
        } catch (error) {
            if (error.message === 'Trip not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getTripsByPassengerId(req: Request, res: Response) {
        try {
            const trips = await this.tripService.getTripsByPassengerId(parseInt(req.params.id));
            res.status(200).json(trips);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPassengersByTripId(req: Request, res: Response) {
        try {
            const passengers = await this.tripService.getPassengersByTripId(parseInt(req.params.id));
            res.status(200).json(passengers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getTripsByDriverId(req: Request, res: Response) {
        try {
            const trips = await this.tripService.getTripsByDriverId(parseInt(req.params.id));
            res.status(200).json(trips);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}