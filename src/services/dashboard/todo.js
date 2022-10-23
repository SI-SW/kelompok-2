import {baseApi} from '@/plugins/axios';

const api = '/api/todo';

const list = () => baseApi.get(`${api}`);
const add = (body) => baseApi.post(`${api}`, body);
// const edit = (id) => baseApi.put(`${api}/${id}`);
const del = (id) => baseApi.delete(`${api}/${id}`);

export { list, add, update, del}; // Named export