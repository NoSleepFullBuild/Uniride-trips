export class CalculService {

    private pricePerkm;

    constructor() {
        this.pricePerkm = 0.5;
    }

    async getDistance(startLocation, endLocation) {
        try {
            const distance = await this.calculateDistance(startLocation, endLocation);
            return distance;
        } catch (error) {
            throw error;
        }
    }
    
    calculateDistance(startLocation: string, endLocation: string) {
        const [lat1, lon1] = startLocation.split(',').map(parseFloat);
        const [lat2, lon2] = endLocation.split(',').map(parseFloat);
    
        const R = 6371e3; 
    
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;
    
        // Application de la formule de Haversine
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        // Distance en mètres
        const d = R * c;
    
        return d;
    }
    

    calculatePriceForMeters(distance: number) {
        const distanceInKm = distance / 1000; // Convertir la distance en kilomètres
        return distanceInKm * this.pricePerkm; // Calculer le prix basé sur la distance en km
    }
    
}