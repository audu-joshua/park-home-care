// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  snippet: string;
  content: string; // HTML string
  image: string;
  date: string;
  published: boolean;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: "Full-Time" | "Part-Time" | "Flexible";
  location: string;
  description: string;
  requirements: string[];
  posted: string;
  active: boolean;
}

export interface JobApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  createdAt: string;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED_BLOGS: BlogPost[] = [
  {
    id: "1",
    slug: "understanding-levels-of-home-care",
    title: "Understanding the Different Levels of Home Care",
    category: "WELLNESS",
    snippet:
      "Navigating the options between companion care, personal care, and specialized medical support for your loved one.",
    content: `
      <p>Choosing the right level of home care for a loved one can feel overwhelming. From companion care to skilled nursing, understanding your options is the first step toward confident decision-making.</p>
      <h2>Companion Care</h2>
      <p>Companion care focuses on social engagement and light household assistance. Caregivers provide conversation, accompany clients on errands, and help with light meals and housekeeping. This level is ideal for seniors who are largely independent but benefit from regular social interaction and a watchful presence.</p>
      <h2>Personal Care</h2>
      <p>Personal care goes a step further, assisting with activities of daily living (ADLs) such as bathing, dressing, grooming, and mobility. Clients at this level may have limited physical mobility or early-stage cognitive decline that makes self-care challenging but still wish to remain at home.</p>
      <h2>Specialized Care</h2>
      <p>Specialized care addresses complex conditions such as Alzheimer's, Parkinson's disease, stroke recovery, or post-surgical healing. Caregivers at this level receive additional training in condition-specific protocols — from wandering prevention to safe transfer techniques — and work closely with the client's medical team.</p>
      <h2>How to Choose</h2>
      <p>The right level of care is best determined through a comprehensive in-home assessment. At Pack Home Health, our care coordinators evaluate your loved one's medical history, daily routines, emotional needs, and home environment to build a personalized plan that evolves as needs change.</p>
      <p>Contact us today to schedule your free, no-obligation care assessment.</p>
    `,
    image: "/images/blog_1.jpg",
    date: "2026-07-15",
    published: true,
  },
  {
    id: "2",
    slug: "5-tips-preventing-falls-at-home",
    title: "5 Tips for Preventing Falls at Home",
    category: "SAFETY",
    snippet:
      "Creating a safe environment is crucial for seniors living at home. Learn simple adjustments to prevent accidents.",
    content: `
      <p>Falls are the leading cause of injury among adults aged 65 and older. The good news: most falls are preventable with simple home modifications and lifestyle adjustments.</p>
      <h2>1. Clear the Clutter</h2>
      <p>Remove loose rugs, electrical cords, and any items on the floor that can cause trips. Keep pathways between rooms — especially to the bathroom and bedroom — completely clear, particularly at night.</p>
      <h2>2. Improve Lighting</h2>
      <p>Install nightlights in hallways, bathrooms, and bedrooms. Make sure light switches are accessible without needing to walk through a dark room. Motion-activated lights are a great low-maintenance option.</p>
      <h2>3. Install Grab Bars and Handrails</h2>
      <p>Add grab bars next to the toilet and in the shower or bathtub. Ensure stairways have solid, continuous handrails on both sides. These simple additions dramatically reduce fall risk in high-risk areas.</p>
      <h2>4. Review Medications</h2>
      <p>Some medications cause dizziness, drowsiness, or blood pressure drops that increase fall risk. Ask the doctor or pharmacist to review all medications — including over-the-counter drugs — for fall-risk side effects.</p>
      <h2>5. Encourage Regular Exercise</h2>
      <p>Strength and balance exercises — such as gentle yoga, tai chi, or physical therapy routines — significantly reduce fall risk by improving core stability and reaction time. Even a 10-minute daily walk helps maintain lower body strength.</p>
      <p>Our trained caregivers can assist with in-home safety assessments and exercise routines tailored to your loved one's ability level.</p>
    `,
    image: "/images/blog_2.jpg",
    date: "2026-07-28",
    published: true,
  },
  {
    id: "3",
    slug: "importance-of-respite-care",
    title: "The Importance of Respite Care for Family Caregivers",
    category: "CAREGIVING",
    snippet:
      "Why taking a break is essential for your own well-being and how respite services can support your family.",
    content: `
      <p>Family caregivers are the backbone of home care — yet they are also among the most at risk for burnout, depression, and physical exhaustion. Respite care offers a vital lifeline.</p>
      <h2>What Is Respite Care?</h2>
      <p>Respite care is temporary relief for primary caregivers. A trained professional steps in to care for your loved one while you take time to rest, attend appointments, travel, or simply recharge. Respite can be arranged for a few hours, a full day, or several weeks.</p>
      <h2>Signs You Need a Break</h2>
      <p>If you feel constantly exhausted, experience mood swings or resentment, neglect your own health, or feel isolated from friends and family — you are likely experiencing caregiver burnout. These are signals that you need and deserve support.</p>
      <h2>Benefits of Respite</h2>
      <p>Studies show that family caregivers who use respite services report lower rates of depression, reduced physical health problems, and improved quality of caregiving when they return. Taking a break does not mean abandoning your loved one — it means ensuring you have the capacity to continue caring for them.</p>
      <h2>How We Can Help</h2>
      <p>At Pack Home Health, we offer flexible respite care that matches your loved one's established routine. Our caregivers arrive prepared with full background notes so your family member experiences seamless, familiar care — and you can rest easy knowing they are in expert hands.</p>
    `,
    image: "/images/blog_3.jpg",
    date: "2026-08-05",
    published: true,
  },
];

