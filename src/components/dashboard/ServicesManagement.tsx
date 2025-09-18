import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Clock, MapPin } from 'lucide-react';

const ServicesManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Bridal Makeup Session',
      category: 'Makeup',
      price: '$150',
      duration: '2 hours',
      location: 'Studio',
      status: 'Active',
      bookings: 8
    },
    {
      id: 2,
      name: 'Gel Manicure & Nail Art',
      category: 'Nail Care',
      price: '$65',
      duration: '1.5 hours',
      location: 'Studio',
      status: 'Active',
      bookings: 15
    },
    {
      id: 3,
      name: 'Classic Eyelash Extensions',
      category: 'Lashes',
      price: '$120',
      duration: '2.5 hours',
      location: 'Studio',
      status: 'Active',
      bookings: 12
    },
    {
      id: 4,
      name: 'Luxury Pedicure Treatment',
      category: 'Pedicure',
      price: '$85',
      duration: '1 hour',
      location: 'Studio',
      status: 'Active',
      bookings: 6
    },
    {
      id: 5,
      name: 'Eyebrow Shaping & Tinting',
      category: 'Eyebrows',
      price: '$45',
      duration: '45 minutes',
      location: 'Studio',
      status: 'Active',
      bookings: 20
    }
  ]);

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-md:p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light text-foreground mb-2">Services Management</h1>
          <p className="text-muted-foreground">Manage your beauty services and appointments</p>
        </div>
        <button 
          onClick={() => {setShowForm(true); setEditingService(null);}}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-[var(--radius)] hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-card border border-border rounded-[var(--radius)] p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                {service.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-primary hover:bg-primary/10 rounded-[var(--radius)] transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-[var(--radius)] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-medium text-foreground mb-4">{service.name}</h3>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-medium text-primary text-lg">{service.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Duration
                </div>
                <span className="text-sm text-foreground">{service.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  Location
                </div>
                <span className="text-sm text-foreground">{service.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Bookings</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  {service.bookings} this month
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-accent text-accent-foreground py-2 px-4 rounded-[var(--radius)] hover:opacity-90 transition-opacity text-sm">
                View Bookings
              </button>
              <button className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-[var(--radius)] hover:opacity-90 transition-opacity text-sm">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Service Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-[var(--radius)] p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-medium text-foreground mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Service Name</label>
                <input
                  type="text"
                  defaultValue={editingService?.name}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter service name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  defaultValue={editingService?.category}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select category</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Nail Care">Nail Care</option>
                  <option value="Lashes">Lashes</option>
                  <option value="Pedicure">Pedicure</option>
                  <option value="Eyebrows">Eyebrows</option>
                  <option value="Facial">Facial</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Price</label>
                  <input
                    type="text"
                    defaultValue={editingService?.price}
                    className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="$0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                  <input
                    type="text"
                    defaultValue={editingService?.duration}
                    className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="1 hour"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <select
                  defaultValue={editingService?.location}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select location</option>
                  <option value="Studio">Studio</option>
                  <option value="Mobile">Mobile Service</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Service description and what's included"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">What's Included</label>
                <textarea
                  rows={2}
                  className="w-full p-3 border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="List what's included in this service"
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
                  {editingService ? 'Update' : 'Add'} Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;