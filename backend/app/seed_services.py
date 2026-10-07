from .models import Service

# Unique cover images per service (matched to service type / name)
SERVICE_COVER_BY_SLUG = {
    "general-pest-control-home": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=70",
    "kitchen-pest-control": "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=70",
    "bedbug-treatment-home": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=70",
    "termite-treatment-home": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70",
    "mosquito-management-home": "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=70",
    "rodent-control-home": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=70",
    "move-in-pest-control": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=70",
    "annual-home-protection": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=70",
    "where-we-work-homes": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70",
    "site-inspection-risk-assessment": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=70",
    "customised-treatment-plan": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=70",
    "scheduled-preventive-service": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=70",
    "monitoring-systems": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70",
    "service-documentation": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=70",
    "emergency-call-outs": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=70",
    "corrective-action-reporting": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=70",
    "management-review": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=70",
    "who-we-work-with": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=70",
    "cockroach-control-bangalore": "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=70",
    "termite-control-bangalore": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70",
    "bed-bug-control-bangalore": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=70",
    "rodent-control-bangalore": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=70",
    "mosquito-control-bangalore": "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=70",
    "ant-control-bangalore": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=70",
    "residential-pest-control-bangalore": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70",
    "commercial-pest-control-bangalore": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=70",
    "pest-control-amc-bangalore": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=70",
    "pest-control-whitefield": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=70",
    "pest-control-marathahalli": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=70",
    "pest-control-sarjapur-road": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=70",
    "pest-control-bellandur": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=70",
    "pest-control-brookefield": "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=70",
    "pest-control-hoodi": "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1200&q=70",
    "pest-control-kr-puram": "https://images.unsplash.com/photo-1467269204591-fc0da825e6b7?auto=format&fit=crop&w=1200&q=70",
    "pest-control-electronic-city": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=70",
    "pest-control-hsr-layout": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=70",
}

