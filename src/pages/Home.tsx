
import RepoList from "@/components/RepoList";
import UserNameForm from "@/components/UserName";

// Define the interface for the GitHub user profile
interface GitHubUserProfile {
  avatar_url: string;
  login: string;
  name: string;
  bio?: string;
  location?: string;
  html_url: string;
}

export default function Home() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState<GitHubUserProfile | null>(null);

  const fetchRepos = async (username: string) => {
    setError("");
    setRepos([]);

    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setRepos(data);
      fetchUserProfile(username); // Fetch user profile info
    } catch (err) {
      setError("Could not fetch repositories.");
    }
  };

  const fetchUserProfile = async (username: string) => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setUserProfile(data);
    } catch (err) {
      setError("Could not fetch user profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300 flex justify-center items-center">
      <div className="w-full max-w-4xl p-8 bg-[#D9C4A1] rounded-lg shadow-lg space-y-8">

     
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-black tracking-tight">
            GitHub User Profile Analyzer
          </h1>
          <p className="text-lg sm:text-xl text-indigo-600 max-w-xl mx-auto">
            Enter a GitHub username to view their profile and repositories.
          </p>
        </div>

        {/* Username Form */}
        <UserNameForm onSearch={fetchRepos} />

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* User Profile Section */}
        {userProfile && (
          <div className="bg-[#D9C4A1] p-6 rounded-lg shadow-xl space-y-4">
            <div className="flex items-center space-x-6">
              <img
                src={userProfile.avatar_url}
                alt={userProfile.login}
                className="w-32 h-32 rounded-full border-4 border-teal-500"
              />
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-black">{userProfile.name}</h2>
                <p className="text-teal-700">{userProfile.bio || "No bio available"}</p>
                <p className="text-teal-600">{userProfile.location || "Location not available"}</p>
                <a
                  href={userProfile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition duration-300"
                >
                  Visit GitHub Profile
                </a>
              </div>
            </div>

            {/* View More Repositories Button */}
            <div className="mt-4">
              <a
                href={`${userProfile.html_url}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-300"
              >
                View More Repositories
              </a>
            </div>
          </div>
        )}

        {/* Repositories List */}
        <RepoList repos={repos} />
      </div>
    </div>
  );
}
