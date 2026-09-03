export const SITE = {
  name: 'TEB Enterprises',
  tagline: 'Team Experts Bangalore',
  phone: '+91 79966 88885',
  phoneHref: 'tel:+917996688885',
  phone2: '+91 99000 00120',
  phone2Href: 'tel:+919900000120',
  whatsapp: '917996688885',
  salesEmail: 'sales@teamcleaningexperts.in',
  officeEmail: 'tebenterprises711984@gmail.com',
  website: 'https://www.teamcleaningexperts.in',
  gstin: '29AXXPG2780R1Z9',
  contactPerson: 'Mr. Nanda Kumar',
  hours: 'Mon–Sun, 8:00 AM – 8:00 PM',
}

export const TICKER = [
  'Inspection-based treatment',
  'Pre & post-construction termite control',
  'Integrated Pest Management',
  'Rodent bait-station management',
  'Insect light-trap monitoring',
  'Service documentation for audits',
  'Emergency call-out support',
  'Bengaluru-wide coverage',
]

export const STATS = [
  { value: 20, label: 'Pest programmes' },
  { value: 13, label: 'Sectors served' },
  { value: 27, label: 'Bengaluru zones covered' },
  { value: 8, label: 'Step service process' },
]

export const PESTS = [
  {
    c: 'CR',
    g: 'crawling',
    n: 'Cockroaches',
    t: 'Kitchens, drains, cabinets, appliances, false ceilings and duct areas.',
    signs: [
      'Live sightings, usually at night',
      'Droppings around cabinets and drawers',
      'Egg cases in corners and joints',
      'Unpleasant odour near storage',
      'Activity around sinks and drains',
      'Repeat activity near food storage',
    ],
    treat: [
      'Gel-bait application at harbourage points',
      'Crack-and-crevice treatment',
      'Suitable spray application',
      'Drain and utility-area treatment',
      'Moisture and food-source identification',
      'Sanitation recommendations',
      'Follow-up treatment where required',
    ],
  },
  {
    c: 'TE',
    g: 'wood',
    n: 'Termites',
    t: 'Doors, furniture, cupboards, flooring, wooden fixtures and structure.',
    signs: [
      'Mud tubes running up walls',
      'Hollow-sounding wood',
      'Damaged door frames',
      'Bubbling or blistered paint',
      'Fine powder near wooden items',
      'Discarded wings',
      'Doors and windows becoming stiff',
    ],
    treat: [
      'Pre-construction soil barrier at foundation, plinth and backfill stages',
      'Post-construction drilling at suitable intervals',
      'Chemical injection at wall-and-floor junctions',
      'Wooden fixture treatment',
      'External perimeter and service-entry treatment',
      'Follow-up inspection',
    ],
  },
  {
    c: 'BB',
    g: 'crawling',
    n: 'Bedbugs',
    t: 'Mattresses, bed frames, furniture joints, upholstery and skirting.',
    signs: [
      'Bites in lines on exposed skin',
      'Dark spotting on mattress seams',
      'Live bugs in furniture joints',
      'Activity spreading room to room',
      'Shed skins near bed frames',
    ],
    treat: [
      'Detailed inspection of beds, furniture and cracks',
      'Customer preparation guidance before service',
      'Targeted application at harbourage points',
      'Guidance on washing fabrics and reducing clutter',
      'Advice against moving infested furniture',
      'Recommended follow-up visits',
    ],
  },
  {
    c: 'RO',
    g: 'rodent',
    n: 'Rats & mice',
    t: 'Cables, packaging, stored goods, furniture and building materials.',
    signs: [
      'Gnaw marks on cables and packaging',
      'Droppings along walls and runways',
      'Scratching sounds in ceilings or ducts',
      'Burrows near external walls',
      'Damaged stock or food packets',
      'Grease marks along regular routes',
    ],
    treat: [
      'Site inspection and movement mapping',
      'Entry-point assessment',
      'Bait-station placement and replenishment',
      'Trap placement and monitoring',
      'Burrow observations',
      'Rodent-proofing recommendations',
      'Waste and storage corrections',
      'Periodic activity reporting',
    ],
  },
  {
    c: 'MQ',
    g: 'flying',
    n: 'Mosquitoes',
    t: 'Gardens, basements, drains, terraces, STP surroundings and parking.',
    signs: [
      'Biting activity at dawn and dusk',
      'Stagnant water in containers or drains',
      'Activity concentrated near landscaped areas',
      'Resting in dark, humid corners',
    ],
    treat: [
      'Larval-source inspection',
      'Suitable larval control',
      'Residual treatment of resting surfaces',
      'Fogging where appropriate',
      'Outdoor resting-area treatment',
      'Stagnant-water observations and corrections',
      'Scheduled monitoring',
    ],
  },
  {
    c: 'AN',
    g: 'crawling',
    n: 'Ants',
    t: 'Cracks, windows, electrical conduits, wall gaps and external vegetation.',
    signs: [
      'Visible trails along walls or counters',
      'Activity around sweet or greasy food',
      'Nesting near wall gaps or planters',
      'Winged ants indoors',
    ],
    treat: [
      'Locating trails and nesting areas',
      'Targeted baiting by species',
      'Crack-and-crevice treatment',
      'Entry-point identification',
      'Food-source control advice',
      'Outdoor perimeter observations',
    ],
  },
  {
    c: 'FL',
    g: 'flying',
    n: 'Flies',
    t: 'Waste areas, drains, food-handling zones and wet organic matter.',
    signs: [
      'Concentration near bins and drains',
      'Activity in food-preparation zones',
      'Breeding in wet organic waste',
      'Complaints from customers or staff',
    ],
    treat: [
      'Breeding-source inspection',
      'Drain treatment',
      'Waste-area recommendations',
      'Insect light-trap positioning and monitoring',
      'Residual and space treatment',
      'Entry-point observations',
      'Corrective-action reporting',
    ],
  },
  {
    c: 'WB',
    g: 'wood',
    n: 'Wood borers',
    t: 'Furniture, doors, cupboards, wooden panels and structural timber.',
    signs: [
      'Fine powder below wooden items',
      'Small round exit holes',
      'Weakened or crumbling wood',
      'Powder reappearing after cleaning',
    ],
    treat: [
      'Inspection of affected wooden items',
      'Identification of active areas',
      'Suitable drilling or injection',
      'Targeted surface treatment',
      'Advice on heavily damaged wood',
      'Follow-up inspection',
    ],
  },
  {
    c: 'SP',
    g: 'stored',
    n: 'Stored-product pests',
    t: 'Grains, flour, spices, pulses, packaged food, animal feed and dry goods.',
    signs: [
      'Insects inside packets or sacks',
      'Webbing in stored grain',
      'Damaged or holed packaging',
      'Repeat issues in the same stock area',
    ],
    treat: [
      'Stock inspection',
      'Infested-product isolation recommendations',
      'Cleaning guidance for storage areas',
      'Storage layout corrections',
      'Targeted treatment',
      'Ongoing monitoring',
    ],
  },
  {
    c: 'LS',
    g: 'crawling',
    n: 'Lizards, spiders & silverfish',
    t: 'Nuisance pests in storage areas, corners, false ceilings and wardrobes.',
    signs: [
      'Webs in corners and ceilings',
      'Droppings on walls or near lights',
      'Damage to paper, books and fabric',
      'Insect activity attracting predators',
    ],
    treat: [
      'Reducing insect food sources',
      'Treating cracks and harbourage areas',
      'Identifying entry points',
      'Web removal where included in scope',
      'Improving storage and housekeeping',
      'Physical exclusion measures',
      'Monitoring recurring activity',
    ],
  },
  {
    c: 'FT',
    g: 'crawling',
    n: 'Fleas & ticks',
    t: 'Pet resting areas, carpets, upholstery, skirting and outdoor zones.',
    signs: [
      'Bites around ankles and legs',
      'Pets scratching persistently',
      'Activity in carpets and pet bedding',
      'Recurrence after cleaning alone',
    ],
    treat: [
      'Inspection of pet resting and movement areas',
      'Targeted treatment of carpets, cracks and skirting',
      'Outdoor area treatment where required',
      'Guidance on pet treatment and bedding',
      'Follow-up service where recommended',
    ],
  },
  {
    c: 'GD',
    g: 'stored',
    n: 'General disinfestation',
    t: 'Whole-premises treatment for mixed or recurring pest activity.',
    signs: [
      'More than one pest active at a time',
      'Recurring activity after earlier treatments',
      'New premises with unknown history',
      'Post-renovation or post-vacancy issues',
    ],
    treat: [
      'Full-premises inspection',
      'Combined treatment plan across pest types',
      'Entry-point and breeding-source correction',
      'Documentation for commercial premises',
      'Scheduled follow-up and monitoring',
    ],
  },
]

