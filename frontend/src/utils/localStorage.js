// src/utils/localStorage.js

// Function to set an item in local storage
export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error("Error setting item in local storage", error);
    }
};

// Function to get an item from local storage
export const getLocalStorage = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error("Error getting item from local storage", error);
        return null;
    }
};

// Function to remove an item from local storage
export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing item from local storage", error);
    }
};
