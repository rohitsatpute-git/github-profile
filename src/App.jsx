import React, { useState, useEffect } from 'react';
import { Book, Package, Star, Users, MapPin, Link2, Building, Mail, Calendar, GitPullRequest, GitCommit, AlertCircle } from 'lucide-react';
import ContributionGraph from './Components/Contributions.jsx';

const GitHubProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy user data
  const userData = {
    name: 'Shreeram Kushwaha',
    login: 'shreeramk',
    avatar_url: 'https://avatars.githubusercontent.com/u/5489153?s=400&v=4',
    bio: 'Director of Engineering @UptimeAI',
    followers: 12,
    following: 3,
    company: 'UptimeAI',
    location: 'Bangalore, India',
    blog: 'shreeramk.com',
    public_repos: 8,
    created_at: '2012-04-28',
    twitter_username: 'pom_fret'
  };

  // Dummy repositories
  const repositories = [
    {
      id: 1,
      name: 'Complete-Python-3-Bootcamp',
      description: 'Course Files for Complete Python 3 Bootcamp Course on Udemy',
      language: 'Jupyter Notebook',
      stargazers_count: 234,
      forks_count: 1200,
      updated_at: '2024-12-15',
      url: '#',
      private: false
    },
    {
      id: 2,
      name: 'flutter_login_ui',
      description: 'Beautiful Flutter Login UI',
      language: 'Dart',
      stargazers_count: 89,
      forks_count: 340,
      updated_at: '2024-11-20',
      url: '#',
      private: false
    }
  ];

  // Contribution activity data
  const contributionActivity = [
    { month: 'January', count: 15, range: 'Jan 2 – Jan 5' },
    { month: 'December', count: 8, range: 'Dec 10 – Dec 31' }
  ];

  const activityStats = {
    commits: 30,
    issues: 20,
    codeReviews: 40,
    pullRequests: 10
  };

  const maxBar = 90; // max pixels for 100%
  const commitsLen = (activityStats.commits / 100) * maxBar;
  const issuesLen = (activityStats.issues / 100) * maxBar;
  const reviewsLen = (activityStats.codeReviews / 100) * maxBar;
  const pullsLen = (activityStats.pullRequests / 100) * maxBar;

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300">
      {/* Header */}
      <header className="bg-[#161b22] border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-white font-semibold text-xl">GitHub</div>
            <div className="flex items-center space-x-4">
              <img src={userData.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full" />
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex space-x-4 md:space-x-8 border-t border-gray-800 overflow-x-auto whitespace-nowrap">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'repositories', label: 'Repositories', badge: userData.public_repos },
              { id: 'projects', label: 'Projects' },
              { id: 'packages', label: 'Packages' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm inline-flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-gray-700 text-xs px-2 py-0.5 rounded-full">{tab.badge}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {/* Profile Image */}
              <div>
                <img 
                  src={userData.avatar_url} 
                  alt={userData.name} 
                  className="w-full rounded-full border-2 border-gray-700"
                />
              </div>

              {/* Name and Username */}
              <div>
                <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
                <p className="text-xl text-gray-400">{userData.login}</p>
              </div>

              {/* Edit Profile Button */}
              <button className="w-full py-2 px-4 border border-gray-600 text-gray-300 rounded-md font-semibold hover:bg-gray-800 transition">
                Edit profile
              </button>

              {/* Bio */}
              {userData.bio && (
                <p className="text-gray-300 text-sm">{userData.bio}</p>
              )}

              {/* Followers */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span className="font-semibold text-white">{userData.followers}</span>
                  <span className="text-gray-400">followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-white">{userData.following}</span>
                  <span className="text-gray-400">following</span>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-sm text-gray-300 border-t border-gray-700 pt-4">
                {userData.company && (
                  <div className="flex items-center space-x-2">
                    <Building size={16} />
                    <span>{userData.company}</span>
                  </div>
                )}
                {userData.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{userData.location}</span>
                  </div>
                )}
                {userData.blog && (
                  <div className="flex items-center space-x-2">
                    <Link2 size={16} />
                    <a href={`https://${userData.blog}`} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                      {userData.blog}
                    </a>
                  </div>
                )}
                {userData.twitter_username && (
                  <div className="flex items-center space-x-2">
                    <span>𝕏</span>
                    <span>@{userData.twitter_username}</span>
                  </div>
                )}
                {userData.created_at && (
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Joined {new Date(userData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Popular Repositories */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Popular repositories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repositories.slice(0, 2).map((repo) => (
                      <div key={repo.id} className="bg-[#161b22] border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition">
                        <div className="flex items-center space-x-2 mb-2">
                          <Book size={16} className="text-gray-400" />
                          <a href={repo.url} className="text-blue-400 hover:underline font-semibold">
                            {repo.name}
                          </a>
                        </div>
                        {repo.description && (
                          <p className="text-sm text-gray-400 mb-3">{repo.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          {repo.language && (
                            <div className="flex items-center space-x-1">
                              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                              <span>{repo.language}</span>
                            </div>
                          )}
                          {repo.stargazers_count > 0 && (
                            <div className="flex items-center space-x-1">
                              <Star size={12} />
                              <span>{repo.stargazers_count}</span>
                            </div>
                          )}
                          {repo.forks_count > 0 && (
                            <div className="flex items-center space-x-1">
                              <span>⎇</span>
                              <span>{repo.forks_count}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contributions and Activity (combined) */}
                <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-white">Contributions & activity</h2>

                  <div>
                    <ContributionGraph username={userData.login} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-base font-semibold text-white mb-4">Activity overview</h3>
                      <div className="bg-transparent p-0">
                        <div className="flex items-start">
                          <div className="w-1/3 min-w-[160px] pr-2">
                            <div className="h-36 bg-transparent"></div>
                          </div>

                          <div className="w-px bg-gray-700 mx-4" />

                          <div className="flex-1 pl-2">
                            <div className="w-full overflow-hidden">
                              <svg viewBox="0 0 240 120" className="w-full h-36">
                                <defs>
                                  <linearGradient id="g1" x1="0" x2="1">
                                    <stop offset="0%" stopColor="#9be9a8" />
                                    <stop offset="100%" stopColor="#216e39" />
                                  </linearGradient>
                                </defs>

                                <line x1="10" y1="60" x2="230" y2="60" stroke="#374151" strokeWidth="1" />
                                <line x1="120" y1="10" x2="120" y2="110" stroke="#374151" strokeWidth="1" />

                                <path d={`M ${120 - commitsLen} 60 L 120 ${60 - reviewsLen} L ${120 + issuesLen} 60 L 120 ${60 + pullsLen} Z`} stroke="url(#g1)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                                <circle cx={120 - commitsLen} cy={60} r="3" fill="#216e39" />
                                <circle cx={120 + issuesLen} cy={60} r="3" fill="#216e39" />
                                <circle cx={120} cy={60 - reviewsLen} r="3" fill="#216e39" />
                                <circle cx={120} cy={60 + pullsLen} r="3" fill="#216e39" />

                                <text x="30" y="54" fill="#9CA3AF" fontSize="10">-{activityStats.commits}%</text>
                                <text x="200" y="54" fill="#9CA3AF" fontSize="10">+{activityStats.issues}%</text>
                                <text x="124" y="20" fill="#9CA3AF" fontSize="10">+{activityStats.codeReviews}%</text>
                                <text x="124" y="115" fill="#9CA3AF" fontSize="10">-{activityStats.pullRequests}%</text>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <h3 className="text-base font-semibold text-white mb-4">Contribution activity</h3>
                      <div className="space-y-4">
                        {contributionActivity.map((activity, idx) => (
                          <div key={idx} className="pb-4 border-b border-gray-700 last:border-0">
                            <h4 className="font-semibold text-white text-sm mb-1">{activity.month} 2026</h4>
                            <p className="text-xs text-gray-400 mb-2">{activity.count} contributions in private repositories</p>
                            <p className="text-xs text-gray-500">{activity.range}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Repositories Tab */}
            {activeTab === 'repositories' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text" 
                      placeholder="Find a repository..." 
                      className="bg-[#0d1117] border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold text-sm transition">
                    New
                  </button>
                </div>

                {repositories.map((repo) => (
                  <div key={repo.id} className="bg-[#161b22] border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <a href={repo.url} className="text-blue-400 hover:underline font-semibold text-lg">
                            {repo.name}
                          </a>
                          <span className="text-xs px-3 py-1 border border-gray-700 rounded-full text-gray-400">
                            {repo.private ? 'Private' : 'Public'}
                          </span>
                        </div>
                        {repo.description && (
                          <p className="text-sm text-gray-400 mb-3">{repo.description}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                          {repo.language && (
                            <div className="flex items-center space-x-1">
                              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                              <span>{repo.language}</span>
                            </div>
                          )}
                          {repo.stargazers_count > 0 && (
                            <div className="flex items-center space-x-1">
                              <Star size={14} />
                              <span>{repo.stargazers_count}</span>
                            </div>
                          )}
                          {repo.forks_count > 0 && (
                            <div className="flex items-center space-x-1">
                              <span>⎇</span>
                              <span>{repo.forks_count}</span>
                            </div>
                          )}
                          <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="bg-[#161b22] border border-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">No projects to show</p>
              </div>
            )}

            {/* Packages Tab */}
            {activeTab === 'packages' && (
              <div className="bg-[#161b22] border border-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">No packages published</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0d1117] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <div className="flex items-center justify-center gap-4 mt-2 whitespace-nowrap overflow-x-auto">
              <a href="#" className="text-gray-400 hover:text-gray-300">© 2026 GitHub, Inc.</a>
              <a href="#" className="text-gray-400 hover:text-gray-300">Terms</a>
              <a href="#" className="text-gray-400 hover:text-gray-300">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-gray-300">Security</a>
              <a href="#" className="text-gray-400 hover:text-gray-300">Status</a>
              <a href="#" className="text-gray-400 hover:text-gray-300">Community</a>
              <a href="#" className="text-gray-400 hover:text-gray-300">Docs</a>
              <a href="#" className="text-gray-400 hover:text-gray-300">Contact</a>
              <a href="#" className="text-gray-400 hover:text-gray-300">Manage cookies</a>
              <a href="#" className="text-gray-400 hover:text-gray-300">Do not share my personal information</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GitHubProfile;