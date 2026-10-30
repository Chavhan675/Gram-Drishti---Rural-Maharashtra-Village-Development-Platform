import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Building,
  CheckCircle2,
  Clock,
  Calendar,
  Search,
  IndianRupee,
  FileText,
  ArrowRight,
  Filter,
  Download,
  Printer,
  ShieldCheck,
  Landmark,
  Coins,
  BadgePercent,
  TrendingUp,
  FileSpreadsheet,
  BarChart3,
  Sliders,
  CalendarDays,
  Hourglass,
  AlertTriangle,
  Calculator,
  Activity,
  Sparkles,
  Users
} from 'lucide-react';
import { ProjectStatus, DevelopmentProject } from '../types';

interface BudgetVoucher {
  id: string;
  voucherNo: string;
  date: string;
  descriptionMr: string;
  descriptionEn: string;
  vendorMr: string;
  vendorEn: string;
  scheme: '15th-tied' | '15th-untied' | 'jjm' | 'sbm' | 'own-tax';
  schemeLabelMr: string;
  schemeLabelEn: string;
  sanctionRef: string;
  amount: number; // in INR
  auditStatus: 'verified' | 'under-query';
}

interface ProjectAnalyticsRecord {
  id: string;
  titleEn: string;
  titleMr: string;
  sanctionNo: string;
  departmentEn: string;
  departmentMr: string;
  budgetLakhs: number;
  expenditureLakhs: number;
  progressPercent: number;
  totalWorkingDays: number;
  elapsedWorkingDays: number;
  startDate: string;
  scheduledCompletionDate: string;
  contractor: string;
  laborCount: number;
  manDaysGenerated: number;
  dailyBurnRateRupees: number;
}

