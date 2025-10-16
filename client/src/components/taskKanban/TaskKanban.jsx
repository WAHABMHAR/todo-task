// src/components/taskKanban/TaskKanban.jsx
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, Spin, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function TaskKanban({
    tasks,
    onStatusChange,
    isDragLoading = false,
    isDeleting,
    handleEdit,
    handleDelete,
}) {
    const columns = {
        pending: {
            title: "Pending",
            color: "orange",
            items: tasks.filter((t) => t.status === "pending"),
        },
        progress: {
            title: "In Progress",
            color: "blue",
            items: tasks.filter((t) => t.status === "progress"),
        },
        completed: {
            title: "Completed",
            color: "green",
            items: tasks.filter((t) => t.status === "completed"),
        },
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const taskId = result.draggableId;
            const newStatus = destination.droppableId;
            onStatusChange(taskId, newStatus);
        }
    };

    return (
        <Spin spinning={isDragLoading}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(columns).map(([status, { title, color, items }]) => (
                        <Droppable droppableId={status} key={status}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="bg-gray-50 p-4 rounded-lg shadow-sm min-h-[400px]"
                                >
                                    <h3 className="text-lg font-semibold mb-3">
                                        <Tag color={color}>{title}</Tag>
                                    </h3>
                                    {items.map((task, index) => (
                                        <Draggable
                                            draggableId={task._id}
                                            index={index}
                                            key={task._id}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="!my-4 !p-4"
                                                >
                                                    <Card size="small" title={task.title}>
                                                        <p>{task.description}</p>
                                                        <Tag color={color}>
                                                            {dayjs(task.dueDate).format(
                                                                "DD MMM YYYY"
                                                            )}
                                                        </Tag>
                                                        <div className="flex gap-10 !mt-6 justify-start items-center">
                                                            <Tooltip title="Edit Task">
                                                                <EditOutlined
                                                                    style={{
                                                                        color: "#1677ff",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() => handleEdit(task)}
                                                                />
                                                            </Tooltip>

                                                            <Tooltip title="Delete Task">
                                                                <DeleteOutlined
                                                                    style={{
                                                                        color: "#ff4d4f",
                                                                        cursor: isDeleting
                                                                            ? "not-allowed"
                                                                            : "pointer",
                                                                    }}
                                                                    onClick={() =>
                                                                        handleDelete(task?._id)
                                                                    }
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    </Card>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </Spin>
    );
}
