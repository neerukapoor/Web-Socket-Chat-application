import mongoose, { Document, Schema } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    gender: string;
    profilePic: string
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    username: {
        type: String,
        unique: true,
        required: [true, "username field is require"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    },
    gender: {
        type: String,
        required: [true, "Please provide your gender"]
    },
    profilePic: {
        type: String
    }
}, {timestamps: true})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.method('correctPassword', async function correctPassword(candidatePassword: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword)
})

export const User = mongoose.model("User", userSchema);