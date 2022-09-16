const API_URI = '/fakeApi';

export const fakeAPI = {
  games: {
    async list() {
      const result = await fetch(`${API_URI}/games`, { method: 'GET' });
      return result.json();
    },
  },
  platforms:{
    async list() {
      const result = await fetch(`${API_URI}/platforms`, {
        method: 'GET',
      });
      return result.json();
    },
  },
  users: {},
};
