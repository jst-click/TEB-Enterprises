"""Default homepage CMS payloads seeded from the current website copy."""

from __future__ import annotations

import json

from sqlalchemy.orm import Session

from .models import HomepageSection


def p(text: str) -> str:
    return f"<p>{text}</p>"


DEFAULT_SECTIONS: list[dict] = [
    {
        "key": "hero",
        "label": "1. Hero",
        "sort_order": 10,
        "data": {
            "eyebrow": "Pest control in Bengaluru · B2B & B2C",
            "title_line1": "Safe spaces.",
            "title_line2": "Expert protection.",
            "title_line3": "Lasting results.",
            "lede": p(
                "We don't just spray. Every job starts with an inspection — finding where pests enter, "
                "where they breed, and what keeps bringing them back. Then we treat, monitor and prevent."
            ),
            "primary_cta": "Get a free site inspection",
            "pills": [
                "Homes & apartments",
                "Offices & IT parks",
                "Hotels & kitchens",
                "Factories & warehouses",
                "Hospitals & schools",
            ],
            "nodes": [
                "Inspect & identify",
                "Targeted treatment",
                "Monitor & prevent",
            ],
            "core_label": "Perimeter protected",
        },
    },
    {
        "key": "ticker",
        "label": "2. Ticker",
        "sort_order": 20,
        "data": {
            "items": [
                "Inspection-based treatment",
                "Pre & post-construction termite control",
                "Integrated Pest Management",
                "Rodent bait-station management",
                "Insect light-trap monitoring",
                "Service documentation for audits",
                "Emergency call-out support",
                "Bengaluru-wide coverage",
            ]
        },
    },
    {
        "key": "stats",
        "label": "3. Stats",
        "sort_order": 30,
        "data": {
            "items": [
                {"value": 20, "label": "Pest programmes"},
                {"value": 13, "label": "Sectors served"},
                {"value": 27, "label": "Bengaluru zones covered"},
                {"value": 8, "label": "Step service process"},
            ]
        },
    },
    {
        "key": "trust",
        "label": "4. Trusted intro",
        "sort_order": 35,
        "data": {
            "eyebrow": "Trusted pest control",
            "title": "Trusted Pest Control Company in Bangalore for Homes & Businesses",
            "lede": (
                p(
                    "Pest problems are different for every property. A kitchen, apartment, office, "
                    "restaurant and warehouse all require a different inspection approach and treatment plan."
                )
                + p(
                    "TEB provides reliable pest control Bangalore solutions using inspection-based treatment, "
                    "Integrated Pest Management and preventive service programmes with inspection-based "
                    "solutions for residential and commercial properties. Our team identifies pest activity, "
                    "entry points, breeding areas and risk factors before recommending the right treatment."
                )
                + p(
                    "Whether you need one-time pest control, termite protection, mosquito management or a "
                    "long-term AMC programme, we build the service around your property requirements."
                )
            ),
            "audiences_label": "Who we serve",
            "audiences": [
                "Homes & apartments",
                "Corporate offices",
                "Restaurants & hotels",
                "Factories & warehouses",
                "Hospitals & institutions",
                "IT parks & commercial buildings",
            ],
            "primary_cta": "Book an inspection",
        },
    },
    {
        "key": "pests",
        "label": "5. Pest finder",
        "sort_order": 40,
        "data": {
            "eyebrow": "Pest finder",
            "title": "What are you dealing with?",
            "lede": p(
                "Pick a pest to see typical signs and how we treat it. Every site is different — "
                "this is a starting point before inspection."
            ),
            "filters": [
                {"id": "all", "label": "All"},
                {"id": "crawling", "label": "Crawling"},
                {"id": "flying", "label": "Flying"},
                {"id": "rodent", "label": "Rodents"},
                {"id": "wood", "label": "Wood"},
                {"id": "stored", "label": "Stored product"},
            ],
            "items": [
                {
                    "c": "CR",
                    "g": "crawling",
                    "n": "Cockroaches",
                    "t": p("Kitchens, drains, cabinets, appliances, false ceilings and duct areas."),
                    "signs": [
                        "Live sightings, usually at night",
                        "Droppings around cabinets and drawers",
                        "Egg cases in corners and joints",
                        "Unpleasant odour near storage",
                        "Activity around sinks and drains",
                        "Repeat activity near food storage",
                    ],
                    "treat": [
                        "Gel-bait application at harbourage points",
                        "Crack-and-crevice treatment",
                        "Suitable spray application",
                        "Drain and utility-area treatment",
                        "Moisture and food-source identification",
                        "Sanitation recommendations",
                        "Follow-up treatment where required",
                    ],
                },
                {
                    "c": "TE",
                    "g": "wood",
                    "n": "Termites",
                    "t": p("Doors, furniture, cupboards, flooring, wooden fixtures and structure."),
                    "signs": [
                        "Mud tubes running up walls",
                        "Hollow-sounding wood",
                        "Damaged door frames",
                        "Bubbling or blistered paint",
                        "Fine powder near wooden items",
                        "Discarded wings",
                        "Doors and windows becoming stiff",
                    ],
                    "treat": [
                        "Pre-construction soil barrier at foundation, plinth and backfill stages",
                        "Post-construction drilling at suitable intervals",
                        "Chemical injection at wall-and-floor junctions",
                        "Wooden fixture treatment",
                        "External perimeter and service-entry treatment",
                        "Follow-up inspection",
                    ],
                },
                {
                    "c": "BB",
                    "g": "crawling",
                    "n": "Bedbugs",
                    "t": p("Mattresses, bed frames, furniture joints, upholstery and skirting."),
                    "signs": [
                        "Bites in lines on exposed skin",
                        "Dark spotting on mattress seams",
                        "Live bugs in furniture joints",
                        "Activity spreading room to room",
                        "Shed skins near bed frames",
                    ],
                    "treat": [
                        "Detailed inspection of beds, furniture and cracks",
                        "Customer preparation guidance before service",
                        "Targeted application at harbourage points",
                        "Guidance on washing fabrics and reducing clutter",
                        "Advice against moving infested furniture",
                        "Recommended follow-up visits",
                    ],
                },
                {
                    "c": "RO",
                    "g": "rodent",
                    "n": "Rats & mice",
                    "t": p("Cables, packaging, stored goods, furniture and building materials."),
                    "signs": [
                        "Gnaw marks on cables and packaging",
                        "Droppings along walls and runways",
                        "Scratching sounds in ceilings or ducts",
                        "Burrows near external walls",
                        "Damaged stock or food packets",
                        "Grease marks along regular routes",
                    ],
                    "treat": [
                        "Site inspection and movement mapping",
                        "Entry-point assessment",
                        "Bait-station placement and replenishment",
                        "Trap placement and monitoring",
                        "Burrow observations",
                        "Rodent-proofing recommendations",
                        "Waste and storage corrections",
                        "Periodic activity reporting",
                    ],
                },
                {
                    "c": "MQ",
                    "g": "flying",
                    "n": "Mosquitoes",
                    "t": p("Gardens, basements, drains, terraces, STP surroundings and parking."),
                    "signs": [
                        "Biting activity at dawn and dusk",
                        "Stagnant water in containers or drains",
                        "Activity concentrated near landscaped areas",
                        "Resting in dark, humid corners",
                    ],
                    "treat": [
                        "Larval-source inspection",
                        "Suitable larval control",
                        "Residual treatment of resting surfaces",
                        "Fogging where appropriate",
                        "Outdoor resting-area treatment",
                        "Stagnant-water observations and corrections",
                        "Scheduled monitoring",
                    ],
                },
                {
                    "c": "AN",
                    "g": "crawling",
                    "n": "Ants",
                    "t": p("Cracks, windows, electrical conduits, wall gaps and external vegetation."),
                    "signs": [
                        "Visible trails along walls or counters",
                        "Activity around sweet or greasy food",
                        "Nesting near wall gaps or planters",
                        "Winged ants indoors",
                    ],
                    "treat": [
                        "Locating trails and nesting areas",
                        "Targeted baiting by species",
                        "Crack-and-crevice treatment",
                        "Entry-point identification",
                        "Food-source control advice",
                        "Outdoor perimeter observations",
                    ],
                },
                {
                    "c": "FL",
                    "g": "flying",
                    "n": "Flies",
                    "t": p("Waste areas, drains, food-handling zones and wet organic matter."),
                    "signs": [
                        "Concentration near bins and drains",
                        "Activity in food-preparation zones",
                        "Breeding in wet organic waste",
                        "Complaints from customers or staff",
                    ],
                    "treat": [
                        "Breeding-source inspection",
                        "Drain treatment",
                        "Waste-area recommendations",
                        "Insect light-trap positioning and monitoring",
                        "Residual and space treatment",
                        "Entry-point observations",
                        "Corrective-action reporting",
                    ],
                },
                {
                    "c": "WB",
                    "g": "wood",
                    "n": "Wood borers",
                    "t": p("Furniture, doors, cupboards, wooden panels and structural timber."),
                    "signs": [
                        "Fine powder below wooden items",
                        "Small round exit holes",
                        "Weakened or crumbling wood",
                        "Powder reappearing after cleaning",
                    ],
                    "treat": [
                        "Inspection of affected wooden items",
                        "Identification of active areas",
                        "Suitable drilling or injection",
                        "Targeted surface treatment",
                        "Advice on heavily damaged wood",
                        "Follow-up inspection",
                    ],
                },
                {
                    "c": "SP",
                    "g": "stored",
                    "n": "Stored-product pests",
                    "t": p("Grains, flour, spices, pulses, packaged food, animal feed and dry goods."),
                    "signs": [
                        "Insects inside packets or sacks",
                        "Webbing in stored grain",
                        "Damaged or holed packaging",
                        "Repeat issues in the same stock area",
                    ],
                    "treat": [
                        "Stock inspection",
                        "Infested-product isolation recommendations",
                        "Cleaning guidance for storage areas",
                        "Storage layout corrections",
                        "Targeted treatment",
                        "Ongoing monitoring",
                    ],
                },
                {
                    "c": "LS",
                    "g": "crawling",
                    "n": "Lizards, spiders & silverfish",
                    "t": p("Nuisance pests in storage areas, corners, false ceilings and wardrobes."),
                    "signs": [
                        "Webs in corners and ceilings",
                        "Droppings on walls or near lights",
                        "Damage to paper, books and fabric",
                        "Insect activity attracting predators",
                    ],
                    "treat": [
                        "Reducing insect food sources",
                        "Treating cracks and harbourage areas",
                        "Identifying entry points",
                        "Web removal where included in scope",
                        "Improving storage and housekeeping",
                        "Physical exclusion measures",
                        "Monitoring recurring activity",
                    ],
                },
                {
                    "c": "FT",
                    "g": "crawling",
                    "n": "Fleas & ticks",
                    "t": p("Pet resting areas, carpets, upholstery, skirting and outdoor zones."),
                    "signs": [
                        "Bites around ankles and legs",
                        "Pets scratching persistently",
                        "Activity in carpets and pet bedding",
                        "Recurrence after cleaning alone",
                    ],
                    "treat": [
                        "Inspection of pet resting and movement areas",
                        "Targeted treatment of carpets, cracks and skirting",
                        "Outdoor area treatment where required",
                        "Guidance on pet treatment and bedding",
                        "Follow-up service where recommended",
                    ],
                },
                {
                    "c": "GD",
                    "g": "stored",
                    "n": "General disinfestation",
                    "t": p("Whole-premises treatment for mixed or recurring pest activity."),
                    "signs": [
                        "More than one pest active at a time",
                        "Recurring activity after earlier treatments",
                        "New premises with unknown history",
                        "Post-renovation or post-vacancy issues",
                    ],
                    "treat": [
                        "Full-premises inspection",
                        "Combined treatment plan across pest types",
                        "Entry-point and breeding-source correction",
                        "Documentation for commercial premises",
                        "Scheduled follow-up and monitoring",
                    ],
                },
            ],
        },
    },
    {
        "key": "services",
        "label": "5. Services intro",
        "sort_order": 50,
        "data": {
            "eyebrow": "Services",
            "title": "Built for your home. Built for your business.",
            "lede": p(
                "One-time treatments, scheduled programmes and annual contracts — matched to your "
                "property, occupancy and pest risk."
            ),
            "tab_b2c": "For homes (B2C)",
            "tab_b2b": "For businesses (B2B)",
            "view_all": "View all services",
        },
    },
    {
        "key": "pricing",
        "label": "6. Pricing range",
        "sort_order": 55,
        "data": {
            "eyebrow": "Pricing guide",
            "title": "Common Pest Control Bangalore Price Range",
            "lede": p(
                "Pest control Bangalore price range depends on the pest type, property size, "
                "infestation level, and treatment required. Get a customized quote from our experts "
                "after understanding your specific requirement."
            ),
            "columns": ["Pest Control Service", "Pricing Information", "Get Quote"],
            "rows": [
                {
                    "service": "Cockroach Control",
                    "pricing": "Customized Pricing Based on Inspection",
                    "quote_label": "WhatsApp Us",
                },
                {
                    "service": "General Pest Control",
                    "pricing": "Depends on Property Size & Treatment Required",
                    "quote_label": "WhatsApp Us",
                },
                {
                    "service": "Bed Bug Treatment",
                    "pricing": "Quote Based on Infestation Level",
                    "quote_label": "WhatsApp Us",
                },
                {
                    "service": "Rodent Control",
                    "pricing": "Project-Based Pricing",
                    "quote_label": "WhatsApp Us",
                },
                {
                    "service": "Mosquito Control",
                    "pricing": "Depends on Area Coverage & Requirement",
                    "quote_label": "WhatsApp Us",
                },
                {
                    "service": "Termite Treatment",
                    "pricing": "Inspection Required for Accurate Pricing",
                    "quote_label": "WhatsApp Us",
                },
            ],
            "cta_title": "Get Your Pest Control Quote in Bangalore",
            "cta_text": (
                "<p>Looking for reliable pest control services near you? Send us your "
                "<strong>pest problem, property type, property size, and Bangalore location</strong> "
                "on WhatsApp. Our team will provide the right treatment plan and quotation.</p>"
            ),
            "cta_label": "Get Instant Quote on WhatsApp",
            "whatsapp_message": (
                "Hi TEB Enterprises, I need a pest control quote in Bangalore. "
                "Pest problem: , Property type: , Size: , Location: "
            ),
        },
    },
    {
        "key": "sectors",
        "label": "7. Sectors",
        "sort_order": 60,
        "data": {
            "eyebrow": "Sectors",
            "title": "Pest control for every kind of building.",
            "lede": p(
                "A restaurant kitchen and a record room don't have the same pest risk — or the same "
                "tolerance for disruption. We plan the programme around the building, not the other way "
                "round."
            ),
            "cta_kicker": "YOUR FACILITY",
            "cta_title": "Not on the list? Most buildings aren't so different underneath.",
            "cta_label": "Tell us about your site",
            "items": [
                {"code": "01", "title": "Corporate offices", "text": p("Workstations, cafeterias, server rooms, reception, meeting rooms, washrooms, pantries and basements.")},
                {"code": "02", "title": "Apartment communities", "text": p("Individual flats plus basements, clubhouses, garbage rooms, drains, STP areas, gardens and perimeters.")},
                {"code": "03", "title": "Hotels & hospitality", "text": p("Discreet management for guest rooms, kitchens, banquets, linen rooms, receiving bays and waste zones.")},
                {"code": "04", "title": "Restaurants & kitchens", "text": p("Cockroaches, rodents, flies, ants and stored-product pests in food-preparation and storage environments.")},
                {"code": "05", "title": "Hospitals & healthcare", "text": p("Carefully planned programmes for non-critical and permitted areas, scheduled around clinical operations.")},
                {"code": "06", "title": "Schools & institutions", "text": p("Classrooms, kitchens, dining halls, hostels, laboratories, libraries, stores and administrative offices.")},
                {"code": "07", "title": "Manufacturing", "text": p("Production zones, raw-material and finished-goods storage, utilities, canteens and facility perimeters.")},
                {"code": "08", "title": "Warehouses & logistics", "text": p("Rodents, stored-product pests and entry risks associated with constant goods movement.")},
                {"code": "09", "title": "Retail & malls", "text": p("Stores, food courts, stockrooms, common areas, loading zones, washrooms and parking facilities.")},
                {"code": "10", "title": "IT parks & campuses", "text": p("Office towers, food courts, landscaping, utility areas, basements, parking and waste-management zones.")},
                {"code": "11", "title": "Banking & financial", "text": p("Discreet service for branches, record rooms, storage areas, pantries and customer-facing spaces.")},
                {"code": "12", "title": "Construction & real estate", "text": p("Pre- and post-construction termite treatment, labour-camp pest control, mosquito and rodent management.")},
                {"code": "13", "title": "Food processing & storage", "text": p("Monitoring, sanitation observations, pest exclusion, treatment planning and full documentation.")},
            ],
        },
    },
    {
        "key": "why_choose",
        "label": "8. Why choose TEB",
        "sort_order": 65,
        "data": {
            "eyebrow": "Why TEB",
            "title": "Why Choose TEB as the Best Pest Control Bangalore Company?",
            "lede": (
                "<p>Finding the <strong>best pest control provider in Bangalore</strong> requires more than temporary spraying.</p>"
                "<p>TEB Pest Control follows an inspection-first approach to deliver reliable pest management solutions.</p>"
            ),
            "items": [
                {
                    "title": "Inspection before treatment",
                    "text": "We identify pest activity, hiding locations, entry points and contributing conditions before selecting treatment methods.",
                },
                {
                    "title": "Solutions for homes and businesses",
                    "text": "From apartments and villas to factories, warehouses and IT parks, our programmes are designed for different property environments.",
                },
                {
                    "title": "Integrated Pest Management approach",
                    "text": "We focus on reducing pest sources through monitoring, sanitation recommendations, exclusion and targeted treatments.",
                },
                {
                    "title": "Documentation for commercial clients",
                    "text": "Businesses receive service reports, observations, treatment details and recommendations where required.",
                },
                {
                    "title": "Bangalore-wide service coverage",
                    "text": "Our team supports residential and commercial properties across major Bengaluru locations.",
                },
            ],
            "closing": (
                "<p>For customers searching for the <strong>best pest control near me</strong>, "
                "our team provides reliable pest management support across Bengaluru.</p>"
            ),
        },
    },
    {
        "key": "ipm",
        "label": "9. IPM",
        "sort_order": 70,
        "data": {
            "eyebrow": "Integrated Pest Management",
            "title": "Fewer chemicals. Better questions.",
            "lede": p(
                "Repeated spraying treats what you can see. IPM asks why pests are entering, where "
                "they're breeding, what conditions support them — and how those conditions can be "
                "corrected."
            ),
            "cta_label": "Discuss an IPM programme",
            "items": [
                {"label": "Inspection", "title": "Find the source", "text": p("Affected areas, entry points, food and water sources, hiding places, drainage, waste areas and structural concerns.")},
                {"label": "Identification", "title": "Name the pest correctly", "text": p("Correct identification determines the right treatment method and the right monitoring approach.")},
                {"label": "Monitoring", "title": "Track activity over time", "text": p("Monitoring devices and periodic inspections show whether treatment is actually working.")},
                {"label": "Sanitation", "title": "Remove what attracts them", "text": p("Observations on waste management, food storage, leakage, drainage, clutter and housekeeping conditions.")},
                {"label": "Exclusion", "title": "Close the doors", "text": p("Sealing cracks, openings, pipeline gaps, door gaps, ventilation points and other pest-entry routes.")},
                {"label": "Treatment", "title": "Apply where it counts", "text": p("Treatment matched to pest activity, site sensitivity and the agreed service scope.")},
                {"label": "Documentation", "title": "Keep the record", "text": p("Service reports, pest observations, treatment details and corrective recommendations for commercial clients.")},
                {"label": "Review", "title": "Improve the programme", "text": p("Pest trends and recurring issues reviewed periodically to strengthen the overall plan.")},
            ],
        },
    },
    {
        "key": "process",
        "label": "8. Process",
        "sort_order": 80,
        "data": {
            "eyebrow": "How we work",
            "title": "Eight steps, in this order, every time.",
            "lede": "",
            "items": [
                {"step": "STEP 01", "title": "Enquiry", "text": p("Call, email or send the form with details of the pest problem and the property.")},
                {"step": "STEP 02", "title": "Initial assessment", "text": p("We gather details on the pest, affected areas, how long it's been going on and past treatments.")},
                {"step": "STEP 03", "title": "Site inspection", "text": p("Where required, our technician visits to check pest activity, breeding areas, entry points and risks.")},
                {"step": "STEP 04", "title": "Treatment proposal", "text": p("Method, frequency, preparation requirements, commercial terms and follow-up schedule.")},
                {"step": "STEP 05", "title": "Service execution", "text": p("Treatment carried out with suitable equipment, application methods and site-specific precautions.")},
                {"step": "STEP 06", "title": "Service report", "text": p("Commercial clients receive documentation, observations, treatment details and recommendations.")},
                {"step": "STEP 07", "title": "Follow-up", "text": p("Scheduled or carried out based on pest type, infestation level and the agreed service plan.")},
                {"step": "STEP 08", "title": "Prevention guidance", "text": p("Practical measures to reduce food, water, shelter and entry opportunities for pests.")},
            ],
        },
    },
    {
        "key": "amc",
        "label": "9. AMC",
        "sort_order": 90,
        "data": {
            "eyebrow": "Annual Maintenance Contracts",
            "title": "Catch it early, or clear it later.",
            "lede": p(
                "Regular service finds pest activity while it's still small. AMCs are built around "
                "your property type, risk level and operating schedule."
            ),
            "box_title": "What an AMC can include",
            "why_title": "Why clients choose an AMC",
            "tags": [
                "Weekly", "Fortnightly", "Monthly", "Quarterly", "Custom frequency",
                "General pest control", "Rodent management", "Mosquito management", "Fly management",
                "Cockroach control", "Ant control", "Monitoring devices", "Service documentation",
                "Emergency call-outs", "Review meetings", "Corrective actions",
            ],
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
        "key": "safety",
        "label": "10. Safety",
        "sort_order": 100,
        "data": {
            "eyebrow": "Safety",
            "title": "Preparation keeps everyone safer.",
            "lede": p("Follow the guidance our technicians share for your specific treatment method."),
            "tabs": ["Before service", "After service", "Tell us about"],
            "pre": [
                ["Store or cover food items", "Remove utensils from selected areas", "Keep children and pets away"],
                ["Provide access to cabinets and corners", "Cover fish tanks; switch off air pumps if instructed", "Remove unnecessary clutter"],
                ["Inform the team about allergies or sensitivities", "Follow the advised vacancy and re-entry time", "Complete all preparation instructions shared"],
            ],
            "post": [
                ["Follow the advised re-entry time", "Ventilate the area if instructed", "Avoid touching treated surfaces unnecessarily"],
                ["Keep children and pets away for the advised duration", "Don't wash treated cracks and corners immediately", "Dispose of dead pests hygienically"],
                ["Report unusual activity to our team", "Complete the recommended follow-up service", "Correct leakage, drainage and entry concerns"],
            ],
            "tell": [
                ["Infants or young children", "Elderly persons", "Pregnant individuals", "Allergies or respiratory conditions"],
                ["Pets, birds or fish tanks", "Food-processing activities", "Sensitive equipment", "Medicines or healthcare materials"],
                ["Occupied patient-care areas", "Restricted-access zones", "Operational hours we must work around"],
            ],
        },
    },
    {
        "key": "areas",
        "label": "11. Areas",
        "sort_order": 110,
        "data": {
            "eyebrow": "Service areas",
            "title": "Across Bengaluru.",
            "lede": p(
                "Search your locality below. Service availability is subject to location, site "
                "requirements and scheduling — call us to confirm."
            ),
            "items": [
                "Whitefield", "ITPL", "Hoodi", "Kadugodi", "Brookefield", "Mahadevapura", "KR Puram",
                "Marathahalli", "Varthur", "Bellandur", "Sarjapur Road", "Electronic City", "HSR Layout",
                "Koramangala", "Indiranagar", "Hebbal", "Yelahanka", "Jayanagar", "JP Nagar", "Banashankari",
                "Rajajinagar", "Malleshwaram", "Peenya", "Yeshwanthpur", "Manyata Tech Park", "Devanahalli", "Hoskote",
            ],
            "other_label": "Other Bengaluru locations",
        },
    },
    {
        "key": "faq",
        "label": "12. FAQ",
        "sort_order": 120,
        "data": {
            "eyebrow": "Questions",
            "title": "Straight answers.",
            "items": [
                {"q": "Do you provide pest control for both homes and businesses?", "a": p("Yes. TEB Enterprises provides complete B2C residential pest control and B2B commercial pest-management services.")},
                {"q": "Which areas do you serve?", "a": p("We primarily serve Bengaluru. Contact our team to confirm availability for your specific location.")},
                {"q": "Do you provide one-time treatment?", "a": p("Yes, for selected pest problems. For recurring or high-risk properties we may recommend a scheduled service plan instead.")},
                {"q": "Do you provide Annual Maintenance Contracts?", "a": p("Yes. We offer pest-control AMCs for residential, commercial, industrial and institutional properties.")},
                {"q": "How much does pest control cost?", "a": p("It depends on property size, pest type, infestation level, treatment method, number of visits and service frequency. Contact us for an assessment and quotation.")},
                {"q": "Is pest control safe for children and pets?", "a": p("Safety depends on the application method and on following instructions. Tell our team about children, elderly residents, pets, allergies or sensitive conditions before treatment.")},
                {"q": "Do I need to leave the property during treatment?", "a": p("It depends on the method used. Our team gives you the required vacancy and re-entry instructions before service.")},
                {"q": "How long does treatment take?", "a": p("Duration depends on property size, pest type, infestation level and the treatment method.")},
                {"q": "Will one treatment solve the problem completely?", "a": p("Some infestations are controlled in one service. Others — particularly bedbugs, termites, rodents and severe cockroach infestations — need multiple visits and preventive action.")},
                {"q": "Which Company provides Best pest control near me?", "a": p("The right pest control provider depends on inspection quality, treatment methods, service experience and follow-up support. TEB provides professional pest management services across Bangalore.")},
                {"q": "Do you provide documentation for companies?", "a": p("Yes. Commercial service documentation is provided according to the agreed scope and contract requirements.")},
                {"q": "What should I do before the service?", "a": p("Preparation depends on the treatment. Our team shares instructions covering food, utensils, furniture access, children, pets and re-entry requirements.")},
                {"q": "Why are pests returning after treatment?", "a": p("Usually because of untreated breeding sources, neighbouring infestations, structural entry points, waste-handling problems, moisture, available food, or an incomplete follow-up. We can inspect the cause and recommend corrective measures.")},
                {"q": "Do you provide emergency pest control?", "a": p("Priority service may be arranged depending on team availability, site location and pest type.")},
                {"q": "How can I find pest control services near me?", "a": p("TEB provides pest control services near me across Bangalore localities including residential and commercial areas.")},
                {"q": "How much do pest control services Bangalore usually cost?", "a": p("The pest control Bangalore price depends on the pest problem, property size and treatment requirements.")},
                {"q": "What are the best pest control services Bangalore residents can choose for homes and businesses?", "a": p("TEB provides reliable pest control services Bangalore customers can use for homes, apartments, offices, restaurants, warehouses and commercial properties. Our services include cockroach control, termite treatment, bedbug treatment, rodent control, mosquito management and customised pest management plans.")},
                {"q": "How can I book Cockroach Pest Control Services in Bangalore?", "a": p("To book Cockroach pest control Bangalore, contact TEB Pest Control for a site inspection and quotation. Our technicians assess the pest issue, recommend the right treatment and provide solutions based on your property type and infestation level.")},
                {"q": "Why choose professional pest control services in Bangalore for pest problems?", "a": p("Professional pest control Bangalore help identify the pest source and provide targeted treatment for long-lasting results. TEB Pest Control offers inspection-based solutions, preventive treatments and scheduled pest management support across Bengaluru.")},
                {"q": "Where can I get trusted pest control services near me in Bangalore?", "a": p("TEB offers professional pest control services in Bangalore across major Bengaluru areas for residential and commercial properties. Our technicians inspect the pest issue, recommend the right treatment and provide effective pest management solutions.")},
                {"q": "What should I check before booking the best pest control near me?", "a": p("Before booking the best pest control near me, check the company's experience, treatment approach, service coverage, safety guidance and customer support. TEB provides customised pest management solutions based on your property type and pest issue across Bangalore.")},
            ],
        },
    },
    {
        "key": "contact",
        "label": "13. Contact",
        "sort_order": 130,
        "data": {
            "eyebrow": "Get started",
            "title": "Book an inspection and get a quotation.",
            "lede": p(
                "Cockroaches, termites, bedbugs, mosquitoes, rodents, flies, ants — tell us what "
                "you're dealing with and we'll come and look."
            ),
            "aside_title": "Talk to us directly",
            "aside_text": p(
                "Share your property location, type, approximate size and the pest problem. Photos or "
                "videos help us assess faster."
            ),
            "property_types": [
                "Independent house", "Apartment / flat", "Villa / gated community", "Office",
                "IT park / business campus", "Hotel / restaurant", "Hospital / clinic",
                "School / institution", "Factory / manufacturing", "Warehouse / logistics",
                "Retail store / mall", "Bank / financial office", "Construction site", "Other",
            ],
            "pest_options": [
                "Cockroaches", "Termites", "Bedbugs", "Rodents", "Mosquitoes", "Ants", "Flies",
                "Wood borer", "Stored-product pests", "Lizards / spiders / silverfish",
                "Multiple / not sure", "Pre-construction termite treatment", "Annual maintenance contract",
            ],
        },
    },
    {
        "key": "band",
        "label": "14. Bottom CTA",
        "sort_order": 140,
        "data": {
            "title": "Keep your property protected from pests.",
            "lede": p(
                "From homes and apartments to offices, factories, hospitals, hotels, restaurants and "
                "warehouses — customised pest-control solutions for every environment."
            ),
            "secondary_cta": "Request a site inspection",
        },
    },
]


def seed_homepage(db: Session, *, force: bool = False) -> None:
    for section in DEFAULT_SECTIONS:
        row = db.query(HomepageSection).filter(HomepageSection.key == section["key"]).first()
        payload = json.dumps(section["data"], ensure_ascii=False)
        if row:
            if force:
                row.label = section["label"]
                row.sort_order = section["sort_order"]
                row.data = payload
            elif section["key"] == "faq":
                # Refresh FAQ list when schema/SEO FAQ set grows
                try:
                    current = json.loads(row.data or "{}")
                    new_items = section["data"].get("items") or []
                    old_items = current.get("items") or []
                    if len(new_items) > len(old_items):
                        row.data = payload
                except json.JSONDecodeError:
                    row.data = payload
            continue
        db.add(
            HomepageSection(
                key=section["key"],
                label=section["label"],
                sort_order=section["sort_order"],
                data=payload,
            )
        )
    db.commit()