export const B2C_SERVICES = [
  { num: 'PACKAGE 01', title: 'General pest control', text: 'A comprehensive treatment for cockroaches, ants, silverfish, spiders and other common crawling insects across the home.' },
  { num: 'PACKAGE 02', title: 'Kitchen pest control', text: 'Targeted work around cabinets, sinks, drainage points, appliances, storage and food-preparation areas.' },
  { num: 'PACKAGE 03', title: 'Bedbug treatment', text: 'Detailed inspection of beds, mattresses, furniture joints, upholstery and skirting. Multiple visits may be recommended.' },
  { num: 'PACKAGE 04', title: 'Termite treatment', text: 'Pre- and post-construction termite control for homes, villas, apartments, furniture and wooden fixtures.' },
  { num: 'PACKAGE 05', title: 'Mosquito management', text: 'Treatment plus breeding-source control across gardens, balconies, terraces, drains and common areas.' },
  { num: 'PACKAGE 06', title: 'Rodent control', text: 'Baiting, trapping, monitoring and rodent-proofing recommendations for rat and mouse activity.' },
  { num: 'PACKAGE 07', title: 'Move-in pest control', text: 'Treatment for a newly purchased or rented home before furniture and kitchen items are moved in.' },
  { num: 'PACKAGE 08', title: 'Annual home protection', text: 'A scheduled residential programme with periodic treatments and monitoring through the contract period.' },
]

