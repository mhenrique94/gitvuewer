export const requests = {
  async search_users(search_string) {
    const result = await fetch(
      `https://api.github.com/search/users?q=${search_string}`
    );
    return await result.json();
  },
  async get_user(user_string) {
    const response = await fetch(`https://api.github.com/users/${user_string}`);
    return await response.json();
  },
  async get_repos(user_string) {
    const response = await fetch(
      `https://api.github.com/users/${user_string}/repos`
    );
    return await response.json();
  },
  async get_issues(user_string, repository_string) {
    const response = await fetch(
      `https://api.github.com/repos/${user_string}/${repository_string}/issues`
    );
    return await response.json();
  },
};