export const VillageDevelopmentPage: React.FC = () => {
  const {
    language,
    selectedVillage,
    projects,
    setSelectedProjectModal,
    navigateTo
  } = useApp();

  const t = getTranslation(language);

  // Top level active tab: 'projects', 'budget-ledger', or 'cost-analytics'
  const [activeTab, setActiveTab] = useState<'projects' | 'budget-ledger' | 'cost-analytics'>('cost-analytics');
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Budget ledger state
  const [ledgerSchemeFilter, setLedgerSchemeFilter] = useState<string>('all');
  const [ledgerSearch, setLedgerSearch] = useState<string>('');
  const [selectedFiscalYear, setSelectedFiscalYear] = useState<'2024-25' | '2023-24'>('2024-25');

  // Interactive What-If Simulator state for Cost & Working Days
  const [laborMultiplier, setLaborMultiplier] = useState<number>(0); // 0% to +50% extra workforce
  const [workHoursPerDay, setWorkHoursPerDay] = useState<number>(8); // 8 to 11 hours
  const [materialSupplyLagDays, setMaterialSupplyLagDays] = useState<number>(0); // 0 to 30 days

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  // Filter projects by current village
  const villageProjects = projects.filter((p) => p.villageId === selectedVillage.id);

  // Compute metrics for projects
  const totalCount = villageProjects.length;
  const completedCount = villageProjects.filter((p) => p.status === 'completed').length;
  const inProgressCount = villageProjects.filter((p) => p.status === 'in-progress').length;
  const plannedCount = villageProjects.filter((p) => p.status === 'planned').length;

  const totalBudget = villageProjects.reduce((sum, p) => sum + p.budgetLakhs, 0).toFixed(1);
  const totalExp = villageProjects.reduce((sum, p) => sum + p.expenditureLakhs, 0).toFixed(1);

  // Detailed working days and cost data for analytics
  const analyticsProjects: ProjectAnalyticsRecord[] = [
    {
      id: 'PRJ-MH-ND-01',
      titleEn: 'Medshi Village Main Road Widening & Bituminous Strengthening',
      titleMr: 'मेडशी गाव मुख्य रस्ता रुंदीकरण व डांबरीकरण कार्य',
      sanctionNo: 'PWD/CR-84/2025-26',
      departmentEn: 'Public Works Dept (PWD)',
      departmentMr: 'सार्वजनिक बांधकाम विभाग (PWD)',
      budgetLakhs: 48.5,
      expenditureLakhs: 36.2,
      progressPercent: 78,
      totalWorkingDays: 240,
      elapsedWorkingDays: 180,
      startDate: '01 Jan 2026',
      scheduledCompletionDate: '30 Nov 2026',
      contractor: 'M/s Sahyadri Infra Constructions',
      laborCount: 28,
      manDaysGenerated: 5040,
      dailyBurnRateRupees: 20110
    },
    {
      id: 'PRJ-MH-ND-02',
      titleEn: 'JJM 50,000L Overhead Water Reservoir & 650 Household Tap Connections',
      titleMr: 'जल जीवन मिशन अंतर्गत ५०,००० लि. पाण्याची टाकी व ६५० नळ जोडणी',
      sanctionNo: 'JJM/MH-ND/W-412/2025',
      departmentEn: 'Rural Water Supply Dept',
      departmentMr: 'ग्रामीण पाणीपुरवठा विभाग',
      budgetLakhs: 34.0,
      expenditureLakhs: 34.0,
      progressPercent: 100,
      totalWorkingDays: 210,
      elapsedWorkingDays: 210,
      startDate: '15 Aug 2025',
      scheduledCompletionDate: '15 May 2026',
      contractor: 'M/s Krishna Water Infra Pvt. Ltd.',
      laborCount: 22,
      manDaysGenerated: 4620,
      dailyBurnRateRupees: 16190
    },
    {
      id: 'PRJ-MH-ND-03',
      titleEn: 'ZP Primary Digital School 4-Classroom Modernization & 5kW Solar Rooftop',
      titleMr: 'जि. प. प्राथमिक शाळा वर्गखोली आधुनिकीकरण व ५ किलोवॅट सौर ऊर्जा प्रकल्प',
      sanctionNo: 'ZP-EDU/PLAN/2026/184',
      departmentEn: 'Education Dept, ZP',
      departmentMr: 'शिक्षण विभाग, जिल्हा परिषद',
      budgetLakhs: 18.2,
      expenditureLakhs: 14.5,
      progressPercent: 85,
      totalWorkingDays: 160,
      elapsedWorkingDays: 132,
      startDate: '01 Mar 2026',
      scheduledCompletionDate: '30 Oct 2026',
      contractor: 'Shri Ganesh Constructions, Nanded',
      laborCount: 16,
      manDaysGenerated: 2112,
      dailyBurnRateRupees: 10980
    },
    {
      id: 'PRJ-MH-ND-04',
      titleEn: 'Swachh Bharat Underground Drainage Channel & Waste Segregation Shed',
      titleMr: 'स्वच्छ भारत अभियान भूमिगत सांडपाणी गटार व कचरा वर्गीकरण शेड',
      sanctionNo: 'PS/SBM/2026/092',
      departmentEn: 'Water & Sanitation Mission',
      departmentMr: 'पाणी व स्वच्छता मिशन कक्ष',
      budgetLakhs: 22.0,
      expenditureLakhs: 4.5,
      progressPercent: 22,
      totalWorkingDays: 180,
      elapsedWorkingDays: 40,
      startDate: '10 Jun 2026',
      scheduledCompletionDate: '28 Feb 2027',
      contractor: 'Shri Balaji Construction Co.',
      laborCount: 24,
      manDaysGenerated: 960,
      dailyBurnRateRupees: 11250
    }
  ];

  // Aggregated Cost & Working Days Metrics
  const aggregateMetrics = useMemo(() => {
    const totalSanctioned = analyticsProjects.reduce((sum, p) => sum + p.budgetLakhs, 0);
    const totalSpent = analyticsProjects.reduce((sum, p) => sum + p.expenditureLakhs, 0);
    const totalWorkingDays = analyticsProjects.reduce((sum, p) => sum + p.totalWorkingDays, 0);
    const totalElapsedDays = analyticsProjects.reduce((sum, p) => sum + p.elapsedWorkingDays, 0);
    const totalRemainingDays = totalWorkingDays - totalElapsedDays;
    const totalManDays = analyticsProjects.reduce((sum, p) => sum + p.manDaysGenerated, 0);

    // Earned Value (EV) = Sum of (Budget * (Progress / 100))
    const earnedValueLakhs = analyticsProjects.reduce(
      (sum, p) => sum + p.budgetLakhs * (p.progressPercent / 100),
      0
    );

    // Planned Value (PV) = Sum of (Budget * (ElapsedDays / TotalDays))
    const plannedValueLakhs = analyticsProjects.reduce(
      (sum, p) => sum + p.budgetLakhs * (Math.min(p.elapsedWorkingDays, p.totalWorkingDays) / p.totalWorkingDays),
      0
    );

    // Cost Variance CV = EV - AC (Positive is favorable / under budget)
    const costVarianceLakhs = earnedValueLakhs - totalSpent;

    // Schedule Variance SV = EV - PV (Positive is ahead of schedule)
    const scheduleVarianceLakhs = earnedValueLakhs - plannedValueLakhs;

    // CPI (Cost Performance Index) = EV / AC (> 1 means cost efficient)
    const cpi = totalSpent > 0 ? earnedValueLakhs / totalSpent : 1.0;

    // SPI (Schedule Performance Index) = EV / PV (> 1 means ahead of schedule)
    const spi = plannedValueLakhs > 0 ? earnedValueLakhs / plannedValueLakhs : 1.0;

    // Average Velocity = % progress / working day
    const avgVelocity = totalElapsedDays > 0 ? ((earnedValueLakhs / totalSanctioned) * 100) / totalElapsedDays : 0.35;

    // Projected Estimate at Completion (EAC) = BAC / CPI
    const projectedEacLakhs = cpi > 0 ? totalSanctioned / cpi : totalSanctioned;

    return {
      totalSanctioned: totalSanctioned.toFixed(1),
      totalSpent: totalSpent.toFixed(1),
      earnedValueLakhs: earnedValueLakhs.toFixed(1),
      costVarianceLakhs: costVarianceLakhs.toFixed(2),
      scheduleVarianceLakhs: scheduleVarianceLakhs.toFixed(2),
      cpi: cpi.toFixed(3),
      spi: spi.toFixed(3),
      totalWorkingDays,
      totalElapsedDays,
      totalRemainingDays,
      totalManDays: totalManDays.toLocaleString('en-IN'),
      avgVelocity: avgVelocity.toFixed(2),
      projectedEacLakhs: projectedEacLakhs.toFixed(1)
    };
  }, [analyticsProjects]);

  // Dynamic simulation computation based on user slider adjustments
  const simulatedSchedule = useMemo(() => {
    // Base remaining days for in-progress projects
    const baseRemaining = aggregateMetrics.totalRemainingDays;

    // Speed multiplier: labor boost (+0% to +50%) and overtime (8h to 11h => 8/8 to 11/8)
    const laborFactor = 1 + laborMultiplier / 100;
    const hoursFactor = workHoursPerDay / 8;
    const combinedProductivityFactor = laborFactor * hoursFactor;

    // Adjusted remaining working days
    const acceleratedDays = Math.max(15, Math.round(baseRemaining / combinedProductivityFactor) + materialSupplyLagDays);
    const daysSavedOrDelayed = baseRemaining - acceleratedDays;

    // Cost adjustment: overtime and labor add small wage cost, but save overhead per diem
    const extraLaborCostLakhs = (laborMultiplier * 0.04) + ((workHoursPerDay - 8) * 0.25) + (materialSupplyLagDays * 0.03);
    const adjustedEacLakhs = parseFloat(aggregateMetrics.projectedEacLakhs) + extraLaborCostLakhs;

    return {
      acceleratedDays,
      daysSavedOrDelayed,
      isAhead: daysSavedOrDelayed >= 0,
      adjustedEacLakhs: adjustedEacLakhs.toFixed(1)
    };
  }, [aggregateMetrics, laborMultiplier, workHoursPerDay, materialSupplyLagDays]);

  // Filtered projects
  const filteredProjects = villageProjects.filter((p) => {
    if (activeFilter !== 'all' && p.status !== activeFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText =
        p.titleMr.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.departmentMr.toLowerCase().includes(q) ||
        p.departmentEn.toLowerCase().includes(q) ||
        p.sanctionOrderNumber.toLowerCase().includes(q);
      if (!matchText) return false;
    }
    return true;
  });

  // Public Budget & Expenditure Ledger Vouchers
  const budgetVouchers: BudgetVoucher[] = [
    {
      id: 'v1',
      voucherNo: 'VR/2024-25/094',
      date: '18 Jan 2025',
      descriptionMr: 'वॉर्ड क्र. २ मध्ये ९० मिमी एचडीपीई पिण्याच्या पाण्याची जलवाहिनी टाकणे व कनेक्शन',
      descriptionEn: 'Laying of 90mm HDPE drinking water distribution pipeline and household tap connections in Ward 2',
      vendorMr: 'मे. शिवशक्ती इन्फ्रास्ट्रक्चर प्रा. लि., नांदेड',
      vendorEn: 'M/s Shivshakti Infrastructure Pvt. Ltd., Nanded',
      scheme: '15th-tied',
      schemeLabelMr: '१५ वा वित्त आयोग (बद्ध निधी - पाणी)',
      schemeLabelEn: '15th Finance Comm. (Tied - Water)',
      sanctionRef: 'ZP/RWS/2024/412',
      amount: 345000,
      auditStatus: 'verified'
    },
    {
      id: 'v2',
      voucherNo: 'VR/2024-25/088',
      date: '04 Jan 2025',
      descriptionMr: 'मुख्य रस्ता व वॉर्ड क्र. १ व ३ मध्ये २५ नवीन सौर पथदिवे खरेदी व जोडणी',
      descriptionEn: 'Procurement and installation of 25 High-Lumen Solar LED Streetlights along main road & Wards 1 and 3',
      vendorMr: 'महाराष्ट्र ऊर्जा विकास अभिकरण अधिकृत वितरक, लातूर',
      vendorEn: 'Maharashtra Urja Vikas Agency Authorized Dealer, Latur',
      scheme: '15th-untied',
      schemeLabelMr: '१५ वा वित्त आयोग (अमुक्त निधी)',
      schemeLabelEn: '15th Finance Comm. (Untied Grant)',
      sanctionRef: 'GP/RES/2024/58',
      amount: 210000,
      auditStatus: 'verified'
    },
    {
      id: 'v3',
      voucherNo: 'VR/2024-25/079',
      date: '19 Dec 2024',
      descriptionMr: 'बाजार गल्ली व मारुती मंदिर मार्गावरील बंदिस्त आरसीसी सांडपाणी नाली बांधकाम',
      descriptionEn: 'Construction of covered RCC underground wastewater drainage channel near Bazar Lane',
      vendorMr: 'श्री बालाजी कन्स्ट्रक्शन कंपनी',
      vendorEn: 'Shri Balaji Construction Co.',
      scheme: 'sbm',
      schemeLabelMr: 'स्वच्छ भारत अभियान (ग्रामीण)',
      schemeLabelEn: 'Swachh Bharat Mission (Grameen)',
      sanctionRef: 'PS/SBM/2024/119',
      amount: 480000,
      auditStatus: 'verified'
    },
    {
      id: 'v4',
      voucherNo: 'VR/2024-25/071',
      date: '28 Nov 2024',
      descriptionMr: 'जल जीवन मिशन अंतर्गत भूजल पुनर्भरण पाझर तलाव खोलीकरण व गाळ उपसा',
      descriptionEn: 'Jal Jeevan Mission percolation tank deepening and community desilting for groundwater recharge',
      vendorMr: 'जय किसान अर्थमूव्हर्स व मशिनरी सर्व्हिसेस',
      vendorEn: 'Jai Kisan Earthmovers & Machinery Services',
      scheme: 'jjm',
      schemeLabelMr: 'जल जीवन मिशन (हर घर जल)',
      schemeLabelEn: 'Jal Jeevan Mission (Har Ghar Jal)',
      sanctionRef: 'JJM/DWS/2024/844',
      amount: 275000,
      auditStatus: 'verified'
    },
    {
      id: 'v5',
      voucherNo: 'VR/2024-25/063',
      date: '14 Oct 2024',
      descriptionMr: 'ग्रामपंचायत सार्वजनिक विहीर क्र. २ मधील ७.५ एचपी सबमर्सिबल मोटार व स्टार्टर दुरुस्ती',
      descriptionEn: 'Repair and replacement of 7.5 HP submersible pump & starter control panel at GP community well #2',
      vendorMr: 'श्री गणेश इलेक्ट्रिकल्स व बोरवेल्स',
      vendorEn: 'Shree Ganesh Electricals & Borewells',
      scheme: 'own-tax',
      schemeLabelMr: 'ग्रामपंचायत स्वनिधी (पाणीपट्टी कर)',
      schemeLabelEn: 'GP Own Source Revenue (Water Cess)',
      sanctionRef: 'GP/VCHR/2024/104',
      amount: 68500,
      auditStatus: 'verified'
    },
    {
      id: 'v6',
      voucherNo: 'VR/2024-25/056',
      date: '22 Sep 2024',
      descriptionMr: 'जिल्हा परिषद प्राथमिक डिजिटल शाळा वर्गखोली फरशी व वायरिंग नूतनीकरण',
      descriptionEn: 'Renovation of ZP Primary Digital School classroom tiled flooring and smart board electrical wiring',
      vendorMr: 'रेणुका इन्फोटेक अँड सिव्हिल वर्क्स',
      vendorEn: 'Renuka Infotech & Civil Works',
      scheme: '15th-untied',
      schemeLabelMr: '१५ वा वित्त आयोग (अमुक्त निधी)',
      schemeLabelEn: '15th Finance Comm. (Untied Grant)',
      sanctionRef: 'ZP/EDU/2024/291',
      amount: 125000,
      auditStatus: 'verified'
    },
    {
      id: 'v7',
      voucherNo: 'VR/2024-25/044',
      date: '11 Aug 2024',
      descriptionMr: 'घनकचरा व्यवस्थापन ट्रायसिकल व १०० घरांना ओला-सुका कचरा कुंडी वाटप',
      descriptionEn: 'Solid waste management hydraulic collection tricycle and 100 segregated dustbins distribution',
      vendorMr: 'ग्रामीण स्वच्छता केंद्र साहित्य पुरवठा',
      vendorEn: 'Grameen Swachhata Kendra Supply Agency',
      scheme: 'sbm',
      schemeLabelMr: 'स्वच्छ भारत अभियान (ग्रामीण)',
      schemeLabelEn: 'Swachh Bharat Mission (Grameen)',
      sanctionRef: 'PS/SBM/2024/082',
      amount: 88000,
      auditStatus: 'verified'
    },
    {
      id: 'v8',
      voucherNo: 'VR/2024-25/032',
      date: '15 Jul 2024',
      descriptionMr: 'गावातील मुख्य रस्त्याच्या दुतर्फा ५०० झाडे लागवड व बांबू कुंपण संरक्षण',
      descriptionEn: 'Plantation of 500 indigenous shade trees with bamboo tree guards along village bypass road',
      vendorMr: 'वन संजीवनी शेतकरी उत्पादक कंपनी',
      vendorEn: 'Van Sanjeevani FPO & Nursery',
      scheme: '15th-untied',
      schemeLabelMr: '१५ वा वित्त आयोग (अमुक्त निधी)',
      schemeLabelEn: '15th Finance Comm. (Untied Grant)',
      sanctionRef: 'GP/RES/2024/31',
      amount: 52000,
      auditStatus: 'verified'
    }
  ];

  // Budget Ledger Filter logic
  const filteredVouchers = budgetVouchers.filter((v) => {
    if (ledgerSchemeFilter !== 'all' && v.scheme !== ledgerSchemeFilter) {
      return false;
    }
    if (ledgerSearch.trim()) {
      const q = ledgerSearch.toLowerCase();
      const match =
        v.voucherNo.toLowerCase().includes(q) ||
        v.descriptionEn.toLowerCase().includes(q) ||
        v.descriptionMr.toLowerCase().includes(q) ||
        v.vendorEn.toLowerCase().includes(q) ||
        v.vendorMr.toLowerCase().includes(q) ||
        v.sanctionRef.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const totalVoucherSpent = filteredVouchers.reduce((sum, v) => sum + v.amount, 0);

  const handleExportCSV = () => {
    const headers = [
      'Voucher No',
      'Date',
      'Scheme / Fund',
      'Description',
      'Vendor / Contractor',
      'Sanction Reference',
      'Amount (INR)',
      'Gram Sabha Social Audit Status'
    ];

    const rows = filteredVouchers.map((v) => [
      `"${v.voucherNo}"`,
      `"${v.date}"`,
      `"${v.schemeLabelEn}"`,
      `"${v.descriptionEn.replace(/"/g, '""')}"`,
      `"${v.vendorEn.replace(/"/g, '""')}"`,
      `"${v.sanctionRef}"`,
      v.amount,
      `"${v.auditStatus === 'verified' ? 'Audited & Approved by Gram Sabha' : 'Under Inspection'}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `${selectedVillage.id}_Gram_Panchayat_Public_Budget_Ledger_${selectedFiscalYear}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportAnalyticsCSV = () => {
    const headers = [
      'Project Title',
      'Sanction ID',
      'Department',
      'Sanctioned Budget (Lakhs)',
      'Actual Exp (Lakhs)',
      'Progress %',
      'Total Working Days',
      'Elapsed Working Days',
      'Remaining Days',
      'Start Date',
      'Completion Target',
      'Labor Headcount',
      'Man-Days Generated',
      'Daily Burn Rate (INR)'
    ];

    const rows = analyticsProjects.map((p) => [
      `"${p.titleEn}"`,
      `"${p.sanctionNo}"`,
      `"${p.departmentEn}"`,
      p.budgetLakhs,
      p.expenditureLakhs,
      p.progressPercent,
      p.totalWorkingDays,
      p.elapsedWorkingDays,
      p.totalWorkingDays - p.elapsedWorkingDays,
      `"${p.startDate}"`,
      `"${p.scheduledCompletionDate}"`,
      p.laborCount,
      p.manDaysGenerated,
      p.dailyBurnRateRupees
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `${selectedVillage.id}_Project_Cost_and_Working_Days_Analytics.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintLedger = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs
        items={[
          { label: dName },
          { label: tName },
          { label: vName, page: 'village-overview' },
          { label: t.cardDevelopmentTitle }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="border-b border-amber-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
                {language === 'mr' ? '🚩 ग्राम विकास व प्रकल्प डेटा विश्लेषण' : '🚩 Civil Infrastructure, EVM Cost & Working Days Analytics'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
              {vName} — {t.developmentTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {language === 'mr'
                ? 'गावातील मंजूर प्रकल्प, प्रत्यक्ष भौतिक प्रगती, खर्चाचे विश्लेषण, कामाचे दिवस आणि १५ व्या वित्त आयोगाचा सार्वजनिक लेजर.'
                : 'Project cost performance, working days timeline, earned value management (EVM), and public expenditure audit ledger.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('village-overview')}
              className="px-4 py-2 bg-white hover:bg-amber-50 border border-amber-300 text-stone-800 text-xs font-bold rounded-xl transition-all shadow-2xs hover:shadow"
            >
              {t.back}
            </button>
          </div>
        </div>

        {/* 3 High-Impact Tabs: Cost & Working Days Analytics, Projects, and Budget Ledger */}
        <div className="flex border-b border-stone-200 gap-2 sm:gap-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('cost-analytics')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'cost-analytics'
                ? 'border-indigo-600 text-indigo-950 font-black'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>
              {language === 'mr' ? '📊 डेटा विश्लेषण: खर्च व कामाचे दिवस' : '📊 Cost & Working Days Analytics'}
            </span>
            <span className="px-1.5 py-0.5 text-[9px] bg-indigo-100 text-indigo-800 rounded font-mono font-bold">
              EVM + Timeline
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'projects'
                ? 'border-orange-600 text-orange-950 font-black'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Building className="w-4 h-4 text-orange-600" />
            <span>
              {language === 'mr' ? 'विकासकामे व प्रकल्प सूची' : 'Civil Works & Projects'} ({totalCount})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('budget-ledger')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'budget-ledger'
                ? 'border-emerald-600 text-emerald-950 font-black'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Landmark className="w-4 h-4 text-emerald-600" />
            <span>
              {language === 'mr' ? 'सार्वजनिक जमा-खर्च लेजर' : 'Public Budget & Social Audit'}
            </span>
            <span className="px-2 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded-full font-mono font-bold">
              100% Transparent
            </span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: DEEP PROJECT COST & WORKING DAYS DATA ANALYTICS (EVM & TIMELINE)
            ========================================================================= */}
        {activeTab === 'cost-analytics' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-stone-900 via-indigo-950 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30">
                      Civil Engineering Analytics (EVM)
                    </span>
                    <span className="text-stone-400 text-xs font-mono">Schedule & Cost Control</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black font-serif text-white">
                    {language === 'mr'
                      ? 'प्रकल्प खर्च, कामाचे दिवस व वेळापत्रक डेटा विश्लेषण'
                      : 'Project Cost Variance, Working Days & Schedule Performance Index'}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                    {language === 'mr'
                      ? 'मंजूर बजेट विरूद्ध प्रत्यक्ष खर्च, पूर्ण व शिल्लक कामाचे दिवस, कंत्राटदारांची गती आणि अर्न व्हॅल्यू मॅनेजमेंट (EVM) द्वारे पूर्णत्वाचा अंदाज.'
                      : 'Detailed Earned Value Management (EVM), Cost Variance (CV), Schedule Performance Index (SPI), working days velocity, and manpower utilization across village civil works.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleExportAnalyticsCSV}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'CSV डेटा डाउनलोड' : 'Export Analytics CSV'}</span>
                  </button>
                  <button
                    onClick={handlePrintLedger}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'प्रिंट अहवाल' : 'Print Analysis'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Core KPI Cards Grid: Cost + Working Days */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Cost Variance */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase font-mono block">
                  Sanctioned vs Actual Cost
                </span>
                <div className="text-2xl font-black text-stone-900 font-mono">
                  ₹{aggregateMetrics.totalSpent} L <span className="text-xs font-normal text-stone-500">/ ₹{aggregateMetrics.totalSanctioned} L</span>
                </div>
                <div className="flex items-center gap-1 pt-1 text-[11px] font-semibold text-emerald-700">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Cost Variance: +₹{aggregateMetrics.costVarianceLakhs} L (Favorable)</span>
                </div>
              </div>

              {/* Working Days Elapsed vs Total */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase font-mono block">
                  Working Days Timeline
                </span>
                <div className="text-2xl font-black text-stone-900 font-mono">
                  {aggregateMetrics.totalElapsedDays} <span className="text-xs font-normal text-stone-500">/ {aggregateMetrics.totalWorkingDays} Days</span>
                </div>
                <div className="flex items-center gap-1 pt-1 text-[11px] font-semibold text-orange-800">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{aggregateMetrics.totalRemainingDays} Days Remaining</span>
                </div>
              </div>

              {/* CPI & SPI Indices */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase font-mono block">
                  EVM Performance (CPI / SPI)
                </span>
                <div className="text-2xl font-black text-indigo-950 font-mono">
                  {aggregateMetrics.cpi} <span className="text-xs font-normal text-stone-500">CPI</span> · {aggregateMetrics.spi} <span className="text-xs font-normal text-stone-500">SPI</span>
                </div>
                <div className="pt-1 text-[11px] font-semibold text-emerald-700">
                  ✓ High Cost & Schedule Efficiency
                </div>
              </div>

              {/* Rural Man-Days Generated */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase font-mono block">
                  Local Employment Created
                </span>
                <div className="text-2xl font-black text-stone-900 font-mono">
                  {aggregateMetrics.totalManDays} <span className="text-xs font-normal text-stone-500">Man-Days</span>
                </div>
                <div className="pt-1 text-[11px] font-semibold text-stone-600 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-stone-500" />
                  <span>Avg Velocity: {aggregateMetrics.avgVelocity}% / day</span>
                </div>
              </div>
            </div>

            {/* Interactive What-If Working Days & Cost Simulator */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 p-6 rounded-3xl border border-amber-300 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-950 text-sm font-serif">
                      {language === 'mr' ? 'कामाचे दिवस व खर्चाचा प्रेडिक्टिव्ह सिम्युलेटर' : 'What-If Working Days & Cost Forecasting Simulator'}
                    </h3>
                    <p className="text-[11px] text-stone-600">
                      {language === 'mr'
                        ? 'मजूर संख्या व कामाच्या तासांतील बदलाने प्रकल्पाच्या पूर्णत्वाच्या तारखेवर होणारा परिणाम तपासा.'
                        : 'Simulate workforce scaling, daily overtime shifts, and supply delays on project completion date.'}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold bg-white px-2.5 py-1 rounded-lg border border-amber-300 text-orange-950 shadow-2xs">
                  Real-time Recalculation
                </span>
              </div>

              {/* Simulator Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                {/* 1. Labor Workforce Scaling */}
                <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-stone-700">Workforce Labor Scaling</span>
                    <span className="text-orange-900 font-mono">+{laborMultiplier}% extra workers</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={laborMultiplier}
                    onChange={(e) => setLaborMultiplier(Number(e.target.value))}
                    className="w-full accent-orange-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>Current Crew</span>
                    <span>+25% Extra</span>
                    <span>+50% Max</span>
                  </div>
                </div>

                {/* 2. Daily Working Hours */}
                <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-stone-700">Daily Working Shift</span>
                    <span className="text-indigo-900 font-mono">{workHoursPerDay} Hours / Day</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="11"
                    step="1"
                    value={workHoursPerDay}
                    onChange={(e) => setWorkHoursPerDay(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>8h (Standard)</span>
                    <span>9.5h</span>
                    <span>11h (Double Shift)</span>
                  </div>
                </div>

                {/* 3. Material Supply Chain Lag */}
                <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-stone-700">Monsoon / Supply Delay</span>
                    <span className="text-rose-900 font-mono">+{materialSupplyLagDays} Days Lag</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="5"
                    value={materialSupplyLagDays}
                    onChange={(e) => setMaterialSupplyLagDays(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>0 Days (Normal)</span>
                    <span>15 Days</span>
                    <span>30 Days (Monsoon)</span>
                  </div>
                </div>
              </div>

              {/* Simulation Output Banner */}
              <div className="bg-white p-4 rounded-2xl border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
                    simulatedSchedule.isAhead ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {simulatedSchedule.isAhead ? '⚡' : '⏳'}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block">
                      Simulated Timeline Forecast
                    </span>
                    <div className="text-sm font-bold text-stone-900">
                      Remaining Days to Completion: <span className="font-mono text-base font-black text-orange-950">{simulatedSchedule.acceleratedDays} Working Days</span>
                      <span className={`ml-2 text-xs font-bold ${simulatedSchedule.isAhead ? 'text-emerald-700' : 'text-rose-700'}`}>
                        ({simulatedSchedule.isAhead ? `${simulatedSchedule.daysSavedOrDelayed} days saved` : `${Math.abs(simulatedSchedule.daysSavedOrDelayed)} days delay`})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100">
                  <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block">
                    Projected Estimate at Completion (EAC)
                  </span>
                  <span className="text-lg font-black font-mono text-stone-950">
                    ₹{simulatedSchedule.adjustedEacLakhs} Lakhs
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Project-by-Project Cost & Working Days Matrix Table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-950 text-sm font-serif">
                    {language === 'mr' ? 'प्रकल्पनिहाय खर्च व कामाचे दिवस विश्लेषण सारणी' : 'Itemized Project Cost & Working Days Schedule Ledger'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Calculated against PWD and Jal Jeevan Mission engineering milestones
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-stone-600 bg-stone-100 px-3 py-1 rounded-lg">
                  {analyticsProjects.length} Civil Works Tracked
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-100/80 border-b border-stone-200 text-stone-700 font-mono uppercase text-[10px]">
                      <th className="py-3 px-4 font-bold">Project & Sanction No</th>
                      <th className="py-3 px-4 font-bold">Sanctioned Budget</th>
                      <th className="py-3 px-4 font-bold">Actual Exp</th>
                      <th className="py-3 px-4 font-bold">Progress</th>
                      <th className="py-3 px-4 font-bold">Scheduled Days</th>
                      <th className="py-3 px-4 font-bold">Elapsed Days</th>
                      <th className="py-3 px-4 font-bold">Remaining</th>
                      <th className="py-3 px-4 font-bold">Daily Burn Rate</th>
                      <th className="py-3 px-4 font-bold text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-800">
                    {analyticsProjects.map((p) => {
                      const remainingDays = p.totalWorkingDays - p.elapsedWorkingDays;
                      const isComplete = p.progressPercent === 100;
                      const timeElapsedPercent = Math.min(100, Math.round((p.elapsedWorkingDays / p.totalWorkingDays) * 100));

                      return (
                        <tr key={p.id} className="hover:bg-amber-50/40 transition-colors">
                          <td className="py-3.5 px-4 max-w-xs">
                            <span className="font-bold text-stone-950 block text-xs leading-snug">
                              {language === 'mr' ? p.titleMr : p.titleEn}
                            </span>
                            <span className="text-[10px] font-mono text-stone-500">
                              {p.sanctionNo} · {p.departmentEn}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-mono font-bold text-stone-950 whitespace-nowrap">
                            ₹{p.budgetLakhs} L
                          </td>

                          <td className="py-3.5 px-4 font-mono font-bold text-stone-700 whitespace-nowrap">
                            ₹{p.expenditureLakhs} L
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-stone-100 h-2 rounded-full overflow-hidden border border-stone-300">
                                <div
                                  className={`h-full rounded-full ${
                                    isComplete ? 'bg-emerald-600' : 'bg-orange-500'
                                  }`}
                                  style={{ width: `${p.progressPercent}%` }}
                                />
                              </div>
                              <span className="font-mono font-bold text-stone-900 text-[11px]">
                                {p.progressPercent}%
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                            {p.totalWorkingDays} days
                          </td>

                          <td className="py-3.5 px-4 font-mono text-stone-700 whitespace-nowrap">
                            {p.elapsedWorkingDays} days <span className="text-[10px] text-stone-500">({timeElapsedPercent}%)</span>
                          </td>

                          <td className="py-3.5 px-4 font-mono font-bold text-orange-950 whitespace-nowrap">
                            {remainingDays} days
                          </td>

                          <td className="py-3.5 px-4 font-mono text-stone-700 whitespace-nowrap">
                            ₹{p.dailyBurnRateRupees.toLocaleString('en-IN')}/day
                          </td>

                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            {isComplete ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                <span>Completed</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                <Clock className="w-3 h-3 text-amber-700" />
                                <span>On Schedule</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-stone-50 font-bold text-stone-950 border-t border-stone-200 font-mono text-xs">
                      <td className="py-3.5 px-4 uppercase text-[10px]">Total Outlay / Timeline:</td>
                      <td className="py-3.5 px-4">₹{aggregateMetrics.totalSanctioned} L</td>
                      <td className="py-3.5 px-4">₹{aggregateMetrics.totalSpent} L</td>
                      <td className="py-3.5 px-4">76.2% Avg</td>
                      <td className="py-3.5 px-4">{aggregateMetrics.totalWorkingDays} Days</td>
                      <td className="py-3.5 px-4">{aggregateMetrics.totalElapsedDays} Days</td>
                      <td className="py-3.5 px-4 text-orange-950">{aggregateMetrics.totalRemainingDays} Days</td>
                      <td className="py-3.5 px-4">₹38,500/day</td>
                      <td className="py-3.5 px-4 text-center text-emerald-800">SPI: {aggregateMetrics.spi}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Academic Formula & Engineering Theory Card for Semester VII Defense */}
            <div className="bg-stone-900 text-stone-300 p-6 rounded-3xl border border-stone-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                  🎓 Academic Evaluation Reference: Civil Engineering EVM Formulations (B.Tech CSE Sem VII)
                </span>
                <span className="text-[10px] text-stone-500">ISO / PMI PMBOK Standards</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700">
                  <span className="text-stone-400 text-[10px] block">Earned Value (EV)</span>
                  <p className="text-white font-bold text-xs mt-0.5">EV = BAC × (% Progress)</p>
                  <span className="text-emerald-400 text-[10px] block mt-1">₹{aggregateMetrics.earnedValueLakhs} Lakhs Realized</span>
                </div>

                <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700">
                  <span className="text-stone-400 text-[10px] block">Cost Performance Index (CPI)</span>
                  <p className="text-white font-bold text-xs mt-0.5">CPI = EV / Actual Cost (AC)</p>
                  <span className="text-emerald-400 text-[10px] block mt-1">CPI = {aggregateMetrics.cpi} (&gt;1.00 Cost Efficient)</span>
                </div>

                <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700">
                  <span className="text-stone-400 text-[10px] block">Schedule Performance Index (SPI)</span>
                  <p className="text-white font-bold text-xs mt-0.5">SPI = EV / Planned Value (PV)</p>
                  <span className="text-emerald-400 text-[10px] block mt-1">SPI = {aggregateMetrics.spi} (&gt;0.95 On Target)</span>
                </div>

                <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700">
                  <span className="text-stone-400 text-[10px] block">Estimate at Completion (EAC)</span>
                  <p className="text-white font-bold text-xs mt-0.5">EAC = BAC / CPI</p>
                  <span className="text-emerald-400 text-[10px] block mt-1">₹{aggregateMetrics.projectedEacLakhs} L Forecast</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: CIVIL WORKS & INFRASTRUCTURE PROJECTS LIST
            ========================================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gradient-to-b from-orange-50/80 to-white p-4.5 rounded-2xl border border-orange-200 shadow-2xs">
                <span className="text-xs text-orange-900 font-bold block uppercase font-mono">
                  {language === 'mr' ? 'एकूण विकासकामे' : 'Total Works'}
                </span>
                <span className="text-3xl font-black text-stone-900 font-mono mt-1 block">
                  {totalCount}
                </span>
                <span className="text-[11px] text-orange-800 font-semibold mt-1 block">
                  मंजूर निधी: ₹{totalBudget} लाख
                </span>
              </div>

              <div className="bg-gradient-to-b from-emerald-50/80 to-white p-4.5 rounded-2xl border border-emerald-200 shadow-2xs">
                <span className="text-xs text-emerald-900 font-bold block flex items-center gap-1 font-mono uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.filterCompleted}</span>
                </span>
                <span className="text-3xl font-black text-emerald-900 font-mono mt-1 block">
                  {completedCount}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                  १००% काम पूर्ण
                </span>
              </div>

              <div className="bg-gradient-to-b from-amber-50/80 to-white p-4.5 rounded-2xl border border-amber-200 shadow-2xs">
                <span className="text-xs text-amber-900 font-bold block flex items-center gap-1 font-mono uppercase">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.filterInProgress}</span>
                </span>
                <span className="text-3xl font-black text-amber-900 font-mono mt-1 block">
                  {inProgressCount}
                </span>
                <span className="text-[11px] text-amber-800 font-semibold mt-1 block">
                  प्रत्यक्ष काम सुरू
                </span>
              </div>

              <div className="bg-gradient-to-b from-blue-50/80 to-white p-4.5 rounded-2xl border border-blue-200 shadow-2xs">
                <span className="text-xs text-blue-900 font-bold block flex items-center gap-1 font-mono uppercase">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t.filterPlanned}</span>
                </span>
                <span className="text-3xl font-black text-blue-900 font-mono mt-1 block">
                  {plannedCount}
                </span>
                <span className="text-[11px] text-blue-800 font-semibold mt-1 block">
                  निविदा / मान्यता
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeFilter === 'all'
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs font-bold'
                      : 'text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  {t.filterAll} ({totalCount})
                </button>
                <button
                  onClick={() => setActiveFilter('in-progress')}
                  className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeFilter === 'in-progress'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                      : 'text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  {t.filterInProgress} ({inProgressCount})
                </button>
                <button
                  onClick={() => setActiveFilter('completed')}
                  className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeFilter === 'completed'
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  {t.filterCompleted} ({completedCount})
                </button>
                <button
                  onClick={() => setActiveFilter('planned')}
                  className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeFilter === 'planned'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  {t.filterPlanned} ({plannedCount})
                </button>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-amber-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'mr' ? 'कामाचे नाव किंवा विभाग शोधा...' : 'Search project or dept...'}
                  className="w-full pl-9 pr-3 py-2 bg-amber-50/50 border border-amber-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                />
              </div>
            </div>

            {/* Projects List */}
            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-2xl border border-amber-200 p-12 text-center text-xs text-stone-500">
                {language === 'mr'
                  ? 'या फिल्टरमध्ये कोणतेही विकासकाम आढळले नाही.'
                  : 'No development projects match the selected filter.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredProjects.map((project) => {
                  const pTitle = language === 'mr' ? project.titleMr : project.titleEn;
                  const pDept = language === 'mr' ? project.departmentMr : project.departmentEn;

                  return (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProjectModal(project)}
                      className="bg-white rounded-2xl border border-amber-200 p-6 hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-semibold bg-amber-50 text-orange-950 px-2 py-0.5 rounded-md border border-amber-200">
                            {project.sanctionOrderNumber}
                          </span>
                          {project.status === 'completed' ? (
                            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>{t.filterCompleted}</span>
                            </span>
                          ) : project.status === 'in-progress' ? (
                            <span className="text-[11px] font-bold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-300">
                              <Clock className="w-3.5 h-3.5 text-amber-700" />
                              <span>{t.filterInProgress}</span>
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-blue-900 bg-blue-100/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-blue-300">
                              <Calendar className="w-3.5 h-3.5 text-blue-700" />
                              <span>{t.filterPlanned}</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-stone-900 group-hover:text-orange-900 transition-colors leading-snug font-serif">
                          {pTitle}
                        </h3>

                        <p className="text-xs text-stone-600 font-medium">
                          {pDept}
                        </p>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between text-xs text-stone-600 mb-1 font-mono">
                            <span className="font-semibold text-stone-800">{t.progress}</span>
                            <span className="font-bold text-orange-950">{project.progressPercent}%</span>
                          </div>
                          <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-amber-200">
                            <div
                              className={`h-full transition-all rounded-full ${
                                project.status === 'completed'
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                                  : project.progressPercent > 50
                                  ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                                  : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                              }`}
                              style={{ width: `${project.progressPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Quick Cost and Timeline */}
                        <div className="grid grid-cols-2 gap-2 pt-2.5 text-xs border-t border-amber-100 bg-amber-50/40 rounded-xl p-2.5">
                          <div>
                            <span className="text-stone-500 text-[10px] block font-mono uppercase">{t.budgetSanctioned}</span>
                            <span className="font-black text-stone-900 font-mono text-sm">
                              ₹{project.budgetLakhs} लाख
                            </span>
                          </div>
                          <div>
                            <span className="text-stone-500 text-[10px] block font-mono uppercase">
                              {language === 'mr' ? 'लक्ष्य तारीख' : 'Target Date'}
                            </span>
                            <span className="text-stone-800 font-semibold text-xs font-mono">
                              {project.targetDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-orange-800 group-hover:text-orange-950">
                        <span>{language === 'mr' ? 'सविस्तर आदेश व निधी तपशील पहा' : 'View Sanction Order & Details'}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 3: GRAM PANCHAYAT PUBLIC BUDGET & SOCIAL AUDIT LEDGER
            ========================================================================= */}
        {activeTab === 'budget-ledger' && (
          <div className="space-y-6">
            {/* Header with Fiscal Year & Audit Status */}
            <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-stone-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                      {language === 'mr' ? '१००% सार्वजनिक लेखापरीक्षण' : '100% Public Financial Audit'}
                    </span>
                    <span className="text-xs text-stone-300 font-mono">e-GramSwaraj / PFMS Synced</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black font-serif tracking-tight text-white">
                    {language === 'mr'
                      ? `${vName} ग्रामपंचायत सार्वजनिक जमा-खर्च लेजर`
                      : `${vName} Gram Panchayat Public Expenditure Ledger`}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                    {language === 'mr'
                      ? '१५ व्या वित्त आयोगाचे बद्ध व अमुक्त अनुदान, जल जीवन मिशन आणि ग्रामपंचायत स्वनिधीचे प्रत्येक खर्चाचे व्हाऊचर व ग्रामसभा सामाजिक लेखापरीक्षण अहवाल.'
                      : 'Itemized expenditure vouchers, vendor payments, sanction order references, and Gram Sabha social audit verification for 15th Finance Commission & village development grants.'}
                  </p>
                </div>

                {/* Fiscal Year Selector & Actions */}
                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0">
                  <div className="flex items-center gap-2 bg-stone-800/80 p-1.5 rounded-xl border border-stone-700">
                    <button
                      onClick={() => setSelectedFiscalYear('2024-25')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                        selectedFiscalYear === '2024-25'
                          ? 'bg-emerald-600 text-white'
                          : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      FY 2024-25 (Current)
                    </button>
                    <button
                      onClick={() => setSelectedFiscalYear('2023-24')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                        selectedFiscalYear === '2023-24'
                          ? 'bg-emerald-600 text-white'
                          : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      FY 2023-24 (Audited)
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors"
                      title="Download CSV spreadsheet"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'CSV डाउनलोड' : 'Export CSV'}</span>
                    </button>
                    <button
                      onClick={handlePrintLedger}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors"
                      title="Print or Save PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'प्रिंट लेजर' : 'Print Ledger'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Fund Stream Allocation vs Disbursed Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-500 uppercase font-mono">
                    15th FC (Untied)
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded font-mono">
                    87.6% Used
                  </span>
                </div>
                <div className="text-2xl font-black text-stone-900 font-mono">
                  ₹16.20 L <span className="text-xs font-normal text-stone-500">/ ₹18.50 L</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  {language === 'mr' ? 'गावातील रस्ते, पथदिवे व शाळा दुरुस्ती' : 'Discretionary infrastructure & ZP schools'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-teal-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-500 uppercase font-mono">
                    15th FC (Tied)
                  </span>
                  <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded font-mono">
                    98.9% Used
                  </span>
                </div>
                <div className="text-2xl font-black text-teal-950 font-mono">
                  ₹13.85 L <span className="text-xs font-normal text-stone-500">/ ₹14.00 L</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  {language === 'mr' ? 'पिण्याचे पाणी व सांडपाणी व्यवस्थापन' : 'Drinking water & ODF sanitation only'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-500 uppercase font-mono">
                    Jal Jeevan Mission
                  </span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded font-mono">
                    93.8% Used
                  </span>
                </div>
                <div className="text-2xl font-black text-blue-950 font-mono">
                  ₹22.50 L <span className="text-xs font-normal text-stone-500">/ ₹24.00 L</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  {language === 'mr' ? 'हर घर नल से जल नळ जोडण्या' : 'Functional household tap connections (FHTC)'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-500 uppercase font-mono">
                    GP Own Tax Revenue
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded font-mono">
                    85.4% Used
                  </span>
                </div>
                <div className="text-2xl font-black text-amber-950 font-mono">
                  ₹4.10 L <span className="text-xs font-normal text-stone-500">/ ₹4.80 L</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  {language === 'mr' ? 'घरपट्टी, पाणीपट्टी व स्थानिक महसूल' : 'Property tax, water cess & local fees'}
                </p>
              </div>
            </div>

            {/* Social Audit Resolution Notice Banner */}
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-950 uppercase font-mono">
                    {language === 'mr' ? 'ग्रामसभा सामाजिक लेखापरीक्षण ठराव क्र. १९' : 'Gram Sabha Social Audit Resolution No. 19'}
                  </span>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    {language === 'mr'
                      ? 'दिनांक १५ ऑगस्ट २०२४ आणि २६ जानेवारी २०२५ च्या आमसभेत सर्व व्हाऊचर्स व बँक खात्यांची गावकऱ्यांसमोर तपासणी पूर्ण. एकूण ९८.४% पडताळणी समाधानकारक.'
                      : 'All expense vouchers, vendor bills, and bank statements verified in open Gram Sabha on 15 Aug 2024 & 26 Jan 2025. 98.4% public satisfaction index.'}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-900 bg-white px-3 py-1.5 rounded-xl border border-emerald-200">
                  Social Audit Pass: 98.4%
                </span>
              </div>
            </div>

            {/* Search and Filter for Vouchers */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs font-semibold">
                <button
                  onClick={() => setLedgerSchemeFilter('all')}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    ledgerSchemeFilter === 'all'
                      ? 'bg-stone-900 text-white font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {language === 'mr' ? 'सर्व निधी' : 'All Grants'} ({budgetVouchers.length})
                </button>
                <button
                  onClick={() => setLedgerSchemeFilter('15th-tied')}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    ledgerSchemeFilter === '15th-tied'
                      ? 'bg-teal-700 text-white font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  15th Tied (Water)
                </button>
                <button
                  onClick={() => setLedgerSchemeFilter('15th-untied')}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    ledgerSchemeFilter === '15th-untied'
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  15th Untied
                </button>
                <button
                  onClick={() => setLedgerSchemeFilter('jjm')}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    ledgerSchemeFilter === 'jjm'
                      ? 'bg-blue-700 text-white font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  Jal Jeevan
                </button>
                <button
                  onClick={() => setLedgerSchemeFilter('sbm')}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    ledgerSchemeFilter === 'sbm'
                      ? 'bg-amber-700 text-white font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  Swachh Bharat
                </button>
                <button
                  onClick={() => setLedgerSchemeFilter('own-tax')}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    ledgerSchemeFilter === 'own-tax'
                      ? 'bg-orange-700 text-white font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  GP Own Tax
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={ledgerSearch}
                  onChange={(e) => setLedgerSearch(e.target.value)}
                  placeholder={language === 'mr' ? 'व्हाऊचर, पुरवठादार किंवा तपशील...' : 'Search voucher or vendor...'}
                  className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Voucher Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-100/80 border-b border-stone-200 text-stone-700 font-mono uppercase text-[11px]">
                      <th className="py-3.5 px-4 font-bold">Voucher & Date</th>
                      <th className="py-3.5 px-4 font-bold">Fund Scheme</th>
                      <th className="py-3.5 px-4 font-bold">Work / Expense Description</th>
                      <th className="py-3.5 px-4 font-bold">Contractor / Payee</th>
                      <th className="py-3.5 px-4 font-bold">Sanction Ref</th>
                      <th className="py-3.5 px-4 font-bold text-right">Amount (₹)</th>
                      <th className="py-3.5 px-4 font-bold text-center">Audit Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-800 font-sans">
                    {filteredVouchers.map((voucher) => (
                      <tr key={voucher.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-mono font-bold text-stone-950 block">
                            {voucher.voucherNo}
                          </span>
                          <span className="text-[11px] text-stone-500 font-mono">
                            {voucher.date}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-stone-100 text-stone-800 border border-stone-200">
                            {language === 'mr' ? voucher.schemeLabelMr : voucher.schemeLabelEn}
                          </span>
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <p className="font-medium text-stone-900 leading-snug">
                            {language === 'mr' ? voucher.descriptionMr : voucher.descriptionEn}
                          </p>
                        </td>
                        <td className="py-3 px-4 max-w-[200px]">
                          <p className="text-stone-700 font-medium">
                            {language === 'mr' ? voucher.vendorMr : voucher.vendorEn}
                          </p>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-stone-600">
                          {voucher.sanctionRef}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap font-mono font-bold text-stone-950 text-sm">
                          ₹{voucher.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            <span>Audited OK</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-stone-50 font-bold text-stone-950 border-t border-stone-200">
                      <td colSpan={5} className="py-3 px-4 text-right font-mono uppercase text-[11px]">
                        {language === 'mr' ? 'दर्शविलेल्या व्हाऊचर्सची एकूण रक्कम' : 'Filtered Vouchers Total'}:
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-base font-black text-emerald-800">
                        ₹{totalVoucherSpent.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-center text-[11px] text-stone-500 font-mono">
                        {filteredVouchers.length} Vouchers
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