const SEED_JOBS: JobOpening[] = [
  {
    id: "1",
    title: "In-Home Caregiver / Companion",
    department: "Caregiving",
    type: "Flexible",
    location: "Raleigh, NC",
    description:
      "Provide compassionate companion and personal care services to seniors in their own homes. Duties include light housekeeping, meal preparation, medication reminders, and meaningful companionship.",
    requirements: [
      "High school diploma or equivalent",
      "Valid driver's license and reliable transportation",
      "Compassionate, patient, and reliable",
      "Prior caregiving experience preferred but not required — we train!",
    ],
    posted: "2026-08-01",
    active: true,
  },
  {
    id: "2",
    title: "Certified Nursing Assistant (CNA)",
    department: "Clinical",
    type: "Full-Time",
    location: "Raleigh, NC",
    description:
      "Support clients with personal hygiene, mobility, vital sign monitoring, and clinical care under the supervision of a registered nurse. Work with a team dedicated to dignified, person-centred care.",
    requirements: [
      "Active CNA certification in North Carolina",
      "Minimum 1 year of CNA experience",
      "Strong interpersonal and communication skills",
      "Ability to lift up to 50 lbs with proper technique",
    ],
    posted: "2026-08-01",
    active: true,
  },
  {
    id: "3",
    title: "Registered Nurse (RN) / LPN",
    department: "Clinical",
    type: "Part-Time",
    location: "Raleigh & Surrounding Areas, NC",
    description:
      "Conduct client assessments, develop and oversee care plans, coordinate with physicians and family members, and provide clinical oversight to our caregiver team.",
    requirements: [
      "Active RN or LPN license in North Carolina",
      "Minimum 2 years of home health or clinical experience",
      "Strong care plan development skills",
      "CPR/BLS certified",
    ],
    posted: "2026-08-03",
    active: true,
  },
  {
    id: "4",
    title: "Care Coordinator / Client Relations",
    department: "Administration",
    type: "Full-Time",
    location: "Raleigh, NC (Office-Based)",
    description:
      "Serve as the primary point of contact for clients and families. Schedule caregiver assignments, conduct intake assessments, handle client feedback, and ensure seamless care delivery.",
    requirements: [
      "Bachelor's degree in healthcare, social work, or related field",
      "Excellent organizational and communication skills",
      "Experience with scheduling or care coordination software",
      "Empathy-driven approach to client relations",
    ],
    posted: "2026-08-05",
    active: true,
  },
];

// ─── Keys ─────────────────────────────────────────────────────────────────────

const BLOGS_KEY = "phh_blogs";
const JOBS_KEY = "phh_jobs";
const AUTH_KEY = "phh_admin_auth";
export const ADMIN_PASSWORD = "packadmin2026";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isBrowser() {
  return typeof window !== "undefined";
}

function omitMongoId<T extends object>(doc: T): T {
  const copy = { ...doc } as T & { _id?: unknown };
  delete copy._id;
  return copy;
}

function asArray<T extends object>(data: unknown): T[] {
  if (!Array.isArray(data)) return [];
  return (data as T[]).map((item) => omitMongoId(item));
}

