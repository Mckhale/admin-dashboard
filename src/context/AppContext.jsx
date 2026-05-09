import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [stats, setStats] = useState({
    'total-students': 1234,
    'active-today': 456,
    'average-accuracy': 87,
    'completion-rate': 72,
    'xp-trend': [100, 150, 200, 180, 250],
    'module-usage': [23, 19, 30, 25, 28],
  });
  const [notifications, setNotifications] = useState([]);
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('eduv-students');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'John Doe', email: 'john@example.com', level: 12, streak: 7, xp: 1245, avatar: 'https://i.pravatar.cc/48?img=1' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', level: 8, streak: 3, xp: 789, avatar: 'https://i.pravatar.cc/48?img=2' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', level: 15, streak: 12, xp: 2100, avatar: 'https://i.pravatar.cc/48?img=3' },
    ];
  });
  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem('eduv-modules');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Math Basics', type: 'lesson', files: [], aiGenerated: false },
      { id: 2, title: 'Quiz: Algebra', type: 'quiz', files: ['algebra.pdf'], aiGenerated: true },
    ];
  });
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('eduv-announcements');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'New Module Released', content: 'Check out Math Basics!', date: '2024-01-15' },
    ];
  });
  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem('eduv-feedback');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Great math lesson! Very clear explanations.', status: 'pending', student: 'John Doe', date: '2024-01-15' },
      { id: 2, text: 'Quiz was too difficult.', status: 'approved', student: 'Jane Smith', date: '2024-01-14' },
      { id: 3, text: 'Voice interaction helped pronunciation.', status: 'rejected', student: 'Bob Johnson', date: '2024-01-13' },
    ];
  });

  // Persist to localStorage
  useEffect(() => localStorage.setItem('eduv-students', JSON.stringify(students)), [students]);
  useEffect(() => localStorage.setItem('eduv-modules', JSON.stringify(modules)), [modules]);
  useEffect(() => localStorage.setItem('eduv-announcements', JSON.stringify(announcements)), [announcements]);
  useEffect(() => localStorage.setItem('eduv-feedback', JSON.stringify(feedback)), [feedback]);

  const addNotification = (msg) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000);
  };

  const value = {
    stats, setStats,
    notifications, addNotification,
    students, setStudents,
    modules, setModules,
    announcements, setAnnouncements,
    feedback, setFeedback,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
