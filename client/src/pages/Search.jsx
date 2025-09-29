import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import userImg from "../assets/user.png";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const searchUsers = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(
        `${serverUrl}/api/v1/users/search?keyword=${encodeURIComponent(
          searchTerm.trim()
        )}`,
        { withCredentials: true }
      );
      setResults(
        data?.users?.filter(
          (user) => user?.userName !== "AI" && user?.userName !== "Admin"
        ) || []
      );
    } catch {
      setError("Search failed. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) {
      setResults([]);
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar border-b">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold">
          Search Users
        </h1>
        <div className="w-12" />
      </div>

      <div className="p-4 max-w-md mx-auto">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Search by username or name..."
            value={searchTerm}
            onChange={handleInput}
            onKeyDown={(e) => e.key === "Enter" && searchUsers()}
            className="input input-bordered join-item flex-1"
            disabled={loading}
          />
          <button
            onClick={searchUsers}
            className="btn btn-primary join-item"
            disabled={loading || !searchTerm.trim()}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <SearchIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        {loading && (
          <div className="text-center py-12">
            <span className="loading loading-spinner loading-lg" />
            <p className="mt-4 text-base-content/70">Searching...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-error max-w-md mx-auto">
            <span>{error}</span>
            <button className="btn btn-sm" onClick={searchUsers}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && searchTerm && results.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 mx-auto text-base-content/30 mb-4" />
            <h3 className="text-lg font-semibold">No users found</h3>
          </div>
        )}

        {results.length > 0 && (
          <div className="max-w-md mx-auto space-y-2">
            {results.map((user) => (
              <div
                key={user._id}
                className="card bg-base-200 hover:bg-base-300 cursor-pointer transition-colors"
                onClick={() => navigate(`/profile/${user.userName}`)}
              >
                <div className="card-body p-4 flex-row items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={user.profileImage || userImg} alt="" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{user.userName}</p>
                    {user.name && (
                      <p className="text-sm opacity-70 truncate">{user.name}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!searchTerm && (
          <div className="text-center py-16">
            <SearchIcon className="h-20 w-20 mx-auto text-base-content/20 mb-6" />
            <h3 className="text-xl font-semibold mb-2">Find Users</h3>
            <p className="text-base-content/70">Start typing to search</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
