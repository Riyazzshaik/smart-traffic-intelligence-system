// Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

/**
 * Core API wrapper to handle requests and errors
 */
const apiRequest = async (endpoint, method, body, signal = null) => {
    try {
        const headers = { "Content-Type": "application/json" };
        const config = {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
            signal
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
};

export const TrafficService = {
    /**
     * Get accident risk prediction
     */
    predictRisk: async (data, signal) => {
        return await apiRequest("/predict", "POST", data, signal);
    },

    /**
     * Get safer vs fastest route analysis
     */
    getSaferRoute: async (data, signal) => {
        return await apiRequest("/safer-route", "POST", data, signal);
    },

    /**
     * Check API health
     */
    checkHealth: async () => {
        return await apiRequest("/", "GET");
    }
};
