// import { create } from 'apisauce';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from "apisauce";

const api = create({
    // baseURL: 'https://numero-notificacao.onrender.com',
    baseURL: 'http://localhost:3001',
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
})

api.addAsyncRequestTransform(request => async() => {
    const token = await localStorage.getItem('@Reportify:token');

    if (token) {
        request.headers['Authorization'] = `Baerer ${token}`;
    }
})

export default api;