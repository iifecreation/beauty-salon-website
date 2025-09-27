import { cookies } from 'next/headers';
import Image from 'next/image';
import BookingForm from './BookingForm';

async function getService(id: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const res = await fetch(`${base}/api/services/${id}`, {
    cache: 'no-store',
    headers: { Cookie: cookies().toString() },
  });
  if (!res.ok) return null;
  return await res.json();
}

export default async function ServicePage({ params }: { params: { id: string } }) {
  const service = await getService(params.id);
  if (!service) return (
    <div className="max-w-xl mx-auto py-24 px-4 flex flex-col items-center justify-center min-h-[60vh]">
      <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500 mb-4">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9zm-9 4h.01" />
      </svg>
      <h2 className="text-2xl font-semibold mb-2 text-center">Service Not Found</h2>
      <p className="text-muted-foreground text-center mb-6">Sorry, the service you are looking for does not exist or may have been removed.</p>
      <a href="/services" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition">Back to Services</a>
    </div>
  );
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <a href="/services" className="text-test-brown-800 hover:underline flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Services
            </a>
          </li>
          <li className="text-muted-foreground">/
            <span className="ml-2">{service.name}</span>
          </li>
        </ol>
      </nav>
      <h1 className="text-4xl font-bold mb-2 text-center">{service.name}</h1>
      <div className="flex flex-wrap gap-4 justify-center mb-2">
        <span className="bg-accent px-2 py-1 rounded text-sm">{service.category}</span>
        <span className="text-muted-foreground text-sm">{service.duration}</span>
        <span className="text-primary font-semibold text-base">{typeof service.price === 'number' ? `$${service.price}` : service.price}</span>
      </div>
      <p className="text-lg text-muted-foreground mb-2 text-center">{service.description}</p>
      <div className="w-full flex justify-center mb-2">
        <div className="relative w-full max-w-lg h-56 md:h-72">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
      <div className="prose prose-neutral max-w-none mb-4 mx-auto" dangerouslySetInnerHTML={{ __html: service.content }} />
      <div className="mt-4">
        <BookingForm serviceId={service._id} />
      </div>
    </div>
  );
}
