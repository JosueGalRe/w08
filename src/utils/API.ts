import axios from 'axios';
import MD5 from 'crypto-js/md5';

const API = axios.create({ baseURL: process.env.REACT_APP_END_POINT });

const API_AUTH = (): string => {
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY || '';
  const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || '';
  const TIME_STAMP = Date.now();
  const MD5_STRING = MD5(TIME_STAMP + PRIVATE_KEY + PUBLIC_KEY).toString();

  return `&ts=${TIME_STAMP}&apikey=${PUBLIC_KEY}&hash=${MD5_STRING}`;
};

export { API, API_AUTH };
