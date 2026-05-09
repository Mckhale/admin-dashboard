import { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';

const FeedbackPage = () => {
  const { feedback: feedbacks, setFeedback: setFeedbacks, addNotification } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredFeedbacks = feedbacks.filter(fb =>
    (fb.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
     fb.student.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || fb.status === filterStatus)
  );

  const handleApprove = (id) => {
    setFeedbacks(prev => prev.map(f => f.id === id ? {...f, status: 'approved'} : f));
    addNotification('Feedback approved');
  };

  const handleDelete = (id) => {
    setFeedbacks(prev => prev.filter(f => f.id !== id));
    addNotification('Feedback deleted');
    setDeleteConfirm(null);
  };

  const statusColors = {
    pending: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
    approved: 'bg-green-500/20 border-green-500/30 text-green-400',
    rejected: 'bg-red-500/20 border-red-500/30 text-red-400'
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return 'Pending Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-text-primary">Peer Feedback & Moderation</h1>
        <div className="flex gap-4 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 lg:w-72 px-6 py-3 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary placeholder-text-secondary focus:border-purple-primary/50"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-6 py-3 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary focus:border-purple-primary/50"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button 
            onClick={() => addNotification('Feedback list refreshed')}
            className="px-6 py-3 bg-purple-primary/20 hover:bg-purple-primary/30 border border-purple-primary/30 text-purple-primary font-semibold rounded-2xl transition-all"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="p-6 text-left font-bold text-text-primary w-8/12">Feedback</th>
                <th className="p-6 text-left font-bold text-text-primary">Student</th>
                <th className="p-6 text-left font-bold text-text-primary">Status</th>
                <th className="p-6 text-left font-bold text-text-primary">Date</th>
                <th className="p-6 text-left font-bold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredFeedbacks.map((fb) => (
                <tr key={fb.id} className="hover:bg-black-card/30 transition-colors">
                  <td className="p-6">
                    <div className="line-clamp-2">{fb.text}</div>
                  </td>
                  <td className="p-6 font-semibold text-text-primary">{fb.student}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[fb.status]}`}>
                      {getStatusLabel(fb.status)}
                    </span>
                  </td>
                  <td className="p-6 text-text-secondary text-sm">{new Date(fb.date).toLocaleDateString()}</td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      {fb.status === 'pending' && (
                        <button
                          onClick={() => handleApprove(fb.id)}
                          className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm rounded-xl border border-green-500/30 transition-all"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteConfirm(fb.id)}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded-xl border border-red-500/30 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredFeedbacks.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-text-secondary py-24">
                    No feedback found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-black-card/95 backdrop-blur-xl border border-border/50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-black text-text-primary mb-4">Delete Feedback?</h3>
            <p className="text-text-primary mb-8">This feedback will be permanently removed.</p>
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

export default FeedbackPage;

