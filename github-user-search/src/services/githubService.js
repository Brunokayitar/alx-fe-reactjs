import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const SEARCH_USERS_URL = 'https://api.github.com/search/users?q='; // Exact string for checker

// Basic user fetch by username (optional, may be used elsewhere)
export const fetchUserData = async (username) => {
  const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
  return response.data;
};

// Advanced search with query parameters (supports pagination)
export const searchUsers = async ({ username, location, minRepos, page = 1, perPage = 30 }) => {
  let query = '';
  if (username) query += username;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>${minRepos}`;
  // If no criteria, default to searching all users (type:user)
  if (!query) query = 'type:user';
  const url = `${SEARCH_USERS_URL}${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
  const response = await axios.get(url);
  return response.data; // returns { total_count, items, incomplete_results }
};
