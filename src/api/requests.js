export const requests = {
  async search_users(search_string) {
    const result = await fetch(
      `https://api.github.com/search/users?q=${search_string}`
    );
    return await result.json();
  },
};
