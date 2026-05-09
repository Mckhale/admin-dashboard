import { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';

const GamesPage = () => {
  const [gameSettings, setGameSettings] = useState({
    quiz: { timer: 30, difficulty: 'medium', rounds: 10 },
    matching: { timer: 60, difficulty: 'easy', rounds: 15 },
    rps: { timer: 15, difficulty: 'hard', rounds: 20 }
  });
  const [records] = useState([
    { id: 1, game: 'Quiz', player: 'John Doe', score: 92, date: '2024-01-15' },
    { id: 2, game: 'Matching', player: 'Jane Smith', score: 88, date: '2024-01-14' },
    { id: 3, game: 'RPS', player: 'Bob Johnson', score: 78, date: '2024-01-13' },
  ]);
  const { addNotification } = useAppContext();

  const updateMechanic = (game, field, value) => {
    setGameSettings(prev => ({
      ...prev,
      [game]: { ...prev[game], [field]: value }
    }));
    addNotification(`${game} ${field} updated to ${value}`);
  };

  const gameTypes = [
    { key: 'quiz', name: 'Quiz Game', color: 'from-blue-500 to-indigo-500' },
    { key: 'matching', name: 'Memory Matching', color: 'from-green-500 to-emerald-500' },
    { key: 'rps', name: 'Rock Paper Scissors', color: 'from-orange-500 to-red-500' }
  ];

  const difficulties = ['easy', 'medium', 'hard'];
  const timers = [15, 30, 45, 60, 90];
  const rounds = [5, 10, 15, 20, 25];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-text-primary">Game Arena Configuration</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Game Settings */}
        <div className="card p-8">
          <h3 className="text-2xl font-black text-text-primary mb-8">Game Settings</h3>
          {gameTypes.map((gameType) => (
            <div key={gameType.key} className="mb-8 p-6 bg-black-card/50 rounded-2xl border border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${gameType.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-lg">🎮</span>
                </div>
                <h4 className="text-xl font-bold text-text-primary">{gameType.name}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Timer (s)</label>
                  <select
                    value={gameSettings[gameType.key].timer}
                    onChange={(e) => updateMechanic(gameType.key, 'timer', parseInt(e.target.value))}
                    className="w-full p-3 bg-black-card/30 border border-border/50 rounded-xl text-text-primary focus:border-purple-primary/50"
                  >
                    {timers.map(t => <option key={t} value={t}>{t}s</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Difficulty</label>
                  <select
                    value={gameSettings[gameType.key].difficulty}
                    onChange={(e) => updateMechanic(gameType.key, 'difficulty', e.target.value)}
                    className="w-full p-3 bg-black-card/30 border border-border/50 rounded-xl text-text-primary focus:border-purple-primary/50"
                  >
                    {difficulties.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Rounds</label>
                  <select
                    value={gameSettings[gameType.key].rounds}
                    onChange={(e) => updateMechanic(gameType.key, 'rounds', parseInt(e.target.value))}
                    className="w-full p-3 bg-black-card/30 border border-border/50 rounded-xl text-text-primary focus:border-purple-primary/50"
                  >
                    {rounds.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Records */}
        <div className="card p-8">
          <h3 className="text-2xl font-black text-text-primary mb-6">Top Records</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {records.map((record) => (
              <div key={record.id} className="flex items-center gap-4 p-4 bg-black-card/50 rounded-2xl group hover:bg-black-card/70 transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-primary to-purple-secondary rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0">
                  #{records.length - records.indexOf(record)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-text-primary truncate">{record.player}</div>
                  <div className="text-text-secondary text-sm">{record.game}</div>
                </div>
                <div className="text-2xl font-black text-text-primary">{record.score}%</div>
                <div className="text-text-secondary text-sm ml-4">{new Date(record.date).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-text-primary">Game Performance Summary</h3>
          <button className="px-6 py-2 bg-purple-primary/20 hover:bg-purple-primary/30 text-purple-primary rounded-xl transition-all">
            Export CSV
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-8 border border-border/50 rounded-2xl">
            <div className="text-4xl font-black text-blue-400 mb-2">92%</div>
            <div className="text-text-secondary text-lg font-semibold">Quiz Avg</div>
          </div>
          <div className="text-center p-8 border border-border/50 rounded-2xl">
            <div className="text-4xl font-black text-green-400 mb-2">88%</div>
            <div className="text-text-secondary text-lg font-semibold">Matching Avg</div>
          </div>
          <div className="text-center p-8 border border-border/50 rounded-2xl">
            <div className="text-4xl font-black text-orange-400 mb-2">78%</div>
            <div className="text-text-secondary text-lg font-semibold">RPS Avg</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;

