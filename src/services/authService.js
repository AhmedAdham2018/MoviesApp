import jwtDecode from 'jwt-decode';
import http from './httpService';
import {apiUrl} from '../config.json';



const endPoint = apiUrl + 'auth';
const tokenKey = 'token';

http.setJwtToken(getJwtToken());

export async function login(email , password) {
    const {data} = await http.post(endPoint , {email , password});
    localStorage.setItem(tokenKey , data);
}

export function registerWithJwt(jwt) {
    localStorage.setItem(tokenKey , jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getJwtToken() {
    return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }

}