SEED_SERVICES = [
    # ---- Home grid B2C packages (existing hardcode) ----
    {
        "title": "General pest control",
        "slug": "general-pest-control-home",
        "category": "package_b2c",
        "code": "PACKAGE 01",
        "summary": "A comprehensive treatment for cockroaches, ants, silverfish, spiders and other common crawling insects across the home.",
        "content": "TEB Enterprises provides general pest control for homes across Bengaluru. Our inspection-based treatment targets cockroaches, ants, silverfish, spiders and other crawling insects with safe, effective methods.",
        "highlights": "Cockroach control\nAnt control\nSilverfish & spider treatment\nWhole-home coverage",
        "keywords": "general pest control Bangalore, home pest control Bangalore",
        "audience": "b2c",
        "show_in_grid": True,
        "sort_order": 1,
    },
    {
        "title": "Kitchen pest control",
        "slug": "kitchen-pest-control",
        "category": "package_b2c",
        "code": "PACKAGE 02",
        "summary": "Targeted work around cabinets, sinks, drainage points, appliances, storage and food-preparation areas.",
        "content": "Kitchen pest control focused on cabinets, drains, appliances and food-prep zones where pests breed and hide.",
        "highlights": "Cabinets & sinks\nDrainage points\nAppliances & storage\nFood-prep areas",
        "keywords": "kitchen pest control Bangalore",
        "audience": "b2c",
        "show_in_grid": True,
        "sort_order": 2,
    },
    {
        "title": "Bedbug treatment",
        "slug": "bedbug-treatment-home",
        "category": "package_b2c",
        "code": "PACKAGE 03",
        "summary": "Detailed inspection of beds, mattresses, furniture joints, upholstery and skirting. Multiple visits may be recommended.",
        "content": "Home bedbug treatment with detailed inspection of beds, mattresses and furniture. Follow-up visits may be recommended.",
        "highlights": "Mattress treatment\nFurniture joints\nUpholstery & skirting\nFollow-up visits",
        "keywords": "bedbug treatment Bangalore",
        "audience": "b2c",
        "show_in_grid": True,
        "sort_order": 3,
    },
    {
        "title": "Termite treatment",
        "slug": "termite-treatment-home",
        "category": "package_b2c",
        "code": "PACKAGE 04",
        "summary": "Pre- and post-construction termite control for homes, villas, apartments, furniture and wooden fixtures.",
        "content": "Pre- and post-construction termite treatment for homes, villas, apartments and wooden fixtures in Bengaluru.",
        "highlights": "Pre-construction treatment\nPost-construction treatment\nFurniture & fixtures\nPerimeter protection",
        "keywords": "termite treatment Bangalore",
        "audience": "b2c",
        "show_in_grid": True,
        "sort_order": 4,
    },
    {
        "title": "Mosquito management",
        "slug": "mosquito-management-home",
        "category": "package_b2c",
        "code": "PACKAGE 05",
        "summary": "Treatment plus breeding-source control across gardens, balconies, terraces, drains and common areas.",
        "content": "Residential mosquito management with treatment and breeding-source control for gardens, balconies and drains.",
        "highlights": "Fogging where required\nLarval source control\nGardens & terraces\nCommon areas",
        "keywords": "mosquito management Bangalore",
        "audience": "b2c",
        "show_in_grid": True,
        "sort_order": 5,
    },
    {
        "title": "Rodent control",
        "slug": "rodent-control-home",
        "category": "package_b2c",
        "code": "PACKAGE 06",
        "summary": "Baiting, trapping, monitoring and rodent-proofing recommendations for rat and mouse activity.",
        "content": "Home rodent control with baiting, trapping, monitoring and proofing recommendations for rats and mice.",
        "highlights": "Bait stations\nTrapping & monitoring\nRodent proofing advice\nRat & mouse control",
        "keywords": "rodent control Bangalore",
        "audience": "b2c",
        "show_in_grid": True,
        "sort_order": 6,
    },
    {
        "title": "Move-in pest control",
        "slug": "move-in-pest-control",
        "category": "package_b2c",
        "code": "PACKAGE 07",
        "summary": "Treatment for a newly purchased or rented home before furniture and kitchen items are moved in.",
        "content": "Move-in pest control for new or rented homes before furniture and kitchen items arrive.",
        "highlights": "Pre-move treatment\nVacant property service\nKitchen & storage focus\nFresh start protection",
        "keywords": "move in pest control Bangalore",
        "audience": "b2c",
        "show_in_grid": True,
        "sort_order": 7,
    },
    {
        "title": "Annual home protection",
        "slug": "annual-home-protection",
        "category": "package_b2c",
        "code": "PACKAGE 08",
        "summary": "A scheduled residential programme with periodic treatments and monitoring through the contract period.",
        "content": "Annual home pest protection with scheduled treatments and monitoring through the contract period.",
        "highlights": "Scheduled visits\nOngoing monitoring\nPriority support\nYear-round protection",
        "keywords": "annual pest control Bangalore, home AMC Bangalore",
        "audience": "b2c",
        "show_in_grid": True,
        "sort_order": 8,
    },
    {
        "title": "Every kind of home",
        "slug": "where-we-work-homes",
        "category": "package_b2c",
        "code": "WHERE WE WORK",
        "summary": "Independent houses, apartments, villas, gated communities, rentals, PGs, hostels, new builds and vacant properties.",
        "content": "TEB Enterprises serves every kind of home across Bengaluru — independent houses, apartments, villas, gated communities, rentals, PGs, hostels, new builds and vacant properties.",
        "highlights": "Independent houses\nApartments & flats\nVillas & gated communities\nPGs & hostels",
        "keywords": "home pest control Bangalore",
        "audience": "b2c",
        "show_in_grid": True,
        "is_featured": True,
        "sort_order": 9,
    },
    # ---- Home grid B2B scopes ----
    {
        "title": "Site inspection & risk assessment",
        "slug": "site-inspection-risk-assessment",
        "category": "package_b2b",
        "code": "SCOPE 01",
        "summary": "A full survey of pest activity, entry points, breeding sources and site-specific risks before any treatment plan is written.",
        "content": "Commercial site inspection and risk assessment before any treatment plan is written.",
        "highlights": "Pest activity survey\nEntry-point mapping\nBreeding source check\nSite-specific risks",
        "keywords": "commercial pest inspection Bangalore",
        "audience": "b2b",
        "show_in_grid": True,
        "sort_order": 10,
    },
    {
        "title": "Customised treatment plan",
        "slug": "customised-treatment-plan",
        "category": "package_b2b",
        "code": "SCOPE 02",
        "summary": "Built around your facility type, size, operating schedule, occupancy sensitivity and audit requirements.",
        "content": "Customised commercial pest treatment plans matched to facility type, schedule and audits.",
        "highlights": "Facility-specific plan\nOperating schedule fit\nAudit readiness\nSensitivity planning",
        "keywords": "commercial pest control plan Bangalore",
        "audience": "b2b",
        "show_in_grid": True,
        "sort_order": 11,
    },
    {
        "title": "Scheduled preventive service",
        "slug": "scheduled-preventive-service",
        "category": "package_b2b",
        "code": "SCOPE 03",
        "summary": "Weekly, fortnightly, monthly or quarterly visits planned around your operations to minimise disruption.",
        "content": "Scheduled preventive pest service for commercial sites with flexible visit frequencies.",
        "highlights": "Weekly to quarterly\nMinimal disruption\nOperations-aligned\nPreventive focus",
        "keywords": "preventive pest control Bangalore",
        "audience": "b2b",
        "show_in_grid": True,
        "sort_order": 12,
    },
    {
        "title": "Monitoring systems",
        "slug": "monitoring-systems",
        "category": "package_b2b",
        "code": "SCOPE 04",
        "summary": "Rodent bait-station management, insect light-trap positioning and monitoring, and pest-sighting trend review.",
        "content": "Commercial pest monitoring systems including bait stations and insect light traps.",
        "highlights": "Bait-station management\nInsect light traps\nTrend review\nContinuous monitoring",
        "keywords": "pest monitoring Bangalore",
        "audience": "b2b",
        "show_in_grid": True,
        "sort_order": 13,
    },
    {
        "title": "Service documentation",
        "slug": "service-documentation",
        "category": "package_b2b",
        "code": "SCOPE 05",
        "summary": "Treatment records, pest observations, corrective-action recommendations and follow-up schedules for your audits.",
        "content": "Full commercial service documentation for audits and compliance.",
        "highlights": "Treatment records\nPest observations\nCorrective actions\nAudit-ready reports",
        "keywords": "pest control documentation Bangalore",
        "audience": "b2b",
        "show_in_grid": True,
        "sort_order": 14,
    },
    {
        "title": "Emergency call-outs",
        "slug": "emergency-call-outs",
        "category": "package_b2b",
        "code": "SCOPE 06",
        "summary": "Priority support for sudden pest incidents, subject to team availability, site location and pest type.",
        "content": "Priority emergency pest call-outs for commercial facilities across Bengaluru.",
        "highlights": "Priority response\nSudden infestations\nSite-based support\nFast mobilisation",
        "keywords": "emergency pest control Bangalore",
        "audience": "b2b",
        "show_in_grid": True,
        "sort_order": 15,
    },
    {
        "title": "Corrective action reporting",
        "slug": "corrective-action-reporting",
        "category": "package_b2b",
        "code": "SCOPE 07",
        "summary": "Entry points, breeding sources, sanitation and structural gaps documented with practical recommendations.",
        "content": "Corrective action reporting for entry points, sanitation and structural pest risks.",
        "highlights": "Entry-point gaps\nBreeding sources\nSanitation advice\nStructural recommendations",
        "keywords": "pest corrective action Bangalore",
        "audience": "b2b",
        "show_in_grid": True,
        "sort_order": 16,
    },
    {
        "title": "Management review",
        "slug": "management-review",
        "category": "package_b2b",
        "code": "SCOPE 08",
        "summary": "Periodic review of pest trends and recurring issues to improve the programme over the contract term.",
        "content": "Periodic management reviews to improve commercial pest programmes over the contract term.",
        "highlights": "Trend analysis\nRecurring issues\nProgramme improvement\nContract reviews",
        "keywords": "pest management review Bangalore",
        "audience": "b2b",
        "show_in_grid": True,
        "sort_order": 17,
    },
    {
        "title": "Your whole team",
        "slug": "who-we-work-with",
        "category": "package_b2b",
        "code": "WHO WE WORK WITH",
        "summary": "Facility managers, apartment associations, procurement, administration, housekeeping, engineering and EHS.",
        "content": "We work with facility managers, apartment associations, procurement, administration, housekeeping, engineering and EHS teams.",
        "highlights": "Facility managers\nApartment associations\nProcurement & admin\nHousekeeping & EHS",
        "keywords": "B2B pest control Bangalore",
        "audience": "b2b",
        "show_in_grid": True,
        "is_featured": True,
        "sort_order": 18,
    },
    # ---- Phase 1 SEO pest pages ----
    {
        "title": "Cockroach Control in Bangalore",
        "slug": "cockroach-control-bangalore",
        "category": "pest",
        "code": None,
        "summary": "Professional cockroach pest control for homes, kitchens, apartments, restaurants and hotels across Bengaluru.",
        "content": (
            "TEB Enterprises provides expert cockroach control in Bangalore for homes and businesses. "
            "We specialise in kitchen cockroach treatment, home cockroach control, apartment cockroach control, "
            "restaurant cockroach control and hotel cockroach control.\n\n"
            "Every job starts with inspection — finding harbourage points, moisture sources and food access — "
            "then we apply targeted gel bait, crack-and-crevice treatment and follow-up as needed.\n\n"
            "Looking for cockroach pest control near me in Bengaluru? Call TEB Enterprises for a free site inspection."
        ),
        "highlights": "Cockroach control service\nKitchen cockroach treatment\nHome cockroach control\nApartment cockroach control\nRestaurant cockroach control\nHotel cockroach control",
        "keywords": (
            "Cockroach Control Services in Bangalore, Cockroach Pest Control Bangalore, "
            "Cockroach control Bangalore, Cockroach pest control near me, Best cockroach control Bangalore, "
            "Cockroach treatment Bangalore, Kitchen cockroach control Bangalore, Home cockroach control Bangalore, "
            "Apartment cockroach control Bangalore, Restaurant cockroach control Bangalore, "
            "Hotel cockroach control Bangalore, Cockroach control services Bangalore, "
            "Cockroach control in Bangalore, Cockroach control services in Bangalore, "
            "Cockroach pest control Bangalore price"
        ),
        "meta_title": "Best Cockroach Control Services in Bangalore",
        "meta_description": (
            "Get professional Cockroach Control Services in Bangalore with TEB Pest Control. "
            "Safe and effective cockroach treatment for homes and offices. Book your service today"
        ),
        "faq_title": "Cockroach control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What do Cockroach Control Services in Bangalore typically include?|"
            "They typically begin with an inspection to locate activity and entry points, followed by targeted treatment and practical advice on cleaning, food storage, and sealing gaps to help limit future infestations.\n"
            "What can I expect from Cockroach Pest Control Bangalore?|"
            "A technician may assess where cockroaches hide, choose suitable methods for the setting, and explain any preparation or follow-up needed. Results depend on infestation size, access, sanitation, and continued prevention.\n"
            "How does Cockroach control Bangalore usually work?|"
            "Control usually combines identifying hiding places, treating active areas, and reducing access to food and moisture. Sealing cracks and monitoring activity afterward can help show whether further treatment is needed.\n"
            "How can I choose a provider for Cockroach pest control near me?|"
            "Compare providers by asking about inspection, treatment methods, preparation, follow-up, and clear safety instructions. Describe where you see cockroaches so they can suggest an appropriate assessment for your specific property.\n"
            "What should I consider when searching for Best cockroach control Bangalore?|"
            "Look for a provider that explains its inspection process, proposed treatment, safety precautions, and follow-up options. The right choice depends on your property, infestation severity, and the clarity of its guidance.\n"
            "What happens during Cockroach treatment Bangalore?|"
            "Treatment generally starts by identifying activity around kitchens, bathrooms, drains, and hidden gaps. The chosen approach may include targeted applications and monitoring, alongside guidance for removing food, water, and shelter.\n"
            "How does Kitchen cockroach control Bangalore address activity near food areas?|"
            "An inspection can identify hiding spots beneath sinks, behind appliances, and around storage. Treatment should suit the space, while prompt cleanup, sealed food containers, and leak repairs support ongoing control.\n"
            "What does Home cockroach control Bangalore involve?|"
            "Home treatment focuses on where cockroaches enter, hide, and find food or water. An inspection guides targeted action, while residents can reduce clutter, fix leaks, and keep food securely stored.\n"
            "How can Apartment cockroach control Bangalore address recurring infestations?|"
            "Apartment treatment may need attention to shared walls, plumbing routes, and neighboring units because cockroaches can move between spaces. Report recurring sightings to building management and follow preparation instructions for coordinated treatment.\n"
            "What should Restaurant cockroach control Bangalore cover?|"
            "Restaurants benefit from inspections of food storage, preparation areas, drains, and waste handling. Targeted treatment, cleaning routines, and prompt repairs can address activity while supporting ongoing monitoring and pest management records.\n"
            "How is Hotel cockroach control Bangalore typically planned?|"
            "A hotel plan can prioritize guest rooms, kitchens, laundry areas, and service spaces according to inspection findings. Discreet scheduling, clear staff instructions, and follow-up monitoring help manage activity across different areas.\n"
            "What do Cockroach control services Bangalore generally involve?|"
            "Services commonly involve inspecting the property, identifying likely hiding places, selecting treatment for affected areas, and advising on prevention. Ask how preparation and follow-up are handled so expectations are clear before treatment.\n"
            "How should I prepare for Cockroach control in Bangalore?|"
            "Preparation depends on the treatment plan, so follow the provider's instructions. You may need to clear access to affected areas, secure food and utensils, and report recent sightings or moisture problems.\n"
            "What influences Cockroach pest control Bangalore price?|"
            "Cost can vary with property size, infestation severity, treatment method, and the number of visits proposed. Request a written explanation of the inspection, included work, follow-up, and any conditions affecting the quote."
        ),
        "audience": "both",
        "show_in_grid": False,
        "is_featured": True,
        "sort_order": 100,
    },
    {
        "title": "Termite Control in Bangalore",
        "slug": "termite-control-bangalore",
        "category": "pest",
        "summary": "Anti-termite treatment including pre-construction and post-construction termite control across Bengaluru.",
        "content": (
            "TEB Enterprises offers complete termite control in Bangalore — termite removal, home termite treatment, "
            "office termite treatment, pre-construction termite treatment and post-construction termite treatment.\n\n"
            "We inspect for mud tubes, damaged wood and entry points, then apply the right barrier or injection method. "
            "Anti termite treatment Bangalore services are available for homes, villas, apartments and commercial sites."
        ),
        "highlights": "Termite removal\nHome termite treatment\nOffice termite treatment\nPre-construction termite treatment\nPost-construction termite treatment",
        "keywords": (
            "Termite control Bangalore, Termite treatment Bangalore, Best termite control Bangalore, "
            "Pre-construction termite treatment Bangalore, Post-construction termite treatment Bangalore, "
            "Home termite control Bangalore, Apartment termite control Bangalore, "
            "Office termite control Bangalore, Construction termite control Bangalore"
        ),
        "meta_title": "Termite Control Bangalore | Expert Anti Termite Treatment",
        "meta_description": (
            "Get professional termite control in Bangalore with TEB Pest Control. "
            "Our expert team provides safe anti termite treatment for homes and offices. Book your service today"
        ),
        "faq_title": "Termite control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What does Termite control Bangalore involve?|"
            "It starts with identifying termite activity, affected materials, and possible entry routes. A treatment plan may target the infestation and vulnerable areas, while moisture control and periodic checks help reduce future risk.\n"
            "How is Termite treatment Bangalore selected for a property?|"
            "The approach depends on the termite species, building layout, extent of damage, and access to affected areas. An inspection helps determine suitable treatment locations and whether ongoing monitoring is advisable afterward.\n"
            "What should I consider when searching for Best termite control Bangalore?|"
            "Ask providers how they inspect, explain findings, select methods, and document the proposed work. Compare the scope of treatment and follow-up recommendations against your property's needs before deciding which service fits.\n"
            "When is Pre-construction termite treatment Bangalore applied?|"
            "This treatment is planned during building work, when soil and structural contact areas can be accessed more easily. The application stage depends on the construction sequence and the method specified for the project.\n"
            "How does Post-construction termite treatment Bangalore work?|"
            "After a building is complete, an inspection identifies activity and likely access points. Treatment may involve targeted work around affected structures, followed by advice on moisture issues, damaged materials, and continued monitoring.\n"
            "What does Home termite control Bangalore usually cover?|"
            "At home, an inspection can check woodwork, walls, floors, and moisture-prone areas for signs of activity. Findings guide treatment choices and help residents understand which conditions may need attention afterward.\n"
            "What should Apartment termite control Bangalore take into account?|"
            "Apartment treatment may require examining both the affected unit and shared structural areas. Coordinating access with building management can help identify the spread of activity and plan treatment across connected spaces.\n"
            "How can Office termite control Bangalore be planned around daily work?|"
            "An office plan can start with an inspection of affected wood, storage, and service areas. Scheduling access to treatment locations and sharing preparation instructions with staff can limit disruption during the work.\n"
            "What does Construction termite control Bangalore address?|"
            "Construction planning can identify soil contact points, moisture sources, and parts of the structure that may be vulnerable to termites. Treatment choices depend on the building stage, design, and access available onsite."
        ),
        "audience": "both",
        "show_in_grid": False,
        "is_featured": True,
        "sort_order": 101,
    },
    {
        "title": "Bed Bug Control in Bangalore",
        "slug": "bed-bug-control-bangalore",
        "category": "pest",
        "summary": "Bed bug removal and mattress treatment for homes, apartments, hotels and hostels in Bengaluru.",
        "content": (
            "Need bed bug treatment Bangalore or bed bug control near me? TEB Enterprises provides bed bug removal, "
            "mattress treatment, home bed bug treatment, apartment bed bug control, hotel bed bug control and hostel bed bug control.\n\n"
            "We inspect beds, furniture joints and skirting, guide you on preparation, and recommend follow-up visits when required."
        ),
        "highlights": "Bed bug removal\nMattress treatment\nHome bed bug treatment\nApartment bed bug control\nHotel bed bug control\nHostel bed bug control",
        "keywords": (
            "Bed bug pest control Bangalore, Bed bug treatment Bangalore, Bed bug control near me, "
            "Best bed bugs pest control in Bangalore, Best bed bug control Bangalore, "
            "Bed bug removal Bangalore, Home bed bug treatment Bangalore, "
            "Apartment bed bug control Bangalore, Hotel bed bug treatment Bangalore, "
            "Hostel bed bug control Bangalore, Bed bug extermination Bangalore"
        ),
        "meta_title": "Professional Bed Bug Pest Control Bangalore",
        "meta_description": (
            "Looking for bed bug pest control Bangalore? TEB Pest Control offers advanced bed bug "
            "removal treatment with trained technicians and long-lasting protection."
        ),
        "faq_title": "Bed bug control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What should I check when searching for Bed bug pest control Bangalore?|"
            "Ask how the provider inspects sleeping areas, identifies the extent of activity, and explains preparation before treatment. A clear plan should address likely hiding places and tell you what to expect afterward.\n"
            "What happens during bed bug treatment Bangalore residents arrange?|"
            "A provider should assess where bed bugs may be hiding before recommending treatment. Ask which rooms need attention, how to prepare beds and belongings, and whether further inspection may be necessary.\n"
            "How can I assess results for Bed bug control near me?|"
            "Check whether the provider serves your address and can explain its inspection and treatment approach. Describe where you have noticed signs, then ask about preparation, scheduling, and any recommended follow-up steps.\n"
            "How should I compare results for Best bed bugs pest control in Bangalore?|"
            "Compare providers by asking how they inspect rooms, choose a treatment approach, and explain safety instructions. Look for answers that address your specific situation instead of relying only on promotional claims or rankings.\n"
            "What questions help me choose Best bed bug control Bangalore services?|"
            "Ask what the visit includes, which spaces may need inspection, and what preparation is expected. You can also ask how the provider evaluates remaining activity and what to do if signs continue.\n"
            "What should I expect from bed bug removal Bangalore services?|"
            "Expect an assessment of possible hiding places and an explanation of the proposed treatment. Before booking, ask how to handle bedding and personal items, and how to monitor for signs afterward.\n"
            "How can I prepare for home bed bug treatment Bangalore providers offer?|"
            "Ask the provider for instructions tailored to your home before moving furniture or belongings. Mention affected rooms and any recent sightings so the inspection can focus on relevant areas without overlooking nearby spaces.\n"
            "When searching for Apartment bed bug control Bangalore, what should residents discuss?|"
            "Tell the provider which rooms show signs and whether activity has appeared near shared walls or adjoining spaces. Ask what areas they recommend inspecting and whether building management should be informed.\n"
            "When booking Hotel bed bug treatment Bangalore services, what should staff clarify?|"
            "Explain which rooms have reported signs and ask how the provider would inspect nearby spaces. Clarify any preparation, room access, and guidance for staff before deciding when affected rooms can be used.\n"
            "How should operators plan for Hostel bed bug control Bangalore services?|"
            "Start by identifying affected sleeping areas and telling the provider about shared rooms and stored belongings. Ask for clear preparation instructions that residents can follow and a plan for checking nearby spaces.\n"
            "What does bed bug extermination Bangalore planning involve?|"
            "Planning begins with identifying suspected activity and discussing the areas that may require inspection. Ask the provider to explain its proposed approach, preparation steps, and how it will assess results after treatment."
        ),
        "audience": "both",
        "show_in_grid": False,
        "is_featured": True,
        "sort_order": 102,
    },
    {
        "title": "Rodent Control in Bangalore",
        "slug": "rodent-control-bangalore",
        "category": "pest",
        "summary": "Rat removal and mouse control for homes, restaurants and warehouses across Bengaluru.",
        "content": (
            "TEB Enterprises delivers rat pest control Bangalore and rodent control Bangalore services including "
            "rat removal, mouse control, home rodent control, restaurant rodent control and warehouse rodent control.\n\n"
            "We map activity, place bait stations and traps, and advise on rodent-proofing to stop re-entry."
        ),
        "highlights": "Rat removal\nMouse control\nHome rodent control\nRestaurant rodent control\nWarehouse rodent control",
        "keywords": (
            "Rat control Bangalore, Rodent Pest Control Services in Bangalore, "
            "Rat control services in Bangalore, Rat pest control Bangalore, Rat control near me, "
            "Rodent control Bangalore, Rodent pest control near me, Mice control Bangalore, "
            "Mouse control near me, Rat removal Bangalore, Warehouse rodent control Bangalore, "
            "Restaurant rodent control Bangalore"
        ),
        "meta_title": "Rat Control Bangalore | Rodent Pest Control Services in Bangalore",
        "meta_description": (
            "Need rat control in Bangalore? TEB Pest Control provides professional rodent pest "
            "control services for homes, restaurants and warehouses. Book now"
        ),
        "faq_title": "Rodent control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What should I ask before arranging rat control Bangalore services?|"
            "Ask how the provider identifies signs of activity, finds likely entry points, and chooses appropriate control measures. Share where you have noticed rats so the inspection can focus on relevant areas.\n"
            "What do Rodent Pest Control Services in Bangalore typically assess?|"
            "A useful assessment looks for droppings, gnaw marks, possible access routes, and places where rodents may find food or shelter. Ask which findings informed the recommended plan and what you can address.\n"
            "How can I compare rat control services in Bangalore?|"
            "Compare how providers inspect the property, explain their proposed methods, and discuss steps that may reduce future activity. Ask what preparation is needed and how they recommend checking for continuing signs.\n"
            "What information helps with a rat pest control Bangalore visit?|"
            "Tell the provider where you have seen rats or signs such as droppings and gnawing. Mention recent changes around food storage or waste so the inspection can address possible attractants and access points.\n"
            "What should I check when searching for rat control near me?|"
            "Confirm that the provider serves your address and can describe its inspection process. Ask how it selects control measures, what access it needs, and how you should report signs after the visit.\n"
            "How does rodent control Bangalore planning start?|"
            "Planning starts with identifying the type and location of activity, then inspecting potential access points and food sources. A provider can explain which measures suit the property and what occupants should do next.\n"
            "How should I evaluate rodent pest control near me?|"
            "Look for a provider willing to discuss evidence of rodents, inspect likely access routes, and explain recommended measures. Clarify which areas need access and how you can monitor for signs afterward.\n"
            "What should I mention when requesting mice control Bangalore services?|"
            "Describe where you have noticed mice, droppings, or gnaw marks, including kitchens and storage areas if relevant. Ask the provider to check potential entry points and explain steps for limiting access to food.\n"
            "What questions should I ask about mouse control near me?|"
            "Ask whether the provider can inspect your property, explain its proposed approach, and identify conditions that may support mouse activity. Describe affected areas and request practical guidance for monitoring after treatment.\n"
            "What does rat removal Bangalore planning involve?|"
            "Discuss where activity has been reported and ask how the provider will inspect for entry points and shelter. Clarify the proposed removal approach, any preparation needed, and ways to check for further signs.\n"
            "What should warehouse rodent control Bangalore planning cover?|"
            "Identify affected storage zones, loading areas, and places where rodents could access food or shelter. Ask how the provider plans to inspect the site and what staff should monitor between visits.\n"
            "How should restaurant rodent control Bangalore plans address food areas?|"
            "Point out reported signs, food storage areas, waste handling locations, and possible access routes. Ask how inspections and control measures can be coordinated with staff while keeping food handling procedures in mind."
        ),
        "audience": "both",
        "show_in_grid": False,
        "is_featured": True,
        "sort_order": 103,
    },
    {
        "title": "Mosquito Control in Bangalore",
        "slug": "mosquito-control-bangalore",
        "category": "pest",
        "summary": "Mosquito fogging and treatment for apartments and commercial properties in Bengaluru.",
        "content": (
            "TEB Enterprises provides mosquito control Bangalore with mosquito fogging, mosquito treatment, "
            "apartment mosquito control and commercial mosquito control.\n\n"
            "We inspect larval sources, treat resting surfaces and recommend stagnant-water corrections for lasting results."
        ),
        "highlights": "Mosquito fogging\nMosquito treatment\nApartment mosquito control\nCommercial mosquito control",
        "keywords": (
            "Mosquito control Bangalore, Mosquito control near me, Mosquito fogging Bangalore, "
            "Mosquito management Bangalore, Fly control Bangalore, Ant control Bangalore, "
            "Lizard control Bangalore, Silverfish control Bangalore, Insect pest control Bangalore, "
            "General pest control Bangalore"
        ),
        "meta_title": "Mosquito Control in Bangalore | Fogging & Pest Control",
        "meta_description": (
            "Get professional mosquito control in Bangalore with effective fogging and pest management "
            "for mosquitoes, flies, ants, lizards, silverfish and other insects."
        ),
        "faq_title": "Mosquito & insect control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What should I discuss before arranging mosquito control Bangalore services?|"
            "Describe where mosquitoes are most noticeable and ask the provider to inspect possible breeding areas. Clarify which spaces need access, what preparation is required, and how to reduce standing water afterward.\n"
            "How can I evaluate mosquito control near me?|"
            "Confirm that the provider serves your address and can explain its inspection process. Ask how the proposed approach addresses your property, what you should prepare, and when to report continued mosquito activity.\n"
            "What should I ask about mosquito fogging Bangalore options?|"
            "Ask where fogging would be applied, what preparation occupants need, and when treated areas can be used again. Discuss possible breeding sites as well, so the plan addresses more than visible mosquitoes.\n"
            "How does mosquito management Bangalore planning differ from a single treatment?|"
            "A management plan can include inspection, attention to standing water, and monitoring after treatment. Ask the provider which steps fit your property and what residents can do between scheduled visits.\n"
            "What information helps with fly control Bangalore services?|"
            "Tell the provider where flies gather and whether activity is near food, waste, or drains. Ask for an inspection of likely sources and practical steps to help limit access and attraction.\n"
            "What should I mention when requesting ant control Bangalore services?|"
            "Point out where you see ant trails, including kitchens, windows, or outdoor edges if relevant. Ask the provider to identify likely entry points and explain preparation and monitoring after any treatment.\n"
            "How should I prepare for lizard control Bangalore services?|"
            "Describe where lizards appear and ask which rooms or exterior openings need inspection. Discuss ways to limit entry and clarify any preparation before the provider recommends a control approach for your property.\n"
            "What should I ask about silverfish control Bangalore services?|"
            "Explain where you have noticed silverfish, especially around stored paper, cupboards, or damp areas. Ask the provider to inspect relevant spaces and discuss conditions that may need attention alongside treatment.\n"
            "How do I compare insect pest control Bangalore options?|"
            "Start by identifying the insect or describing the signs you have seen. Ask each provider how it confirms the pest, selects a treatment, explains preparation, and recommends checking the results.\n"
            "What does general pest control Bangalore planning involve?|"
            "A general pest control visit should begin by identifying the pests and areas involved. Share recent sightings, then ask which spaces need inspection and how any recommended measures fit your property."
        ),
        "audience": "both",
        "show_in_grid": False,
        "is_featured": True,
        "sort_order": 104,
    },
    {
        "title": "Ant Control in Bangalore",
        "slug": "ant-control-bangalore",
        "category": "pest",
        "summary": "Kitchen, home and office ant pest control across Bengaluru.",
        "content": (
            "Looking for ant control Bangalore or ant pest control Bangalore? TEB Enterprises treats kitchen ant control, "
            "home ant control and office ant control with species-targeted baiting and entry-point corrections."
        ),
        "highlights": "Kitchen ant control\nHome ant control\nOffice ant control",
        "keywords": (
            "Ant control Bangalore, Ant pest control Bangalore, Ant control services Bangalore, "
            "Ant treatment Bangalore, Ant control near me, Ant pest control near me, "
            "Home ant control Bangalore, Black ant control Bangalore, "
            "Ant infestation treatment Bangalore, Professional ant control Bangalore"
        ),
        "meta_title": "Ant Control in Bangalore | Professional Ant Pest Control",
        "meta_description": (
            "Get professional ant control in Bangalore for homes, apartments, offices and commercial spaces. "
            "Effective treatment for black ants, red ants and other ant infestations."
        ),
        "faq_title": "Ant control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What should I observe before arranging ant control Bangalore services?|"
            "Note where ants appear, the times you see them, and any trails leading toward food or water. Share those observations so the provider can inspect relevant areas and discuss a suitable approach.\n"
            "How is an ant pest control Bangalore visit planned?|"
            "Planning should begin with an inspection of the areas where ants have been active. Ask how the provider identifies likely entry points, chooses a treatment approach, and explains any preparation needed.\n"
            "What should I compare among ant control services Bangalore providers?|"
            "Compare how providers assess the affected rooms, explain proposed methods, and describe steps for monitoring activity afterward. Ask what the visit covers and whether any additional inspection might be recommended.\n"
            "What should I ask before ant treatment Bangalore work begins?|"
            "Ask which surfaces or rooms need preparation and whether food, utensils, or pets should be moved. The provider should explain the proposed treatment and when you can use affected spaces again.\n"
            "How do I assess ant control near me options?|"
            "Check whether the provider serves your address and can inspect the places where ants appear. Describe the activity, then ask about available appointments, preparation, and what to watch for afterward.\n"
            "What details help when requesting ant pest control near me?|"
            "Tell the provider whether ants are entering through windows, walls, or other visible routes, if known. Mention where trails lead and ask how those observations will guide the inspection and proposed measures.\n"
            "How can I prepare for home ant control Bangalore services?|"
            "Keep a record of affected rooms and visible trails before the visit. Ask the provider whether cupboards or appliances need access, and follow its instructions for handling food and household items.\n"
            "What should I mention about black ant control Bangalore concerns?|"
            "Describe the ants you see, their approximate size, and where they gather, but avoid assuming their exact species. A provider can inspect the activity and recommend measures based on what it finds.\n"
            "When should I seek ant infestation treatment Bangalore advice?|"
            "If ant activity keeps appearing across rooms or near stored food, describe the pattern to a provider. Ask for an inspection and guidance on addressing access routes and conditions attracting ants.\n"
            "What should professional ant control Bangalore planning include?|"
            "A proposed plan should explain where activity was found, which areas need attention, and what residents should prepare. Ask how the provider will assess results and what to report if ants remain."
        ),
        "audience": "both",
        "show_in_grid": False,
        "is_featured": True,
        "sort_order": 105,
    },
    # ---- Phase 2 ----
    {
        "title": "Residential Pest Control in Bangalore",
        "slug": "residential-pest-control-bangalore",
        "category": "residential",
        "summary": "Home, apartment and flat pest control across Bengaluru.",
        "content": (
            "TEB Enterprises specialises in home pest control Bangalore, apartment pest control Bangalore and flat pest control Bangalore. "
            "From cockroaches and termites to bedbugs, rodents and mosquitoes — we build a plan around your home and occupancy."
        ),
        "highlights": "Home pest control Bangalore\nApartment pest control Bangalore\nFlat pest control Bangalore\nVillas & gated communities",
        "keywords": (
            "Home pest control Bangalore, Flat pest control Bangalore, Villa pest control Bangalore, "
            "Apartment pest control Bangalore, Kitchen pest control Bangalore, Residential pest control Bangalore, "
            "Pest control for flats Bangalore, Pest control for villas Bangalore, "
            "Pest control for apartments Bangalore, Pest control for homes near me"
        ),
        "meta_title": "Home Pest Control in Bangalore | Residential Pest Control",
        "meta_description": (
            "Get reliable home pest control in Bangalore for flats, apartments and villas. "
            "Professional residential pest control solutions for kitchens and complete homes."
        ),
        "faq_title": "Residential pest control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What should I discuss before booking home pest control Bangalore services?|"
            "Describe the pests you have seen, where they appear, and whether children or pets use the affected spaces. Ask what preparation is needed and when treated rooms can be used again.\n"
            "How can residents prepare for flat pest control Bangalore visits?|"
            "Note which rooms show activity and tell the provider about shared walls or service ducts that may need attention. Ask what to move, which spaces need access, and how to monitor afterward.\n"
            "What should homeowners ask about villa pest control Bangalore options?|"
            "Mention activity both indoors and around the property, including gardens or storage areas if relevant. Ask how the provider plans to inspect entry points and tailor measures to the areas affected.\n"
            "How should residents plan apartment pest control Bangalore work?|"
            "Identify affected rooms and ask whether adjoining spaces or common areas warrant inspection. Coordinate any needed access with building management, and clarify preparation instructions before the provider begins work in your apartment.\n"
            "What information helps with kitchen pest control Bangalore services?|"
            "Point out sightings near cupboards, sinks, appliances, food storage, or waste. Ask the provider which areas require access, how to protect food and utensils, and when normal kitchen use can resume.\n"
            "How do I compare residential pest control Bangalore providers?|"
            "Explain the pest problem and ask how each provider confirms the species and selects a response. Compare their preparation instructions, proposed follow-up, and explanations of what residents should watch for afterward.\n"
            "What should tenants ask about pest control for flats Bangalore services?|"
            "Tell the provider where signs have appeared and whether access to shared areas requires coordination. Ask which rooms need inspection, what preparations are necessary, and whether the landlord should be informed.\n"
            "How can owners plan pest control for villas Bangalore properties?|"
            "List sightings by area, including outdoor spaces, garages, or unused rooms where relevant. Ask how the provider will inspect the property, identify likely access points, and explain any recommended prevention steps.\n"
            "What should building managers know about pest control for apartments Bangalore?|"
            "Collect reports from affected units and shared spaces before arranging an inspection. Ask which areas need coordinated access, how residents should prepare, and how to communicate observations after the scheduled treatment.\n"
            "What should I check when searching for pest control for homes near me?|"
            "Confirm that the provider serves your address and handles the pest you have identified. Ask about its inspection process, preparation requirements, proposed approach, and how you can report continuing signs."
        ),
        "audience": "b2c",
        "show_in_grid": False,
        "is_featured": True,
        "sort_order": 200,
    },
    {
        "title": "Commercial Pest Control in Bangalore",
        "slug": "commercial-pest-control-bangalore",
        "category": "commercial",
        "summary": "Office, restaurant, hotel and warehouse pest management across Bengaluru.",
        "content": (
            "TEB Enterprises provides commercial pest control Bangalore for offices, restaurants, hotels and warehouses. "
            "Programmes include inspection, scheduled service, monitoring and audit documentation."
        ),
        "highlights": "Commercial pest control Bangalore\nOffice pest control Bangalore\nRestaurant pest control Bangalore\nHotel pest control Bangalore\nWarehouse pest control Bangalore",
        "keywords": (
            "Commercial pest control Bangalore, Hotel pest control Bangalore, Restaurant pest control Bangalore, "
            "Hospital pest control Bangalore, School pest control Bangalore, Factory pest control Bangalore, "
            "Warehouse pest control Bangalore, IT park pest control Bangalore, "
            "Food industry pest control Bangalore, Retail store pest control Bangalore"
        ),
        "meta_title": "Commercial Pest Control in Bangalore | TEB Pest Control",
        "meta_description": (
            "Professional commercial pest control in Bangalore for hotels, restaurants, hospitals, schools, "
            "factories, warehouses, IT parks, food industries and retail stores."
        ),
        "faq_title": "Commercial pest control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What should a business ask about commercial pest control Bangalore services?|"
            "Share the property's layout, reported pest activity, and operating hours. Ask how the provider inspects affected areas, explains its proposed measures, and coordinates access without assuming the same approach suits every space.\n"
            "How should hotels plan hotel pest control Bangalore visits?|"
            "Hotels can identify rooms or shared spaces with reported activity and explain occupancy patterns to the provider. Ask which areas need inspection, how staff should prepare, and when follow-up checks are appropriate.\n"
            "What matters when arranging restaurant pest control Bangalore services?|"
            "Describe signs of pests around kitchens, storage, dining areas, and waste handling. Ask how inspections and any proposed measures fit the restaurant's operations, including guidance for staff before and after a visit.\n"
            "What should hospitals clarify about hospital pest control Bangalore services?|"
            "Explain which areas have reported activity and any access constraints that affect inspection. Ask how the provider proposes to coordinate with facility staff and what preparation is needed for each affected space.\n"
            "How can schools prepare for school pest control Bangalore work?|"
            "Record where pests have been observed and share the school's schedule and access needs. Ask which areas require inspection, what preparation staff should complete, and when spaces may be used again.\n"
            "What should factories discuss when planning factory pest control Bangalore services?|"
            "Identify affected production, storage, and staff areas, along with any access restrictions. Ask how the provider will inspect the site, explain proposed measures, and coordinate work around the facility's operating schedule.\n"
            "How should warehouses approach warehouse pest control Bangalore planning?|"
            "Map reported activity around storage zones, loading bays, and waste areas. Ask how the provider will inspect entry points, work around stored goods, and recommend practical monitoring steps for warehouse staff.\n"
            "What information helps with IT park pest control Bangalore planning?|"
            "Share which buildings or common areas have reported pests and identify any restricted spaces. Ask how inspections will be coordinated with site management and what occupants should know before work begins.\n"
            "What should food businesses ask about food industry pest control Bangalore services?|"
            "Explain the facility's food handling areas, storage conditions, and reported pest signs. Ask how the provider will inspect relevant spaces and coordinate proposed measures with staff responsible for daily operations.\n"
            "How can shops prepare for retail store pest control Bangalore visits?|"
            "Note sightings in sales areas, stockrooms, or delivery spaces and explain the store's opening hours. Ask which areas need access, how merchandise should be handled, and how to monitor activity afterward."
        ),
        "audience": "b2b",
        "show_in_grid": False,
        "is_featured": True,
        "sort_order": 201,
    },
    # ---- Phase 3 AMC ----
    {
        "title": "Pest Control AMC in Bangalore",
        "slug": "pest-control-amc-bangalore",
        "category": "amc",
        "summary": "Annual pest control contracts with scheduled visits and monitoring across Bengaluru.",
        "content": (
            "TEB Enterprises offers pest control AMC Bangalore and annual pest control contract Bangalore programmes "
            "for homes and businesses. Choose weekly, fortnightly, monthly or quarterly service with documentation and priority support."
        ),
        "highlights": "Pest control AMC Bangalore\nAnnual pest control contract Bangalore\nScheduled preventive visits\nMonitoring & documentation\nEmergency call-out support",
        "keywords": (
            "Pest control AMC Bangalore, Pest control annual contract Bangalore, "
            "Pest control AMC company Bangalore, Apartment pest control AMC Bangalore, "
            "Hotel pest control AMC Bangalore, Restaurant pest control AMC Bangalore, "
            "Factory pest control AMC Bangalore, Hospital pest control AMC Bangalore, "
            "Villa pest control AMC Bangalore, Commercial pest control AMC Bangalore"
        ),
        "meta_title": "Pest control AMC Bangalore: Explore Year-Round Protection",
        "meta_description": (
            "Pest control AMC Bangalore helps keep pests at bay. Explore scheduled treatments, "
            "ongoing support, and plans suited to your property. Find your plan today."
        ),
        "audience": "both",
        "show_in_grid": False,
        "is_featured": True,
        "sort_order": 300,
    },
]

