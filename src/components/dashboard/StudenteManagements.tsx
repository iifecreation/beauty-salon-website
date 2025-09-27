import React, { useEffect, useState } from 'react';
import StudentDetailsModal from './StudentDetailsModal';
import api from '@/lib/api';

function StudenteManagements() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/student");
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      console.log(data);
      
      setStudents(data || []);
    } catch (err) {
      console.error("Failed to fetch services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    (s.phone && s.phone.includes(search))
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Preferred Mode</th>
              <th className="py-2 px-4 border-b">Registered</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-6">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-6">No students found.</td></tr>
            ) : (
              filtered.map(student => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">{student.phone || '-'}</td>
                  <td className="py-2 px-4 border-b">{student.preferredMode}</td>
                  <td className="py-2 px-4 border-b">{student.createdAt ? new Date(student.createdAt).toLocaleDateString() : '-'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-test-brown-800 hover:bg-test-brown-800/80 rounded-full text-white px-4 py-1 text-sm"
                      onClick={() => setSelectedStudent(student)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedStudent && (
        <StudentDetailsModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
}

export default StudenteManagements;
