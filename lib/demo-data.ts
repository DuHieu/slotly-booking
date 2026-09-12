import { addDays, setHours, setMinutes, format } from "date-fns";

export const demoProvider = {
  id: "demo-provider",
  name: "Aura Studio & Advisory",
  tagline: "Strategic Product & Design Consultation",
  slug: "aura-studio",
  email: "hello@aurastudio.design",
  bio: "Boutique digital advisory and product design studio helping founders and service leaders build standout products and scale high-impact operations.",
  timezone: "UTC+7 (Bangkok / Hanoi)",
  location: "Google Meet / Remote Video Call",
  rating: "4.98",
  reviewsCount: 84,
};

export const demoServices = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "Strategy & Diagnostic Consultation",
    badge: "Popular Starter",
    description: "A focused session analyzing your current product positioning, workflow bottlenecks, and high-impact growth levers.",
    duration: 45,
    price: 95,
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Design Architecture & UX Review",
    badge: "Core Advisory",
    description: "An in-depth technical and UX audit with concrete architecture guidelines, component patterns, and prioritized action items.",
    duration: 60,
    price: 180,
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    name: "Executive Advisory Intensive",
    badge: "Leadership Deep-Dive",
    description: "Comprehensive strategic advisory for founders and leadership on roadmap prioritization, team velocity, and conversion optimization.",
    duration: 90,
    price: 280,
  },
];

export const demoBookings = [
  {
    id: "bk-001",
    customer: "Sophia Martinez",
    email: "sophia.m@verve.io",
    service: "Design Architecture & UX Review",
    date: "Today",
    time: "14:00 - 15:00",
    status: "confirmed",
    price: 180,
  },
  {
    id: "bk-002",
    customer: "Liam Henderson",
    email: "liam@hendersoncap.com",
    service: "Strategy & Diagnostic Consultation",
    date: "Tomorrow",
    time: "10:30 - 11:15",
    status: "pending",
    price: 95,
  },
  {
    id: "bk-003",
    customer: "Aria Thorne",
    email: "aria@prismaventures.co",
    service: "Executive Advisory Intensive",
    date: "Thursday",
    time: "15:00 - 16:30",
    status: "confirmed",
    price: 280,
  },
  {
    id: "bk-004",
    customer: "Marcus Vance",
    email: "marcus@vancecloud.dev",
    service: "Strategy & Diagnostic Consultation",
    date: "Friday",
    time: "09:00 - 09:45",
    status: "confirmed",
    price: 95,
  },
];

export type DemoSlot = {
  value: string;
  label: string;
  timeString: string;
  period: "morning" | "afternoon";
};

export function getDemoSlots(): DemoSlot[] {
  const tomorrow = addDays(new Date(), 1);
  const timeTemplates = [
    { hours: 9, minutes: 0, period: "morning" as const },
    { hours: 10, minutes: 30, period: "morning" as const },
    { hours: 11, minutes: 30, period: "morning" as const },
    { hours: 13, minutes: 30, period: "afternoon" as const },
    { hours: 14, minutes: 30, period: "afternoon" as const },
    { hours: 15, minutes: 30, period: "afternoon" as const },
    { hours: 16, minutes: 30, period: "afternoon" as const },
    { hours: 17, minutes: 15, period: "afternoon" as const },
  ];

  return timeTemplates.map(({ hours, minutes, period }) => {
    const slotDate = setMinutes(setHours(tomorrow, hours), minutes);
    return {
      value: slotDate.toISOString(),
      label: format(slotDate, "EEE, MMM d 'at' HH:mm"),
      timeString: format(slotDate, "HH:mm"),
      period,
    };
  });
}

