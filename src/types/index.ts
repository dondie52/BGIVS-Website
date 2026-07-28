export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  items: NavLink[];
};

export type StrategicPillar = {
  id: string;
  name: string;
  description: string;
  keyActivities: string[];
  beneficiaries: string[];
  outcomes: string[];
  cta: { label: string; href: string };
};

export type CoreValue = {
  id: string;
  name: string;
  description: string;
};

export type Programme = {
  id: string;
  title: string;
  overview: string;
  challenges: string[];
  activities: string[];
  beneficiaries: string[];
  outcomes: string[];
};

export type Service = {
  id: string;
  title: string;
  description: string;
  whoFor: string;
  areas: string[];
  institutionalValue: string;
};

export type Beneficiary = {
  id: string;
  name: string;
  description: string;
  href: string;
};

export type GovernanceUnit = {
  id: string;
  name: string;
  responsibility: string;
  level: "board" | "executive" | "unit";
};

export type Publication = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  category: "Books";
  image: string;
  description: string;
  topics: string[];
};

export type PublicationCategory = {
  id: string;
  name: string;
  emptyMessage?: string;
};

export type FrameworkArea = {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
};

export type Outcome = {
  id: string;
  label: string;
};

export type ContactOption = {
  value: string;
  label: string;
};
