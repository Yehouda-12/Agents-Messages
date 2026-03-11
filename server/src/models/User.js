import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    agentCode: {
        type: String,
        required: [true, "agentCode must be given"],
        unique: true,

    },
    fullName: {
        type: String,
        required: [true, "fullName must be given"]
    },
    password: {
        type: String,
        required: [true, "password must be given"]
    },
    role: {
        type: String,
        enum: ['admin', 'agent'],
        default: 'agent'

    }


}, {
    timestamps: true
})
userSchema.pre('save', async function () {
  
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
       
    } catch (error) {
        throw error; 
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User',userSchema)
export default User