# Location pages
_LOCATIONS = [
    ("Whitefield", "whitefield"),
    ("Marathahalli", "marathahalli"),
    ("Sarjapur Road", "sarjapur-road"),
    ("Bellandur", "bellandur"),
    ("Brookefield", "brookefield"),
    ("Hoodi", "hoodi"),
    ("KR Puram", "kr-puram"),
    ("Electronic City", "electronic-city"),
    ("HSR Layout", "hsr-layout"),
]

for i, (name, slug_part) in enumerate(_LOCATIONS):
    SEED_SERVICES.append(
        {
            "title": f"Pest Control in {name}",
            "slug": f"pest-control-{slug_part}",
            "category": "location",
            "summary": f"Professional pest control services in {name}, Bangalore for homes and businesses.",
            "content": (
                f"TEB Enterprises provides pest control in {name}, Bangalore for homes, apartments, offices and commercial sites. "
                f"Services include cockroach control, termite treatment, bed bug treatment, rodent control, mosquito management and ant control.\n\n"
                f"Serving {name} and nearby areas with inspection-based treatment. Call for a free site inspection."
            ),
            "highlights": f"Pest control {name}\nCockroach & termite control\nRodent & mosquito management\nResidential & commercial",
            "keywords": f"pest control {name}, pest control near {name} Bangalore",
            "meta_title": f"Pest Control {name} Bangalore | TEB Enterprises",
            "meta_description": f"Pest control in {name}, Bangalore for homes and businesses by TEB Enterprises.",
            "audience": "both",
            "show_in_grid": False,
            "is_featured": True,
            "sort_order": 400 + i,
        }
    )

