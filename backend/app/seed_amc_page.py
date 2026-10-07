"""Default AMC page CMS payloads matching website/src/pages/AmcPage.jsx."""

from __future__ import annotations

import json

from sqlalchemy.orm import Session

from .models import AmcPageSection


def p(text: str) -> str:
    return f"<p>{text}</p>"


DEFAULT_SECTIONS: list[dict] = [
    {
        "key": "hero",
        "label": "1. Hero",
        "sort_order": 10,
        "data": {
            "eyebrow": "Annual Maintenance Contracts",
            "title": "Pest Control AMC in Bangalore",
            "lede": p(
                "Catch it early, or clear it later. Regular service finds pest activity while it's still small. "
                "AMCs are built around your property type, risk level and operating schedule."
            ),
            "primary_cta": "Request an AMC quote",
            "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=70",
        },
    },
    {
        "key": "include",
        "label": "2. What AMC includes",
        "sort_order": 20,
        "data": {
            "eyebrow": "Annual Maintenance Contracts",
            "title": "Catch it early, or clear it later.",
            "lede": p(
                "Regular service finds pest activity while it's still small. AMCs are built around your "
                "property type, risk level and operating schedule."
            ),
            "box_title": "What an AMC can include",
            "box_intro": "Choose the frequency and the pest scope — we'll write the plan around it.",
            "frequency_label": "Frequency",
            "frequencies": ["Weekly", "Fortnightly", "Monthly", "Quarterly", "Custom frequency"],
            "scope_label": "Scope & extras",
            "scopes": [
                "General pest control",
                "Rodent management",
                "Mosquito management",
                "Fly management",
                "Cockroach control",
                "Ant control",
                "Monitoring devices",
                "Service documentation",
                "Emergency call-outs",
                "Review meetings",
                "Corrective actions",
            ],
            "why_title": "Why clients choose an AMC",
            "why": [
                "Regular monitoring instead of reactive call-outs",
                "Early detection before an infestation spreads",
                "Planned preventive treatment on a fixed schedule",
                "Documentation ready for audits and inspections",
                "Predictable maintenance cost and calendar",
                "Priority service support when something comes up",
                "Long-term protection of property and operations",
            ],
        },
    },
    {
        "key": "who",
        "label": "3. Who it's for",
        "sort_order": 30,
        "data": {
            "eyebrow": "Who it's for",
            "title": "Homes, workplaces and high-risk sites across Bengaluru",
            "lede": p("One contract model — tuned for residential comfort or commercial compliance."),
            "items": [
                {
                    "title": "Homes & apartments",
                    "text": "Scheduled protection for kitchens, bedrooms, drains and common-area pests without waiting for a crisis.",
                },
                {
                    "title": "Offices & IT parks",
                    "text": "Discreet preventive visits that fit working hours, with reports when your facilities team needs them.",
                },
                {
                    "title": "Hotels & restaurants",
                    "text": "Kitchen, F&B and guest-area programmes with documentation suited to hospitality standards.",
                },
                {
                    "title": "Factories & warehouses",
                    "text": "Rodent, fly and crawling-pest programmes matched to layout, shifts and audit requirements.",
                },
                {
                    "title": "Hospitals & clinics",
                    "text": "Sensitive-site methods with clear prep, vacancy and re-entry guidance for care environments.",
                },
                {
                    "title": "Retail & institutions",
                    "text": "Stores, schools and campuses covered on a fixed calendar with priority call-out support.",
                },
            ],
        },
    },
    {
        "key": "process",
        "label": "4. How AMC works",
        "sort_order": 40,
        "data": {
            "eyebrow": "How an AMC works",
            "title": "From inspection to a fixed service calendar",
            "steps": [
                {
                    "step": "STEP 01",
                    "title": "Enquiry",
                    "text": "Call, email or send the form with details of the pest problem and the property.",
                },
                {
                    "step": "STEP 02",
                    "title": "Initial assessment",
                    "text": "We gather details on the pest, affected areas, how long it's been going on and past treatments.",
                },
                {
                    "step": "STEP 03",
                    "title": "Site inspection",
                    "text": "Where required, our technician visits to check pest activity, breeding areas, entry points and risks.",
                },
                {
                    "step": "STEP 04",
                    "title": "Treatment proposal",
                    "text": "Method, frequency, preparation requirements, commercial terms and follow-up schedule.",
                },
                {
                    "step": "STEP 05",
                    "title": "Service execution",
                    "text": "Treatment carried out with suitable equipment, application methods and site-specific precautions.",
                },
            ],
        },
    },
    {
        "key": "about",
        "label": "5. About TEB AMC",
        "sort_order": 50,
        "data": {
            "eyebrow": "About TEB AMC",
            "title": "Inspection-based contracts, not spray-and-go visits",
            "content": (
                "<p>Every AMC starts with understanding where pests breed, enter and hide — kitchens, drains, "
                "false ceilings, loading bays, landscaping and waste areas. We then set frequency, methods "
                "and monitoring to match that risk.</p>"
                "<p>TEB Enterprises — Team Experts Bangalore — serves homes and businesses across Bengaluru "
                "with scheduled preventive treatment, documentation and priority support when something "
                "comes up between visits.</p>"
            ),
            "primary_cta": "Get a free AMC quote",
            "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=70",
            "badge_label": "Bengaluru-wide",
            "badge_text": "Weekly to quarterly plans with priority call-outs",
        },
    },
    {
        "key": "coverage",
        "label": "6. Coverage",
        "sort_order": 60,
        "data": {
            "eyebrow": "Coverage",
            "title": "AMC service across Bengaluru localities",
            "lede": p(
                "Whitefield, HSR, Electronic City, Sarjapur, Peenya and more — confirm availability for your site."
            ),
            "areas": [
                "Whitefield",
                "ITPL",
                "Hoodi",
                "Kadugodi",
                "Brookefield",
                "Mahadevapura",
                "KR Puram",
                "Marathahalli",
                "Varthur",
                "Bellandur",
                "Sarjapur Road",
                "Electronic City",
                "HSR Layout",
                "Koramangala",
                "Indiranagar",
                "Hebbal",
                "Yelahanka",
                "Jayanagar",
            ],
        },
    },
    {
        "key": "faq",
        "label": "7. FAQ",
        "sort_order": 70,
        "data": {
            "eyebrow": "Common questions",
            "title": "AMC FAQs",
            "items": [
                {
                    "question": "What does a Pest control AMC Bangalore arrangement usually cover?",
                    "answer": "A pest control AMC Bangalore arrangement schedules recurring inspections and treatments over an agreed period. It helps property managers monitor pest activity, address emerging problems promptly, and understand which areas need ongoing attention.",
                },
                {
                    "question": "How is a Pest control annual contract Bangalore plan different from a single visit?",
                    "answer": "A pest control annual contract Bangalore plan sets out recurring service across a defined period, while a single visit addresses an immediate concern. The contract can also clarify inspection frequency and followup expectations.",
                },
                {
                    "question": "What should I ask a Pest control AMC company Bangalore before signing?",
                    "answer": "Ask a pest control AMC company Bangalore which pests the plan covers, how visits are scheduled, and what happens if activity returns. Request written details about treatment methods, reporting, exclusions, and safety precautions.",
                },
                {
                    "question": "How can an Apartment pest control AMC Bangalore plan serve residents?",
                    "answer": "An apartment pest control AMC Bangalore plan can coordinate inspections across shared spaces and participating homes. Consistent access, resident communication, and attention to waste areas help teams identify recurring sources and plan suitable treatments.",
                },
                {
                    "question": "What should a Hotel pest control AMC Bangalore plan consider?",
                    "answer": "A hotel pest control AMC Bangalore plan should account for guest rooms, kitchens, storage, and shared areas. Coordinate service times with operations and document findings so staff can respond discreetly to any new activity.",
                },
                {
                    "question": "Which areas matter most in a Restaurant pest control AMC Bangalore plan?",
                    "answer": "A restaurant pest control AMC Bangalore plan typically emphasizes monitoring in kitchens, storage rooms, and waste areas. Staff should report sightings promptly, while the service provider records findings and recommends practical steps to reduce attractants.",
                },
                {
                    "question": "How can a Factory pest control AMC Bangalore plan fit around production?",
                    "answer": "A factory pest control AMC Bangalore plan should reflect the site's layout, materials, and production schedule. Inspections can focus on entry points, storage, and loading areas, with treatment timing coordinated to limit operational disruption.",
                },
                {
                    "question": "What precautions should a Hospital pest control AMC Bangalore plan address?",
                    "answer": "A hospital pest control AMC Bangalore plan needs careful scheduling and coordination with facility staff. Discuss sensitive areas, approved procedures, documentation, and patient safety requirements before treatment so work fits the facility's protocols.",
                },
                {
                    "question": "What areas can a Villa pest control AMC Bangalore plan include?",
                    "answer": "A villa pest control AMC Bangalore plan can cover indoor rooms and outdoor areas where pests may enter or shelter. Ask how inspections address drains, gardens, storage, and seasonal changes relevant to the property.",
                },
                {
                    "question": "How should a Commercial pest control AMC Bangalore plan be organized?",
                    "answer": "A commercial pest control AMC Bangalore plan can be tailored to the building's use, occupancy, and risk areas. Agree on visit intervals, reporting, and response procedures so maintenance teams know when to act.",
                },
            ],
        },
    },
    {
        "key": "cta",
        "label": "8. Bottom CTA",
        "sort_order": 80,
        "data": {
            "title": "Ready for a pest control AMC in Bangalore?",
            "lede": p(
                "Tell us your property type and locality — we'll propose frequency, scope and a clear quotation."
            ),
            "primary_cta": "Request a site inspection",
        },
    },
    {
        "key": "seo",
        "label": "9. SEO",
        "sort_order": 90,
        "data": {
            "meta_title": "Pest control AMC Bangalore: Explore Year-Round Protection",
            "meta_description": (
                "Pest control AMC Bangalore helps keep pests at bay. Explore scheduled treatments, "
                "ongoing support, and plans suited to your property. Find your plan today."
            ),
        },
    },
]


