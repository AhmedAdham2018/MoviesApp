import http from './httpService';
import { apiUrl } from '../config.json';

const endPoint = apiUrl + 'users';

export function saveUser(user) {
    return http.post(endPoint, user);
}