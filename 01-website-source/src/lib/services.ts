export type Service = {
  slug: string;
  name: string;
  href: string;
  doodle: string;
  hover: string;
  scribble: string;
  tagline: string;
  blurb: string;
  how: string[];
};

export const services: Service[] = [
  {
    slug: "laundry",
    name: "Laundry",
    href: "/product#laundry",
    doodle: "/doodles/laundry.png",
    hover: "Your laundry pile called.",
    scribble: "please deal with me.",
    tagline: "We wash. You don't.",
    blurb: "Pickup → wash → return. No laundry mountain between classes.",
    how: [
      "Book a pickup from your hostel or PG.",
      "We wash, dry, and fold.",
      "It comes back so you can skip the queue.",
    ],
  },
  {
    slug: "food",
    name: "Food",
    href: "/product#food",
    doodle: "/doodles/tiffin.png",
    hover: "Because surviving on Maggi isn't a personality.",
    scribble: "eat something.",
    tagline: "Good food without the daily headache.",
    blurb: "Student-friendly tiffin options that don't eat your whole afternoon.",
    how: [
      "Pick a tiffin or meal plan that fits your week.",
      "We work with verified, student-friendly providers.",
      "Food shows up. You get back to class.",
    ],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    href: "/product#cleaning",
    doodle: "/doodles/cleaning.png",
    hover: "Your room needs help.",
    scribble: "it's been weeks.",
    tagline: "Your room called.",
    blurb: "We'll help get it together — mop, spray, and the stuff you've been ignoring.",
    how: [
      "Tell us the mess level. Honest is fine.",
      "A verified cleaner shows up when you book.",
      "You come home to a room that feels like yours again.",
    ],
  },
  {
    slug: "storage",
    name: "Storage",
    href: "/product#storage",
    doodle: "/doodles/storage.png",
    hover: "Moving out? We'll hold your stuff.",
    scribble: "I have nowhere to go.",
    tagline: "Your stuff doesn't need to move every semester.",
    blurb: "Store belongings between moves, internships, and that one chaotic packing week.",
    how: [
      "Pack what you want held.",
      "We pick up and store it.",
      "Get it back when you're back.",
    ],
  },
  {
    slug: "errands",
    name: "Errands",
    href: "/product#errands",
    doodle: "/doodles/errands.png",
    hover: "One less thing on your list.",
    scribble: "not another trip.",
    tagline: "Tiny task. Huge inconvenience.",
    blurb: "Let someone else handle the boring campus-life logistics.",
    how: [
      "Drop the task in one place.",
      "A partner runs it.",
      "You keep your afternoon.",
    ],
  },
  {
    slug: "internships",
    name: "Internships",
    href: "/product#internships",
    doodle: "/doodles/internships.png",
    hover: "Your next opportunity starts here.",
    scribble: "your LinkedIn is crying.",
    tagline: "Less searching. More applying.",
    blurb: "Find opportunities and get help navigating applications — without 14 extra tabs.",
    how: [
      "See student-relevant openings in one feed.",
      "Get help with the messy application bits.",
      "Apply without living on five different portals.",
    ],
  },
  {
    slug: "deals",
    name: "Student Deals",
    href: "/product#deals",
    doodle: "/doodles/deals.png",
    hover: "Your student ID should be getting you more.",
    scribble: "use the ID.",
    tagline: "Your student ID should be getting you more.",
    blurb: "Campus-friendly discounts and offers that actually matter to hostel life.",
    how: [
      "Browse deals made for students.",
      "Flash your ID where it counts.",
      "Spend less on the everyday stuff.",
    ],
  },
];
