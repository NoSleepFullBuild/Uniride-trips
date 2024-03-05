import { CalculService } from "./calcul.service";

describe('CalculService', () => {
    let service: CalculService;

    beforeEach(() => {
        service = new CalculService();
    });

    test('should calculate distance correctly', async () => {
        // Coordonnées de Paris à Lyon approximativement
        const lat1 = 48.8566;
        const lon1 = 2.3522;
        const lat2 = 45.7578;
        const lon2 = 4.8328;
        const distance = service.calculateDistance(lat1, lon1, lat2, lon2);
        expect(distance / 1000).toBeCloseTo(1.7, 1); // Arrondi à 1 chiffre après la virgule
    });

    test('calculatePrice should return correct price based on distance', async () => {
        const distance = 10000; // 10 km
        const price = await service.calculatePriceForMeters(distance);
        // Avec un prix de 0.5 par km, attendez-vous à ce que le prix soit de 5.0
        expect(price).toBeCloseTo(5.0, 1); // Arrondi à 1 chiffre après la virgule
    });
});
