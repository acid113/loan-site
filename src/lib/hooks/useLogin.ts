import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

export const useLogin = () => {
  const login = async (username: string, password: string) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      username,
      password,
    });
    if (response.status !== StatusCodes.OK) {
      throw new Error('Login failed');
    }
    const data = response.data;
    if (data.token) {
      return data.token;
    }
    throw new Error('Login failed, no token received');
  };

  return { login };
};
