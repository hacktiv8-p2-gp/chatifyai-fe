export async function getAll(axios) {
  const response = await axios.get(`/api/friends`);
  return response.data.data;
}

export async function get(axios, email) {
  const response = await axios.get(`/api/friends/${email}`);
  // console.log(response);
  return response.data.data;
}
export async function request(axios, email) {
  const response = await axios.post(`/api/friends/request`, {
    email,
  });

  return response.data.data;
}

export const deleteFriend = async (axios, roomId) => {
  const response = await axios.delete(`/api/friends/delete/${roomId}`);
  return response.data;
};
