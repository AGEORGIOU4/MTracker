import axios from 'axios';

// Create an instance of axios with default configuration
const axiosInstance = axios.create({
  baseURL: 'https://bankaccountdata.gocardless.com/api/v2', // Base URL for your API
  headers: {
    'Content-Type': 'application/json'
  }
});

// Abstract GET function
export const getRequest = async (url: string, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET request failed', error);
    throw error;
  }
};

// Abstract POST function
export const postRequest = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error('POST request failed', error);
    throw error;
  }
};

// Abstract PUT function
export const putRequest = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    console.error('PUT request failed', error);
    throw error;
  }
};

// Abstract DELETE function
export const deleteRequest = async (url: string) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error('DELETE request failed', error);
    throw error;
  }
};
