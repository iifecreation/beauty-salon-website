import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Clock, Users } from 'lucide-react';

const CoursesManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Professional Makeup Artistry',
      category: 'Makeup',
      price: '$1,299',
      duration: '12 weeks',
      students: 24,
      status: 'Active',
      level: 'Beginner to Advanced'
    },
    {
      id: 2,
      name: 'Nail Art & Design Mastery',
      category: 'Nail Care',
      price: '$899',
      duration: '8 weeks',
      students: 18,
      status: 'Active',
      level: 'All Levels'
    },
    {
      id: 3,
      name: 'Eyelash Extension Certification',
      category: 'Lashes',
      price: '$799',
      duration: '6 weeks',
      students: 12,
      status: 'Enrolling',
      level: 'Beginner'
    }
  ]);

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-md:p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light text-foreground mb-2">Courses Management</h1>
          <p className="text-muted-foreground">Manage your beauty courses and training programs</p>
        </div>
        <button 
          onClick={() => {setShowForm(true); setEditingCourse(null);}}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-[var(--radius)] hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-card border border-border rounded-[var(--radius)] p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded text-xs font-medium ${
                course.status === 'Active' ? 'bg-green-100 text-green-800' :
                course.status === 'Enrolling' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {course.status}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="p-2 text-primary hover:bg-primary/10 rounded-[var(--radius)] transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-[var(--radius)] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-medium text-foreground mb-2">{course.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{course.category} • {course.level}</p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-medium text-foreground">{course.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Duration
                </div>
                <span className="text-sm text-foreground">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  Students
                </div>
                <span className="text-sm text-foreground">{course.students}</span>
              </div>
            </div>

            <button className="w-full bg-accent text-accent-foreground py-2 px-4 rounded-[var(--radius)] hover:opacity-90 transition-opacity text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Add/Edit Course Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-[var(--radius)] p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-medium text-foreground mb-4">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Course Name</label>
                <input
                  type="text"
                  defaultValue={editingCourse?.name}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter course name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  defaultValue={editingCourse?.category}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select category</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Nail Care">Nail Care</option>
                  <option value="Lashes">Lashes</option>
                  <option value="Pedicure">Pedicure</option>
                  <option value="Eyebrows">Eyebrows</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Price</label>
                  <input
                    type="text"
                    defaultValue={editingCourse?.price}
                    className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="$0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                  <input
                    type="text"
                    defaultValue={editingCourse?.duration}
                    className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="8 weeks"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Level</label>
                <select
                  defaultValue={editingCourse?.level}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                  <option value="Beginner to Advanced">Beginner to Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Course description and what students will learn"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Requirements</label>
                <textarea
                  rows={2}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Course requirements and prerequisites"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-border py-3 px-4 rounded-[var(--radius)] hover:bg-accent/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-[var(--radius)] hover:opacity-90 transition-opacity"
                >
                  {editingCourse ? 'Update' : 'Add'} Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesManagement;