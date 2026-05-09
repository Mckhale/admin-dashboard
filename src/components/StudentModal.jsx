import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import Modal from './Modal.jsx';

const StudentModal = ({ isOpen, onClose, student, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    xp: '',
    streak: '',
    avatar: null
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const { addNotification } = useAppContext();

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        xp: student.xp || '',
        streak: student.streak || '',
        avatar: null
      });
      setAvatarPreview(student.avatar || '');
    } else {
      setFormData({
        name: '',
        email: '',
        xp: '',
        streak: '',
        avatar: null
      });
      setAvatarPreview('');
    }
  }, [student, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const updatedStudent = {
        ...formData,
        id: student ? student.id : Date.now(),
        xp: parseInt(formData.xp),
        streak: parseInt(formData.streak),
        avatar: avatarPreview || `https://i.pravatar.cc/48?u=${formData.email}`
      };
      
      onSave(updatedStudent);
      addNotification(student ? 'Student updated' : 'Student created');
      onClose();
    } catch (err) {
      console.error(err);
      addNotification('Error saving student');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={student ? 'Edit Student' : 'New Student'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary placeholder-text-secondary focus:border-purple-primary/50 focus:outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary placeholder-text-secondary focus:border-purple-primary/50 focus:outline-none transition-all"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">XP Points</label>
            <input
              type="number"
              name="xp"
              value={formData.xp}
              onChange={handleInputChange}
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary placeholder-text-secondary focus:border-purple-primary/50 focus:outline-none transition-all"
              placeholder="1000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Streak (days)</label>
            <input
              type="number"
              name="streak"
              value={formData.streak}
              onChange={handleInputChange}
              className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary placeholder-text-secondary focus:border-purple-primary/50 focus:outline-none transition-all"
              placeholder="7"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">Profile Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-4 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary file:bg-purple-primary/20 file:border-purple-primary/30 file:text-purple-primary file:rounded-xl file:px-4 file:py-2 file:cursor-pointer hover:file:bg-purple-primary/30 transition-all"
          />
          {avatarPreview && (
            <div className="mt-3">
              <img src={avatarPreview} alt="Preview" className="w-24 h-24 rounded-2xl object-cover border border-border/50 shadow-lg" />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-primary to-purple-dark text-white font-bold py-4 px-8 rounded-2xl hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all active:scale-[0.98]"
        >
          {student ? 'Update Student' : 'Create Student'}
        </button>
      </form>
    </Modal>
  );
};

export default StudentModal;

