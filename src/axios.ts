import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Define a type for the API response (optional, for stricter typing)
interface ApiResponse<T = any> {
    data: T;
    message?: string;
    status?: number;
}

// Create an axios instance with default config
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com',
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach tokens and modify config
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('token');
        if (token) {
            // @ts-ignore
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    },
);

// Response interceptor for handling responses and errors
axiosInstance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
        return response; // Optionally transform response here
    },
    (error: AxiosError): Promise<AxiosError> => {
        // Handle different error statuses
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error('Unauthorized: Redirecting to login');
                    // Handle 401 unauthorized case
                    break;
                case 403:
                    console.error('Forbidden: Access is denied');
                    break;
                case 404:
                    console.error('Not Found: API endpoint not found');
                    break;
                case 500:
                    console.error('Server Error: Internal server error');
                    break;
                default:
                    console.error('Unknown Error occurred');
            }
        } else if (error.request) {
            // Request made but no response received
            console.error('No response from server');
        } else {
            // Something else went wrong
            console.error('Request error:', error.message);
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
