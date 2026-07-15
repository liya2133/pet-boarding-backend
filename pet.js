const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const pet = express()

pet.use(cors())
pet.use(express.json())

mongoose.connect("mongodb://liyasebastian2108_db_user:liya2133@ac-darivsu-shard-00-00.o79rfyx.mongodb.net:27017,ac-darivsu-shard-00-01.o79rfyx.mongodb.net:27017,ac-darivsu-shard-00-02.o79rfyx.mongodb.net:27017/petdb?ssl=true&replicaSet=atlas-zp9w17-shard-0&authSource=admin&appName=Cluster0")
.then(() => {
    console.log("Mongo Connected")
})
.catch((error) => {
    console.log(error)
})

const PetBooking = mongoose.model("PetBooking", new mongoose.Schema({

    BookingID: String,
    PetName: String,
    OwnerName: String,
    PetType: String,
    Breed: String,
    Age: String,
    Weight: String,
    VaccinationStatus: String,
    OwnerPhone: String,
    OwnerEmail: String,
    CheckInDate: String,
    CheckOutDate: String,
    KennelNumber: String

}))

pet.get("/test", (request, response) => {
    response.send("Hello")
})

pet.post("/add-booking", async (request, response) => {

    console.log(request.body)

    await PetBooking.create(request.body)

    response.json({
        status: "Booking added successfully"
    })

})

pet.get("/view-booking", async (request, response) => {

    const data = await PetBooking.find()
    response.json(data)

})

pet.listen(3000, () => {
    console.log("Server Started")
})