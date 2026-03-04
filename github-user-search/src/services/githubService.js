import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

// Basic user fetch by username
export const fetchUserData = async (username) => {
  const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
  return response.data;
};

// Advanced search with query parameters
export const searchUsers = async ({ username, location, minRepos }) => {
  let query = username ? `${username}` : '';
  if (location) {
    query += `+location:${location}`;
  }
  if (minRepos) {
    query += `+repos:>${minRepos}`;
  }
  const url = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}`;
  const response = await axios.get(url);
  return response.data.items; // returns array of user objects
};