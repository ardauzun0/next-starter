import Axios from 'axios';
import { toast } from 'sonner';

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
});

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 429) {
            toast.error(error.response.data.message || 'Too many requests. Please try again later.', {
                duration: 5000,
            });
        } else if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message || 'Bad request.', {
                duration: 5000,
            });
        } else if (error.response && error.response.status === 403) {
            toast.error(error.response.data.message || 'Forbidden access.', {
                duration: 5000,
            });
        } else if (error.response && error.response.status === 500) {
            toast.error(error.response.data.message || 'An unexpected error occurred.', {
                duration: 5000,
            });
        }

        return Promise.reject(error);
    },
);

export default axios;