def seed_amc_page(db: Session, *, force: bool = False) -> None:
    existing = {row.key: row for row in db.query(AmcPageSection).all()}
    changed = False
    for item in DEFAULT_SECTIONS:
        row = existing.get(item["key"])
        if row is None:
            db.add(
                AmcPageSection(
                    key=item["key"],
                    label=item["label"],
                    sort_order=item["sort_order"],
                    data=json.dumps(item["data"], ensure_ascii=False),
                )
            )
            changed = True
        elif force:
            row.label = item["label"]
            row.sort_order = item["sort_order"]
            row.data = json.dumps(item["data"], ensure_ascii=False)
            changed = True
        else:
            # Keep admin edits; only sync label/sort if missing new sections already handled
            if row.label != item["label"] or row.sort_order != item["sort_order"]:
                row.label = item["label"]
                row.sort_order = item["sort_order"]
                changed = True
            # Refresh FAQ / SEO when curated pack grows
            if item["key"] in ("faq", "seo"):
                try:
                    current = json.loads(row.data or "{}")
                    new_items = (item["data"].get("items") or []) if item["key"] == "faq" else []
                    old_items = (current.get("items") or []) if item["key"] == "faq" else []
                    if item["key"] == "faq" and len(new_items) > len(old_items):
                        row.data = json.dumps(item["data"], ensure_ascii=False)
                        changed = True
                    elif item["key"] == "seo" and item["data"].get("meta_title") != current.get("meta_title"):
                        row.data = json.dumps(item["data"], ensure_ascii=False)
                        changed = True
                except json.JSONDecodeError:
                    row.data = json.dumps(item["data"], ensure_ascii=False)
                    changed = True
    if changed:
        db.commit()
