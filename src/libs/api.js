import _ from 'lodash';
import {getToken} from './auth';

const baseUrl = 'http://192.168.0.9:3000';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const fetchMoreList = async (limit, offset) => {
  try {
    let response = await fetch(
      `${baseUrl}/commerce/products?limit=${limit}${
        offset ? `&offset=${offset}` : ''
      }`,
      {
        method: 'GET',
        headers,
      },
    );
    let json = await response.json();
    return _.get(json, 'rows', []);
  } catch (error) {
    console.error(error);
  }
};

export const login = async (email, password) => {
  try {
    let response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const me = async () => {
  try {
    const token = await getToken();
    let response = await fetch(`${baseUrl}/auth/me`, {
      method: 'GET',
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const searchAddress = async (currentPage, countPerPage, keyword) => {
  try {
    const url = 'https://www.juso.go.kr/addrlink/addrLinkApi.do';
    const confmKey = 'devU01TX0FVVEgyMDIxMDMwOTE1MDMwNDExMDg5Mjg=';

    if (keyword.length < 2) {
      return [];
    }

    let response = await fetch(
      `${url}?currentPage=${currentPage}&countPerPage=${countPerPage}&keyword=${encodeURIComponent(
        keyword,
      )}&confmKey=${confmKey}&resultType=json`,
      {
        method: 'GET',
      },
    );
    let json = await response.json();
    return _.get(json, 'results.juso', []);
  } catch (error) {
    console.error(error);
  }
};

export const order = async (productId, zipCode, address, quantity, price) => {
  try {
    const token = await getToken();
    let response = await fetch(`${baseUrl}/commerce/order`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        zipCode,
        address,
        quantity,
        price,
      }),
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const fetchOrderList = async (month) => {
  try {
    const token = await getToken();
    let response = await fetch(`${baseUrl}/commerce/orders?month=${month}`, {
      method: 'GET',
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });
    let json = await response.json();
    return _.get(json, 'rows', []);
  } catch (error) {
    console.error(error);
  }
};

export const fetchOrder = async (orderId) => {
  try {
    const token = await getToken();
    let response = await fetch(`${baseUrl}/commerce/order/${orderId}`, {
      method: 'GET',
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });
    let json = await response.json();
    return _.get(json, 'row', {});
  } catch (error) {
    console.error(error);
  }
};
