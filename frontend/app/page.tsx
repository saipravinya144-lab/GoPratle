
"use client";

import { useEffect, useState } from "react";

const categories = [
  { name: "Event Planner", description: "Organise and manage an event" },
  { name: "Performer", description: "Showcase your talent" },
  { name: "Crew", description: "Join an event team" },
];

type EventBasics = {
  eventName: string;
  eventType: string;
  eventDate: string;
  location: string;
  venue: string;
  category: string;
};

type ExtraDetails = {
  role: string;
  description: string;
  budget: string;
  audience: string;
  duration: string;
  requirements: string;
  experience: string;
  availability: string;
  rate: string;
  contactName: string;
  contactEmail: string;
};

const emptyBasics: EventBasics = {
  eventName: "",
  eventType: "",
  eventDate: "",
  location: "",
  venue: "",
  category: "Event Planner",
};

const emptyDetails: ExtraDetails = {
  role: "",
  description: "",
  budget: "",
  audience: "",
  duration: "",
  requirements: "",
  experience: "",
  availability: "",
  rate: "",
  contactName: "",
  contactEmail: "",
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [basics, setBasics] = useState<EventBasics>(emptyBasics);
  const [details, setDetails] = useState<ExtraDetails>(emptyDetails);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [today, setToday] = useState("");

  // Calculate today's date on the client to avoid the Next.js prerender warning.
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  function updateBasics(field: keyof EventBasics, value: string) {
    setBasics((previous) => ({ ...previous, [field]: value }));
  }

  function updateDetails(field: keyof ExtraDetails, value: string) {
    setDetails((previous) => ({ ...previous, [field]: value }));
  }

  async function handleFinalSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setSubmitError("");

    const eventData = {
      ...basics,
      ...details,
      budget: details.budget === "" ? null : Number(details.budget),
      audience: details.audience === "" ? null : Number(details.audience),
      duration: details.duration === "" ? null : Number(details.duration),
      rate: details.rate === "" ? null : Number(details.rate),
    };

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || result.message || "Failed to save the event."
        );
      }

      setSubmitted(true);
      setStep(4);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setStep(1);
    setBasics(emptyBasics);
    setDetails(emptyDetails);
    setSubmitted(false);
    setSubmitError("");
    setSaving(false);
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const labelClass = "mb-2 block text-sm font-semibold";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-extrabold tracking-tight text-indigo-700">
            GoPratle<span className="text-orange-500">.</span>
          </h1>
          <p className="hidden text-sm text-slate-500 sm:block">
            Create your next opportunity
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-6">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
          Create an event
        </p>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {step === 1 && "Let's start with the basics."}
          {step === 2 &&
            `Tell us about you as a ${basics.category.toLowerCase()}.`}
          {step === 3 && "Add the final details."}
          {step === 4 && "Your event is saved!"}
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          {step === 1 &&
            "Start with the essential information about your event."}
          {step === 2 &&
            "Complete the fields relevant to your selected category."}
          {step === 3 &&
            "Add contact details so the right people can reach you."}
          {step === 4 &&
            "Your event information has been submitted to GoPratle."}
        </p>

        <div className="my-8 grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((number) => (
            <div key={number}>
              <div
                className={`h-2 rounded-full ${
                  number <= step ? "bg-indigo-600" : "bg-slate-200"
                }`}
              />
              <p
                className={`mt-2 text-xs ${
                  number === step
                    ? "font-bold text-indigo-700"
                    : "text-slate-400"
                }`}
              >
                Step {number}
              </p>
            </div>
          ))}
        </div>

        {/* STEP 1: EVENT BASICS */}
        {step === 1 && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitError("");
              setStep(2);
            }}
            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div>
              <label htmlFor="eventName" className={labelClass}>
                Event name *
              </label>
              <input
                id="eventName"
                value={basics.eventName}
                onChange={(e) =>
                  updateBasics("eventName", e.target.value)
                }
                placeholder="e.g. Summer Music Festival"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="eventType" className={labelClass}>
                Event type *
              </label>
              <select
                id="eventType"
                value={basics.eventType}
                onChange={(e) =>
                  updateBasics("eventType", e.target.value)
                }
                required
                className={inputClass}
              >
                <option value="">Choose an event type</option>
                <option>Conference</option>
                <option>Concert</option>
                <option>Festival</option>
                <option>Workshop</option>
                <option>Wedding</option>
                <option>Corporate Event</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="eventDate" className={labelClass}>
                Event date *
              </label>
              <input
                id="eventDate"
                type="date"
                min={today || undefined}
                value={basics.eventDate}
                onChange={(e) =>
                  updateBasics("eventDate", e.target.value)
                }
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="location" className={labelClass}>
                City or location *
              </label>
              <input
                id="location"
                value={basics.location}
                onChange={(e) =>
                  updateBasics("location", e.target.value)
                }
                placeholder="e.g. Hyderabad"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="venue" className={labelClass}>
                Venue name{" "}
                <span className="font-normal text-slate-400">
                  (optional)
                </span>
              </label>
              <input
                id="venue"
                value={basics.venue}
                onChange={(e) =>
                  updateBasics("venue", e.target.value)
                }
                placeholder="e.g. Convention centre"
                className={inputClass}
              />
            </div>

            <fieldset>
              <legend className={labelClass}>
                Which category best describes you? *
              </legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {categories.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() =>
                      updateBasics("category", item.name)
                    }
                    aria-pressed={basics.category === item.name}
                    className={`rounded-xl border p-4 text-left transition ${
                      basics.category === item.name
                        ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                        : "border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    <span className="block font-semibold">
                      {item.name}
                    </span>
                    <span className="mt-2 block text-xs leading-5 text-slate-500">
                      {item.description}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-5 py-3.5 font-semibold text-white hover:bg-indigo-700"
            >
              Continue to Step 2 →
            </button>
          </form>
        )}

        {/* STEP 2: CATEGORY-SPECIFIC DETAILS */}
        {step === 2 && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitError("");
              setStep(3);
            }}
            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            {basics.category === "Event Planner" && (
              <>
                <div>
                  <label htmlFor="plannerRole" className={labelClass}>
                    Your role *
                  </label>
                  <select
                    id="plannerRole"
                    value={details.role}
                    onChange={(e) =>
                      updateDetails("role", e.target.value)
                    }
                    required
                    className={inputClass}
                  >
                    <option value="">Choose your role</option>
                    <option>Event organiser</option>
                    <option>Wedding planner</option>
                    <option>Corporate event planner</option>
                    <option>Festival organiser</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="plannerDescription" className={labelClass}>
                    Event description *
                  </label>
                  <textarea
                    id="plannerDescription"
                    value={details.description}
                    onChange={(e) =>
                      updateDetails("description", e.target.value)
                    }
                    required
                    rows={4}
                    placeholder="Describe the event and what you are planning..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="budget" className={labelClass}>
                    Estimated event budget (₹) *
                  </label>
                  <input
                    id="budget"
                    type="number"
                    min="0"
                    value={details.budget}
                    onChange={(e) =>
                      updateDetails("budget", e.target.value)
                    }
                    required
                    placeholder="e.g. 50000"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="audience" className={labelClass}>
                    Expected audience size *
                  </label>
                  <input
                    id="audience"
                    type="number"
                    min="1"
                    value={details.audience}
                    onChange={(e) =>
                      updateDetails("audience", e.target.value)
                    }
                    required
                    placeholder="e.g. 200"
                    className={inputClass}
                  />
                </div>
              </>
            )}

            {basics.category === "Performer" && (
              <>
                <div>
                  <label htmlFor="performerRole" className={labelClass}>
                    Performance type *
                  </label>
                  <select
                    id="performerRole"
                    value={details.role}
                    onChange={(e) =>
                      updateDetails("role", e.target.value)
                    }
                    required
                    className={inputClass}
                  >
                    <option value="">Choose a performance type</option>
                    <option>Singer</option>
                    <option>Dancer</option>
                    <option>Musician</option>
                    <option>DJ</option>
                    <option>Actor</option>
                    <option>Comedian</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="performerDescription"
                    className={labelClass}
                  >
                    About your performance *
                  </label>
                  <textarea
                    id="performerDescription"
                    value={details.description}
                    onChange={(e) =>
                      updateDetails("description", e.target.value)
                    }
                    required
                    rows={4}
                    placeholder="Describe your act, style, or experience..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="duration" className={labelClass}>
                    Performance duration (minutes) *
                  </label>
                  <input
                    id="duration"
                    type="number"
                    min="1"
                    value={details.duration}
                    onChange={(e) =>
                      updateDetails("duration", e.target.value)
                    }
                    required
                    placeholder="e.g. 30"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="rate" className={labelClass}>
                    Expected fee (₹) *
                  </label>
                  <input
                    id="rate"
                    type="number"
                    min="0"
                    value={details.rate}
                    onChange={(e) =>
                      updateDetails("rate", e.target.value)
                    }
                    required
                    placeholder="e.g. 5000"
                    className={inputClass}
                  />
                </div>
              </>
            )}

            {basics.category === "Crew" && (
              <>
                <div>
                  <label htmlFor="crewRole" className={labelClass}>
                    Crew role *
                  </label>
                  <select
                    id="crewRole"
                    value={details.role}
                    onChange={(e) =>
                      updateDetails("role", e.target.value)
                    }
                    required
                    className={inputClass}
                  >
                    <option value="">Choose a crew role</option>
                    <option>Sound technician</option>
                    <option>Lighting technician</option>
                    <option>Stage crew</option>
                    <option>Photographer</option>
                    <option>Videographer</option>
                    <option>Security</option>
                    <option>Event assistant</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className={labelClass}>
                    Experience *
                  </label>
                  <select
                    id="experience"
                    value={details.experience}
                    onChange={(e) =>
                      updateDetails("experience", e.target.value)
                    }
                    required
                    className={inputClass}
                  >
                    <option value="">Choose your experience level</option>
                    <option>Beginner</option>
                    <option>1–2 years</option>
                    <option>3–5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="availability" className={labelClass}>
                    Availability *
                  </label>
                  <select
                    id="availability"
                    value={details.availability}
                    onChange={(e) =>
                      updateDetails("availability", e.target.value)
                    }
                    required
                    className={inputClass}
                  >
                    <option value="">Choose availability</option>
                    <option>Event day only</option>
                    <option>Setup and event day</option>
                    <option>Full event duration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="requirements" className={labelClass}>
                    Skills or equipment details
                  </label>
                  <textarea
                    id="requirements"
                    value={details.requirements}
                    onChange={(e) =>
                      updateDetails("requirements", e.target.value)
                    }
                    rows={3}
                    placeholder="Mention relevant skills or equipment..."
                    className={inputClass}
                  />
                </div>
              </>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 rounded-lg border border-slate-300 px-4 py-3 font-semibold hover:bg-slate-50"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-indigo-600 px-5 py-3.5 font-semibold text-white hover:bg-indigo-700"
              >
                Continue to Step 3 →
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: CONTACT DETAILS AND API SUBMISSION */}
        {step === 3 && (
          <form
            onSubmit={handleFinalSubmit}
            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div>
              <label htmlFor="contactName" className={labelClass}>
                Contact name *
              </label>
              <input
                id="contactName"
                value={details.contactName}
                onChange={(e) =>
                  updateDetails("contactName", e.target.value)
                }
                required
                className={inputClass}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className={labelClass}>
                Contact email *
              </label>
              <input
                id="contactEmail"
                type="email"
                value={details.contactEmail}
                onChange={(e) =>
                  updateDetails("contactEmail", e.target.value)
                }
                required
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="mb-3 font-semibold">
                Review your event basics
              </h3>
              <p className="text-sm text-slate-600">
                Event: {basics.eventName}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Type: {basics.eventType}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Date: {basics.eventDate}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Location: {basics.location}
                {basics.venue ? ` — ${basics.venue}` : ""}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Category: {basics.category}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Role: {details.role}
              </p>
            </div>

            {submitError && (
              <div
                role="alert"
                className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
              >
                <p className="font-semibold">Could not save your event.</p>
                <p className="mt-1">{submitError}</p>
                <p className="mt-1">
                  Check that your backend is running and try again.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setSubmitError("");
                  setStep(2);
                }}
                className="w-1/3 rounded-lg border border-slate-300 px-4 py-3 font-semibold hover:bg-slate-50 disabled:opacity-50"
              >
                ← Back
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-indigo-600 px-5 py-3.5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving event..." : "Submit event"}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: SUCCESS, ONLY AFTER THE API CONFIRMS THE SAVE */}
        {step === 4 && submitted && (
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="rounded-xl bg-emerald-50 p-4 text-emerald-800">
              <h3 className="font-bold">Event saved successfully!</h3>
              <p className="mt-1 text-sm">
                Your event has been submitted to the backend and saved to
                MongoDB.
              </p>
            </div>

            <h3 className="text-lg font-bold">Submission summary</h3>

            <div className="space-y-2 text-sm text-slate-700">
              <p>
                <strong>Event:</strong> {basics.eventName}
              </p>
              <p>
                <strong>Type:</strong> {basics.eventType}
              </p>
              <p>
                <strong>Date:</strong> {basics.eventDate}
              </p>
              <p>
                <strong>Location:</strong> {basics.location}
              </p>
              {basics.venue && (
                <p>
                  <strong>Venue:</strong> {basics.venue}
                </p>
              )}
              <p>
                <strong>Category:</strong> {basics.category}
              </p>
              <p>
                <strong>Role:</strong> {details.role}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {details.description || "Not provided"}
              </p>
              {details.budget !== "" && (
                <p>
                  <strong>Budget:</strong> ₹{details.budget}
                </p>
              )}
              {details.audience !== "" && (
                <p>
                  <strong>Expected audience:</strong> {details.audience}
                </p>
              )}
              {details.duration !== "" && (
                <p>
                  <strong>Performance duration:</strong> {details.duration}{" "}
                  minutes
                </p>
              )}
              {details.rate !== "" && (
                <p>
                  <strong>Expected fee:</strong> ₹{details.rate}
                </p>
              )}
              {details.experience && (
                <p>
                  <strong>Experience:</strong> {details.experience}
                </p>
              )}
              {details.availability && (
                <p>
                  <strong>Availability:</strong> {details.availability}
                </p>
              )}
              {details.requirements && (
                <p>
                  <strong>Skills/equipment:</strong> {details.requirements}
                </p>
              )}
              <p>
                <strong>Contact:</strong> {details.contactName} (
                {details.contactEmail})
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="w-full rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Create another event
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
