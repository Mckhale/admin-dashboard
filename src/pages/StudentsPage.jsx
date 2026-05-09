import { useState } from 'react';
import StudentModal from '../components/StudentModal.jsx';
import { useAppContext } from '../context/AppContext.jsx';

const StudentsPage = () => {
  const { students, setStudents, addNotification } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const studentsPerPage = 10;

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    addNotification('Student deleted');
    setDeleteConfirm(null);
  };

  const handleSaveStudent = (savedStudent) => {
    if (selectedStudent) {
      setStudents(prev => prev.map(s => s.id === savedStudent.id ? savedStudent : s));
    } else {
      setStudents(prev => [...prev, { ...savedStudent, id: Date.now() }]);
    }
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-text-primary">Student Management</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-6 py-3 bg-black-card/50 border border-border/50 rounded-2xl text-text-primary placeholder-text-secondary focus:border-purple-primary/50 focus:outline-none transition-all w-72"
          />
          <button 
            onClick={() => {
              setSelectedStudent(null);
              setShowModal(true);
            }}
            className="px-8 py-3 bg-gradient-to-r from-purple-primary to-purple-secondary text-white font-semibold rounded-2xl hover:shadow-lg transition-all"
          >
            + New Student
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border/30">
                <th className="p-6 text-left font-bold text-text-primary">Student</th>
                <th className="p-6 text-left font-bold text-text-primary">XP</th>
                <th className="p-6 text-left font-bold text-text-primary">Streak</th>
                <th className="p-6 text-left font-bold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {paginatedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-black-card/30 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={student.avatar} 
                        alt={student.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-border/50 shadow-lg"
                      />
                      <div>
                        <div className="font-semibold text-text-primary">{student.name}</div>
                        <div className="text-text-secondary text-sm">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 font-bold text-text-primary">{student.xp.toLocaleString()}</td>
                  <td className="p-6">
                    <div className="w-24 h-2 bg-black-card/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" 
                        style={{ width: `${Math.min(student.streak * 10, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-green-400 mt-1 font-semibold">{student.streak} day streak</div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(student)}
                        className="px-4 py-2 bg-purple-primary/20 hover:bg-purple-primary/30 text-purple-primary text-sm rounded-xl transition-all"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm(student.id)}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded-xl transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border/30 bg-black-card/50">
            <div className="text-text-secondary text-sm">
              Showing {((currentPage - 1) * studentsPerPage) + 1} to {Math.min(currentPage * studentsPerPage, filteredStudents.length)} of {filteredStudents.length} students
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-black-card/50 border border-border/50 rounded-xl text-text-primary hover:bg-purple-primary/20 disabled:opacity-50 transition-all"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-text-secondary font-mono">{currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-black-card/50 border border-border/50 rounded-xl text-text-primary hover:bg-purple-primary/20 disabled:opacity-50 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-black-card/95 backdrop-blur-xl border border-border/50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-black text-text-primary mb-4">Confirm Delete</h3>
            <p className="text-text-primary mb-8">Are you sure you want to permanently delete this student?</p>
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

      <StudentModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        onSave={handleSaveStudent}
      />
    </div>
  );
};

export default StudentsPage;


