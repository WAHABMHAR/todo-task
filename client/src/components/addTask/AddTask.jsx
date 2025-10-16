import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select, Button, notification } from "antd";
import { useCreateTaskMutation, useGatTaskQuery } from "../../services/tasks/taskApis";
import dayjs, { isDayjs } from "dayjs";
const { Option } = Select;

const AddTask = ({ isModalOpen, setIsModalOpen, id, setId }) => {
    const [createTask, { isLoading }] = useCreateTaskMutation();
    const { data: task } = useGatTaskQuery(id, { skip: !id });
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        const isValid = await form.validateFields();
        if (!isValid) {
            notification.warning({
                message: "Please fill all required fields",
            });
            return;
        }

        const values = form.getFieldsValue();
        const newTask = {
            ...values,
            id: id,
            dueDate: values.dueDate.format("YYYY-MM-DD"),
        };
        try {
            console.log("New Task:", newTask);
            const result = await createTask(newTask);
            if (result?.data) {
                notification.success({
                    message: result?.data?.message || "Task added successfully",
                });
                setIsModalOpen(false);
                form.resetFields();
            }
        } catch (error) {
            console.log("Error:", error);
            notification.error({
                message: error?.data?.message || "Failed to add task",
            });
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setId(null);
        form.resetFields();
    };

    console.log("Task:", task);

    useEffect(() => {
        if (task) {
            let safeDate = null;

            if (task.dueDate) {
                const parsedDate = dayjs(task.dueDate, "YYYY-MM-DD");
                safeDate = parsedDate.isValid() ? parsedDate : null;
            }

            form.setFieldsValue({
                ...task,
                dueDate: safeDate,
            });
        }
    }, [task, form]);

    return (
        <Modal
            title={id ? "Edit Task" : "Add New Task"}
            open={isModalOpen}
            onCancel={handleCancel}
            maskClosable={false}
            closable={true}
            destroyOnClose={true}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={isLoading} onClick={handleSubmit}>
                    {id ? "Update Task" : "Add Task"}
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Please enter task title" }]}
                >
                    <Input placeholder="Enter task title" />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <Input.TextArea rows={3} placeholder="Enter task description" />
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    initialValue="pending"
                    rules={[{ required: true, message: "Please select a status" }]}
                >
                    <Select>
                        <Option value="pending">Pending</Option>
                        <Option value="progress">In Progress</Option>
                        <Option value="completed">Completed</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Due Date"
                    name="dueDate"
                    rules={[{ required: true, message: "Please select due date" }]}
                >
                    <DatePicker
                        style={{ width: "100%" }}
                        format="YYYY-MM-DD"
                        disabledDate={(current) => current && current < dayjs().startOf("day")}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddTask;
