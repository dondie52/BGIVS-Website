-- BGIVS seed data: publications, programmes, services, site_settings

-- ---------------------------------------------------------------------------
-- Publications (2 books)
-- ---------------------------------------------------------------------------
insert into public.publications (
  slug,
  title,
  subtitle,
  author,
  publisher,
  description,
  publication_type,
  cover_path,
  topics,
  status,
  featured,
  sort_order,
  published_at
) values
(
  'bvsdq-csrdq-framework',
  'BVSDQ–CSRDQ Framework',
  'A Strategic Tool for Business Successfulness',
  'Dr. Lindunda Wamunyima',
  'Babobiz Knowledge Press',
  'A practical framework integrating Business Value System Disclosure Quality and Corporate Social Responsibility Disclosure Quality into a unified and measurable institutional approach. The publication examines how ethics, governance, strategy, transparency, stakeholder trust, and responsible business practices can support sustainable organizational performance.',
  'book',
  '/images/publications/bvsdq-csrdq-framework.jpeg',
  array[
    'Business values',
    'Governance',
    'Ethics',
    'Corporate responsibility',
    'Strategic KPIs',
    'Transparency',
    'Accountability',
    'Stakeholder trust',
    'Sustainability',
    'Institutional performance'
  ],
  'published',
  true,
  1,
  now()
),
(
  'business-values-corporate-citizenship-botswana',
  'Business Values and Corporate Citizenship in Botswana',
  'A Strategic Framework for Sustainable Development',
  'Dr. Lindunda Wamunyima',
  'Babobiz Knowledge Press',
  'An African-centred framework examining how business values and corporate citizenship can strengthen governance, stakeholder trust, inclusive growth, responsible enterprise development, and national sustainability.',
  'book',
  '/images/publications/business-values-botswana.jpeg',
  array[
    'Ethical leadership',
    'Corporate governance',
    'Accountability',
    'Sustainable enterprise development',
    'Stakeholder engagement',
    'CSR integration',
    'National development',
    'Inclusive growth',
    'Corporate citizenship'
  ],
  'published',
  true,
  2,
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  author = excluded.author,
  publisher = excluded.publisher,
  description = excluded.description,
  publication_type = excluded.publication_type,
  cover_path = excluded.cover_path,
  topics = excluded.topics,
  status = excluded.status,
  featured = excluded.featured,
  sort_order = excluded.sort_order,
  published_at = coalesce(public.publications.published_at, excluded.published_at),
  updated_at = now();

-- ---------------------------------------------------------------------------
-- Programmes (6)
-- ---------------------------------------------------------------------------
insert into public.programmes (
  slug,
  title,
  short_description,
  challenges,
  activities,
  beneficiaries,
  outcomes,
  status,
  sort_order
) values
(
  'government-governance-reform',
  'Government Governance Reform Programmes',
  'Supporting public institutions with governance reform, accountability systems, ethical leadership, policy alignment, institutional performance, transparency, legitimacy, and sustainable public-sector development.',
  array[
    'Governance gaps and weak accountability systems',
    'Limited alignment between policy intent and institutional practice',
    'Insufficient transparency and public trust',
    'Need for ethical leadership and sustainable public-sector performance'
  ],
  array[
    'Governance reform advisory and institutional reviews',
    'Accountability and transparency strengthening',
    'Ethical leadership development for public officials',
    'Policy alignment and performance improvement support',
    'Institutional legitimacy and credibility building'
  ],
  array[
    'Governments',
    'Public institutions',
    'Policymakers',
    'Public-sector leaders'
  ],
  array[
    'Stronger governance and accountability systems',
    'Improved institutional transparency',
    'More ethical and responsible public leadership',
    'Greater public-sector credibility and legitimacy'
  ],
  'published',
  1
),
(
  'university-research-collaborations',
  'University Research Collaborations',
  'Partnering with universities and research institutions on collaborative research, academic publications, conferences, institutional studies, framework development, curriculum support, and value-systems scholarship.',
  array[
    'Need for applied value-systems research',
    'Limited bridges between scholarship and institutional practice',
    'Demand for curriculum and framework support',
    'Gaps in collaborative research on governance and responsibility'
  ],
  array[
    'Collaborative research projects',
    'Academic publications and conferences',
    'Institutional studies and framework development',
    'Curriculum and scholarly support',
    'Value-systems research partnerships'
  ],
  array[
    'Universities',
    'Research institutions',
    'Researchers',
    'Students and academic leaders'
  ],
  array[
    'Stronger research collaboration networks',
    'Evidence-based contributions to scholarship and practice',
    'Enhanced curriculum and learning resources',
    'Broader dissemination of value-systems knowledge'
  ],
  'published',
  2
),
(
  'corporate-value-alignment',
  'Corporate Value Alignment Consulting',
  'Helping corporations align strategy, leadership, culture, operations, governance, corporate responsibility, sustainability, and stakeholder expectations.',
  array[
    'Misalignment between stated values and operational practice',
    'Governance, ethics, and responsibility gaps',
    'Weak stakeholder trust and transparency',
    'Sustainability treated as compliance rather than strategy'
  ],
  array[
    'Value and strategy alignment reviews',
    'Governance and ethics advisory',
    'Corporate responsibility and sustainability planning',
    'Stakeholder trust and disclosure-quality improvement',
    'Institutional transformation support'
  ],
  array[
    'Corporations',
    'Corporate boards and executives',
    'Sustainability and governance teams'
  ],
  array[
    'Closer alignment of strategy with values and responsibility',
    'Stronger governance and ethical practice',
    'Improved stakeholder trust',
    'More sustainable long-term business performance'
  ],
  'published',
  3
),
(
  'sme-development-sustainability',
  'SME Development and Sustainability Training',
  'Equipping small and medium-sized enterprises with practical skills in governance, resilience, business values, ethical leadership, accountability, responsible growth, and sustainability.',
  array[
    'Limited governance and institutional capacity',
    'Pressure to grow without sustainable foundations',
    'Need for practical ethics and accountability tools',
    'Weak resilience in changing economic environments'
  ],
  array[
    'Governance and business values training',
    'Resilience and responsible growth workshops',
    'Ethical leadership development',
    'Sustainability and accountability capacity building',
    'Practical institutional improvement planning'
  ],
  array[
    'Small and medium-sized enterprises',
    'SME owners and managers',
    'Enterprise development partners'
  ],
  array[
    'Stronger SME governance foundations',
    'Improved resilience and responsible growth practices',
    'Greater capacity for ethical leadership',
    'Better integration of sustainability into enterprise strategy'
  ],
  'published',
  4
),
(
  'value-systems-research-development',
  'Value Systems Research and Development',
  'Developing, testing, documenting, and improving value-based institutional frameworks, assessment methodologies, strategic tools, policy models, and the BVSDQ–CSRDQ Framework.',
  array[
    'Need for rigorous, practical value-systems frameworks',
    'Gaps between theory and institutional application',
    'Limited tools for assessing values, responsibility, and disclosure quality',
    'Demand for evidence-based institutional models'
  ],
  array[
    'Framework research and testing',
    'Assessment methodology development',
    'Strategic tool and policy model design',
    'Documentation and knowledge production',
    'Continuous refinement of the BVSDQ–CSRDQ Framework'
  ],
  array[
    'Researchers',
    'Universities',
    'Policymakers',
    'Institutional leaders',
    'Development agencies'
  ],
  array[
    'Improved institutional frameworks and tools',
    'Stronger evidence base for transformation work',
    'Practical models for governance and responsibility',
    'Expanded scholarship on integrated value systems'
  ],
  'published',
  5
),
(
  'sustainable-development-community-impact',
  'Sustainable Development and Community Impact Programmes',
  'Connecting institutional development with social, economic, environmental, and community outcomes that create meaningful, inclusive, and lasting value.',
  array[
    'Institutional development detached from community impact',
    'Weak links between performance and societal value',
    'Need for inclusive and lasting development outcomes',
    'Limited integration of sustainability into institutional strategy'
  ],
  array[
    'Institutional programmes linked to community outcomes',
    'Sustainability and social impact planning',
    'Stakeholder and community engagement support',
    'Inclusive development advisory',
    'Long-term value creation initiatives'
  ],
  array[
    'NGOs',
    'Development agencies',
    'Governments',
    'Community-focused institutions',
    'Corporations seeking responsible impact'
  ],
  array[
    'Stronger connection between institutions and community value',
    'More inclusive and sustainable development approaches',
    'Improved social and environmental responsibility practice',
    'Meaningful long-term societal impact'
  ],
  'published',
  6
)
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  challenges = excluded.challenges,
  activities = excluded.activities,
  beneficiaries = excluded.beneficiaries,
  outcomes = excluded.outcomes,
  status = excluded.status,
  sort_order = excluded.sort_order,
  updated_at = now();

-- ---------------------------------------------------------------------------
-- Services (10)
-- ---------------------------------------------------------------------------
insert into public.services (
  slug,
  title,
  short_description,
  intended_for,
  areas_covered,
  expected_value,
  status,
  sort_order
) values
(
  'institutional-research',
  'Institutional Research',
  'Evidence-based research that examines governance, value systems, accountability, responsibility, and institutional performance to inform strategy, policy, and practice.',
  array['Governments, universities, research institutions, corporations, NGOs, and development agencies seeking rigorous institutional insight.'],
  array[
    'Value-systems research',
    'Governance and accountability studies',
    'Institutional performance analysis',
    'Policy-relevant evidence development'
  ],
  array['Provides a credible knowledge base for institutional decision-making, reform, and long-term improvement.'],
  'published',
  1
),
(
  'governance-and-value-systems-consulting',
  'Governance and Value-Systems Consulting',
  'Advisory support that helps institutions strengthen governance, ethics, accountability, and the alignment of organizational values with strategy and practice.',
  array['Public institutions, corporations, SMEs, NGOs, and institutional leaders seeking governance and values alignment.'],
  array[
    'Governance reviews',
    'Ethical leadership and accountability',
    'Values and strategy alignment',
    'Institutional improvement planning'
  ],
  array['Helps institutions build clearer, more responsible, and more coherent systems of direction and oversight.'],
  'published',
  2
),
(
  'institutional-assessment',
  'Institutional Assessment',
  'Structured assessments that identify strengths, gaps, and opportunities across governance, performance, responsibility, disclosure quality, and value alignment.',
  array['Organizations preparing for reform, transformation, reporting improvement, or strategic realignment.'],
  array[
    'Value-alignment analysis',
    'Governance and accountability review',
    'Disclosure-quality evaluation',
    'Sustainability and responsibility assessment'
  ],
  array['Creates a clear diagnostic foundation for prioritized, evidence-based institutional action.'],
  'published',
  3
),
(
  'leadership-and-governance-training',
  'Leadership and Governance Training',
  'Practical training that equips leaders and teams with knowledge and capabilities in ethical leadership, governance, accountability, and sustainable institutional practice.',
  array['Public officials, corporate leaders, SME managers, researchers, students, and development practitioners.'],
  array[
    'Ethical leadership',
    'Governance and accountability',
    'Organizational values',
    'Corporate citizenship and sustainability'
  ],
  array['Builds institutional capacity for responsible leadership and durable governance practice.'],
  'published',
  4
),
(
  'corporate-value-alignment',
  'Corporate Value Alignment',
  'Support for corporations seeking to align culture, leadership, operations, governance, and stakeholder expectations with stated values and long-term purpose.',
  array['Corporations, boards, executives, and sustainability or governance teams.'],
  array[
    'Strategy and values integration',
    'Culture and leadership alignment',
    'Stakeholder trust building',
    'Responsible business practice'
  ],
  array['Strengthens coherence between what an organization says, does, measures, and discloses.'],
  'published',
  5
),
(
  'sustainability-and-corporate-citizenship-advisory',
  'Sustainability and Corporate Citizenship Advisory',
  'Advisory services that help institutions integrate sustainability, social responsibility, and corporate citizenship into strategy, operations, and stakeholder engagement.',
  array['Corporations, SMEs, NGOs, and public institutions seeking responsible and sustainable development pathways.'],
  array[
    'Corporate social responsibility strategy',
    'Sustainability planning',
    'Community and stakeholder impact',
    'Corporate citizenship practice'
  ],
  array['Supports institutions in moving from compliance-oriented responsibility to purposeful, lasting impact.'],
  'published',
  6
),
(
  'research-collaboration',
  'Research Collaboration',
  'Partnerships with universities, research bodies, and institutional partners on collaborative studies, publications, conferences, and framework development.',
  array['Universities, research institutions, policymakers, and scholarly partners.'],
  array[
    'Collaborative research projects',
    'Academic publications',
    'Conferences and scholarly exchange',
    'Framework and curriculum support'
  ],
  array['Advances shared knowledge and strengthens the scholarly foundation of institutional transformation.'],
  'published',
  7
),
(
  'publishing-and-knowledge-development',
  'Publishing and Knowledge Development',
  'Development and dissemination of books, research reports, policy papers, guides, and thought-leadership materials that advance value-systems knowledge.',
  array['Authors, institutions, researchers, and partners seeking rigorous knowledge products.'],
  array[
    'Books and research reports',
    'Policy papers and institutional guides',
    'Training materials',
    'Framework documentation'
  ],
  array['Makes institutional knowledge accessible, durable, and useful for teaching, policy, and practice.'],
  'published',
  8
),
(
  'policy-and-framework-development',
  'Policy and Framework Development',
  'Design and refinement of institutional frameworks, policy tools, and strategic models that support governance, responsibility, and sustainable performance.',
  array['Governments, development agencies, universities, and institutions developing policy or strategic frameworks.'],
  array[
    'Framework design',
    'Policy tools and models',
    'Strategic KPI development',
    'Institutional guidance documents'
  ],
  array['Provides structured tools that help institutions translate principles into practical systems.'],
  'published',
  9
),
(
  'sme-capacity-building',
  'SME Capacity Building',
  'Practical capacity building that helps small and medium-sized enterprises strengthen governance, resilience, business values, accountability, and sustainable growth.',
  array['SME owners, managers, and enterprise development partners.'],
  array[
    'Governance foundations',
    'Business values and ethical leadership',
    'Resilience and responsible growth',
    'Sustainability capacity'
  ],
  array['Helps SMEs build stronger institutional foundations for responsible and durable enterprise development.'],
  'published',
  10
)
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  intended_for = excluded.intended_for,
  areas_covered = excluded.areas_covered,
  expected_value = excluded.expected_value,
  status = excluded.status,
  sort_order = excluded.sort_order,
  updated_at = now();

-- ---------------------------------------------------------------------------
-- Site settings
-- ---------------------------------------------------------------------------
insert into public.site_settings (key, value, description) values
  ('contact_email', to_jsonb('info@BGIVS.com'::text), 'Primary contact email'),
  ('contact_phone', to_jsonb('Orange: 72603182 / Mascom: 77889707'::text), 'Primary contact phone'),
  ('location', to_jsonb('Gaborone, Botswana'::text), 'Institute location'),
  ('site_name', to_jsonb('Babobiz Global Institute of Value Systems'::text), 'Full institute name'),
  ('short_name', to_jsonb('BGIVS'::text), 'Short institute name'),
  ('tagline', to_jsonb('From Metrics to Meaning'::text), 'Site tagline'),
  (
    'data_retention_days',
    jsonb_build_object('days', null, 'note', 'Pending BGIVS approval'),
    'Data retention policy placeholder'
  )
on conflict (key) do update set
  value = excluded.value,
  description = excluded.description,
  updated_at = now();
