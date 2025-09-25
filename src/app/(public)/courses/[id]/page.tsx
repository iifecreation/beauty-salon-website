import { notFound } from 'next/navigation';
import Image from 'next/image';
import StudentForm from './StudentForm';


import { cookies } from 'next/headers';

async function getCourse(id: string) {
  // Build absolute URL for SSR
  const base = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const res = await fetch(`${base}/api/courses/${id}`, {
    cache: 'no-store',
    headers: { Cookie: cookies().toString() },
  });
  if (!res.ok) return null;
  return await res.json();
}


export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);
  if (!course) return (
    <div className="max-w-xl mx-auto py-24 px-4 flex flex-col items-center justify-center min-h-[60vh]">
      <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500 mb-4">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9zm-9 4h.01" />
      </svg>
      <h2 className="text-2xl font-semibold mb-2 text-center">Course Not Found</h2>
      <p className="text-muted-foreground text-center mb-6">Sorry, the course you are looking for does not exist or may have been removed.</p>
      <a href="/courses" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition">Back to Courses</a>
    </div>
  );
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 flex flex-col gap-6">
      <h1 className="text-4xl font-bold mb-2 text-center">{course.title}</h1>
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
      <div className="mt-4">
        <StudentForm courseId={course._id} />
      </div>
    </div>
  );
}
