import React from 'react';

interface BookingDetailsModalProps {
  booking: any;
  onClose: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;
  return (
    <div className="fixed inset-0 bg-black/35 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">&times;</button>
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        <div className="space-y-2">
          <div><strong>Name:</strong> {booking.name}</div>
          <div><strong>Email:</strong> {booking.email}</div>
          {booking.phone && <div><strong>Phone:</strong> {booking.phone}</div>}
          <div><strong>Service:</strong> {typeof booking.service === 'object' ? booking.service.name || booking.service.title || booking.service._id : booking.service}</div>
          <div><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</div>
          {booking.location && <div><strong>Location:</strong> {booking.location}</div>}
          <div><strong>Status:</strong> {booking.status}</div>
          {booking.notes && <div><strong>Notes:</strong> {booking.notes}</div>}
          <div><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
