import { Button, Form, notification, Select, Space, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { tasks } from "../../utils/utils";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import AddTask from "../../components/addTask/AddTask";
import {
    useDeleteTaskMutation,
    useGatAllTasksQuery,
    useUpdateStatusMutation,
} from "../../services/tasks/taskApis";
import TaskKanban from "../../components/taskKanban/TaskKanban";

const { Option } = Select;
export default function TaskTable() {
    const [filteredStatus, setFilteredStatus] = useState("all");
    const [filteredData, setFilteredData] = useState(tasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [tableView, setTableView] = useState("table");

    const [form] = Form.useForm();

    const { data, isLoading } = useGatAllTasksQuery();
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
    const [updateStatus, { isLoading: isUpdateStatus }] = useUpdateStatusMutation();

    const handleAdd = () => {
        setIsModalOpen(true);
    };

    const handleTableViewChange = (value) => {
        setTableView(value);
    };

    const handleEdit = (task) => {
        setEditingTaskId(task?._id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const result = await deleteTask(id);
            if (result?.data) {
                notification.success({
                    message: result?.data?.message || "Task deleted successfully",
                });
            }
        } catch (error) {
            notification.error({
                message: error?.data?.message || "Failed to delete task",
            });
        }
        console.log("Delete task:", id);
    };

    const handleFilterChange = (value) => {
        setFilteredStatus(value);
        if (value === "all") {
            setFilteredData(data);
        } else {
            setFilteredData(data?.filter((task) => task.status === value));
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const result = await updateStatus({ id: taskId, status: newStatus });

            if (result?.data) {
                notification.success({
                    message: `Task moved to ${newStatus.toUpperCase()}!`,
                });
            }
        } catch (error) {
            notification.error({
                message: "Failed to update task status",
            });
        }
    };

    useEffect(() => {
        if (data) {
            setFilteredData(data);
        }
    }, [data]);

    const getTable = (type) => {
        switch (type) {
            case "table":
                return (
                    <Table
                        loading={isLoading}
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="_id"
                    />
                );
            case "kanban":
                return (
                    <TaskKanban
                        tasks={data}
                        onStatusChange={handleStatusChange}
                        isDragLoading={isUpdateStatus}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        isDeleting={isDeleting}
                    />
                );
            default:
                return <Table columns={columns} dataSource={filteredData} />;
        }
    };

    const columns = [
        { title: "Title", dataIndex: "title" },
        { title: "Description", dataIndex: "description" },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            render: (date) => <Tag>{dayjs(date).format("DD MMM YYYY")}</Tag>,
        },
        { title: "Status", dataIndex: "status", render: (s) => <Tag>{s}</Tag> },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Tooltip title="Edit Task">
                        <EditOutlined
                            style={{ color: "#1677ff", cursor: "pointer" }}
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>

                    <Tooltip title="Delete Task">
                        <DeleteOutlined
                            style={{
                                color: "#ff4d4f",
                                cursor: isDeleting ? "not-allowed" : "pointer",
                            }}
                            onClick={() => handleDelete(record?._id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="flex justify-center items-center mt-3">
                <div className="container">
                    {" "}
                    <div className="table-wrapper border bg-white rounded-md shadow-md !m-4 !p-4">
                        <div className="flex justify-between items-center !mb-4">
                            <h2 className="hidden md:flex text-2xl font-bold mb-4">Tasks</h2>
                            <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-3">
                                <Select
                                    value={tableView}
                                    style={{ width: 150 }}
                                    onChange={handleTableViewChange}
                                >
                                    <Option value="table">Simple Table</Option>
                                    <Option value="kanban">Kanban Table</Option>
                                </Select>
                                {tableView === "table" && (
                                    <Select
                                        value={filteredStatus}
                                        style={{ width: 200 }}
                                        onChange={handleFilterChange}
                                    >
                                        <Option value="all">All Tasks</Option>
                                        <Option value="pending">Pending</Option>
                                        <Option value="progress">In Progress</Option>
                                        <Option value="completed">Completed</Option>
                                    </Select>
                                )}
                                <Button
                                    type="primary"
                                    onClick={() => handleAdd()}
                                    className="flex !justify-start !items-start align-middle gap-2"
                                >
                                    Add Task
                                </Button>
                            </div>
                        </div>
                        {getTable(tableView)}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <AddTask
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    id={editingTaskId}
                    setId={setEditingTaskId}
                />
            )}
        </>
    );
}