export const B2B_SERVICES = [
  { num: 'SCOPE 01', title: 'Site inspection & risk assessment', text: 'A full survey of pest activity, entry points, breeding sources and site-specific risks before any treatment plan is written.' },
  { num: 'SCOPE 02', title: 'Customised treatment plan', text: 'Built around your facility type, size, operating schedule, occupancy sensitivity and audit requirements.' },
  { num: 'SCOPE 03', title: 'Scheduled preventive service', text: 'Weekly, fortnightly, monthly or quarterly visits planned around your operations to minimise disruption.' },
  { num: 'SCOPE 04', title: 'Monitoring systems', text: 'Rodent bait-station management, insect light-trap positioning and monitoring, and pest-sighting trend review.' },
  { num: 'SCOPE 05', title: 'Service documentation', text: 'Treatment records, pest observations, corrective-action recommendations and follow-up schedules for your audits.' },
  { num: 'SCOPE 06', title: 'Emergency call-outs', text: 'Priority support for sudden pest incidents, subject to team availability, site location and pest type.' },
  { num: 'SCOPE 07', title: 'Corrective action reporting', text: 'Entry points, breeding sources, sanitation and structural gaps documented with practical recommendations.' },
  { num: 'SCOPE 08', title: 'Management review', text: 'Periodic review of pest trends and recurring issues to improve the programme over the contract term.' },
]

export const SECTORS = [
  ['01', 'Corporate offices', 'Workstations, cafeterias, server rooms, reception, meeting rooms, washrooms, pantries and basements.'],
  ['02', 'Apartment communities', 'Individual flats plus basements, clubhouses, garbage rooms, drains, STP areas, gardens and perimeters.'],
  ['03', 'Hotels & hospitality', 'Discreet management for guest rooms, kitchens, banquets, linen rooms, receiving bays and waste zones.'],
  ['04', 'Restaurants & kitchens', 'Cockroaches, rodents, flies, ants and stored-product pests in food-preparation and storage environments.'],
  ['05', 'Hospitals & healthcare', 'Carefully planned programmes for non-critical and permitted areas, scheduled around clinical operations.'],
  ['06', 'Schools & institutions', 'Classrooms, kitchens, dining halls, hostels, laboratories, libraries, stores and administrative offices.'],
  ['07', 'Manufacturing', 'Production zones, raw-material and finished-goods storage, utilities, canteens and facility perimeters.'],
  ['08', 'Warehouses & logistics', 'Rodents, stored-product pests and entry risks associated with constant goods movement.'],
  ['09', 'Retail & malls', 'Stores, food courts, stockrooms, common areas, loading zones, washrooms and parking facilities.'],
  ['10', 'IT parks & campuses', 'Office towers, food courts, landscaping, utility areas, basements, parking and waste-management zones.'],
  ['11', 'Banking & financial', 'Discreet service for branches, record rooms, storage areas, pantries and customer-facing spaces.'],
  ['12', 'Construction & real estate', 'Pre- and post-construction termite treatment, labour-camp pest control, mosquito and rodent management.'],
  ['13', 'Food processing & storage', 'Monitoring, sanitation observations, pest exclusion, treatment planning and full documentation.'],
]

