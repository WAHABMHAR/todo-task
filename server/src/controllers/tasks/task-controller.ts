import { NextFunction, Response } from "express";
import { responseMessage, simpleResponseData } from "../../handlers/responseHandler.js";
import Task from "../../models/task/task-model.js";

export const getAllTasks = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    const user = req.user;
    try {
        const results = await Task.find(
            { user: user?._id },
            "title description status dueDate user"
        ).lean();

        return simpleResponseData(res, 200, "All Tasks fetched successfully", results);
    } catch (error) {
        next(error);
    }
};
export const getTask = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    const { id: taskId } = req.params;
    try {
        const results = await Task.findOne(
            { _id: taskId },
            "title description status dueDate user"
        ).lean();

        return simpleResponseData(res, 200, "All Tasks fetched successfully", results);
    } catch (error) {
        next(error);
    }
};
export const createTask = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const user = req.user;
        const payload = { ...req.body, user: user?._id };
        const results = await Task.create(payload);

        console.log("Results", results);

        return simpleResponseData(res, 200, "Task created successfully", results);
    } catch (error) {
        next(error);
    }
};
export const updateTask = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id: taskId } = req.params;

        const updated = await Task.findByIdAndUpdate(taskId, req.body);

        console.log("Results", updated);

        return simpleResponseData(res, 200, "Task updated successfully", updated);
    } catch (error) {
        next(error);
    }
};
export const updateStatus = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id: taskId, status } = req.body;

        const updated = await Task.findByIdAndUpdate(taskId, { $set: { status: status } });

        console.log("Results", updated);

        return simpleResponseData(res, 200, "Task updated successfully", updated);
    } catch (error) {
        next(error);
    }
};
export const deleteTask = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id: taskId } = req.params;

        await Task.findByIdAndDelete(taskId);

        return responseMessage(res, true, 200, "Task deleted successfully");
    } catch (error) {
        next(error);
    }
};
