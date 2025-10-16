import { v4 as uuidv4 } from "uuid";

export const setLocalStorage = (key, value) => {
    const storedValue = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, storedValue);
};

export const truncateText = (text, wordLimit = 20) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
};

export function getOrCreateCartId() {
    if (typeof window === "undefined") return null;

    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
        cartId = uuidv4();
        localStorage.setItem("cartId", cartId);
    }

    return cartId;
}

export const tasks = [
    {
        title: "Complete Project Proposal",
        description: "Draft and submit the final project proposal to the manager.",
        status: "pending",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-20T00:00:00.000Z",
    },
    {
        title: "Frontend UI Design",
        description: "Design homepage and dashboard layout using Ant Design.",
        status: "progress",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-22T00:00:00.000Z",
    },
    {
        title: "Implement Authentication",
        description: "Integrate JWT authentication for login and signup routes.",
        status: "completed",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-15T00:00:00.000Z",
    },
    {
        title: "Database Indexing",
        description: "Optimize MongoDB queries by adding necessary indexes.",
        status: "pending",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-25T00:00:00.000Z",
    },
    {
        title: "Test API Endpoints",
        description: "Use Postman to test all CRUD operations for tasks.",
        status: "progress",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-18T00:00:00.000Z",
    },
    {
        title: "Deploy Backend to Render",
        description: "Set up environment variables and deploy the Express server.",
        status: "pending",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-28T00:00:00.000Z",
    },
    {
        title: "Complete Project Proposal",
        description: "Draft and submit the final project proposal to the manager.",
        status: "pending",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-20T00:00:00.000Z",
    },
    {
        title: "Frontend UI Design",
        description: "Design homepage and dashboard layout using Ant Design.",
        status: "progress",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-22T00:00:00.000Z",
    },
    {
        title: "Implement Authentication",
        description: "Integrate JWT authentication for login and signup routes.",
        status: "completed",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-15T00:00:00.000Z",
    },
    {
        title: "Database Indexing",
        description: "Optimize MongoDB queries by adding necessary indexes.",
        status: "pending",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-25T00:00:00.000Z",
    },
    {
        title: "Test API Endpoints",
        description: "Use Postman to test all CRUD operations for tasks.",
        status: "progress",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-18T00:00:00.000Z",
    },
    {
        title: "Deploy Backend to Render",
        description: "Set up environment variables and deploy the Express server.",
        status: "pending",
        user: "652ab1f2a1e34b0b5cd234ef",
        dueDate: "2025-10-28T00:00:00.000Z",
    },
];
