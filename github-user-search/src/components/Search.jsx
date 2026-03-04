import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

const Search = () => {
  const [formData, setFormData] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentQuery, setCurrentQuery] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const performSearch = async (searchData, pageNum = 1, append = false) => {
    setLoading(true);
    setError(null);
    try {
      // Determine which API function to use
      const { username, location, minRepos } = searchData;
      let data;
      if (location || minRepos) {
        // Advanced search: use searchUsers
        data = await searchUsers({ ...searchData, page: pageNum });
      } else if (username) {
        // Single username: use fetchUserData
        const userData = await fetchUserData(username);
        data = { items: [userData], total_count: 1 };
      } else {
        // No criteria: empty results
        data = { items: [], total_count: 0 };
      }

      if (append) {
        setUsers(prev => [...prev, ...data.items]);
      } else {
        setUsers(data.items);
      }
      setTotalCount(data.total_count || 0);
      const totalPages = data.total_count ? Math.ceil(data.total_count / 30) : 1;
      setHasMore(pageNum < totalPages);
      setPage(pageNum);
      setCurrentQuery(searchData);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch(formData, 1, false);
  };

  const handleLoadMore = () => {
    if (currentQuery) {
      performSearch(currentQuery, page + 1, true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">GitHub User Search</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter GitHub username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., Lagos, San Francisco"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minRepos">
            Minimum Repositories
          </label>
          <input
            type="number"
            name="minRepos"
            id="minRepos"
            value={formData.minRepos}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 10"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {users.length > 0 && (
        <>
          <p className="mb-4 text-gray-600">Found {totalCount} user(s)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
                <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h2 className="text-xl font-bold text-center mb-2">{user.login}</h2>
                {user.location && <p className="text-gray-600 text-center">Ì≥ç {user.location}</p>}
                <p className="text-gray-600 text-center">Ì≥¶ Repos: {user.public_repos || 'N/A'}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center mt-4 text-blue-500 hover:underline"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
