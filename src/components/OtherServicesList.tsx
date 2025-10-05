"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function OtherServicesList({ currentId }: { currentId: string }) {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/services?limit=6')
      .then((r) => r.json())
      .then((data) => setServices(data || []))
      .catch(() => setServices([]));
  }, []);

  const others = services.filter((s) => s._id !== currentId).slice(0, 6);

  return (
    <>
      {others.map((s) => (
        <Link key={s._id} href={`/services/${s._id}`} className="block p-4 border rounded-lg hover:shadow-md transition">
          <h4 className="font-semibold">{s.name}</h4>
          <p className="text-sm text-muted-foreground">{s.duration} • {s.category}</p>
          <p className="text-primary font-semibold">{s.price}</p>
        </Link>
      ))}
    </>
  );
}
