import api from '../api/api';

const contactService = {
    sendMessage: async (payload) => {
        const response = await api.post('/Contact', payload);
        return response.data;
    }
};

export default contactService;