import User from "../models/User";
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    idSpotify: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

userSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function (
    password: string
): Promise<boolean | Error> {
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', userSchema);