# Curated SEO overrides — location pages
_LOCATION_SEO = {
    "pest-control-whitefield": {
        "keywords": (
            "Pest control Whitefield, Pest control services Whitefield, Best pest control Whitefield, "
            "Pest control company Whitefield, Cockroach control Whitefield, Bed bug control Whitefield, "
            "Rat control Whitefield, Termite control Whitefield, Mosquito control Whitefield, "
            "Home pest control Whitefield"
        ),
        "meta_title": "Pest control Whitefield: Book Treatment for a Calmer Home",
        "meta_description": (
            "Pest control Whitefield helps you tackle common pest issues at home or work. "
            "Explore treatment options, understand what is covered, and book a visit today."
        ),
        "faq_title": "Whitefield pest control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What does Pest control Whitefield typically involve?|"
            "An initial inspection helps identify the pest, likely entry points, and conditions that support activity. Treatment options vary by infestation, while follow-up steps may include sealing gaps and improving sanitation to reduce recurrence.\n"
            "What can Pest control services Whitefield help address?|"
            "These services may address common household pests through inspection, targeted treatment, and practical prevention advice. The appropriate method depends on the pest species, the extent of activity, and the areas affected in the property.\n"
            "How can I choose the Best pest control Whitefield option?|"
            "Compare providers by asking how they identify pests, explain treatment choices, and handle follow-up visits. Clear instructions, transparent estimates, and an approach suited to your property can help you make an informed decision.\n"
            "What should I ask a Pest control company Whitefield before treatment?|"
            "Ask which pest was identified, where treatment will be applied, and what preparation is needed. Request guidance on ventilation, reentry, cleaning, and follow-up so you understand the process before work begins.\n"
            "How does Cockroach control Whitefield usually work?|"
            "Control often starts by locating hiding spots, moisture sources, and food access. A plan may combine targeted products with cleaning and gap sealing; ongoing monitoring helps show whether activity is declining over time.\n"
            "What should I expect from Bed bug control Whitefield?|"
            "An inspection can confirm where bed bugs are present and guide a suitable treatment plan. Follow preparation instructions carefully, and expect monitoring afterward because hidden insects or eggs may require additional attention.\n"
            "What does Rat control Whitefield involve?|"
            "Effective control includes finding signs of activity, identifying access routes, and removing food sources. Traps or other suitable measures may be used, while sealing entry points helps limit future access to the building.\n"
            "How is Termite control Whitefield planned?|"
            "A termite inspection helps locate activity and assess affected materials before treatment is selected. Depending on the situation, a professional may recommend barriers, baiting, or localized treatment, along with monitoring for renewed activity.\n"
            "What can Mosquito control Whitefield include?|"
            "Reducing standing water can limit breeding sites around a property. Additional measures may target resting areas or larvae, depending on conditions. Regular checks after rain help identify containers and drains that need attention.\n"
            "When is Home pest control Whitefield useful?|"
            "Consider an inspection when you notice droppings, damage, unusual odors, or recurring insect activity. Identifying the pest early helps determine whether simple prevention steps are enough or a targeted treatment is appropriate."
        ),
    },
    "pest-control-marathahalli": {
        "keywords": (
            "Pest control Marathahalli, Pest control services Marathahalli, Best pest control Marathahalli, "
            "Pest control company Marathahalli, Cockroach control Marathahalli, Bed bug control Marathahalli, "
            "Rat control Marathahalli, Termite control Marathahalli, Mosquito control Marathahalli, "
            "Home pest control Marathahalli"
        ),
        "meta_title": "Pest control Marathahalli: Book Care for a Healthier Home",
        "meta_description": (
            "Pest control Marathahalli for homes and offices. Compare available treatments for common pests, "
            "learn what a visit includes, and schedule your visit today."
        ),
        "faq_title": "Marathahalli pest control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What should I know about Pest control Marathahalli?|"
            "Pest treatment begins with identifying the species and checking where it enters or shelters. A suitable plan may address current activity, while practical steps such as removing food and moisture help discourage its return.\n"
            "What is included in Pest control services Marathahalli?|"
            "Services generally start with an assessment of visible activity and conditions that attract pests. Depending on the findings, recommendations may cover treatment, preparation, monitoring, and changes that make the space less inviting to pests.\n"
            "How do I evaluate the Best pest control Marathahalli option?|"
            "Ask prospective providers how they inspect, select treatments, explain safety instructions, and assess results. Compare the clarity of their recommendations and written scope so you can choose an approach suited to your specific pest issue.\n"
            "What should a Pest control company Marathahalli explain before work starts?|"
            "The provider should explain what pest was found, where work is proposed, and how to prepare the area. Ask about product use, access restrictions, cleaning instructions, and the signs that warrant further assessment.\n"
            "How can Cockroach control Marathahalli address an infestation?|"
            "Inspection helps locate hiding places and identify water or food sources. Treatment may focus on active areas, while cleaning spills, storing food securely, and closing small gaps can make ongoing control more effective.\n"
            "What happens during Bed bug control Marathahalli?|"
            "An inspection identifies likely hiding spots around beds, furniture, and nearby belongings. Follow the recommended preparation steps and treatment instructions carefully; subsequent checks help determine whether any remaining activity needs further treatment.\n"
            "How does Rat control Marathahalli help protect a property?|"
            "A control plan looks for droppings, gnaw marks, and routes into the building. Removing accessible food, setting appropriate traps, and closing confirmed entry points can reduce activity and help prevent new rodents from entering.\n"
            "What does Termite control Marathahalli depend on?|"
            "The approach depends on where termites are active, how far they have spread, and which materials are affected. An inspection guides treatment selection, while later monitoring can reveal whether additional action is necessary.\n"
            "How can Mosquito control Marathahalli reduce activity outdoors?|"
            "Emptying or covering containers that collect rainwater helps remove potential breeding sites. Depending on the property, further measures may address larvae or resting areas; routine checks keep overlooked water sources from accumulating.\n"
            "When should I consider Home pest control Marathahalli?|"
            "Consider help when you repeatedly see insects, droppings, damaged materials, or other signs of pest activity. Identifying the cause early can guide suitable treatment and practical changes that lower the chance of recurrence."
        ),
    },
    "pest-control-sarjapur-road": {
        "keywords": (
            "Pest control Sarjapur Road, Pest control services Sarjapur Road, Best pest control Sarjapur Road, "
            "Pest control company Sarjapur Road, Cockroach control Sarjapur Road, Bed bug control Sarjapur Road, "
            "Rat control Sarjapur Road, Termite control Sarjapur Road, Mosquito control Sarjapur Road, "
            "Home pest control Sarjapur Road"
        ),
        "meta_title": "Pest control Sarjapur Road: Find Help for a Calmer Home",
        "meta_description": (
            "Pest control Sarjapur Road can help address ants, cockroaches, and other household pests. "
            "Explore your treatment options and book a convenient visit today."
        ),
        "faq_title": "Sarjapur Road pest control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "When might Pest control Sarjapur Road be helpful?|"
            "Visible insects, droppings, damaged materials, or repeated sightings can signal a pest problem. An inspection helps identify the cause and determine suitable treatment, while addressing food, water, and entry points can reduce future activity.\n"
            "What does Pest control services Sarjapur Road typically cover?|"
            "A visit may include inspecting affected rooms, identifying the pest, and recommending a targeted response. Preparation and follow-up advice depend on the findings, because different species require different methods and levels of monitoring.\n"
            "How should I assess the Best pest control Sarjapur Road option?|"
            "Look for a clear explanation of the inspection findings, proposed treatment, preparation steps, and follow-up. Comparing written scopes and asking how results are checked can help you select a provider for your needs.\n"
            "What questions should I ask a Pest control company Sarjapur Road?|"
            "Ask which pest is present, what areas need attention, and why a particular method is recommended. Clarify any preparation, cleaning, and access instructions, along with when the treated areas should be reassessed.\n"
            "How is Cockroach control Sarjapur Road approached?|"
            "Control usually focuses on places where cockroaches hide and find food or moisture. Inspecting kitchens and nearby gaps can guide treatment; secure food storage and prompt cleaning help limit conditions that support them.\n"
            "Why might Bed bug control Sarjapur Road require follow-up?|"
            "Bed bugs can shelter in narrow seams and other hard-to-see spaces, making careful inspection important. Follow-up checks help identify remaining activity after treatment and determine whether the plan needs adjustment in affected rooms.\n"
            "What does Rat control Sarjapur Road involve?|"
            "The first steps are identifying signs of rodents and finding how they enter the property. A plan may use appropriate traps, protect food supplies, and close access points once their locations are confirmed.\n"
            "How is Termite control Sarjapur Road tailored to a property?|"
            "An inspection establishes where termite activity appears and what materials may be affected. Those findings help determine whether localized treatment, a barrier, or baiting is appropriate, followed by monitoring for signs of continuing activity.\n"
            "What can Mosquito control Sarjapur Road address?|"
            "It can focus on standing water where mosquitoes breed and sheltered places where adults rest. Removing water from containers, maintaining drains, and checking the property regularly can support other measures chosen for the site.\n"
            "How can Home pest control Sarjapur Road fit into household maintenance?|"
            "Regular checks for leaks, gaps, food scraps, and new pest signs can reveal problems early. When activity persists, an inspection can identify the species and guide treatment suited to the affected areas."
        ),
    },
    "pest-control-bellandur": {
        "keywords": (
            "Pest control Bellandur, Pest control services Bellandur, Best pest control Bellandur, "
            "Pest control company Bellandur, Cockroach control Bellandur, Bed bug control Bellandur, "
            "Rat control Bellandur, Termite control Bellandur, Mosquito control Bellandur, "
            "Home pest control Bellandur"
        ),
        "meta_title": "Pest control Bellandur: Find the Right Care for Your Home",
        "meta_description": (
            "Pest control Bellandur for homes and workplaces. Explore treatment options for common pests, "
            "understand the process, and book a visit that fits your day."
        ),
        "faq_title": "Bellandur pest control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What can Pest control Bellandur help with?|"
            "Pest control can help identify insects or rodents causing trouble and address the conditions that support them. An inspection guides the response, while repairs, cleaning, and monitoring help reduce the likelihood of repeated activity.\n"
            "How do Pest control services Bellandur begin?|"
            "They usually begin with a discussion of sightings and an inspection of affected spaces. The findings guide recommendations for preparation, treatment, and prevention, with follow-up based on the pest and observed activity.\n"
            "How can I compare Best pest control Bellandur choices?|"
            "Request an explanation of what was found, which areas need work, and how success will be assessed. Compare proposed methods and written details, then choose the option that addresses your particular infestation and concerns.\n"
            "What should I discuss with a Pest control company Bellandur?|"
            "Describe where and when you notice activity, then ask what evidence confirms the pest involved. Discuss treatment locations, preparation, safe access afterward, and any maintenance steps recommended to help prevent another infestation.\n"
            "What does Cockroach control Bellandur focus on?|"
            "It focuses on finding shelter, food, and water that sustain cockroaches. Targeted treatment may address hiding areas, while fixing leaks, removing crumbs, and storing food properly help make the environment less favorable.\n"
            "How should I prepare for Bed bug control Bellandur?|"
            "Preparation depends on the treatment plan, so follow the instructions provided after inspection. You may need to make sleeping areas accessible and handle belongings carefully to avoid spreading bed bugs to other rooms.\n"
            "Why is inspection important for Rat control Bellandur?|"
            "An inspection helps locate entry holes, travel routes, and signs of feeding before control begins. Knowing where rodents move supports appropriate trap placement and helps identify repairs needed to block further access.\n"
            "What might Termite control Bellandur involve?|"
            "It may involve examining damaged wood and other signs to determine where termites are active. The treatment approach depends on inspection findings, and continued checks can help detect activity that remains or returns.\n"
            "How does Mosquito control Bellandur address breeding areas?|"
            "Control starts by locating water that remains long enough for mosquito larvae to develop. Emptying containers and maintaining drainage reduce breeding opportunities; other measures can be considered when inspection finds persistent problem areas.\n"
            "What are practical steps for Home pest control Bellandur?|"
            "Keep food sealed, clean spills promptly, repair leaks, and check openings around doors or pipes. If pest signs continue, an inspection can identify the source and clarify which treatment, if any, is suitable."
        ),
    },
    "pest-control-brookefield": {
        "keywords": (
            "Pest control Brookefield, Pest control services Brookefield, Best pest control Brookefield, "
            "Pest control company Brookefield, Cockroach control Brookefield, Bed bug control Brookefield, "
            "Rat control Brookefield, Termite control Brookefield, Mosquito control Brookefield, "
            "Home pest control Brookefield"
        ),
        "meta_title": "Pest Control Brookefield | Reliable and Affordable Service",
        "meta_description": (
            "Looking for pest control Brookefield? Get reliable pest control services for cockroaches, "
            "termites, ants, rodents and other pests in Brookefield, Bengaluru."
        ),
        "faq_title": "Brookefield pest control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What does Pest control Brookefield include?|"
            "Pest control Brookefield includes professional inspection and treatment to identify and manage common pests in residential and commercial properties.\n"
            "What are included in pest control services Brookefield?|"
            "Pest control services Brookefield may include inspection, targeted treatment, pest prevention, and follow-up support based on the type and level of infestation.\n"
            "How can I choose the Best pest control Brookefield?|"
            "When choosing the Best pest control Brookefield, consider service quality, treatment methods, experience, customer feedback, and the type of pests covered.\n"
            "How do I select a Pest control company Brookefield?|"
            "Choose a Pest control company Brookefield that clearly explains its treatment process, provides suitable solutions, and follows safe pest management practices.\n"
            "Can I get Cockroach control Brookefield for my home?|"
            "Yes, Cockroach control Brookefield can help treat cockroach infestations in kitchens, bathrooms, living areas, offices, restaurants, and other properties.\n"
            "When should I arrange Bed bug control Brookefield?|"
            "Bed bug control Brookefield may be required when you notice bed bugs, small stains, shed skins, or other signs of activity around beds and furniture.\n"
            "What signs indicate that I need Rat control Brookefield?|"
            "Signs such as droppings, gnaw marks, damaged food packaging, scratching sounds, or nesting materials may indicate the need for Rat control Brookefield.\n"
            "Why should property owners consider Termite control Brookefield?|"
            "Termite control Brookefield can help protect wooden furniture, doors, flooring, and other property structures from damage caused by termite activity.\n"
            "Does Mosquito control Brookefield help reduce mosquito activity?|"
            "Yes, Mosquito control Brookefield can target mosquito activity and potential breeding areas around the property to help reduce their presence.\n"
            "Is Home pest control Brookefield suitable for regular household pest problems?|"
            "Yes, Home pest control Brookefield can be used to address common household pests and support ongoing prevention based on the property's needs."
        ),
    },
    "pest-control-hoodi": {
        "keywords": (
            "Pest control Hoodi, Pest control services Hoodi, Best pest control Hoodi, "
            "Pest control company Hoodi, Cockroach control Hoodi, Bed bug control Hoodi, "
            "Rat control Hoodi, Termite control Hoodi, Mosquito control Hoodi, "
            "Home pest control Hoodi"
        ),
        "meta_title": "Pest Control Hoodi | Safe & Effective Pest Control Services",
        "meta_description": (
            "Looking for pest control in Hoodi? Get reliable pest control services for cockroaches, "
            "bed bugs, termites, rats, mosquitoes & common pests in homes & offices."
        ),
        "faq_title": "Hoodi pest control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What does pest control in Hoodi include?|"
            "Pest control Hoodi covers treatments for common household and commercial pests. Professional services can help identify the pest problem, recommend the right treatment, and apply suitable control methods.\n"
            "How can I find reliable pest control services in Hoodi?|"
            "Pest control services Hoodi are available for homes, offices, apartments, shops, and other properties. Before booking, check the type of pests treated, service process, pricing, and customer reviews.\n"
            "How do I choose the best pest control Hoodi service?|"
            "When looking for the Best pest control Hoodi, compare experience, treatment methods, service coverage, safety practices, and customer feedback rather than choosing only on price.\n"
            "What should I check before hiring a pest control company Hoodi?|"
            "A Pest control company Hoodi should clearly explain the pest problem, treatment procedure, expected results, preparation requirements, and any follow-up service before starting the work.\n"
            "Can I get cockroach control Hoodi for my home?|"
            "Yes, Cockroach control Hoodi can be arranged for kitchens, bathrooms, apartments, offices, and other areas where cockroach activity is found. The treatment depends on the severity and location of the infestation.\n"
            "Is bed bug control Hoodi available for bedrooms and apartments?|"
            "Yes, Bed bug control Hoodi is used to address bed bug infestations in bedrooms, mattresses, furniture, and other affected areas. Proper inspection and treatment of hiding places are important for effective control.\n"
            "Do pest control services cover rat problems?|"
            "Yes, Rat control Hoodi can help manage rat activity in residential and commercial properties. A professional inspection can identify possible entry points and areas where rats are active.\n"
            "Can termite problems be treated professionally?|"
            "Yes, Termite control Hoodi is available for properties affected by termites. Treatment may focus on affected areas and potential entry points, depending on the type and extent of the infestation.\n"
            "Is mosquito treatment available for residential properties?|"
            "Yes, Mosquito control Hoodi can help reduce mosquito activity around homes and other properties. Treatment generally focuses on areas where mosquitoes breed, rest, or enter the property.\n"
            "Is home pest control Hoodi suitable for regular pest problems?|"
            "Yes, Home pest control Hoodi can be used for common household pest issues such as cockroaches, ants, mosquitoes, rodents, and other unwanted pests. The appropriate treatment depends on the pest and infestation level."
        ),
    },
    "pest-control-kr-puram": {
        "keywords": (
            "Pest control KR Puram, Pest control services KR Puram, Best pest control KR Puram, "
            "Pest control company KR Puram, Cockroach control KR Puram, Bed bug control KR Puram, "
            "Rat control KR Puram, Termite control KR Puram, Mosquito control KR Puram, "
            "Home pest control KR Puram"
        ),
        "meta_title": "Pest Control KR Puram, Bangalore | Safe & Affordable Service",
        "meta_description": (
            "Looking for pest control KR Puram? Get safe and reliable pest control services in "
            "KR Puram, Bangalore for cockroaches, termites, bed bugs, rats and more"
        ),
        "faq_title": "KR Puram pest control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What does pest control KR Puram include?|"
            "Pest control KR Puram includes professional treatment for common household and commercial pests. The service may involve pest inspection, treatment, prevention, and follow-up recommendations based on the infestation.\n"
            "What do pest control services KR Puram usually cover?|"
            "Pest control services KR Puram can cover common pests such as cockroaches, bed bugs, rats, termites, mosquitoes, ants, and other unwanted insects or rodents, depending on the service provider.\n"
            "How can I choose the best pest control KR Puram service?|"
            "When choosing the best pest control KR Puram service, consider the type of pest treatment offered, service experience, treatment methods, pricing, customer reviews, and after-service support.\n"
            "How does a pest control company KR Puram treat infestations?|"
            "A pest control company KR Puram generally starts by identifying the pest and checking the affected areas. The professionals then select a suitable treatment method and provide instructions for keeping the property protected.\n"
            "How is cockroach control KR Puram carried out?|"
            "Cockroach control KR Puram may include inspection, targeted treatment, baiting, and preventive measures. The exact method depends on the level of infestation and the areas where cockroaches are active.\n"
            "Is bed bug control KR Puram suitable for homes?|"
            "Yes, bed bug control KR Puram is commonly used for bedrooms, mattresses, furniture, and other areas where bed bugs may hide. Professional treatment can help identify affected areas and manage an infestation.\n"
            "What is included in rat control KR Puram?|"
            "Rat control KR Puram may include identifying entry points, locating signs of rodent activity, using suitable control methods, and suggesting ways to prevent rats from returning to the property.\n"
            "Why is termite control KR Puram important for properties?|"
            "Termite control KR Puram can help address termite activity that may affect wooden furniture, doors, flooring, walls, and other parts of a property. Early inspection can help identify signs of an infestation.\n"
            "When should I book mosquito control KR Puram?|"
            "Mosquito control KR Puram can be considered when mosquitoes are frequently found around homes, offices, gardens, or other areas. Treatment may also include recommendations to reduce standing water and other breeding sources.\n"
            "What are the benefits of home pest control KR Puram?|"
            "Home pest control KR Puram can help manage common pests inside and around residential properties. Professional inspection and treatment can make it easier to identify pest problems and take suitable preventive measures."
        ),
    },
    "pest-control-electronic-city": {
        "keywords": (
            "Pest Control in Electronic City, pest control services Electronic City, "
            "best pest control Electronic City, pest control company Electronic City, "
            "termite control Electronic City, mosquito control Electronic City, "
            "pest control near Electronic City, cockroach pest control Electronic City, "
            "termite treatment Electronic City, home pest control Electronic City"
        ),
        "meta_title": "Pest Control in Electronic City | Expert & Safe Services",
        "meta_description": (
            "Get reliable pest control in Electronic City for cockroaches, bed bugs, termites, "
            "rats and mosquitoes. Professional treatment for homes and businesses."
        ),
        "faq_title": "Electronic City pest control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What does Pest Control in Electronic City include?|"
            "Pest Control in Electronic City can cover common household and commercial pests such as cockroaches, termites, mosquitoes, ants, rodents, and other unwanted insects.\n"
            "What pest control services Electronic City providers usually offer?|"
            "Most pest control services Electronic City companies offer treatments for cockroaches, termites, mosquitoes, ants, bed bugs, rodents, and other common pests based on the infestation.\n"
            "How can I find the best pest control Electronic City service?|"
            "When choosing the best pest control Electronic City service, check the treatment methods, experience, service coverage, customer reviews, and whether follow-up support is available.\n"
            "How do I choose a pest control company Electronic City residents can rely on?|"
            "A reliable pest control company Electronic City customers choose should clearly explain the treatment process, expected results, safety precautions, pricing, and service warranty if offered.\n"
            "Is termite control Electronic City suitable for existing termite infestations?|"
            "Yes, termite control Electronic City treatments can be used to target active termite infestations in homes, offices, apartments, and other properties.\n"
            "How does mosquito control Electronic City treatment work?|"
            "Mosquito control Electronic City services generally identify mosquito breeding areas and apply suitable treatments to reduce mosquito activity around the property.\n"
            "How can I find pest control near Electronic City?|"
            "You can search for pest control near Electronic City and compare local providers based on their service areas, treatment options, customer feedback, and response time.\n"
            "When should I book cockroach pest control Electronic City treatment?|"
            "You should consider cockroach pest control Electronic City treatment when you notice frequent cockroach activity, droppings, eggs, or cockroaches appearing in kitchens, bathrooms, or other areas.\n"
            "How long does termite treatment Electronic City usually take?|"
            "The duration of termite treatment Electronic City depends on the size of the property, the level of infestation, and the treatment method selected by the pest control professional.\n"
            "Is home pest control Electronic City safe for families and pets?|"
            "Home pest control Electronic City treatments can be carried out with appropriate safety measures. Ask the service provider about the products used, preparation instructions, ventilation, and recommended waiting time."
        ),
    },
    "pest-control-hsr-layout": {
        "keywords": (
            "Pest Control in HSR Layout, Pest control services HSR Layout, "
            "Pest control company HSR Layout, Best pest control HSR Layout, "
            "Cockroach control HSR Layout, Termite control HSR Layout, "
            "Home pest control HSR Layout, Mosquito control HSR Layout, "
            "Bed bug control HSR Layout, Office pest control HSR Layout"
        ),
        "meta_title": "Pest Control in HSR Layout | Fast & Reliable Pest Control",
        "meta_description": (
            "Get reliable pest control in HSR Layout for cockroaches, termites, bed bugs, "
            "rodents and mosquitoes. Safe, effective treatment for homes and offices"
        ),
        "faq_title": "HSR Layout pest control FAQs",
        "faq_eyebrow": "Common questions",
        "faq_items": (
            "What does Pest Control in HSR Layout include?|"
            "Pest Control in HSR Layout can include inspection, pest identification, treatment, and follow-up services for common household and commercial pest problems. The exact treatment depends on the type and severity of the infestation.\n"
            "What Pest control services HSR Layout are available for homes?|"
            "Pest control services HSR Layout can cover common problems such as cockroaches, termites, mosquitoes, ants, rodents, and bed bugs. The treatment is selected according to the pest type and the affected area.\n"
            "How can I choose a Pest control company HSR Layout?|"
            "When choosing a Pest control company HSR Layout, check its experience, treatment methods, service coverage, customer reviews, pricing, and whether it provides follow-up support after treatment.\n"
            "Which is the Best pest control HSR Layout option for a serious infestation?|"
            "The Best pest control HSR Layout service depends on the pest involved, the size of the affected property, and the level of infestation. A proper inspection can help determine the most suitable treatment.\n"
            "How does Cockroach control HSR Layout work?|"
            "Cockroach control HSR Layout generally involves inspecting areas where cockroaches hide or enter, followed by targeted treatment. Keeping food areas clean and reducing moisture can also help prevent future infestations.\n"
            "When should I consider Termite control HSR Layout?|"
            "Termite control HSR Layout may be needed when you notice damaged wood, mud tubes, hollow-sounding wooden surfaces, or other signs of termite activity. Early treatment can help limit further property damage.\n"
            "What is included in Home pest control HSR Layout?|"
            "Home pest control HSR Layout can cover common household pests such as cockroaches, ants, mosquitoes, termites, rodents, and bed bugs. The service can be planned according to the specific pest issue in your home.\n"
            "How can Mosquito control HSR Layout reduce mosquito problems?|"
            "Mosquito control HSR Layout focuses on reducing mosquito activity around the property by identifying breeding areas and treating suitable locations. Removing standing water can also help reduce mosquito breeding.\n"
            "How is Bed bug control HSR Layout carried out?|"
            "Bed bug control HSR Layout usually involves inspecting sleeping areas, furniture, mattresses, and other possible hiding places before applying an appropriate treatment. Follow-up treatment may be required depending on the infestation.\n"
            "Is Office pest control HSR Layout suitable for commercial workplaces?|"
            "Yes, Office pest control HSR Layout can help businesses manage pests in workspaces, meeting rooms, kitchens, storage areas, and other commercial spaces. Treatment schedules can be planned to reduce disruption to regular office activities."
        ),
    },
}

