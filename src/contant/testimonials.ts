 
 type Testimonial = {
   id: number;
   name: string;
   service: string;
   location: string;
   review: string;
   image: string;
 };
 
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily",
    service: "Professional Makeup Course",
    location: "Spain",
    review:
      "The makeup course completely transformed my career. The trainers were patient, detailed, and showed us the artistry behind every brush stroke.",
    image: "/images/22/IMG-20250919-WA0029.jpg",
  },
  {
    id: 2,
    name: "James Wilson",
    service: "Pedicure & Nail Care Service",
    location: "Los Angeles, USA",
    review:
      "I’ve never felt so pampered! The pedicure session was relaxing and professional. My feet feel brand new.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 3,
    name: "Isabella Torres",
    service: "Nail Fixing Service",
    location: "Guadalajara, Mexico",
    review:
      "They fixed my broken nails so beautifully you can’t even tell there was damage. Excellent service with so much care.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 4,
    name: "Lilly",
    service: "Makeup Masterclass",
    location: "Guadalajara, Mexico",
    review:
      "The masterclass gave me confidence to start freelancing as a makeup artist. The academy is professional and inspiring.",
    image: "/images/25/IMG-20250920-WA0003.jpg",
  },
  {
    id: 5,
    name: "Camila Hernandez",
    service: "Manicure Service",
    location: "Monterrey, Mexico",
    review:
      "My manicure was flawless. The attention to detail and hygiene practices made me feel safe and valued as a client.",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
  },
  {
    id: 6,
    name: "David Johnson",
    service: "Nail Art Workshop",
    location: "Houston, USA",
    review:
      "I joined the nail art workshop and learned creative techniques that I now use in my salon. Worth every second!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 7,
    name: "Maria Gonzalez",
    service: "Pedicure Service",
    location: "Tijuana, Mexico",
    review:
      "Their pedicure is the most relaxing I’ve ever had. The staff is professional and welcoming every single time.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: 8,
    name: "Ethan Miller",
    service: "Professional Makeup Service",
    location: "Chicago, USA",
    review:
      "I booked them for an event and received countless compliments. Their artistry is top-notch and truly enhanced my look.",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    id: 9,
    name: "Valeria Ramirez",
    service: "Nail Fixing & Manicure",
    location: "Puebla, Mexico",
    review:
      "The team fixed my nails and gave me a fresh manicure. The results were stunning, and I felt amazing.",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
  },
  {
    id: 10,
    name: "Belinda",
    service: "Advanced Makeup Course",
    location: "Germany",
    review:
      "The advanced makeup course was challenging but rewarding. I feel fully prepared to take on clients confidently.",
    image: "/images/22/IMG-20250919-WA0028.jpg",
  },
];