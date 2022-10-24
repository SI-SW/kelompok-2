import {baseApi} from '@/plugins/axios';

const api = '/api/todo';

const list = () => baseApi.get(`${api}`);
const add = (body) => baseApi.post(`${api}`, body);
const edit = (body, id) => baseApi.put(`${api}/${id}`, body);
const del = (id) => baseApi.delete(`${api}/${id}`);

export { list, add, edit, del}; // Named export