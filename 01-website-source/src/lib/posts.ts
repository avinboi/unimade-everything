export type Post = {
  slug: string;
  pillar: string;
  title: string;
  description: string;
  sections: { heading?: string; body: string }[];
};

export const pillars = ["Hostel Life Tips", "Finding a PG", "Saving Money in College"];

export const posts: Post[] = [
  // Hostel Life Tips
  {
    slug: "hostel-life-tips",
    pillar: "Hostel Life Tips",
    title: "Hostel Life Tips: 10 Things Every First-Year Student Should Know",
    description: "What to pack, how to live with roommates, and how to actually enjoy hostel life.",
    sections: [
      { body: "Moving into a hostel is exciting and a little terrifying. These ten tips will help you settle in faster and skip the mistakes most first-years make." },
      { heading: "1. Pack less than you think", body: "Bring basics: bedsheets, a pillow, a bucket and mug, an extension board, a water bottle, a lock, and a small first-aid kit. You can buy everything else nearby." },
      { heading: "2. Carry copies of your documents", body: "Keep photocopies of your ID, admission letter and passport photos. Hostel offices always ask for them at the worst possible time." },
      { heading: "3. Talk to your roommate early", body: "Agree on sleep times, guests, cleaning and shared stuff in week one. Five awkward minutes now save a semester of fights." },
      { heading: "4. Keep a snack stash", body: "Mess timings are strict and hunger isn't. Keep fruit, biscuits, oats and peanut butter for late-night study sessions." },
      { heading: "5. Fix a laundry day", body: "Pick one day a week and stick to it, or book a pickup service so the pile never builds up." },
      { heading: "6. Clean a little, every day", body: "Ten minutes a day (bed made, desk cleared, trash out) keeps your room liveable and your roommate happy." },
      { heading: "7. Lock your valuables", body: "Laptops, phones and cash go missing more often than you'd think. Use a lock, and don't leave things on charge unattended." },
      { heading: "8. Leave your door open sometimes", body: "Literally. The friends you make in the first month of hostel often become your closest ones." },
      { heading: "9. Learn the hostel rules", body: "Curfews, guest policies and fines differ everywhere. Read them once so you don't learn them the hard way." },
      { heading: "10. Don't do everything yourself", body: "Unimade handles laundry, room cleaning and food from one app, so hostel life is about friends, not chores." },
    ],
  },
  {
    slug: "hostel-packing-checklist",
    pillar: "Hostel Life Tips",
    title: "The Ultimate Hostel Packing Checklist: What to Carry (and What to Leave Behind)",
    description: "A no-fluff list of everything you actually need for your hostel room.",
    sections: [
      { body: "Overpacking is the most common first-year mistake. Here's what you really need, sorted by category." },
      { heading: "Bedding and room", body: "Two bedsheets, a pillow and cover, a light blanket, a small mirror, hangers, a laundry bag and a door hook or two." },
      { heading: "Electronics", body: "Laptop and charger, a long extension board, earphones, a power bank and a small table lamp for late nights." },
      { heading: "Toiletries and health", body: "Bucket and mug, slippers, towel, toiletries, and a first-aid kit with basic medicines, band-aids and ORS." },
      { heading: "Documents", body: "Originals and photocopies of your ID, admission letter, marksheets, and around ten passport-size photos." },
      { heading: "Leave behind", body: "Heavy winter wear you won't need till December, too many shoes, and anything expensive you'd hate to lose. You can always buy things locally." },
    ],
  },
  {
    slug: "how-to-deal-with-roommates",
    pillar: "Hostel Life Tips",
    title: "How to Deal With a Difficult Roommate (Without Starting a War)",
    description: "Practical ways to handle messy, loud or inconsiderate roommates.",
    sections: [
      { body: "You don't have to be best friends with your roommate, but you do have to share a room. Here's how to keep the peace." },
      { heading: "Set ground rules early", body: "Talk about sleep, guests, cleaning and borrowing things in the first week, before anything goes wrong." },
      { heading: "Talk, don't text", body: "A calm face-to-face conversation solves more than a passive-aggressive WhatsApp message ever will." },
      { heading: "Use “I” statements", body: "“I can't sleep when the lights are on past 1” works better than “You're so inconsiderate.”" },
      { heading: "Pick your battles", body: "Let small things go. Save the conversations for what actually affects your sleep, studies or safety." },
      { heading: "Know when to escalate", body: "If it's affecting your health or safety, talk to your warden. Asking for a room change is completely okay." },
    ],
  },
  {
    slug: "healthy-food-for-hostel-students",
    pillar: "Hostel Life Tips",
    title: "Tired of Mess Food? Easy, Healthy Eating Hacks for Hostel Students",
    description: "How to eat better in a hostel without a kitchen or a big budget.",
    sections: [
      { body: "Mess food gets repetitive fast, and instant noodles aren't a meal plan. Here's how to eat well with what you have." },
      { heading: "Never skip breakfast", body: "Even a banana and a handful of peanuts beats nothing. Your 9 a.m. lecture brain will thank you." },
      { heading: "Stock smart snacks", body: "Roasted chana, makhana, fruits, oats, peanut butter and curd are cheap, filling and need no cooking." },
      { heading: "Make the most of the mess", body: "Load up on dal, sabzi and salad. Protein and veggies matter more than an extra roti." },
      { heading: "Kettle cooking", body: "If your hostel allows a kettle, you can make oats, poha and boiled eggs in minutes." },
      { heading: "Try a tiffin plan", body: "A homestyle tiffin service on weekdays is often healthier and cheaper than daily delivery. Unimade can sort that for you." },
    ],
  },
  {
    slug: "how-to-overcome-homesickness-in-hostel",
    pillar: "Hostel Life Tips",
    title: "Missing Home? How to Overcome Homesickness in Your First Hostel Year",
    description: "Why homesickness happens and what actually helps you feel at home.",
    sections: [
      { body: "Almost every hostel student feels homesick at some point. It's normal, and it gets better." },
      { heading: "Expect it", body: "Homesickness usually peaks in the first few weeks. Knowing that it's temporary takes away half the stress." },
      { heading: "Make your room feel like home", body: "Photos, fairy lights, your own pillow. Small things make a big difference." },
      { heading: "Build a routine", body: "Regular meals, sleep and gym or walk times give your day a structure that feels steady." },
      { heading: "Call home, but not all day", body: "A scheduled call a few times a week keeps you connected without stopping you from settling in." },
      { heading: "Say yes to plans", body: "Join clubs, eat with people, go on the late-night chai run. New friends make a new place feel like home." },
    ],
  },

  // Finding a PG
  {
    slug: "how-to-find-pg-near-college",
    pillar: "Finding a PG",
    title: "How to Find the Best PG Near Your College: A Complete Checklist",
    description: "PG vs hostel, what to check before paying, and red flags to avoid.",
    sections: [
      { body: "Searching “PG near me” gives you hundreds of options and zero clarity. Use this checklist to pick a PG you won't regret." },
      { heading: "Location first", body: "Aim for a 15-minute commute or less. Check what's nearby too: grocery stores, pharmacy, ATM, and food options." },
      { heading: "Know the real cost", body: "Ask what the rent includes: food, Wi-Fi, electricity, laundry, cleaning. Ask about the security deposit, the notice period and how refunds work. Get it in writing." },
      { heading: "Visit before you pay", body: "Check the room, the bathroom, water supply, ventilation and the mattress. Taste the food if meals are included." },
      { heading: "Talk to current residents", body: "They'll tell you what the owner won't: power cuts, food quality, safety, and how fast things get fixed." },
      { heading: "The short version", body: "Shortlist three, visit all of them, and compare honestly. Or let Unimade find verified rooms near your college for you." },
    ],
  },
  {
    slug: "pg-vs-hostel",
    pillar: "Finding a PG",
    title: "PG vs Hostel: Which Is Better for College Students?",
    description: "An honest comparison of cost, freedom, food and safety.",
    sections: [
      { body: "It's one of the first big decisions of college life. Here's how PGs and hostels compare." },
      { heading: "Cost", body: "College hostels are usually cheaper and include food. PG rent varies a lot by city and area, and extras like electricity can add up." },
      { heading: "Freedom", body: "Hostels have curfews and stricter rules. PGs usually offer more flexibility with timings and guests." },
      { heading: "Food", body: "Hostels have a mess with fixed timings. Some PGs include meals, others don't, so ask before you sign." },
      { heading: "Social life", body: "Hostels make it easier to make friends with classmates. PGs can feel more private, and sometimes more isolating." },
      { heading: "The verdict", body: "First year? A hostel helps you settle in. Later, a PG gives you more independence. Choose what fits your budget and personality." },
    ],
  },
  {
    slug: "pg-red-flags",
    pillar: "Finding a PG",
    title: "7 PG Red Flags You Should Never Ignore Before Paying the Deposit",
    description: "Warning signs that a PG will cost you more than rent.",
    sections: [
      { body: "A bad PG can ruin a whole semester. Watch out for these red flags before you hand over any money." },
      { heading: "1. No visit allowed", body: "If the owner pushes you to pay without seeing the room, walk away." },
      { heading: "2. No written agreement", body: "Verbal promises disappear when it's time to get your deposit back. Always get rent, deposit and notice period in writing." },
      { heading: "3. Hidden charges", body: "Electricity “extra,” maintenance “extra,” Wi-Fi “extra.” Ask for the full monthly cost upfront." },
      { heading: "4. Poor security", body: "No CCTV, no proper locks, no caretaker at night. Safety is non-negotiable." },
      { heading: "5. Water and power issues", body: "Ask residents about water shortages and power cuts. Check for a backup." },
      { heading: "6. Unhappy residents", body: "If current tenants look stressed or won't talk freely, that tells you a lot." },
      { heading: "7. Changing prices", body: "If the price shifts every time you ask, expect more surprises later." },
    ],
  },
  {
    slug: "questions-to-ask-pg-owner",
    pillar: "Finding a PG",
    title: "15 Questions to Ask a PG Owner Before You Move In",
    description: "Save this list for your next PG visit.",
    sections: [
      { body: "Asking the right questions upfront saves you from surprises later. Take this list with you." },
      { heading: "Money", body: "What's the monthly rent? What does it include? How much is the deposit, and when is it refunded? Is electricity extra? Are there any annual increases?" },
      { heading: "Rules", body: "Is there a curfew? Are guests allowed? What's the notice period? Can I cook or keep appliances?" },
      { heading: "Facilities", body: "Is there Wi-Fi, and how fast? Is laundry included? How often are rooms cleaned? Is there power backup and hot water?" },
      { heading: "Food and safety", body: "Are meals included, and can I see the menu? Is there CCTV and a night caretaker?" },
      { heading: "Too many questions?", body: "That's what Unimade is for. We list rooms with all of this answered upfront." },
    ],
  },
  {
    slug: "moving-into-pg-first-week",
    pillar: "Finding a PG",
    title: "Just Moved Into a PG? Your First-Week Survival Guide",
    description: "Everything to sort out in your first seven days.",
    sections: [
      { body: "You found the PG. Now make it feel like home and avoid the usual first-week headaches." },
      { heading: "Document the room", body: "Take photos of the room on day one, especially any damage. It protects your deposit later." },
      { heading: "Meet your neighbours", body: "Introduce yourself to flatmates and the caretaker. They're your support system for everything from spare keys to food tips." },
      { heading: "Find your essentials", body: "Locate the nearest grocery store, pharmacy, ATM, laundry and a good cheap place to eat." },
      { heading: "Set up your routine", body: "Figure out your commute, meal plan and laundry day in week one so the rest of the semester runs itself." },
      { heading: "Outsource the chores", body: "Book laundry, cleaning and food from Unimade so your first week is about settling in, not scrubbing." },
    ],
  },

  // Saving Money in College
  {
    slug: "how-to-save-money-as-a-college-student",
    pillar: "Saving Money in College",
    title: "How to Save Money as a College Student: 8 Tips That Actually Work",
    description: "Simple ways to stretch your monthly budget without missing out.",
    sections: [
      { body: "Running out of money before the month ends is practically a college tradition. These eight tips help you break it." },
      { heading: "1. Make a monthly budget", body: "List fixed costs (rent, food, travel, phone) first, then split what's left between fun and savings." },
      { heading: "2. Track your UPI spends", body: "Check your payment history every Sunday. Small daily spends add up faster than anything else." },
      { heading: "3. Cut food delivery", body: "Delivery fees and markups eat budgets. Use a mess or meal plan on weekdays and save delivery for weekends." },
      { heading: "4. Use student discounts", body: "Your college ID gets you cheaper software, streaming, travel and movie tickets. Always ask." },
      { heading: "5. Buy second-hand books", body: "Seniors sell books, calculators and lab coats for a fraction of the price." },
      { heading: "6. Cancel unused subscriptions", body: "Keep one streaming app, share it with friends, and cancel the rest." },
      { heading: "7. Earn on the side", body: "Tutoring, freelancing and campus ambassador programmes fit around classes." },
      { heading: "8. Bundle your services", body: "Paying separately for laundry, cleaning and food adds up. Unimade bundles them at student prices." },
    ],
  },
  {
    slug: "student-budget-plan",
    pillar: "Saving Money in College",
    title: "How to Make a Monthly Budget as a Student (With a Simple Template)",
    description: "A step-by-step budget plan you can set up in 15 minutes.",
    sections: [
      { body: "Budgeting sounds boring, but it's the reason some students are relaxed at the end of the month and others are borrowing." },
      { heading: "Step 1: Know your income", body: "Add up your allowance, scholarship and any part-time earnings for the month." },
      { heading: "Step 2: List fixed costs", body: "Rent, mess or tiffin, phone recharge, travel pass and subscriptions. These come out first." },
      { heading: "Step 3: Use 50/30/20", body: "50% for needs, 30% for wants like eating out and trips, 20% saved or kept as a buffer." },
      { heading: "Step 4: Track weekly", body: "Use a notes app or a simple spreadsheet. A five-minute check every Sunday is enough." },
      { heading: "Step 5: Adjust", body: "Overspent on food? Cut back next week. A budget is a guide, not a punishment." },
    ],
  },
  {
    slug: "part-time-jobs-for-college-students",
    pillar: "Saving Money in College",
    title: "10 Best Part-Time Jobs and Side Hustles for College Students",
    description: "Ways to earn extra money that fit around your classes.",
    sections: [
      { body: "A little extra income makes college a lot less stressful. Here are ten options that work around a student schedule." },
      { heading: "Teaching and tutoring", body: "Home tuitions, online tutoring and doubt-solving platforms pay well if you're strong in a subject." },
      { heading: "Freelancing", body: "Content writing, graphic design, video editing, social media management and web development all have steady demand." },
      { heading: "Campus roles", body: "Campus ambassador programmes, library or lab assistant jobs and event volunteering often pay or give stipends." },
      { heading: "Internships", body: "Paid internships build your CV and your bank balance at the same time." },
      { heading: "Selling stuff", body: "Sell old books, notes or handmade products to juniors and on campus groups." },
      { heading: "Protect your grades", body: "Cap your work at 10 to 15 hours a week so studies don't suffer." },
    ],
  },
  {
    slug: "student-discounts-india",
    pillar: "Saving Money in College",
    title: "Student Discounts You're Probably Not Using (But Should Be)",
    description: "Your college ID is worth more than you think.",
    sections: [
      { body: "Brands love students, and many offer discounts you've never heard of. Here's where to look." },
      { heading: "Software and tech", body: "Many design, coding and productivity tools have free or discounted student plans. Sign up with your college email." },
      { heading: "Streaming and music", body: "Several music and streaming apps offer student pricing. Check before you pay full price." },
      { heading: "Travel", body: "Railway concessions, student bus passes and airline student fares can save a lot on trips home." },
      { heading: "Laptops and gadgets", body: "Big brands run education pricing and back-to-college offers. Time your purchase around them." },
      { heading: "Always ask", body: "Cafes, gyms, cinemas and local shops often give student discounts if you just show your ID." },
    ],
  },
  {
    slug: "hostel-laundry-cost",
    pillar: "Saving Money in College",
    title: "How Much Does Laundry Cost in a Hostel? (2026 Guide)",
    description: "Hostel laundry costs ₹100 to ₹600 a month, or 8+ hours of your time. Here's what hand-washing, the dhobi and pickup services really cost in Gurugram.",
    sections: [
      { body: "TL;DR: One hostel student makes about 8 kg of laundry a month. Washing it by hand costs about ₹100 in detergent but around 8 hours of your time. A wash-and-fold service in Gurugram charges roughly ₹59–75 per kg, so ₹470–600 a month. Prepaid monthly plans are usually 10–20% cheaper than paying per order." },
      { heading: "How much laundry does one student actually have?", body: "About 2 kg a week, or 8 kg a month. That is our own estimate for a week of everyday clothes plus one towel and one bedsheet: a T-shirt weighs around 150 g, a pair of jeans around 600 g, a towel around 500 g and a single bedsheet around 700 g. Weigh one week of your own laundry bag once and you will know your real number." },
      { heading: "How much does washing clothes by hand cost?", body: "In money, almost nothing: a month of detergent is about ₹100. In time, a lot: soaking, scrubbing, rinsing and hanging 2 kg takes most students about 2 hours a week, which is 8 or more hours a month, usually on a Sunday." },
      { heading: "How much does a laundry service cost in Gurugram?", body: "Wash-and-fold laundry in Gurugram costs about ₹59–75 per kg in 2026, so a student's typical 8 kg a month comes to ₹470–600. Ironing usually adds ₹10–15 a piece. Services listed in LBB's Gurgaon laundry guide range from ₹59/kg (Pick My Laundry) to ₹75/kg with a 5 kg minimum (Dhobi Xpress), and advance plans are 10–20% cheaper." },
      { heading: "Is a laundry pickup service worth it for students?", body: "Yes, if your time is worth more than about ₹65 an hour. Paying ₹550 a month to skip roughly 8 hours of washing works out to about ₹65 per hour saved. If you would spend those hours studying, working a part-time gig or sleeping before a 9 am class, it is worth it. If money is very tight, hand-wash and use a service only in exam weeks." },
      { heading: "How can you cut your laundry bill?", body: "Fix one laundry day a week so you never pay for rush service. Combine bags with a roommate to cross the minimum weight. Choose a monthly plan instead of paying per order. And keep 'needs ironing' clothes separate, so you only pay for ironing where it matters." },
      { heading: "What does Unimade charge?", body: "Unimade is launching campus laundry pickup at ₹69/kg for wash and fold (4 kg minimum), collected from your hostel or PG desk twice a week and back folded in 48 hours. The Laundry Pass covers 8 kg a month for ₹499. Join the waitlist on our pricing page and your first 2 kg are on us." },
    ],
  },
  {
    slug: "how-to-save-money-on-food-in-college",
    pillar: "Saving Money in College",
    title: "How to Save Money on Food in College Without Eating Maggi Every Night",
    description: "Eat well and spend less, even without a kitchen.",
    sections: [
      { body: "Food is usually the biggest variable expense in a student budget, and the easiest one to cut." },
      { heading: "Stick to a meal plan", body: "A mess or tiffin plan costs far less per meal than ordering in." },
      { heading: "Order in groups", body: "Splitting delivery with friends cuts fees and gets you over free-delivery minimums." },
      { heading: "Buy snacks in bulk", body: "Oats, peanut butter, fruit and dry snacks are much cheaper from a grocery store than a campus canteen." },
      { heading: "Set a delivery limit", body: "Decide how many times a week you'll order, and stick to it." },
      { heading: "Use coupons and student deals", body: "Food apps and local restaurants often run student offers. Use them, but don't let deals tempt you to order more." },
    ],
  },
];