for _svc in SEED_SERVICES:
    _pack = _LOCATION_SEO.get(_svc.get("slug"))
    if not _pack:
        continue
    _svc.update(_pack)


def _with_cover(item: dict) -> dict:
    data = dict(item)
    if not data.get("cover_image"):
        data["cover_image"] = SERVICE_COVER_BY_SLUG.get(data.get("slug"))
    return data


def ensure_service_seo_packs(db) -> None:
    """Apply curated SEO meta/FAQ packs to known service slugs when FAQ is empty or outdated."""
    packs = {
        "cockroach-control-bangalore": next(
            (s for s in SEED_SERVICES if s.get("slug") == "cockroach-control-bangalore"),
            None,
        ),
        "termite-control-bangalore": next(
            (s for s in SEED_SERVICES if s.get("slug") == "termite-control-bangalore"),
            None,
        ),
        "bed-bug-control-bangalore": next(
            (s for s in SEED_SERVICES if s.get("slug") == "bed-bug-control-bangalore"),
            None,
        ),
        "rodent-control-bangalore": next(
            (s for s in SEED_SERVICES if s.get("slug") == "rodent-control-bangalore"),
            None,
        ),
        "mosquito-control-bangalore": next(
            (s for s in SEED_SERVICES if s.get("slug") == "mosquito-control-bangalore"),
            None,
        ),
        "commercial-pest-control-bangalore": next(
            (s for s in SEED_SERVICES if s.get("slug") == "commercial-pest-control-bangalore"),
            None,
        ),
        "residential-pest-control-bangalore": next(
            (s for s in SEED_SERVICES if s.get("slug") == "residential-pest-control-bangalore"),
            None,
        ),
        "ant-control-bangalore": next(
            (s for s in SEED_SERVICES if s.get("slug") == "ant-control-bangalore"),
            None,
        ),
        "pest-control-amc-bangalore": next(
            (s for s in SEED_SERVICES if s.get("slug") == "pest-control-amc-bangalore"),
            None,
        ),
        "pest-control-whitefield": next(
            (s for s in SEED_SERVICES if s.get("slug") == "pest-control-whitefield"),
            None,
        ),
        "pest-control-marathahalli": next(
            (s for s in SEED_SERVICES if s.get("slug") == "pest-control-marathahalli"),
            None,
        ),
        "pest-control-sarjapur-road": next(
            (s for s in SEED_SERVICES if s.get("slug") == "pest-control-sarjapur-road"),
            None,
        ),
        "pest-control-bellandur": next(
            (s for s in SEED_SERVICES if s.get("slug") == "pest-control-bellandur"),
            None,
        ),
        "pest-control-brookefield": next(
            (s for s in SEED_SERVICES if s.get("slug") == "pest-control-brookefield"),
            None,
        ),
        "pest-control-hoodi": next(
            (s for s in SEED_SERVICES if s.get("slug") == "pest-control-hoodi"),
            None,
        ),
        "pest-control-kr-puram": next(
            (s for s in SEED_SERVICES if s.get("slug") == "pest-control-kr-puram"),
            None,
        ),
        "pest-control-electronic-city": next(
            (s for s in SEED_SERVICES if s.get("slug") == "pest-control-electronic-city"),
            None,
        ),
        "pest-control-hsr-layout": next(
            (s for s in SEED_SERVICES if s.get("slug") == "pest-control-hsr-layout"),
            None,
        ),
    }
    changed = False
    for slug, pack in packs.items():
        if not pack:
            continue
        row = db.query(Service).filter(Service.slug == slug).first()
        if not row:
            continue
        faq_count = len([l for l in (row.faq_items or "").split("\n") if l.strip()])
        target_faq = pack.get("faq_items") or ""
        target_count = len([l for l in target_faq.split("\n") if l.strip()])
        needs_faq = (not row.faq_items) or (target_count > faq_count)
        if needs_faq and target_faq:
            row.faq_items = target_faq
            row.faq_title = pack.get("faq_title") or row.faq_title
            row.faq_eyebrow = pack.get("faq_eyebrow") or row.faq_eyebrow
            changed = True
        if pack.get("meta_title"):
            row.meta_title = pack["meta_title"]
            changed = True
        if pack.get("meta_description"):
            row.meta_description = pack["meta_description"]
            changed = True
        if pack.get("keywords"):
            row.keywords = pack["keywords"]
            changed = True
    if changed:
        db.commit()


