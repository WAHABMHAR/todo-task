import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
const { Option } = Select;

const AddTask = ({ isModalOpen, setIsModalOpen, handleCancel }) => {
    const [form] = Form.useForm();
    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const newTask = {
                ...values,
                dueDate: values.dueDate.format("YYYY-MM-DD"),
            };
            console.log("New Task:", newTask);
            // 🧠 You can now send `newTask` to your backend API
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Add New Task"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Add Task
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
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddTask;