// ─── Blog Store ───────────────────────────────────────────────────────────────

export function getBlogs(): BlogPost[] {
  if (!isBrowser()) return SEED_BLOGS;
  const raw = localStorage.getItem(BLOGS_KEY);
  if (!raw) {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(SEED_BLOGS));
    return SEED_BLOGS;
  }
  return JSON.parse(raw) as BlogPost[];
}

export function saveBlog(post: BlogPost): void {
  const all = getBlogs();
  const idx = all.findIndex((b) => b.id === post.id);
  if (idx >= 0) {
    all[idx] = post;
  } else {
    all.unshift(post);
  }
  localStorage.setItem(BLOGS_KEY, JSON.stringify(all));
}

// Async helpers that call server API (fallbacks to local storage on error)
export async function fetchBlogs(): Promise<BlogPost[]> {
  if (!isBrowser()) return SEED_BLOGS;
  try {
    const res = await fetch("/api/blogs", { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const rows = asArray<BlogPost>(await res.json());
    localStorage.setItem(BLOGS_KEY, JSON.stringify(rows));
    return rows;
  } catch {
    return getBlogs();
  }
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const all = await fetchBlogs();
    return all.find((b) => b.slug === slug);
  } catch {
    return getBlogBySlug(slug);
  }
}

export async function saveBlogRemote(post: BlogPost): Promise<boolean> {
  const payload = omitMongoId(post);
  saveBlog(payload);
  try {
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function deleteBlogRemote(id: string): Promise<boolean> {
  deleteBlog(id);
  try {
    const res = await fetch("/api/blogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchJobs(): Promise<JobOpening[]> {
  if (!isBrowser()) return SEED_JOBS;
  try {
    const res = await fetch("/api/jobs", { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const rows = asArray<JobOpening>(await res.json());
    localStorage.setItem(JOBS_KEY, JSON.stringify(rows));
    return rows;
  } catch {
    return getJobs();
  }
}

export async function saveJobRemote(job: JobOpening): Promise<boolean> {
  const payload = omitMongoId(job);
  saveJob(payload);
  try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function deleteJobRemote(id: string): Promise<boolean> {
  deleteJob(id);
  try {
    const res = await fetch("/api/jobs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchApplications(): Promise<JobApplication[]> {
  if (!isBrowser()) return [];
  try {
    const res = await fetch("/api/applications", { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return asArray<JobApplication>(data);
  } catch {
    return [];
  }
}

export async function deleteApplicationRemote(id: string): Promise<void> {
  const res = await fetch("/api/applications", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Failed to delete application");
}

export function deleteBlog(id: string): void {
  const all = getBlogs().filter((b) => b.id !== id);
  localStorage.setItem(BLOGS_KEY, JSON.stringify(all));
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getBlogs().find((b) => b.slug === slug);
}

// ─── Jobs Store ───────────────────────────────────────────────────────────────

export function getJobs(): JobOpening[] {
  if (!isBrowser()) return SEED_JOBS;
  const raw = localStorage.getItem(JOBS_KEY);
  if (!raw) {
    localStorage.setItem(JOBS_KEY, JSON.stringify(SEED_JOBS));
    return SEED_JOBS;
  }
  return JSON.parse(raw) as JobOpening[];
}

export function saveJob(job: JobOpening): void {
  const all = getJobs();
  const idx = all.findIndex((j) => j.id === job.id);
  if (idx >= 0) {
    all[idx] = job;
  } else {
    all.unshift(job);
  }
  localStorage.setItem(JOBS_KEY, JSON.stringify(all));
}

export function deleteJob(id: string): void {
  const all = getJobs().filter((j) => j.id !== id);
  localStorage.setItem(JOBS_KEY, JSON.stringify(all));
}

// ─── Auth Store ───────────────────────────────────────────────────────────────

export function adminLogin(email?: string): void {
  if (isBrowser()) {
    sessionStorage.setItem(AUTH_KEY, "1");
    if (email) sessionStorage.setItem("phh_admin_email", email);
  }
}

export function adminLogout(): void {
  if (isBrowser()) {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem("phh_admin_email");
  }
}

export function isAdminLoggedIn(): boolean {
  if (!isBrowser()) return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export function getAdminEmail(): string {
  if (!isBrowser()) return "info@packhomehealthcareagency.com";
  return sessionStorage.getItem("phh_admin_email") || "info@packhomehealthcareagency.com";
}
