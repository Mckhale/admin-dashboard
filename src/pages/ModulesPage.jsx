import { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import Modal from '../components/Modal.jsx';

const ModulesPage = () => {
  const { modules, setModules, addNotification } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAIGenModal, setShowAIGenModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({ title: '', type: 'lesson', files: [] });
  const [aiGenData, setAiGenData] = useState({ title: '', type: 'lesson' });

  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const newModule = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      files: formData.files.map(f => f.name),
      aiGenerated: false
    };
    setModules(prev => [...prev, newModule]);
    setShowUploadModal(false);
    setFormData({ title: '', type: 'lesson', files: [] });
    addNotification('Module uploaded');
  };

  const handleAIGenSubmit = (e) => {
    e.preventDefault();
    const newModule = {
      id: Date.now(),
      title: `${aiGenData.title} (AI Generated)`,
      type: aiGenData.type,
      files: [`${aiGenData.title.toLowerCase()}.pdf`],
      aiGenerated: true
    };
    setModules(prev => [...prev, newModule]);
    setShowAIGenModal(false);
    setAiGenData({ title: '', type: 'lesson' });
    addNotification('AI content generated');
  };

  const handleDelete = (id) => {
    setModules(prev => prev.filter(m => m.id !== id));
    addNotification('Module deleted');
    setShowDeleteConfirm(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary">Module Management</h1>
          <p className="text-text-secondary mt-1">{filteredModules.length} modules</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 sm:w-72 px-6 py-3 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary placeholder-text-secondary focus:border-purple-primary/50"
          />
          <button 
            onClick={() => setShowAIGenModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-500/30 text-blue-400 font-semibold rounded-2xl transition-all"
          >
            AI Generate
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 border border-emerald-500/30 text-emerald-400 font-semibold rounded-2xl transition-all"
          >
            + Upload Module
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <div key={module.id} className="card p-6 group hover:shadow-lg hover:shadow-purple-primary/10 transition-all relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  module.aiGenerated ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}>
                  {module.aiGenerated ? 'AI' : module.type}
                </span>
                {module.files.length > 0 && (
                  <span className="px-3 py-1 bg-purple-primary/20 text-purple-primary text-xs font-semibold rounded-full">
                    {module.files.length} files
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowDeleteConfirm(module.id)}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-xl transition-all"
              >
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2">{module.title}</h3>
            <div className="flex flex-wrap gap-1 mb-4">
              {module.files.slice(0, 2).map((file, i) => (
                <span key={i} className="px-2 py-1 bg-black-card/50 text-xs rounded-lg text-text-secondary">
                  {file.split('.').pop()?.toUpperCase()}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-4 bg-purple-primary/20 hover:bg-purple-primary/30 text-purple-primary text-sm rounded-xl transition-all">
                Preview
              </button>
              <button className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm rounded-xl transition-all">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload New Module">
        <form onSubmit={handleUploadSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary focus:border-purple-primary/50"
              placeholder="Module Title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary focus:border-purple-primary/50"
              required
            >
              <option value="lesson">Lesson</option>
              <option value="quiz">Quiz</option>
              <option value="voice">Voice Interaction</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Files (PDF, Images, Audio)</label>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.png,.mp3,.wav"
              onChange={(e) => setFormData({...formData, files: Array.from(e.target.files)})}
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl file:bg-emerald-500/20 file:border-emerald-500/30 file:text-emerald-400 file:rounded-xl file:px-4 file:py-2 file:cursor-pointer hover:file:bg-emerald-500/30"
            />
            <div className="mt-3 text-xs text-text-secondary">
              {formData.files.length} files selected
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-lg transition-all"
          >
            Upload Module
          </button>
        </form>
      </Modal>

      {/* AI Gen Modal */}
      <Modal isOpen={showAIGenModal} onClose={() => setShowAIGenModal(false)} title="Generate AI Content">
        <form onSubmit={handleAIGenSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Topic Title</label>
            <input
              type="text"
              value={aiGenData.title}
              onChange={(e) => setAiGenData({...aiGenData, title: e.target.value})}
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary focus:border-purple-primary/50"
              placeholder="e.g. Algebra Basics"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Content Type</label>
            <select
              value={aiGenData.type}
              onChange={(e) => setAiGenData({...aiGenData, type: e.target.value})}
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary focus:border-purple-primary/50"
            >
              <option value="lesson">Lesson Content</option>
              <option value="quiz">Quiz Questions</option>
              <option value="voice">Voice Prompt</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-lg transition-all"
          >
            Generate with AI
          </button>
        </form>
      </Modal>

      {/* Delete Confirm */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-black-card/95 backdrop-blur-xl border border-border/50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-black text-text-primary mb-4">Delete Module?</h3>
            <p className="text-text-primary mb-8">This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold py-3 px-6 rounded-xl border border-red-600/30 transition-all"
              >
                Delete Module
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-black-card/50 hover:bg-black-card/70 text-text-primary font-semibold py-3 px-6 rounded-xl border border-border/50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulesPage;

