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
