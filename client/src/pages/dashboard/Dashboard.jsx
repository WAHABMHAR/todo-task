import { Form, Space, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { tasks } from "../../utils/utils";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import AddTask from "../../components/addTask/AddTask";

export default function TaskTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleAdd = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    // const [tasks, setTasks] = useState([]);
    //   useEffect(() => {
    //     API.get("/tasks").then(res => setTasks(res.data));
    //   }, []);

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
                    <Tooltip title="Add New Task">
                        <PlusOutlined
                            style={{ color: "#52c41a", cursor: "pointer" }}
                            onClick={() => handleAdd()}
                        />
                    </Tooltip>
                    <Tooltip title="Edit Task">
                        <EditOutlined
                            style={{ color: "#1677ff", cursor: "pointer" }}
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>

                    <Tooltip title="Delete Task">
                        <DeleteOutlined
                            style={{ color: "#ff4d4f", cursor: "pointer" }}
                            onClick={() => handleDelete(record)}
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
                    <div className="table-wrapper border p-4 bg-white rounded-md shadow-md !m-4 !p-4">
                        <Table columns={columns} dataSource={tasks} rowKey="_id" />
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <AddTask
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    handleCancel={handleCancel}
                />
            )}
        </>
    );
}
