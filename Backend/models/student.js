import mongoose from "mongoose";
const Schema = mongoose.Schema;


const stdSchema = new Schema({
    studentName: String,
    studentEmail: String,
    parentEmail: String,
    phone: String,
    password: String,
    confirmPassword: String,
    standard: String,
    totalCourses: [String]
});

const stdModel = mongoose.model('students', stdSchema)
export default stdModel;
