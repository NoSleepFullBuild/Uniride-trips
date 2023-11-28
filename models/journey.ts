import mongoose from 'mongoose';

const journeySchema = new mongoose.Schema({
    date: Date,
    departureTime: String,
    startPoint: String,
    destination: String,
    availableSeats: Number
});

export default mongoose.model('Journey', journeySchema);
