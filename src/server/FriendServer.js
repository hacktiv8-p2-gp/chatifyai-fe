const BASE_URL = "http://localhost:3000";

export async function getAll(axios) {
  const response = await axios.get(`${BASE_URL}/api/friends`);
  return response.data.data;
}

export async function get(axios, email) {
  // console.log(email);
  const response = await axios.get(`${BASE_URL}/api/friends/${email}`);
  // console.log(response);
  return response.data.data;
}
export async function request(axios, email) {
  const response = await axios.post(`${BASE_URL}/api/friends/request`, {
    email,
  });

  return response.data.data;
}
