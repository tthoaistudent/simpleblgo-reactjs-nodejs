import axiosClient  from './axiosClient';

const authApi = {
    login: (email, password) => {
        const url = process.env.REACT_APP_API_URL + '/auth';
        return axiosClient.post(url, {email, password});
    },

    getUserLogin: () => {
        const url = `${process.env.REACT_APP_API_URL}/users/me`
        return axiosClient.get(url);
    },

    updateProfile: (data) => {
        const url = `${process.env.REACT_APP_API_URL}/users`
        return axiosClient.put(url, data);
    }
}

export default authApi;