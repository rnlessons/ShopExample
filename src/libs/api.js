export const fetchMoreList = async (limit, offset) => {
  try {
    let response = await fetch(
      `http://192.168.0.9:3000/commerce/products?limit=${limit}${
        offset ? `&offset=${offset}` : ''
      }`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    let json = await response.json();
    return json.rows;
  } catch (error) {
    console.error(error);
  }
};
