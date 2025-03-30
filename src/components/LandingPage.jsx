import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900/30 backdrop-blur-lg fixed w-full z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg">
                ProjectBoard
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-all duration-300">How it Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-all duration-300">Pricing</a>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-40 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-xl">
            Streamline Your Project Management
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Organize tasks, track progress, and collaborate with your team in real-time using our intuitive Kanban board.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-700">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gray-800/50 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-white mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { color: 'blue', title: 'Task Management', desc: 'Organize tasks with drag-and-drop functionality and real-time updates.' },
              { color: 'red', title: 'Progress Tracking', desc: 'Monitor project progress with visual analytics and detailed statistics.' },
              { color: 'green', title: 'Team Collaboration', desc: 'Work together seamlessly with real-time updates and team assignments.' }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`w-12 h-12 bg-${feature.color}-500 rounded-lg flex items-center justify-center mb-4`}></div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using ProjectBoard to manage their projects more efficiently.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Free Trial
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 ProjectBoard. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}