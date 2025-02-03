import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    checkInDate: Date,
    checkOutDate: Date,
    activity: String,
    participants: Number,
    roomType: String,
    roomNumber: String,
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
export default Booking;