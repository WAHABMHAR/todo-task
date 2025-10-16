import mongoose, { Schema, model } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "progress", "completed"],
            default: "pending",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User Id is required"],
        },
        dueDate: {
            type: String,
            required: [true, "Due date is required"],
        },
    },
    { timestamps: true }
);

const Task = model("Task", taskSchema);
export default Task;
