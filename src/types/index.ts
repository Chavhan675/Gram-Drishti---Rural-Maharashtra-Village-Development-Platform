export type Language = 'mr' | 'en';

export type PageView =
  | 'home'
  | 'search'
  | 'village-overview'
  | 'village-profile'
  | 'village-development'
  | 'village-facilities'
  | 'village-statistics'
  | 'village-agriculture'
  | 'schemes'
  | 'map'
  | 'report-issue'
  | 'track-issue'
  | 'announcements'
  | 'admin'
  | 'about'
  | 'ml-analytics'
  | 'presentation'
  | 'village-3d'
  | 'ai-chat'
  | 'gis-planner';

export type ProjectStatus = 'planned' | 'in-progress' | 'completed' | 'delayed';

export type IssueStatus = 'submitted' | 'under-review' | 'assigned' | 'in-progress' | 'resolved';

export type FacilityCategory = 'education' | 'healthcare' | 'water' | 'electricity' | 'agriculture' | 'civic' | 'banking';

export type SchemeCategory =
  | 'all'
  | 'farmers'
  | 'students'
  | 'women'
  | 'health'
  | 'housing'
  | 'social-welfare'
  | 'senior';

export interface DemographicData {
  totalPopulation: number;
  malePopulation: number;
  femalePopulation: number;
  households: number;
  literacyRate: number; // percentage
  maleLiteracyRate: number;
  femaleLiteracyRate: number;
  workingPopulation: number;
  cultivators: number;
  agriculturalLaborers: number;
  scPopulation: number;
  stPopulation: number;
  areaHectares: number;
}

export interface AdministrativeInfo {
  gramPanchayatNameMr: string;
  gramPanchayatNameEn: string;
  sarpanchNameMr: string;
  sarpanchNameEn: string;
  sarpanchContact: string;
  gramSevakNameMr: string;
  gramSevakNameEn: string;
  gramSevakContact: string;
  talathiNameMr: string;
  talathiNameEn: string;
  talathiContact: string;
  wardCount: number;
  assemblyConstituencyMr: string;
  assemblyConstituencyEn: string;
  lokSabhaConstituencyMr: string;
  lokSabhaConstituencyEn: string;
  lgdCode: string; // Local Government Directory Code
  pincode: string;
}

export interface DevelopmentProject {
  id: string;
  villageId: string;
  titleMr: string;
  titleEn: string;
  category: 'roads' | 'water' | 'education' | 'sanitation' | 'electricity' | 'health';
  departmentMr: string;
  departmentEn: string;
  budgetLakhs: number;
  expenditureLakhs: number;
  progressPercent: number;
  status: ProjectStatus;
  startDate: string;
  targetDate: string;
  completionDate?: string;
  contractorMr: string;
  contractorEn: string;
  sanctionOrderNumber: string;
  verifiedSource: string;
  descriptionMr: string;
  descriptionEn: string;
}

export interface Facility {
  id: string;
  villageId: string;
  nameMr: string;
  nameEn: string;
  category: FacilityCategory;
  typeMr: string;
  typeEn: string;
  operationalStatus: 'active' | 'under-maintenance' | 'partially-active';
  timingsMr: string;
  timingsEn: string;
  capacityStaffMr: string;
  capacityStaffEn: string;
  addressMr: string;
  addressEn: string;
  contactNumber?: string;
  hasElectricity: boolean;
  hasPipedWater: boolean;
  hasInternet: boolean;
  verifiedDate: string;
}

export interface AgricultureProfile {
  majorCropsMr: string[];
  majorCropsEn: string[];
  soilTypeMr: string;
  soilTypeEn: string;
  irrigatedAreaPercent: number;
  waterSourceMr: string;
  waterSourceEn: string;
  nearestApmcMr: string;
  nearestApmcEn: string;
  apmcDistanceKm: number;
  krishiSevaKendraCount: number;
  farmPondsCount: number;
  dripIrrigationCoveragePercent: number;
}

export interface ScorecardMetric {
  titleMr: string;
  titleEn: string;
  score: number; // 0 - 100
  ratingMr: string;
  ratingEn: string;
  highlightsMr: string[];
  highlightsEn: string[];
}

export interface VillageScorecard {
  education: ScorecardMetric;
  healthcare: ScorecardMetric;
  infrastructure: ScorecardMetric;
  waterSanitation: ScorecardMetric;
  electricityConnectivity: ScorecardMetric;
  agriculture: ScorecardMetric;
  socialDevelopment: ScorecardMetric;
}

export interface Village {
  id: string;
  nameMr: string;
  nameEn: string;
  talukaMr: string;
  talukaEn: string;
  districtMr: string;
  districtEn: string;
  divisionMr: string;
  divisionEn: string;
  pincode: string;
  lgdCode: string;
  latitude: number;
  longitude: number;
  isDemoData: boolean;
  dataVerifiedDate: string;
  officialSource: string;
  demographics: DemographicData;
  administration: AdministrativeInfo;
  agriculture: AgricultureProfile;
  scorecard: VillageScorecard;
  coverImage?: string;
}

export interface GovernmentScheme {
  id: string;
  nameMr: string;
  nameEn: string;
  shortDescMr: string;
  shortDescEn: string;
  departmentMr: string;
  departmentEn: string;
  category: SchemeCategory;
  eligibilityMr: string[];
  eligibilityEn: string[];
  benefitsMr: string[];
  benefitsEn: string[];
  documentsRequiredMr: string[];
  documentsRequiredEn: string[];
  applicationProcessMr: string;
  applicationProcessEn: string;
  officialPortalUrl: string;
  helpline: string;
  lastVerifiedDate: string;
  isCentrallySponsored: boolean;
}

export interface IssueReport {
  id: string;
  villageId: string;
  villageNameMr: string;
  villageNameEn: string;
  category: 'roads' | 'water' | 'electricity' | 'sanitation' | 'drainage' | 'street-lights' | 'healthcare' | 'education' | 'other';
  titleMr: string;
  titleEn: string;
  description: string;
  landmark: string;
  citizenName?: string;
  citizenPhone?: string;
  photoUrl?: string;
  status: IssueStatus;
  submittedAt: string;
  updatedAt: string;
  assignedDepartmentMr: string;
  assignedDepartmentEn: string;
  assignedOfficerRemarks?: string;
}

export interface Announcement {
  id: string;
  villageId?: string; // Optional: can be state-wide or village specific
  titleMr: string;
  titleEn: string;
  departmentMr: string;
  departmentEn: string;
  summaryMr: string;
  summaryEn: string;
  date: string;
  isUrgent?: boolean;
  sourceUrl?: string;
}
