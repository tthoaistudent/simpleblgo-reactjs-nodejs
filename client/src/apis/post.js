import axiosClient from './axiosClient';

const postApi = {

    createPost: (data, config) => {
        const url = `${process.env.REACT_APP_API_URL}/post/create`
        return axiosClient.post(url, data, config)
    },

    updatePost: (id, data, config) => {
        const url = `${process.env.REACT_APP_API_URL}/post/update/${id}`;
        return axiosClient.patch(url, data, config);
    },

    getAllPost: (data = null) =>{
        const url = `${process.env.REACT_APP_API_URL}/post`
        return axiosClient.get(url, {params: data});
    },
    deletePost: (id) => {
        const url = `${process.env.REACT_APP_API_URL}/post/${id}`;
        return axiosClient.delete(url);
    },
    getOnePost: (id) => {
        const url = `${process.env.REACT_APP_API_URL}/post/${id}`
        return axiosClient.get(url);
    },
    getAllTag: () => {
        const url = `${process.env.REACT_APP_API_URL}/post/tag/list`;
        return axiosClient.get(url);
    },

    createTag: (data) => {
        const url = `${process.env.REACT_APP_API_URL}/post/tag/create`;
        return axiosClient.post(url, data);
    },

    deleteTag: (id) => {
        const url = `${process.env.REACT_APP_API_URL}/post/tag/${id}`;
        return axiosClient.delete(url);
    },

    updateTag: (id, data) => {
        const url = `${process.env.REACT_APP_API_URL}/post/tag/update/${id}`;
        return axiosClient.patch(url, data);
    }
}

export default postApi;