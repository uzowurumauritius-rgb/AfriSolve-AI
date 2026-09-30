import { id, passwordHash } from './core.js';

export async function seedDemoData(store, stamp, force = false) {
  const s = store.state;
  if (!force && s.problems.length > 0) return;

  const defaultPassword = 'SecureGrading2026!';
  const hash = await passwordHash(defaultPassword);

  const personaDefs = [
    { role: 'admin', name: 'Amara Okafor', email: 'admin@afrisolve.org', country: 'Nigeria', institution: 'AfriSolve Administration', bio: 'Platform administrator account.', expertise: 'Platform governance, moderation, verification' },
    { role: 'researcher', name: 'Nia Kamau', email: 'researcher@afrisolve.org', country: 'Kenya', institution: 'East African Innovation Institute', bio: 'Agricultural and environmental field researcher.', expertise: 'Post-harvest logistics, cold-chain engineering, rural field studies' },
    { role: 'student', name: 'Kwame Mensah', email: 'student@afrisolve.org', country: 'Ghana', institution: 'African Leadership University', bio: 'Software engineering student passionate about climate-tech.', expertise: 'Mobile development, IoT sensors, data collection' },
    { role: 'innovator', name: 'Lerato Molefe', email: 'innovator@afrisolve.org', country: 'South Africa', institution: 'Cape Innovation Lab', bio: 'Social entrepreneur developing off-grid community technologies.', expertise: 'Product development, clean energy finance, user research' },
    { role: 'mentor', name: 'Dr. Amina Diallo', email: 'mentor@afrisolve.org', country: 'Senegal', institution: 'Dakar Institute of Technology', bio: 'Senior advisor in renewable microgrids and sustainable agriculture.', expertise: 'Sustainable agriculture, renewable energy systems, research methods' }
  ];

  for (const def of personaDefs) {
    let u = s.users.find(x => x.email === def.email);
    if (!u) {
      u = {
        id: id(),
        name: def.name,
        email: def.email,
        passwordHash: hash,
        role: def.role,
        country: def.country,
        institution: def.institution,
        bio: def.bio,
        expertise: def.expertise,
        avatar: '',
        verified: true,
        active: true,
        demo: false,
        createdAt: stamp()
      };
      s.users.push(u);
    } else {
      u.passwordHash = hash;
      u.active = true;
      u.verified = true;
    }
  }

  const admin = s.users.find(u => u.role === 'admin');
  const researcher = s.users.find(u => u.role === 'researcher');
  const student = s.users.find(u => u.role === 'student');
  const innovator = s.users.find(u => u.role === 'innovator');
  const mentor = s.users.find(u => u.role === 'mentor');

  const problemDefs = [
    {
      title: 'Unreliable Cold-Storage for Rural Agricultural Cooperatives',
      description: 'Smallholder vegetable and dairy farmers experience up to 40% post-harvest spoilage due to recurring electrical grid outages and high diesel generator costs in Machakos County.',
      evidence: 'Interviews conducted with 18 cooperative members in June 2026, cooperative harvest logs showing spoilage tonnage, and Kenya Power grid outage logs.',
      sector: 'Agriculture',
      country: 'Kenya',
      region: 'Machakos County',
      sdg: 2,
      priority: 'high',
      status: 'verified',
      authorId: researcher.id,
      voters: [student.id, innovator.id]
    },
    {
      title: 'Solar-Powered Groundwater Desalination in Arid Pastoral Zones',
      description: 'Pastoralist communities in northern Kenya face high salinity in seasonal boreholes, resulting in contaminated drinking supplies and livestock losses during dry seasons.',
      evidence: 'Water salinity sensor readings from 6 community boreholes (avg 3,200 ppm TDS) and community elder focus group recordings.',
      sector: 'Water & Sanitation',
      country: 'Kenya',
      region: 'Garissa & Turkana',
      sdg: 6,
      priority: 'critical',
      status: 'verified',
      authorId: innovator.id,
      voters: [student.id, researcher.id]
    },
    {
      title: 'Decentralized Vaccine Cold-Chain Logistics for Remote Health Posts',
      description: 'Primary healthcare centers struggle to maintain WHO temperature compliance (2°C to 8°C) for routine immunization vaccines during transport across unpaved terrain.',
      evidence: 'Ministry of Health clinic cold-box temperature logger traces and monthly vaccine discard records.',
      sector: 'Healthcare',
      country: 'Nigeria',
      region: 'Kaduna Rural District',
      sdg: 3,
      priority: 'critical',
      status: 'pending',
      authorId: researcher.id,
      voters: [student.id]
    },
    {
      title: 'Offline Digital STEM Curriculum Distribution in Low-Bandwidth Schools',
      description: 'Secondary schools in rural communities lack fiber or cellular internet connectivity, preventing students from accessing updated interactive science simulations.',
      evidence: 'Headmaster survey across 14 rural secondary schools; verified 0% regular internet access in computer labs.',
      sector: 'Education',
      country: 'Ghana',
      region: 'Volta Region',
      sdg: 4,
      priority: 'medium',
      status: 'verified',
      authorId: student.id,
      voters: [researcher.id, innovator.id]
    },
    {
      title: 'Biomass Briquette Production from Agricultural Rice Husk Waste',
      description: 'Large volumes of rice husks are burned openly in milling clusters, causing particulate pollution while nearby households spend scarce income on deforestation-driven charcoal.',
      evidence: 'Agricultural cooperative milling waste volume tallies and air quality sensor readings.',
      sector: 'Energy',
      country: 'Senegal',
      region: 'Saint-Louis Rice Valley',
      sdg: 7,
      priority: 'medium',
      status: 'pending',
      authorId: innovator.id,
      voters: []
    },
    {
      title: 'Urban Flood Early-Warning Telemetry via Community Sensors',
      description: 'Informal settlements near urban storm canals suffer repetitive flash flooding during monsoon rains due to lack of real-time upstream gauge telemetry.',
      evidence: 'Municipal flood damage reports from 2024–2026 and community-submitted time-stamped video records.',
      sector: 'Environment',
      country: 'Nigeria',
      region: 'Lagos Mainland',
      sdg: 13,
      priority: 'high',
      status: 'verified',
      authorId: researcher.id,
      voters: [student.id, innovator.id]
    }
  ];

  const createdProblems = [];
  for (const def of problemDefs) {
    const { voters, ...pData } = def;
    const p = {
      id: id(),
      ...pData,
      createdAt: stamp()
    };
    s.problems.push(p);
    createdProblems.push(p);

    for (const vId of voters) {
      s.votes.push({ problemId: p.id, userId: vId });
    }

    s.comments.push({
      id: id(),
      problemId: p.id,
      userId: student.id,
      userName: student.name,
      text: 'Have we checked local supply chains for replacement solar components and batteries?',
      createdAt: stamp()
    });

    if (p.status === 'verified') {
      s.audit.push({
        id: id(),
        userId: admin.id,
        userName: admin.name,
        action: 'problem.verified',
        target: p.id,
        createdAt: stamp()
      });
    }
  }

  const verifiedProblem = createdProblems[0];
  const project = {
    id: id(),
    name: 'Machakos Solar Cooling Cooperative Pilot',
    description: 'Engineering an evaporative charcoal cooling prototype with hybrid solar backup for rural agricultural cooperatives to prevent post-harvest spoilage.',
    teamName: 'Kilimo Tech Collective',
    problemId: verifiedProblem.id,
    leaderId: researcher.id,
    memberIds: [researcher.id, student.id, mentor.id],
    status: 'active',
    milestones: [
      { title: 'Grassroots farmer interviews and loss audit', completed: true },
      { title: 'Thermodynamic modeling of charcoal cooling pad', completed: true },
      { title: '1000L pilot chamber field installation', completed: false }
    ],
    tasks: [
      { id: id(), title: 'Draft engineering schematic for evaporative charcoal cooler', assigneeId: student.id, dueDate: '2026-10-15', status: 'done' },
      { id: id(), title: 'Source 200W monocrystalline solar panels and DC water pumps', assigneeId: researcher.id, dueDate: '2026-10-22', status: 'doing' },
      { id: id(), title: 'Calibrate digital temperature and humidity data loggers', assigneeId: student.id, dueDate: '2026-10-29', status: 'todo' }
    ],
    messages: [
      { id: id(), userId: researcher.id, userName: researcher.name, text: 'Kwame, the initial temperature logs from the Machakos cooperative are uploaded.', createdAt: stamp() },
      { id: id(), userId: student.id, userName: student.name, text: 'Reviewing the pump flow rates now. The 12V DC pump matches our solar battery specs.', createdAt: stamp() }
    ],
    documents: [
      {
        id: id(),
        name: 'field-notes.txt',
        mime: 'text/plain',
        content: Buffer.from('Machakos Cooperative Field Audit: 18 farmers surveyed. Average ambient temp: 31C. Produce shelf life extended from 36h to 9 days in prototype cooler.').toString('base64'),
        size: 148,
        userId: researcher.id,
        createdAt: stamp()
      }
    ],
    activities: [
      { id: id(), userName: researcher.name, action: 'Project created from verified problem', createdAt: stamp() },
      { id: id(), userName: researcher.name, action: 'Invited Kwame Mensah to the team', createdAt: stamp() },
      { id: id(), userName: student.name, action: 'Task completed: Draft engineering schematic', createdAt: stamp() }
    ],
    createdAt: stamp()
  };
  s.projects.push(project);

  s.mentorships.push({
    id: id(),
    mentorId: mentor.id,
    mentorName: mentor.name,
    requesterId: researcher.id,
    requesterName: researcher.name,
    projectId: project.id,
    message: 'We would appreciate your engineering guidance on evaporative cooling thermodynamics and low-cost humidity control for produce.',
    status: 'accepted',
    meetingAt: '2026-10-18T10:00:00Z',
    feedback: 'Excellent progress on the passive charcoal matrix. Recommend adding a solar-powered exhaust fan to optimize convective airflow.'
  });

  s.notifications.push(
    { id: id(), userId: researcher.id, title: 'Problem Verified', body: `Your problem "${verifiedProblem.title}" has been verified by the administrator.`, link: `/problems/${verifiedProblem.id}`, read: false, emailStatus: 'sent', createdAt: stamp() },
    { id: id(), userId: researcher.id, title: 'Mentorship Accepted', body: `${mentor.name} accepted your mentorship request for ${project.name}.`, link: '/mentors', read: false, emailStatus: 'sent', createdAt: stamp() },
    { id: id(), userId: student.id, title: 'New Task Assigned', body: `You were assigned "Source 200W monocrystalline solar panels" in ${project.name}.`, link: `/projects/${project.id}`, read: false, emailStatus: 'sent', createdAt: stamp() }
  );

  s.research.push({
    id: id(),
    userId: researcher.id,
    problemId: verifiedProblem.id,
    question: 'What are viable low-cost solar-thermal or passive cooling methods suitable for rural Kenyan cooperatives?',
    mode: 'local heuristic (offline)',
    summary: 'Local keyword-based research brief, not generative AI or verified evidence. Your question primarily relates to Agriculture in Kenya. Investigate solar evaporative cooling, passive thermal mass, and cooperative cost-sharing models. Compare low-cost agricultural interventions using a small matched-site field trial and seasonal yield records.',
    classification: 'Agriculture',
    sdgs: [2, 7, 9],
    literature: [
      { title: 'OpenAlex scholarly search (Agriculture Kenya)', url: 'https://openalex.org/works?search=Agriculture+Kenya+cooling+storage' },
      { title: 'Crossref catalogue search', url: 'https://search.crossref.org/?q=Agriculture+Kenya+solar+cooling' },
      { title: 'African Journals Online search', url: 'https://www.ajol.info/index.php/ajol/search?query=Kenya+cold+storage' }
    ],
    similar: [],
    approaches: [
      'Compare low-cost agricultural interventions using a small matched-site field trial and seasonal yield records.',
      'Measure demand and lifecycle costs; compare solar, storage and maintenance models in a bounded pilot.'
    ],
    cautions: [
      'This is a heuristic suggestion, not scientific validation.',
      'Search links are discovery entry points, not cited or verified papers.',
      'Assess local affordability, repairability, and cultural acceptability.'
    ],
    createdAt: stamp()
  });
}
