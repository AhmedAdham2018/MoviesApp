import http from './httpService';
import {apiUrl} from '../config.json';

const endPoint = apiUrl + 'movies/';

export function getMovies() {
  return http.get(endPoint);
}

export function deleteMovie(id) {
  return http.delete(endPoint + id);
}


export function getMovie(id) {
   return http.get(endPoint + id);
}


export function saveMovie(movie) {
  if (movie._id) {
    const body = {...movie};
    delete body._id;
    return http.put(endPoint + movie._id, body);
  }
  return http.post(endPoint , movie);
}

