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

const tripsController = new TripsController();

app.get('/api/trips/users', tripsController.getUserTrips.bind(tripsController));
app.get('/api/trips/users/:id', tripsController.getUserTripById.bind(tripsController));
// app.post('/api/trips/users', tripsController.createUserTrip.bind(tripsController));

app.get('/api/trips/drivers', tripsController.getDriverTrips.bind(tripsController));
app.get('/api/trips/drivers/:id', tripsController.getDriverTripById.bind(tripsController));
app.post('/api/trips/drivers', tripsController.createDriverTrip.bind(tripsController));



app.listen(3003, ()=>{
    console.log("User service is running on port 3001")
})