import mongoose from "mongoose";
const Schema = mongoose.Schema;

const instSchema = new Schema({
    teacherId: { type: String, index: true },
    teacherEmail: { type: String, index: true },
    password: String,
    phone: Number,
    name: String,
    title: String,
    confirmPassword: String,
    totalPlans: [String]
}, { timestamps: true, collection: 'instructor' });

const instModel = mongoose.model('instructor', instSchema, 'instructor');
export default instModel;