def seed_services(db) -> None:
    if db.query(Service).count() > 0:
        ensure_service_cover_images(db)
        ensure_service_seo_packs(db)
        return
    for item in SEED_SERVICES:
        db.add(Service(**_with_cover(item)))
    db.commit()


def ensure_service_cover_images(db) -> None:
    """Fill missing cover images for existing services (safe for admin overrides)."""
    changed = False
    for row in db.query(Service).all():
        if row.cover_image:
            continue
        url = SERVICE_COVER_BY_SLUG.get(row.slug)
        if not url:
            # Keyword fallback from title/slug
            hay = f"{row.slug} {row.title}".lower()
            if "cockroach" in hay:
                url = SERVICE_COVER_BY_SLUG["cockroach-control-bangalore"]
            elif "termite" in hay:
                url = SERVICE_COVER_BY_SLUG["termite-control-bangalore"]
            elif "bed" in hay:
                url = SERVICE_COVER_BY_SLUG["bed-bug-control-bangalore"]
            elif "rodent" in hay or "rat" in hay:
                url = SERVICE_COVER_BY_SLUG["rodent-control-bangalore"]
            elif "mosquito" in hay:
                url = SERVICE_COVER_BY_SLUG["mosquito-control-bangalore"]
            elif "ant" in hay:
                url = SERVICE_COVER_BY_SLUG["ant-control-bangalore"]
            elif row.category == "residential":
                url = SERVICE_COVER_BY_SLUG["residential-pest-control-bangalore"]
            elif row.category == "commercial":
                url = SERVICE_COVER_BY_SLUG["commercial-pest-control-bangalore"]
            elif row.category == "amc":
                url = SERVICE_COVER_BY_SLUG["pest-control-amc-bangalore"]
            elif row.category == "location":
                url = SERVICE_COVER_BY_SLUG["pest-control-whitefield"]
            else:
                url = SERVICE_COVER_BY_SLUG["general-pest-control-home"]
        row.cover_image = url
        changed = True
    if changed:
        db.commit()
