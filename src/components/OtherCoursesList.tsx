"use client";

import Link from "next/link";
import { courses } from "@/contant/courses";

export default function OtherCoursesList({ currentId }: { currentId: string }) {
  // Since our courses data may not have _id, we match by title if needed
  const others = courses.filter((c) => c.name !== currentId && c.name !== (currentId as any));

  return (
    <>
      {others.map((c) => (
        <Link key={c.name} href={`/courses/${encodeURIComponent(c.name)}`} className="block p-4 border rounded-lg hover:shadow-md transition">
          <h4 className="font-semibold">{c.name}</h4>
          <p className="text-sm text-muted-foreground">{c.duration} • {c.level}</p>
          <p className="text-primary font-semibold">{c.price}</p>
        </Link>
      ))}
    </>
  );
}
