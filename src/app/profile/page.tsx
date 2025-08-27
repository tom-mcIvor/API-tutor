import { User, BookOpen, Clock, Trophy, Target, Calendar } from 'lucide-react'

const userStats = {
  name: 'Learning Enthusiast',
  email: 'student@example.com',
  joinDate: 'January 2024',
  completedLessons: 8,
  totalLessons: 12,
  timeSpent: 120, // minutes
  currentStreak: 5,
  badges: [
    { name: 'API Beginner', description: 'Completed first API lesson', earned: true },
    { name: 'REST Master', description: 'Mastered REST principles', earned: true },
    { name: 'HTTP Expert', description: 'Learned all HTTP methods', earned: false },
    { name: 'Auth Specialist', description: 'Understood authentication', earned: false },
  ]
}

const recentActivity = [
  { lesson: 'REST Fundamentals', completedAt: '2 hours ago', duration: 25 },
  { lesson: 'Introduction to APIs', completedAt: '1 day ago', duration: 15 },
  { lesson: 'HTTP Methods', completedAt: '3 days ago', duration: 30 },
]

export default function ProfilePage() {
  const progressPercentage = (userStats.completedLessons / userStats.totalLessons) * 100

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">Your Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress and achievements in your API learning journey.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">{userStats.name}</h2>
              <p className="text-gray-600 mb-1 dark:text-gray-400">{userStats.email}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {userStats.joinDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4" />
                  <span>{userStats.currentStreak} day streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center dark:bg-gray-800 dark:border-gray-700">
            <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1 dark:text-white">
              {userStats.completedLessons}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center dark:bg-gray-800 dark:border-gray-700">
            <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1 dark:text-white">
              {Math.round(userStats.timeSpent / 60)}h
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Time Spent</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center dark:bg-gray-800 dark:border-gray-700">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1 dark:text-white">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center dark:bg-gray-800 dark:border-gray-700">
            <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1 dark:text-white">
              {userStats.badges.filter(b => b.earned).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Learning Progress</h3>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2 dark:text-gray-400">
                <span>Overall Progress</span>
                <span>{userStats.completedLessons} of {userStats.totalLessons} lessons</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                <div 
                  className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Recent Activity</h4>
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{activity.lesson}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">{activity.completedAt}</div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{activity.duration} min</div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Achievements</h3>
            
            <div className="space-y-4">
              {userStats.badges.map((badge, index) => (
                <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                  badge.earned ? 'bg-green-50 border border-green-200 dark:bg-green-900 dark:border-green-700' : 'bg-gray-50 border border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    badge.earned ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${badge.earned ? 'text-green-900 dark:text-green-200' : 'text-gray-500 dark:text-gray-400'}`}>
                      {badge.name}
                    </div>
                    <div className={`text-sm ${badge.earned ? 'text-green-700 dark:text-green-300' : 'text-gray-500 dark:text-gray-500'}`}>
                      {badge.description}
                    </div>
                  </div>
                  {badge.earned && (
                    <div className="text-green-600">
                      <Trophy className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Study Goals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Study Goals</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-blue-900">
              <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold text-blue-900 dark:text-blue-200">Daily Goal</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Complete 1 lesson per day</div>
              <div className="text-xs text-blue-600 mt-1">5 day streak! 🔥</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg dark:bg-purple-900">
              <BookOpen className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold text-purple-900 dark:text-purple-200">Weekly Goal</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Finish Authentication module</div>
              <div className="text-xs text-purple-600 mt-1">2 lessons remaining</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg dark:bg-green-900">
              <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-green-900 dark:text-green-200">Monthly Goal</div>
              <div className="text-sm text-green-700 dark:text-green-300">Complete API Tutor course</div>
              <div className="text-xs text-green-600 mt-1">4 lessons to go!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}