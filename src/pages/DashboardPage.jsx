const DashboardPage = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-primary/20 to-purple-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👤</span>
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">Total Students</h3>
        <p className="text-4xl font-black text-text-primary">1,234</p>
        <p className="text-green-400 text-sm font-semibold">+12.5%</p>
      </div>
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔥</span>
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">Active Today</h3>
        <p className="text-4xl font-black text-text-primary">456</p>
        <p className="text-green-400 text-sm font-semibold">+8.2%</p>
      </div>
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⭐</span>
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">Avg Accuracy</h3>
        <p className="text-4xl font-black text-text-primary">87%</p>
      </div>
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📚</span>
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">Modules Active</h3>
        <p className="text-4xl font-black text-text-primary">23</p>
        <p className="text-green-400 text-sm font-semibold">+3</p>
      </div>
    </div>
  </div>
);

export default DashboardPage;

