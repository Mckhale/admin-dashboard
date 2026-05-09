import { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import Modal from '../components/Modal.jsx';

const AnnouncementsPage = () => {
  const { announcements, setAnnouncements, addNotification } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', date: '' });

  const filteredAnnouncements = announcements.filter(ann =>
    ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreate = () => {
    setEditingAnnouncement(null);
    setFormData({ title: '', content: '', date: '' });
    setShowModal(true);
  };

  const openEdit = (ann) => {
    setEditingAnnouncement(ann);
    setFormData({ title: ann.title, content: ann.content, date: ann.date });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingAnnouncement) {
      const updated = { ...formData, id: editingAnnouncement.id };
      setAnnouncements(prev => prev.map(a => a.id === updated.id ? updated : a));
      addNotification('Announcement updated');
    } else {
      const saved = { ...formData, id: Date.now() };
      setAnnouncements(prev => [saved, ...prev]);
      addNotification('Announcement created');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    addNotification('Announcement deleted');
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-text-primary">Communications & Announcements</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-6 py-3 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary placeholder-text-secondary focus:border-purple-primary/50 w-72"
          />
          <button 
            onClick={openCreate}
            className="px-8 py-3 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 hover:from-orange-500/30 hover:to-yellow-500/30 border border-orange-500/30 text-orange-400 font-semibold rounded-2xl transition-all"
          >
            + New Announcement
          </button>
        </div>
      </div>

      {filteredAnnouncements.length === 0 ? (
        <div className="card p-12 text-center text-text-secondary">No announcements found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.map((ann) => (
            <div key={ann.id} className="card p-6 hover:shadow-lg hover:shadow-orange-primary/10 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-text-primary line-clamp-1">{ann.title}</h3>
                <button
                  onClick={() => setDeleteConfirm(ann.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-xl transition-all ml-auto"
                >
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p className="text-text-primary mb-4 line-clamp-3">{ann.content}</p>
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                <span>{new Date(ann.date).toLocaleDateString()}</span>
                <span className="ml-auto flex gap-2">
                  <button 
                    onClick={() => openEdit(ann)}
                    className="p-2 hover:bg-purple-primary/20 rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-emerald-500/20 rounded-xl transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingAnnouncement ? 'Edit Announcement' : 'New Announcement'}>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl focus:border-orange-primary/50 text-text-primary"
              placeholder="Announcement Title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows="5"
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl focus:border-orange-primary/50 text-text-primary resize-vertical"
              placeholder="Announcement message..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Publish Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl focus:border-orange-primary/50 text-text-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-all"
          >
            {editingAnnouncement ? 'Update Announcement' : 'Publish Announcement'}
          </button>
        </form>
      </Modal>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-black-card/95 backdrop-blur-xl border border-border/50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-black text-text-primary mb-4">Delete Announcement?</h3>
            <p className="text-text-primary mb-8">This will remove the announcement from all student dashboards.</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold py-3 px-6 rounded-xl border border-red-500/30 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
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

export default AnnouncementsPage;

