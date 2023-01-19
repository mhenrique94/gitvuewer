export const requests = {
  search_users(search_string) {
    return fetch(`https://api.github.com/search/users?q=${search_string}`).then(
      (res) => res.json()
    );
  },
};
