import * as express from "express"
import { AppDataSource } from "./app-data-source"
import { TripsController } from "./controllers/trips.controller"

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express()
app.use(express.json())

const tripController = new TripsController();

app.get('/api/trips', tripController.getTrips.bind(tripController));
app.get('/api/trips/:id', tripController.getTripById.bind(tripController));

app.post('/api/trips', tripController.createTrip.bind(tripController));
app.post('/api/trips/:id/join', tripController.joinTrip.bind(tripController));
app.put('/api/trips/:id', tripController.updateTrip.bind(tripController));
app.delete('/api/trips/:id', tripController.deleteTrip.bind(tripController));

app.get('/api/trips/passengers/:id', tripController.getTripsByPassengerId.bind(tripController));
app.get('/api/trips/drivers/:id', tripController.getTripsByDriverId.bind(tripController));


app.listen(3003, ()=>{
    console.log("User service is running on port 3001")
})