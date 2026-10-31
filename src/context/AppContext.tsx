import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  PageView,
  Village,
  DevelopmentProject,
  Facility,
  GovernmentScheme,
  IssueReport,
  IssueStatus,
  ProjectStatus,
  CitizenDocumentApplication,
  DocumentApplicationStatus,
  DocumentTypeInfo
} from '../types';
import {
  MOCK_VILLAGES,
  MOCK_PROJECTS,
  MOCK_FACILITIES,
  MOCK_SCHEMES,
  INITIAL_ISSUE_REPORTS,
  MAHARASHTRA_DOCUMENT_TYPES,
  INITIAL_DOCUMENT_APPLICATIONS
} from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedVillageId: string;
  setSelectedVillageId: (id: string) => void;
  selectedVillage: Village;
  allVillages: Village[];
  projects: DevelopmentProject[];
  facilities: Facility[];
  schemes: GovernmentScheme[];
  issues: IssueReport[];
  navigateTo: (page: PageView, villageId?: string) => void;
  addIssueReport: (data: {
    villageId: string;
    category: IssueReport['category'];
    titleMr: string;
    titleEn: string;
    description: string;
    landmark: string;
    citizenName?: string;
    citizenPhone?: string;
    photoUrl?: string;
  }) => string;
  updateIssueStatus: (id: string, status: IssueStatus, remarks?: string) => void;
  updateProjectProgress: (projectId: string, progressPercent: number, status: ProjectStatus) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  isFactsheetModalOpen: boolean;
  setIsFactsheetModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProjectModal: DevelopmentProject | null;
  setSelectedProjectModal: (proj: DevelopmentProject | null) => void;
  selectedSchemeModal: GovernmentScheme | null;
  setSelectedSchemeModal: (scheme: GovernmentScheme | null) => void;
  documentApplications: CitizenDocumentApplication[];
  documentTypes: DocumentTypeInfo[];
  applyForDocument: (data: {
    villageId: string;
    documentTypeId: string;
    applicantName: string;
    applicantAadhaar: string;
    applicantPhone: string;
    applicantAddress: string;
    wardNumber?: number;
    purpose: string;
    urgency: 'normal' | 'urgent';
    deliveryMode: 'digital-download' | 'gram-panchayat-counter' | 'post';
    attachedDocs: string[];
  }) => string;
  updateDocumentStatus: (id: string, status: DocumentApplicationStatus, remarks?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_ISSUES_KEY = 'gram_drishti_issues_v1';
const LOCAL_STORAGE_DOC_APPS_KEY = 'gram_drishti_doc_apps_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start in English as mandated
  const [language, setLanguage] = useState<Language>('en');

  // Ensure any cached legacy language key is cleared so app strictly boots in English
  useEffect(() => {
    try {
      localStorage.removeItem('gram_drishti_lang');
    } catch {
      // ignore
    }
  }, []);

  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedVillageId, setSelectedVillageId] = useState<string>('malegaon-ardhapur-nanded');
  const [allVillages] = useState<Village[]>(MOCK_VILLAGES);
  const [projects, setProjects] = useState<DevelopmentProject[]>(MOCK_PROJECTS);
  const [facilities] = useState<Facility[]>(MOCK_FACILITIES);
  const [schemes] = useState<GovernmentScheme[]>(MOCK_SCHEMES);
  const [documentTypes] = useState<DocumentTypeInfo[]>(MAHARASHTRA_DOCUMENT_TYPES);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isFactsheetModalOpen, setIsFactsheetModalOpen] = useState<boolean>(false);
  const [selectedProjectModal, setSelectedProjectModal] = useState<DevelopmentProject | null>(null);
  const [selectedSchemeModal, setSelectedSchemeModal] = useState<GovernmentScheme | null>(null);

  // Issues with local storage persistence
  const [issues, setIssues] = useState<IssueReport[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ISSUES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_ISSUE_REPORTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ISSUES_KEY, JSON.stringify(issues));
    } catch {
      // ignore
    }
  }, [issues]);

  // Citizen Document Applications with local storage persistence
  const [documentApplications, setDocumentApplications] = useState<CitizenDocumentApplication[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_DOC_APPS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_DOCUMENT_APPLICATIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_DOC_APPS_KEY, JSON.stringify(documentApplications));
    } catch {
      // ignore
    }
  }, [documentApplications]);

  const selectedVillage =
    allVillages.find((v) => v.id === selectedVillageId) || allVillages[0];

  const navigateTo = (page: PageView, villageId?: string) => {
    if (villageId) {
      setSelectedVillageId(villageId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addIssueReport = (data: {
    villageId: string;
    category: IssueReport['category'];
    titleMr: string;
    titleEn: string;
    description: string;
    landmark: string;
    citizenName?: string;
    citizenPhone?: string;
    photoUrl?: string;
  }): string => {
    const village = allVillages.find((v) => v.id === data.villageId) || selectedVillage;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `GRM-2026-${randomSuffix}`;

    const newReport: IssueReport = {
      id: trackingId,
      villageId: village.id,
      villageNameMr: village.nameMr,
      villageNameEn: village.nameEn,
      category: data.category,
      titleMr: data.titleMr || data.description.slice(0, 40),
      titleEn: data.titleEn || data.description.slice(0, 40),
      description: data.description,
      landmark: data.landmark,
      citizenName: data.citizenName || 'नागरिक (Citizen)',
      citizenPhone: data.citizenPhone || '',
      photoUrl: data.photoUrl,
      status: 'submitted',
      submittedAt: new Date().toLocaleDateString('mr-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      updatedAt: new Date().toLocaleDateString('mr-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      assignedDepartmentMr: 'ग्रामपंचायत सामान्य प्रशासन व संबंधित अभियांत्रिकी कक्ष',
      assignedDepartmentEn: 'Gram Panchayat Administration & Engineering Cell',
      assignedOfficerRemarks: 'तक्रार प्राप्त झाली असून प्राथमिक नोंदणी पूर्ण झाली आहे.'
    };

    setIssues((prev) => [newReport, ...prev]);
    return trackingId;
  };

  const updateIssueStatus = (id: string, status: IssueStatus, remarks?: string) => {
    setIssues((prev) =>
      prev.map((iss) => {
        if (iss.id === id) {
          return {
            ...iss,
            status,
            assignedOfficerRemarks: remarks || iss.assignedOfficerRemarks,
            updatedAt: new Date().toLocaleDateString('mr-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
          };
        }
        return iss;
      })
    );
  };

  const updateProjectProgress = (
    projectId: string,
    progressPercent: number,
    status: ProjectStatus
  ) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            progressPercent,
            status
          };
        }
        return p;
      })
    );
  };

  const applyForDocument = (data: {
    villageId: string;
    documentTypeId: string;
    applicantName: string;
    applicantAadhaar: string;
    applicantPhone: string;
    applicantAddress: string;
    wardNumber?: number;
    purpose: string;
    urgency: 'normal' | 'urgent';
    deliveryMode: 'digital-download' | 'gram-panchayat-counter' | 'post';
    attachedDocs: string[];
  }): string => {
    const village = allVillages.find((v) => v.id === data.villageId) || selectedVillage;
    const docType = documentTypes.find((d) => d.id === data.documentTypeId) || documentTypes[0];
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `MH-RTS-2026-${randomSuffix}`;

    const deliveryDays = data.urgency === 'urgent' ? Math.max(1, Math.floor(docType.serviceDays / 2)) : docType.serviceDays;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + deliveryDays);

    const isTalathi = docType.category === 'revenue';
    const officerNameMr = isTalathi ? village.administration.talathiNameMr : village.administration.gramSevakNameMr;
    const officerNameEn = isTalathi ? village.administration.talathiNameEn : village.administration.gramSevakNameEn;
    const officerContact = isTalathi ? village.administration.talathiContact : village.administration.gramSevakContact;

    const newApp: CitizenDocumentApplication = {
      id: trackingId,
      villageId: village.id,
      villageNameMr: village.nameMr,
      villageNameEn: village.nameEn,
      documentTypeId: docType.id,
      documentNameMr: docType.nameMr,
      documentNameEn: docType.nameEn,
      applicantName: data.applicantName,
      applicantAadhaar: data.applicantAadhaar.length >= 4 ? `XXXX-XXXX-${data.applicantAadhaar.slice(-4)}` : 'XXXX-XXXX-1234',
      applicantPhone: data.applicantPhone,
      applicantAddress: data.applicantAddress,
      wardNumber: data.wardNumber || 1,
      purpose: data.purpose,
      urgency: data.urgency,
      deliveryMode: data.deliveryMode,
      attachedDocs: data.attachedDocs,
      status: 'submitted',
      submittedAt: new Date().toLocaleDateString('mr-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      estimatedDeliveryDate: estDate.toLocaleDateString('mr-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      assignedOfficerNameMr: officerNameMr,
      assignedOfficerNameEn: officerNameEn,
      assignedOfficerContact: officerContact,
      officerRemarksMr: 'अर्ज यशस्वीरीत्या दाखल झाला असून कागदपत्रे तपासणीसाठी पाठवण्यात आली आहेत.',
      officerRemarksEn: 'Application submitted successfully. Under primary document scrutiny.'
    };

    setDocumentApplications((prev) => [newApp, ...prev]);
    return trackingId;
  };

  const updateDocumentStatus = (id: string, status: DocumentApplicationStatus, remarks?: string) => {
    setDocumentApplications((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const digitalCertificateId =
            status === 'ready-for-download' || status === 'approved'
              ? app.digitalCertificateId || `CERT-MH-${Math.floor(1000 + Math.random() * 9000)}-2026`
              : app.digitalCertificateId;

          return {
            ...app,
            status,
            digitalCertificateId,
            officerRemarksMr: remarks || app.officerRemarksMr,
            officerRemarksEn: remarks || app.officerRemarksEn
          };
        }
        return app;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currentPage,
        setCurrentPage,
        selectedVillageId,
        setSelectedVillageId,
        selectedVillage,
        allVillages,
        projects,
        facilities,
        schemes,
        issues,
        documentApplications,
        documentTypes,
        applyForDocument,
        updateDocumentStatus,
        navigateTo,
        addIssueReport,
        updateIssueStatus,
        updateProjectProgress,
        isAiModalOpen,
        setIsAiModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        isFactsheetModalOpen,
        setIsFactsheetModalOpen,
        searchQuery,
        setSearchQuery,
        selectedProjectModal,
        setSelectedProjectModal,
        selectedSchemeModal,
        setSelectedSchemeModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
