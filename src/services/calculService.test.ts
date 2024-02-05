import { CalculService } from "./calcul.service";

describe('CalculService', () => {
    let service: CalculService;

    beforeEach(() => {
        service = new CalculService();
    });

    test('should calculate distance correctly', async () => {
        // Coordonnées de Paris à Lyon approximativement
        const startLocation = '48.8584,2.2945'; // Tour Eiffel
        const endLocation = '48.8738,2.2950'; // Arc de Triomphe

        const distance = await service.calculateDistance(startLocation, endLocation);
        expect(distance / 1000).toBeCloseTo(1.7, 1); // Arrondi à 1 chiffre après la virgule
    });

    test('calculatePrice should return correct price based on distance', async () => {
        const distance = 10000; // 10 km
        const price = await service.calculatePriceForMeters(distance);
        // Avec un prix de 0.5 par km, attendez-vous à ce que le prix soit de 5.0
        expect(price).toBeCloseTo(5.0, 1); // Arrondi à 1 chiffre après la virgule
    });
});
