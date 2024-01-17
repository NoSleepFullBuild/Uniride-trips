import * as express from "express"
import { AppDataSource } from "./app-data-source"

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


app.listen(3001, ()=>{
    console.log("User service is running on port 3001")
})