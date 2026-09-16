from .models import Service

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
        "keywords": "Cockroach pest control Bangalore, Cockroach control Bangalore, Cockroach treatment Bangalore, Cockroach pest control near me",
        "meta_title": "Cockroach Control Bangalore | TEB Enterprises",
        "meta_description": "Cockroach pest control in Bangalore for homes, kitchens, apartments, restaurants and hotels. Inspection-based treatment by TEB Enterprises.",
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
        "keywords": "Termite control Bangalore, Termite treatment Bangalore, Anti termite treatment Bangalore",
        "meta_title": "Termite Control Bangalore | Pre & Post Construction | TEB",
        "meta_description": "Termite treatment Bangalore — pre-construction and post-construction anti-termite services for homes and offices by TEB Enterprises.",
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
        "keywords": "Bed bug treatment Bangalore, Bed bug control near me, Bed bug pest control Bangalore",
        "meta_title": "Bed Bug Control Bangalore | Mattress Treatment | TEB",
        "meta_description": "Bed bug pest control Bangalore for homes, apartments, hotels and hostels. Mattress treatment and follow-up by TEB Enterprises.",
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
        "keywords": "Rat pest control Bangalore, Rodent control Bangalore, Rat removal Bangalore",
        "meta_title": "Rodent Control Bangalore | Rat & Mouse Removal | TEB",
        "meta_description": "Rat removal Bangalore and rodent control for homes, restaurants and warehouses by TEB Enterprises.",
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
        "keywords": "Mosquito control Bangalore, Mosquito fogging Bangalore, Mosquito treatment Bangalore",
        "meta_title": "Mosquito Control Bangalore | Fogging & Treatment | TEB",
        "meta_description": "Mosquito fogging Bangalore and mosquito treatment for apartments and commercial sites by TEB Enterprises.",
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
        "keywords": "Ant control Bangalore, Ant pest control Bangalore",
        "meta_title": "Ant Control Bangalore | Kitchen & Office | TEB Enterprises",
        "meta_description": "Ant pest control Bangalore for kitchens, homes and offices. Targeted baiting by TEB Enterprises.",
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
        "keywords": "Home pest control Bangalore, Apartment pest control Bangalore, Flat pest control Bangalore",
        "meta_title": "Residential Pest Control Bangalore | Homes & Flats | TEB",
        "meta_description": "Residential pest control Bangalore for homes, apartments and flats by TEB Enterprises.",
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
        "keywords": "Commercial pest control Bangalore, Office pest control Bangalore, Restaurant pest control Bangalore, Hotel pest control Bangalore, Warehouse pest control Bangalore",
        "meta_title": "Commercial Pest Control Bangalore | Offices & Hotels | TEB",
        "meta_description": "Commercial pest control Bangalore for offices, restaurants, hotels and warehouses by TEB Enterprises.",
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
        "keywords": "Pest control AMC Bangalore, Annual pest control contract Bangalore",
        "meta_title": "Pest Control AMC Bangalore | Annual Contracts | TEB",
        "meta_description": "Pest control AMC Bangalore with scheduled treatments, monitoring and priority support by TEB Enterprises.",
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


def seed_services(db) -> None:
    if db.query(Service).count() > 0:
        return
    for item in SEED_SERVICES:
        db.add(Service(**item))
    db.commit()
