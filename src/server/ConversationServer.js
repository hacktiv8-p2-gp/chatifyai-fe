export async function getAll(axios, roomId) {
  const response = await axios.get(`/api/conversations/${roomId}`);

  return response.data.data;
}
