import http from './httpService';

export function getGenres() {
  return http.get('http://localhost:3100/api/genres');
}

