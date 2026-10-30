import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import {
  X,
  Bot,
  Send,
  User,
  Sparkles,
  Mic,
  MicOff,
  Maximize2,
  Minus,
  ShieldCheck,
  RotateCcw,
  Sprout,
  GraduationCap,
  FileText
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sourceNote?: string;
  roleUsed?: string;
}

type ChatRole = 'civic' | 'agri' | 'viva' | 'grievance';

export const AiAssistantModal: React.FC = () => {
  const {
    language,
    selectedVillage,
    projects,
    facilities,
    schemes,
    isAiModalOpen,
    setIsAiModalOpen,
    navigateTo
  } = useApp();

  const t = getTranslation(language);
  const [activeRole, setActiveRole] = useState<ChatRole>('civic');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const villageProjects = projects.filter((p) => p.villageId === selectedVillage.id);
  const villageFacilities = facilities.filter((f) => f.villageId === selectedVillage.id);

  const initialGreeting =
    language === 'mr'
      ? `नमस्कार! मी **ग्राम दृष्टी मित्र** आहे. मी आपल्याला **${selectedVillage.nameMr}** (जि. ${selectedVillage.districtMr}) गावाची विकासकामे, शाळा, आरोग्य सुविधा, शासकीय योजना व ML विश्लेषणाची पडताळणी केलेली माहिती देऊ शकतो.`
      : `Namaskar! I am **Gram Drishti Mitra** — the authoritative AI civic assistant for **${selectedVillage.nameEn}** (District ${selectedVillage.districtEn}, Maharashtra). Ask me about village infrastructure, schemes, crop soil science, or B.Tech project defense.`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceNote: 'GramDrishti Verified Knowledge Base · Census 2011/2026 & LGD Standards',
      roleUsed: 'Civic Mitra'
    }
  ]);

  // Auto-scroll to bottom of thread
  useEffect(() => {
    if (isAiModalOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isAiModalOpen]);

  // Setup Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'mr' ? 'mr-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleRecording = () => {
    if (!speechSupported || !recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.lang = language === 'mr' ? 'mr-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        setIsRecording(false);
      }
    }
  };

  const handleRoleSelect = (role: ChatRole) => {
    setActiveRole(role);
    const roleLabels: Record<ChatRole, { mr: string; en: string }> = {
      civic: { mr: 'ग्राम प्रशासन सल्लागार', en: 'Civic Governance Advisor' },
      agri: { mr: 'कृषी व मृदा तज्ञ', en: 'Agro-Soil Consultant' },
      viva: { mr: 'प्रकल्प व्हायव्हा गाईड (Sir)', en: 'Project Defense Tutor (For Sir)' },
      grievance: { mr: 'तक्रार निवारण अधिकारी', en: 'Grievance Resolution Officer' }
    };

    setMessages((prev) => [
      ...prev,
      {
        id: `role-${Date.now()}`,
        sender: 'assistant',
        text:
          language === 'mr'
            ? `रोल बदलला: **${roleLabels[role].mr}** सक्रिय आहे. आता या विषयाशी संबंधित प्रश्न विचारा.`
            : `Role switched to: **${roleLabels[role].en}**. Grounded system instructions loaded.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceNote: 'Persona Instruction Switched',
        roleUsed: roleLabels[role].en
      }
    ]);
  };

  const quickQuestions: Record<ChatRole, string[]> = {
    civic:
      language === 'mr'
        ? [
            'शेतकऱ्यांसाठी कोणत्या योजना उपलब्ध आहेत?',
            'गावातील विकासकामांची सद्यस्थिती सांगा',
            'सरपंच व ग्रामसेवक संपर्क क्रमांक'
          ]
        : [
            'Which schemes are available for farmers?',
            'Show active village development works',
            'Sarpanch & Gram Sevak contacts'
          ],
    agri:
      language === 'mr'
        ? [
            'सोयाबीनसाठी योग्य N-P-K खत प्रमाण काय?',
            'सेंद्रिय कर्ब (Organic Carbon) कसा वाढवावा?',
            'कापूस बोंडअळी नियंत्रण उपाय'
          ]
        : [
            'Ideal NPK ratio for Soybean crop',
            'How to enhance soil organic carbon?',
            'Pest control for cotton bollworm'
          ],
    viva:
      language === 'mr'
        ? [
            'परीक्षकांना FR-05 डेटा सिद्धता कशी सांगावी?',
            '५-स्तरीय आर्किटेक्चरचे २ मिनिटात स्पष्टीकरण',
            'रँडम फॉरेस्ट मॉडेल का निवडले?'
          ]
        : [
            'How to explain FR-05 Data Provenance to Sir?',
            '2-minute 5-tier architecture summary',
            'Why Random Forest over Deep Learning?'
          ],
    grievance:
      language === 'mr'
        ? [
            'पाण्याच्या पाईपलाईन गळतीची तक्रार कशी करावी?',
            'महाराष्ट्र लोकसेवा हमी कायदे मुदत',
            'BDO कडे अपील कसे करावे?'
          ]
        : [
            'Report drinking water pipeline leak',
            'Maharashtra RTS Act resolution SLA',
            'How to escalate grievance to BDO?'
          ]
  };

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim();
    if (!q || loading) return;

    setInput('');
    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: q,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;

      const knowledgeContext = `
You are "Gram Drishti Mitra", an authoritative, respectful, and transparent AI civic assistant for rural Maharashtra public information on the Gram Drishti platform (B.Tech CSE Capstone Project).
Current Active Persona: ${activeRole.toUpperCase()}
Current Selected Village: ${selectedVillage.nameMr} / ${selectedVillage.nameEn}
Taluka: ${selectedVillage.talukaMr} / ${selectedVillage.talukaEn}, District: ${selectedVillage.districtMr} / ${selectedVillage.districtEn}, Maharashtra.
LGD Code: ${selectedVillage.lgdCode}, Pincode: ${selectedVillage.pincode}
Population: ${selectedVillage.demographics.totalPopulation}, Literacy: ${selectedVillage.demographics.literacyRate}%
Sarpanch: ${selectedVillage.administration.sarpanchNameMr} (${selectedVillage.administration.sarpanchNameEn}), Contact: ${selectedVillage.administration.sarpanchContact}
Gram Sevak: ${selectedVillage.administration.gramSevakNameMr} (${selectedVillage.administration.gramSevakNameEn}), Contact: ${selectedVillage.administration.gramSevakContact}
Talathi: ${selectedVillage.administration.talathiNameMr} (${selectedVillage.administration.talathiNameEn})

Development Projects in this village:
${villageProjects.map((p) => `- ${p.titleMr} (${p.titleEn}): Status: ${p.status}, Budget: ₹${p.budgetLakhs} Lakhs, Progress: ${p.progressPercent}%, Sanction: ${p.sanctionOrderNumber}`).join('\n')}

Public Facilities in this village:
${villageFacilities.map((f) => `- ${f.nameMr} (${f.nameEn}): Category: ${f.category}, Timings: ${f.timingsMr}, Status: ${f.operationalStatus}`).join('\n')}

Government Schemes available on platform:
${schemes.map((s) => `- ${s.nameMr} (${s.nameEn}): Category: ${s.category}, Benefits: ${s.shortDescMr}, Portal: ${s.officialPortalUrl}`).join('\n')}

CRITICAL INSTRUCTIONS:
- Answer accurately based on verified platform data.
- If information is not in the data, state clearly: "या विषयाची अधिकृत माहिती सध्या ग्राम दृष्टी डेटाबेसमधे उपलब्ध नाही." / "This information is not currently recorded in the GramDrishti verified database."
- Respond respectfully in natural Marathi if the query is in Marathi, or English if in English.
`;

      let replyText = '';
      let sourceNote = 'GramDrishti Verified Knowledge Base';

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        // Format conversation history for Gemini API
        const contents = newMessages.map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: knowledgeContext,
            temperature: 0.65
          }
        });
        replyText = response.text || '';
        sourceNote = 'Gemini 3.8 Flash Multi-Turn';
      } else {
        // High quality deterministic fallback matching the knowledge base
        const lowerQ = q.toLowerCase();
        if (activeRole === 'viva' || lowerQ.includes('provenance') || lowerQ.includes('fr-05') || lowerQ.includes('sir')) {
          replyText =
            language === 'mr'
              ? `**FR-05 डेटा सिद्धता (Data Provenance) पडताळणी:**\n\n• **डेटाबेस रचना**: प्रत्येक माहिती नोंदीमध्ये (\`InformationRecord\`) अधिकृत \`source_id\` असतो, जो शासनाच्या अधिकृत स्रोताशी जोडलेला आहे.\n• **तपासणी तारीख**: प्रत्येक प्रकल्पाचा \`sanctionOrderNumber\` (मंजुरी आदेश) व \`checked_at\` दिनांक नोंदवला जातो.\n• **उदा.**: ${selectedVillage.nameMr} मधील विकासकामांचा तपशील थेट शासन निर्णय (GR) व स्थानिक ग्रामपंचायत रेकॉर्डशी जोडलेला आहे.`
              : `**FR-05 Data Provenance Verification (For Evaluator/Sir):**\n\n• **Relational Entity Integrity**: Every published record in \`InformationRecord\` entity maintains a foreign key relation to the \`Source\` entity (\`source_id\`, \`source_name\`, \`source_url\`, \`checked_at\`).\n• **Audit Trail**: Every modification generates an immutable \`UpdateLog\` entry containing \`actor_id\`, timestamp, and action hash.\n• **Live Verification**: Village records for **${selectedVillage.nameEn}** feature verifiable sanction order numbers and Ministry of Panchayati Raj LGD Code: \`${selectedVillage.lgdCode}\`.`;
          sourceNote = 'Table 4.3 Relational Entity Specification';
        } else if (activeRole === 'agri' || lowerQ.includes('soil') || lowerQ.includes('crop') || lowerQ.includes('शेती') || lowerQ.includes('खत')) {
          replyText =
            language === 'mr'
              ? `**मृदा व कृषी तज्ञ सल्ला (${selectedVillage.nameMr} परिसर):**\n\n• **सोयाबीन N-P-K शिफारस**: हेक्टरी २० किलो नत्र, ६० किलो स्फुरद, २० किलो पालाश (१:३:१ गुणोत्तर) पेरणीच्या वेळी द्यावे.\n• **सेंद्रिय कर्ब सुधारणा**: प्रति हेक्टरी ५ टन कुजलेले शेणखत किंवा गांडूळ खत वापरल्यास ओलावा टिकून राहतो.\n• **तपासणी**: गावातील कृषी सेवा केंद्रात माती परीक्षण अहवाल (Soil Health Card) उपलब्ध आहे.`
              : `**Agronomic Soil Consultation for ${selectedVillage.nameEn}:**\n\n• **Recommended N-P-K Ratio for Soybean**: 20:60:20 kg/ha basal dose suited for regional Vertisols (black soils).\n• **Soil Moisture Preservation**: Apply 5 tons/ha well-decomposed FYM or vermicompost to elevate organic carbon above 0.75%.\n• **Micro-irrigation**: MahaDBT provides 55% to 80% subsidy under Pradhan Mantri Krishi Sinchayee Yojana (PMKSY).`;
          sourceNote = 'ICAR & Department of Agriculture Guidelines';
        } else if (activeRole === 'grievance' || lowerQ.includes('water') || lowerQ.includes('road') || lowerQ.includes('तक्रार')) {
          replyText =
            language === 'mr'
              ? `**तक्रार निवारण व लोकसेवा हमी मार्गदर्शक:**\n\n• **विभाग**: ग्रामीण पाणीपुरवठा व स्वच्छता विभाग, जिल्हा परिषद.\n• **निवारण मुदत (SLA)**: महाराष्ट्र लोकसेवा हक्क अधिनियमानुसार पिण्याच्या पाण्याच्या पाईपलाईन दुरुस्तीसाठी कमाल ४८ तास.\n• **पुढील पायरी**: ग्रामपंचायत कार्यालयात लेखी पावती घ्या किंवा पोर्टलवरील "तक्रार नोंदवा" मेनू वापरून थेट फोटोसह टोकन जनरेट करा.`
              : `**Grievance Redressal Protocol & RTS Resolution Window:**\n\n• **Designated Authority**: Rural Water Supply & Sanitation Wing, Zilla Parishad.\n• **Mandated Turnaround (SLA)**: Under Maharashtra Right to Public Services Act 2015, drinking water pipeline leaks must be addressed within 48 hours.\n• **Action**: You can click "Report Issue" in the main menu to submit photo evidence and receive an automated tracking ticket.`;
          sourceNote = 'Maharashtra Right to Public Services Act (RTS 2015)';
        } else {
          replyText =
            language === 'mr'
              ? `आपण **${selectedVillage.nameMr}** (ता. ${selectedVillage.talukaMr}) विषयी विचारणा केली आहे. या गावामध्ये लोकसंख्या ${selectedVillage.demographics.totalPopulation} असून साक्षरता दर ${selectedVillage.demographics.literacyRate}% आहे. सरपंच **${selectedVillage.administration.sarpanchNameMr}** असून गावात जल जीवन मिशन अंतर्गत पाणीपुरवठा सुरू आहे. आपण शेती, शाळा किंवा विकासकामांबद्दल अधिक विचारू शकता.`
              : `Regarding **${selectedVillage.nameEn}** (Taluka ${selectedVillage.talukaEn}, District ${selectedVillage.districtEn}): The recorded population is ${selectedVillage.demographics.totalPopulation} with a literacy rate of ${selectedVillage.demographics.literacyRate}%. Under the 15th Finance Commission, Jal Jeevan Mission, and ZP School digital programs, verified projects are actively monitored.`;
          sourceNote = 'Census of India & LGD Directory';
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sourceNote,
          roleUsed: activeRole
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text:
            language === 'mr'
              ? 'क्षमस्व, उत्तर मिळविण्यात अडचण आली. कृपया पुन्हा प्रयत्न करा.'
              : 'Unable to retrieve answer. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sourceNote: 'System Diagnostic Error'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 1. COLLAPSED FLOATING LAUNCHER (Positioned at below right hand side)
  if (!isAiModalOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-50 pointer-events-auto">
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-stone-900 to-stone-950 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl border border-amber-500/40 hover:border-amber-400 hover:shadow-amber-500/20 transition-all duration-200 hover:scale-102 active:scale-98"
          title="Open Gemini Civic Chatbot (Below Right Hand Side)"
          aria-label="Open Gemini Civic Chatbot"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-bold shadow-xs">
            <Bot className="w-4 h-4 text-stone-950" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-stone-900 animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>{language === 'mr' ? 'ग्राम मित्र AI' : 'Gram Mitra AI'}</span>
              <span className="text-[9px] font-mono font-semibold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                3.8 Flash
              </span>
            </div>
            <div className="text-[10px] text-stone-400 leading-tight">
              {language === 'mr' ? 'प्रश्न विचारा किंवा बोला' : 'Chat & Voice Assistant'}
            </div>
          </div>
        </button>
      </div>
    );
  }

  // 2. EXPANDED FLOATING CHATBOT WINDOW (Docked at below right hand side)
  return (
    <div className="fixed bottom-5 right-5 z-50 pointer-events-auto w-[94vw] sm:w-[420px] md:w-[440px] h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-stone-300 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-150 select-none font-sans">
      {/* Floating Widget Header */}
      <div className="p-3.5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0">
            <Bot className="w-4 h-4 text-stone-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-white font-serif tracking-tight truncate max-w-[170px] sm:max-w-none">
                {language === 'mr' ? 'ग्राम दृष्टी मित्र AI' : 'Gram Drishti Mitra AI'}
              </h3>
              <span className="text-[10px] font-mono text-amber-300">
                gemini-3.8-flash
              </span>
            </div>
            <p className="text-[10px] text-stone-400 truncate max-w-[200px] sm:max-w-none">
              {language === 'mr'
                ? `${selectedVillage.nameMr} · ४ विशेष रोल्स`
                : `${selectedVillage.nameEn} · 4 Grounded Roles`}
            </p>
          </div>
        </div>

        {/* Action Controls: Fullscreen Expand, Minimize, Close */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setIsAiModalOpen(false);
              navigateTo('ai-chat');
            }}
            className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors"
            title="Expand to Fullscreen Page"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsAiModalOpen(false)}
            className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors"
            title="Minimize to Corner"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsAiModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors"
            aria-label="Close chatbot"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Role Selection Tabs */}
      <div className="bg-stone-100 border-b border-stone-200 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
        <button
          onClick={() => handleRoleSelect('civic')}
          className={`px-2 py-0.8 rounded font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
            activeRole === 'civic'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-2xs'
              : 'text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Bot className="w-3 h-3" />
          <span>Civic</span>
        </button>

        <button
          onClick={() => handleRoleSelect('agri')}
          className={`px-2 py-0.8 rounded font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
            activeRole === 'agri'
              ? 'bg-emerald-600 text-white font-bold shadow-2xs'
              : 'text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Sprout className="w-3 h-3" />
          <span>Agro</span>
        </button>

        <button
          onClick={() => handleRoleSelect('viva')}
          className={`px-2 py-0.8 rounded font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
            activeRole === 'viva'
              ? 'bg-indigo-600 text-white font-bold shadow-2xs'
              : 'text-stone-700 hover:bg-stone-200'
          }`}
        >
          <GraduationCap className="w-3 h-3" />
          <span>For Sir</span>
        </button>

        <button
          onClick={() => handleRoleSelect('grievance')}
          className={`px-2 py-0.8 rounded font-medium flex items-center gap-1 transition-colors whitespace-nowrap ${
            activeRole === 'grievance'
              ? 'bg-rose-600 text-white font-bold shadow-2xs'
              : 'text-stone-700 hover:bg-stone-200'
          }`}
        >
          <FileText className="w-3 h-3" />
          <span>RTS</span>
        </button>
      </div>

      {/* Scrollable Conversation Thread */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-stone-50 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-6 h-6 rounded bg-stone-900 text-amber-400 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div className="max-w-[88%] space-y-1">
              <div
                className={`p-3 rounded-xl whitespace-pre-line leading-relaxed text-xs ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white font-medium rounded-tr-none'
                    : 'bg-white text-stone-900 border border-stone-200 shadow-2xs rounded-tl-none font-normal'
                }`}
              >
                {msg.text}
              </div>

              <div className="flex items-center justify-between px-1 text-[9px] text-stone-400 font-mono">
                <span>{msg.timestamp}</span>
                {msg.sourceNote && (
                  <span className="flex items-center gap-1 text-emerald-700 font-sans">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    <span>{msg.sourceNote}</span>
                  </span>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 border border-amber-300 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-stone-700 p-2.5 bg-white rounded-lg border border-stone-200 max-w-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span className="font-medium">
              {language === 'mr' ? 'जेमिनी विचार करत आहे...' : 'Gemini 3.8 Flash generating...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="px-3 py-1.5 bg-white border-t border-stone-200 overflow-x-auto flex items-center gap-1.5 text-[11px] whitespace-nowrap shrink-0">
        <span className="text-stone-400 font-mono text-[9px] uppercase font-bold shrink-0">
          Ask:
        </span>
        {quickQuestions[activeRole].map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2 py-0.8 rounded text-[11px] transition-colors border border-stone-200 truncate max-w-[200px]"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Bar with Speech Microphone */}
      <div className="p-2.5 border-t border-stone-200 bg-stone-50 flex items-center gap-1.5 shrink-0">
        {speechSupported && (
          <button
            onClick={toggleRecording}
            className={`p-2 rounded-lg border text-xs font-medium flex items-center justify-center transition-all ${
              isRecording
                ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
            }`}
            title={isRecording ? 'Listening... click to stop' : 'Click to speak question'}
          >
            {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-amber-600" />}
          </button>
        )}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder={
            isRecording
              ? (language === 'mr' ? 'आता बोला...' : 'Listening now...')
              : t.askQuestion
          }
          className="flex-1 text-xs px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-900 font-medium"
        />

        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="px-3 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-xs"
        >
          <Send className="w-3 h-3 text-amber-400" />
        </button>
      </div>
    </div>
  );
};
