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
  async get_files(user_string, repository_string) {
    const response = await fetch(
      `https://api.github.com/repos/${user_string}/${repository_string}/contents`
    );
    return await response.json();
  },
  async get_file(blob_url) {
    let data = await fetch(blob_url)
      .then((d) => d.json())
      .then((d) => atob(d.content));
    return data;
  },
  async get_dir(dir_url) {
    let data = await fetch(dir_url)
      .then((d) => d.json())
      .then((d) => d.tree);
    return data;
  },
  async get_blob(blob_url) {
    let data = await fetch(blob_url)
      .then((d) => d.json())
      .then((d) => atob(d.content));
    return data;
  },
};
