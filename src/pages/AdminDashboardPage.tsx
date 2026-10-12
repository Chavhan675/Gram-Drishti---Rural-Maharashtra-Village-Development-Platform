import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  TrendingUp,
  UserCheck,
  Edit,
  Save,
  Lock
} from 'lucide-react';
import { IssueStatus } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const {
    language,
    selectedVillage,
    issues,
    projects,
    updateIssueStatus,
    updateProjectProgress
  } = useApp();

  const t = getTranslation(language);

  // Authenticated state demonstration
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [role, setRole] = useState<'gram-sevak' | 'sarpanch' | 'taluka-officer'>('gram-sevak');

  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<IssueStatus>('under-review');
  const [officerRemarks, setOfficerRemarks] = useState('');

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProgress, setNewProgress] = useState<number>(0);

  const villageProjects = projects.filter((p) => p.villageId === selectedVillage.id);

  const handleUpdateIssue = (id: string) => {
    updateIssueStatus(id, newStatus, officerRemarks);
    setSelectedIssueId(null);
    setOfficerRemarks('');
  };

  const handleSaveProjectProgress = (id: string) => {
    const st = newProgress >= 100 ? 'completed' : 'in-progress';
    updateProjectProgress(id, newProgress, st);
    setEditingProjectId(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-16">
      <Breadcrumbs items={[{ label: t.adminDashboardTitle }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-slate-800 bg-slate-200 px-2 py-0.5 rounded">
                प्रशासकीय कक्ष (Officer Desk)
              </span>
              <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Official Session</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t.adminDashboardTitle}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              कार्यक्षेत्र: {language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn} (LGD: {selectedVillage.lgdCode})
            </p>
          </div>

          {/* Role selector switcher */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">रोल (Role):</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="p-1.5 bg-white border border-slate-300 rounded text-slate-800 font-medium focus:outline-none"
            >
              <option value="gram-sevak">ग्रामसेवक (Gram Sevak)</option>
              <option value="sarpanch">सरपंच (Sarpanch)</option>
              <option value="taluka-officer">तालुका कृषी / बीडीओ (BDO)</option>
            </select>
          </div>
        </div>

        {/* Executive Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">
              {language === 'mr' ? 'एकूण प्राप्त तक्रारी' : 'Total Grievances'}
            </span>
            <span className="text-2xl font-bold text-slate-900 font-mono mt-1 block">
              {issues.length}
            </span>
            <span className="text-[11px] text-slate-400">
              {language === 'mr' ? 'नागरिक अहवाल' : 'Citizen Submissions'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs text-emerald-700 font-medium block">
              {language === 'mr' ? 'निवारण झालेल्या तक्रारी' : 'Resolved Complaints'}
            </span>
            <span className="text-2xl font-bold text-emerald-900 font-mono mt-1 block">
              {issues.filter((i) => i.status === 'resolved').length}
            </span>
            <span className="text-[11px] text-emerald-600">
              {language === 'mr' ? '१००% पूर्तता अहवाल' : 'Fully Addressed'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs text-amber-700 font-medium block">
              {language === 'mr' ? 'प्रलंबित / तपासणी सुरू' : 'Under Review / Active'}
            </span>
            <span className="text-2xl font-bold text-amber-900 font-mono mt-1 block">
              {issues.filter((i) => i.status !== 'resolved').length}
            </span>
            <span className="text-[11px] text-amber-600">
              {language === 'mr' ? 'तातडीचे लक्ष आवश्यक' : 'Needs Inspection'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs text-sky-700 font-medium block">
              {language === 'mr' ? 'सक्रिय विकासकामे' : 'Active Works'}
            </span>
            <span className="text-2xl font-bold text-sky-900 font-mono mt-1 block">
              {villageProjects.length}
            </span>
            <span className="text-[11px] text-sky-600">
              {language === 'mr' ? 'मंजूर कामे' : 'Approved Works'}
            </span>
          </div>
        </div>

        {/* Section 1: Grievances Management Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              {language === 'mr' ? 'नागरिक तक्रारींचे व्यवस्थापन व शेरे' : 'Citizen Grievance Redressal Desk'}
            </h2>
            <span className="text-xs text-slate-500">
              {language === 'mr' ? 'शेरे नोंदवून स्थिती अद्यतन करा' : 'Update status and officer remarks'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3">तक्रार क्र. (ID)</th>
                  <th className="p-3">गाव (Village)</th>
                  <th className="p-3">विषय व तपशील</th>
                  <th className="p-3">स्थान</th>
                  <th className="p-3">स्थिती</th>
                  <th className="p-3 text-right">कृती (Action)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {issues.map((iss) => (
                  <tr key={iss.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{iss.id}</td>
                    <td className="p-3 text-slate-700">
                      {language === 'mr' ? iss.villageNameMr : iss.villageNameEn}
                    </td>
                    <td className="p-3 max-w-xs">
                      <span className="font-semibold block text-slate-900">
                        {language === 'mr' ? iss.titleMr : iss.titleEn}
                      </span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{iss.description}</span>
                    </td>
                    <td className="p-3 text-slate-600">{iss.landmark}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          iss.status === 'resolved'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : iss.status === 'in-progress'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-sky-50 text-sky-800 border border-sky-200'
                        }`}
                      >
                        {iss.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedIssueId(iss.id);
                          setNewStatus(iss.status);
                          setOfficerRemarks(iss.assignedOfficerRemarks || '');
                        }}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-medium transition-colors"
                      >
                        शेरे नोंदवा (Update)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Edit Drawer / Modal for Issue Status */}
          {selectedIssueId && (
            <div className="bg-amber-50/70 p-4 rounded-lg border border-amber-200 space-y-3 mt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950">
                  तक्रार क्र. {selectedIssueId} साठी अधिकृत शेरे व स्थिती बदला:
                </span>
                <button
                  onClick={() => setSelectedIssueId(null)}
                  className="text-slate-500 hover:text-slate-800"
                >
                  रद्द करा
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    नवीन स्थिती (New Status)
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800"
                  >
                    <option value="submitted">Submitted (नोंदणीकृत)</option>
                    <option value="under-review">Under Review (तपासणी सुरू)</option>
                    <option value="in-progress">In Progress (काम सुरू)</option>
                    <option value="resolved">Resolved (निवारण पूर्ण)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    अधिकृत अधिकारी शेरा (Officer Remarks)
                  </label>
                  <input
                    type="text"
                    value={officerRemarks}
                    onChange={(e) => setOfficerRemarks(e.target.value)}
                    placeholder="उदा. दुरुस्ती पथक रवाना झाले आहे..."
                    className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleUpdateIssue(selectedIssueId)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded transition-colors"
                >
                  जतन करा (Save Update)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Development Progress Updater */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              {language === 'mr' ? 'विकासकामे प्रत्यक्ष प्रगती अहवाल अद्यतन' : 'Project Physical Progress Updater'}
            </h2>
            <span className="text-xs text-slate-500">
              {language === 'mr' ? 'इंजिनिअर तपासणी व जिओ-टॅगिंग' : 'Engineering Inspection Logs'}
            </span>
          </div>

          <div className="space-y-3">
            {villageProjects.map((prj) => (
              <div
                key={prj.id}
                className="p-3.5 bg-slate-50 rounded border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500">{prj.sanctionOrderNumber}</span>
                    <span className="font-semibold text-slate-900">
                      {language === 'mr' ? prj.titleMr : prj.titleEn}
                    </span>
                  </div>
                  <p className="text-slate-500">
                    मंजूर निधी: ₹{prj.budgetLakhs} लाख · {language === 'mr' ? prj.departmentMr : prj.departmentEn}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="font-bold text-slate-900 font-mono text-sm block">
                      {prj.progressPercent}%
                    </span>
                    <span className="text-[10px] text-slate-400">{prj.status}</span>
                  </div>

                  {editingProjectId === prj.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={newProgress}
                        onChange={(e) => setNewProgress(Number(e.target.value))}
                        className="w-16 p-1 border border-slate-300 rounded text-center font-mono"
                      />
                      <button
                        onClick={() => handleSaveProjectProgress(prj.id)}
                        className="p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingProjectId(prj.id);
                        setNewProgress(prj.progressPercent);
                      }}
                      className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100 flex items-center gap-1 font-medium"
                    >
                      <Edit className="w-3 h-3" />
                      <span>प्रगती बदला</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
