import Image from "next/image";
import React from "react";

interface StudentDetailsModalProps {
  student: any;
  onClose: () => void;
}

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
  student,
  onClose,
}) => {
  if (!student) return null;
  return (
    <div className="fixed inset-0 bg-black/35 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Student Details</h2>
        <div className="space-y-2">
          <div>
            <strong>Name:</strong> {student.name}
          </div>
          <div>
            <strong>Email:</strong> {student.email}
          </div>
          {student.phone && (
            <div>
              <strong>Phone:</strong> {student.phone}
            </div>
          )}
          {student.address && (
            <div>
              <strong>Address:</strong> {student.address}
            </div>
          )}
          {student.dateOfBirth && (
            <div>
              <strong>Date of Birth:</strong>{" "}
              {new Date(student.dateOfBirth).toLocaleDateString()}
            </div>
          )}
          {student.gender && (
            <div>
              <strong>Gender:</strong> {student.gender}
            </div>
          )}
          {student.profileImage && (
            <div>
              <strong>Profile Image:</strong>{" "}
              <Image
                width={100}
                height={100}
                src={student.profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover mt-1"
              />
            </div>
          )}
          {student.educationLevel && (
            <div>
              <strong>Education Level:</strong> {student.educationLevel}
            </div>
          )}
          {student.guardianName && (
            <div>
              <strong>Guardian Name:</strong> {student.guardianName}
            </div>
          )}
          {student.emergencyContact && (
            <div>
              <strong>Emergency Contact:</strong> {student.emergencyContact}
            </div>
          )}
          {student.notes && (
            <div>
              <strong>Notes:</strong> {student.notes}
            </div>
          )}
          <div>
            <strong>Preferred Mode:</strong> {student.preferredMode}
          </div>
          <div>
            <strong>Enrolled Courses:</strong>{" "}
            {Array.isArray(student.enrolledCourses)
              ? student.enrolledCourses.map((c: any) => c.title || c).join(", ")
              : ""}
          </div>
          <div>
            <strong>Registered At:</strong>{" "}
            {new Date(student.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