export const IPM_STEPS = [
  ['Inspection', 'Find the source', 'Affected areas, entry points, food and water sources, hiding places, drainage, waste areas and structural concerns.'],
  ['Identification', 'Name the pest correctly', 'Correct identification determines the right treatment method and the right monitoring approach.'],
  ['Monitoring', 'Track activity over time', 'Monitoring devices and periodic inspections show whether treatment is actually working.'],
  ['Sanitation', 'Remove what attracts them', 'Observations on waste management, food storage, leakage, drainage, clutter and housekeeping conditions.'],
  ['Exclusion', 'Close the doors', 'Sealing cracks, openings, pipeline gaps, door gaps, ventilation points and other pest-entry routes.'],
  ['Treatment', 'Apply where it counts', 'Treatment matched to pest activity, site sensitivity and the agreed service scope.'],
  ['Documentation', 'Keep the record', 'Service reports, pest observations, treatment details and corrective recommendations for commercial clients.'],
  ['Review', 'Improve the programme', 'Pest trends and recurring issues reviewed periodically to strengthen the overall plan.'],
]

export const PROCESS = [
  ['STEP 01', 'Enquiry', 'Call, email or send the form with details of the pest problem and the property.'],
  ['STEP 02', 'Initial assessment', 'We gather details on the pest, affected areas, how long it\'s been going on and past treatments.'],
  ['STEP 03', 'Site inspection', 'Where required, our technician visits to check pest activity, breeding areas, entry points and risks.'],
  ['STEP 04', 'Treatment proposal', 'Method, frequency, preparation requirements, commercial terms and follow-up schedule.'],
  ['STEP 05', 'Service execution', 'Treatment carried out with suitable equipment, application methods and site-specific precautions.'],
  ['STEP 06', 'Service report', 'Commercial clients receive documentation, observations, treatment details and recommendations.'],
  ['STEP 07', 'Follow-up', 'Scheduled or carried out based on pest type, infestation level and the agreed service plan.'],
  ['STEP 08', 'Prevention guidance', 'Practical measures to reduce food, water, shelter and entry opportunities for pests.'],
]

export const AMC_TAGS = [
  'Weekly', 'Fortnightly', 'Monthly', 'Quarterly', 'Custom frequency',
  'General pest control', 'Rodent management', 'Mosquito management', 'Fly management',
  'Cockroach control', 'Ant control', 'Monitoring devices', 'Service documentation',
  'Emergency call-outs', 'Review meetings', 'Corrective actions',
]

export const AMC_WHY = [
  'Regular monitoring instead of reactive call-outs',
  'Early detection before an infestation spreads',
  'Planned preventive treatment on a fixed schedule',
  'Documentation ready for audits and inspections',
  'Predictable maintenance cost and calendar',
  'Priority service support when something comes up',
  'Long-term protection of property and operations',
]

