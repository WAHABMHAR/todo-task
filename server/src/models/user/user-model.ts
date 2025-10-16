import { IUser } from "../../types/user.types.js";
import { Schema, model } from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    isFirstLogin: { type: Boolean, default: true },
    verficationToken: {
        type: String,
        default: null,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = model<IUser>("User", userSchema);
export default User;
