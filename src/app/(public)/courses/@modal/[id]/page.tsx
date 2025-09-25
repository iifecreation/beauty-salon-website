"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const StudentForm = dynamic(() => import('./StudentForm'), { ssr: false });

export default function CourseModal() {
  const router = useRouter();
  const { id } = useParams();
  
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/courses/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setCourse(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return null;
  if (!course) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 flex flex-col items-center gap-4 animate-in fade-in zoom-in">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500 mb-2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9zm-9 4h.01" />
        </svg>
        <h2 className="text-xl font-semibold text-center">Course does not exist</h2>
        <p className="text-muted-foreground text-center">The course you are looking for could not be found.</p>
        <button
          className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bottom-0 z-50 flex items-end justify-center bg-black/40 h-screen">
      <div
        className="relative border-0 w-full h-full md:h-[90vh] md:w-full md:rounded-xl bg-white shadow-lg px-4 md:px-8 flex flex-col overflow-y-auto animate-in fade-in zoom-in"
        style={{ maxWidth: '100vw' }}
      >
        <button
          className="absolute top-4 right-4 text-xl bg-gray-100 rounded-full px-2 py-1 hover:bg-gray-200 z-10"
          onClick={() => router.back()}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex flex-col gap-4 md:gap-6 w-full max-w-2xl mx-auto py-8 px-4 md:px-0">
          <h2 className="text-3xl font-bold mb-2 text-center">{course.title}</h2>
          <div className="flex flex-wrap gap-4 justify-center mb-2">
            <span className="bg-accent px-2 py-1 rounded text-sm">{course.level}</span>
            <span className="text-muted-foreground text-sm">{course.duration}</span>
            <span className="text-primary font-semibold text-base">{typeof course.price === 'number' ? `$${course.price}` : course.price}</span>
          </div>
          <p className="text-lg text-muted-foreground mb-2 text-center">{course.description}</p>
          <div className="w-full flex justify-center mb-2">
            <div className="relative w-full max-w-lg h-56 md:h-72">
              <Image
                src={course.image || 'https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg'}
                alt={course.title}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          <div className="prose prose-neutral max-w-none mb-4 mx-auto" dangerouslySetInnerHTML={{ __html: course.content }} />
          {!showForm && (
            <button
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition w-full mt-2"
              onClick={() => setShowForm(true)}
            >
              Enroll Now
            </button>
          )}
          {showForm && (
            <div className="mt-4">
              <StudentForm courseId={course._id} onSuccess={() => setShowForm(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