export const SAFETY = {
  pre: [
    ['Store or cover food items', 'Remove utensils from selected areas', 'Keep children and pets away'],
    ['Provide access to cabinets and corners', 'Cover fish tanks; switch off air pumps if instructed', 'Remove unnecessary clutter'],
    ['Inform the team about allergies or sensitivities', 'Follow the advised vacancy and re-entry time', 'Complete all preparation instructions shared'],
  ],
  post: [
    ['Follow the advised re-entry time', 'Ventilate the area if instructed', 'Avoid touching treated surfaces unnecessarily'],
    ['Keep children and pets away for the advised duration', 'Don\'t wash treated cracks and corners immediately', 'Dispose of dead pests hygienically'],
    ['Report unusual activity to our team', 'Complete the recommended follow-up service', 'Correct leakage, drainage and entry concerns'],
  ],
  tell: [
    ['Infants or young children', 'Elderly persons', 'Pregnant individuals', 'Allergies or respiratory conditions'],
    ['Pets, birds or fish tanks', 'Food-processing activities', 'Sensitive equipment', 'Medicines or healthcare materials'],
    ['Occupied patient-care areas', 'Restricted-access zones', 'Operational hours we must work around'],
  ],
}

export const AREAS = [
  'Whitefield', 'ITPL', 'Hoodi', 'Kadugodi', 'Brookefield', 'Mahadevapura', 'KR Puram',
  'Marathahalli', 'Varthur', 'Bellandur', 'Sarjapur Road', 'Electronic City', 'HSR Layout',
  'Koramangala', 'Indiranagar', 'Hebbal', 'Yelahanka', 'Jayanagar', 'JP Nagar', 'Banashankari',
  'Rajajinagar', 'Malleshwaram', 'Peenya', 'Yeshwanthpur', 'Manyata Tech Park', 'Devanahalli', 'Hoskote',
]

export const FAQS = [
  ['Do you provide pest control for both homes and businesses?', 'Yes. TEB Enterprises provides complete B2C residential pest control and B2B commercial pest-management services.'],
  ['Which areas do you serve?', 'We primarily serve Bengaluru. Contact our team to confirm availability for your specific location.'],
  ['Do you provide one-time treatment?', 'Yes, for selected pest problems. For recurring or high-risk properties we may recommend a scheduled service plan instead.'],
  ['Do you provide Annual Maintenance Contracts?', 'Yes. We offer pest-control AMCs for residential, commercial, industrial and institutional properties.'],
  ['How much does pest control cost?', 'It depends on property size, pest type, infestation level, treatment method, number of visits and service frequency. Contact us for an assessment and quotation.'],
  ['Is pest control safe for children and pets?', 'Safety depends on the application method and on following instructions. Tell our team about children, elderly residents, pets, allergies or sensitive conditions before treatment.'],
  ['Do I need to leave the property during treatment?', 'It depends on the method used. Our team gives you the required vacancy and re-entry instructions before service.'],
  ['How long does treatment take?', 'Duration depends on property size, pest type, infestation level and the treatment method.'],
  ['Will one treatment solve the problem completely?', 'Some infestations are controlled in one service. Others — particularly bedbugs, termites, rodents and severe cockroach infestations — need multiple visits and preventive action.'],
  ['Do you provide termite treatment?', 'Yes. We provide both pre-construction and post-construction termite-control services.'],
  ['Do you provide documentation for companies?', 'Yes. Commercial service documentation is provided according to the agreed scope and contract requirements.'],
  ['What should I do before the service?', 'Preparation depends on the treatment. Our team shares instructions covering food, utensils, furniture access, children, pets and re-entry requirements.'],
  ['Why are pests returning after treatment?', 'Usually because of untreated breeding sources, neighbouring infestations, structural entry points, waste-handling problems, moisture, available food, or an incomplete follow-up. We can inspect the cause and recommend corrective measures.'],
  ['Do you provide emergency pest control?', 'Priority service may be arranged depending on team availability, site location and pest type.'],
]

export const PROPERTY_TYPES = [
  'Independent house', 'Apartment / flat', 'Villa / gated community', 'Office',
  'IT park / business campus', 'Hotel / restaurant', 'Hospital / clinic',
  'School / institution', 'Factory / manufacturing', 'Warehouse / logistics',
  'Retail store / mall', 'Bank / financial office', 'Construction site', 'Other',
]

export const PEST_OPTIONS = [
  'Cockroaches', 'Termites', 'Bedbugs', 'Rodents', 'Mosquitoes', 'Ants', 'Flies',
  'Wood borer', 'Stored-product pests', 'Lizards / spiders / silverfish',
  'Multiple / not sure', 'Pre-construction termite treatment', 'Annual maintenance contract',
]
