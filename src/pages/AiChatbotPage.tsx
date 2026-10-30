import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import {
  Bot,
  Send,
  User,
  Sparkles,
  Mic,
  MicOff,
  RotateCcw,
  Download,
  ShieldCheck,
  Cpu,
  Sprout,
  GraduationCap,
  FileText,
  ChevronRight,
  Info,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
  personaUsed?: string;
}

interface ChatbotRole {
  id: 'civic' | 'agri' | 'capstone' | 'grievance';
  titleEn: string;
  titleMr: string;
  badge: string;
  icon: React.ReactNode;
  descriptionEn: string;
  descriptionMr: string;
  systemInstruction: string;
  starterPromptsEn: string[];
  starterPromptsMr: string[];
}

export const AiChatbotPage: React.FC = () => {
  const { language, selectedVillage, projects, facilities, schemes, navigateTo } = useApp();
  const t = getTranslation(language);

  // Model selection state: gemini-3.8-flash default, gemini-3.1-flash-lite for fast, gemini-4-argon for complex
  const [selectedModel, setSelectedModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon'>('gemini-3.8-flash');
  const [selectedRoleId, setSelectedRoleId] = useState<'civic' | 'agri' | 'capstone' | 'grievance'>('civic');

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const villageProjects = projects.filter((p) => p.villageId === selectedVillage.id);
  const villageFacilities = facilities.filter((f) => f.villageId === selectedVillage.id);

  // 4 Dedicated Chatbot Personas with tailored System Instructions
  const roles: ChatbotRole[] = [
    {
      id: 'civic',
      titleEn: 'Civic Governance Advisor (Gram Mitra)',
      titleMr: 'ग्राम प्रशासन सल्लागार (ग्राम मित्र)',
      badge: 'Public Services & Schemes',
      icon: <Bot className="w-4 h-4 text-amber-500" />,
      descriptionEn: 'Expert on Maharashtra Panchayati Raj, Jal Jeevan Mission, village demographics, and government welfare schemes.',
      descriptionMr: 'महाराष्ट्र पंचायती राज, जल जीवन मिशन, गावाची लोकसंख्या आणि शासकीय कल्याणकारी योजनांचे तज्ञ मार्गदर्शक.',
      systemInstruction: `You are "Gram Drishti Mitra", an authoritative, respectful, and transparent AI civic assistant for rural Maharashtra public administration and citizen welfare on the GramDrishti platform.
Current Selected Village: ${selectedVillage.nameEn} (${selectedVillage.nameMr}), Taluka: ${selectedVillage.talukaEn}, District: ${selectedVillage.districtEn}, Maharashtra.
LGD Directory Code: ${selectedVillage.lgdCode}, Pincode: ${selectedVillage.pincode}.
Demographics: Population ${selectedVillage.demographics.totalPopulation}, Literacy ${selectedVillage.demographics.literacyRate}%, Area ${selectedVillage.demographics.areaHectares} ha.
Sarpanch: ${selectedVillage.administration.sarpanchNameEn} (${selectedVillage.administration.sarpanchNameMr}), Contact: ${selectedVillage.administration.sarpanchContact}.
Gram Sevak: ${selectedVillage.administration.gramSevakNameEn} (${selectedVillage.administration.gramSevakNameMr}), Contact: ${selectedVillage.administration.gramSevakContact}.
Talathi: ${selectedVillage.administration.talathiNameEn} (${selectedVillage.administration.talathiNameMr}).
Ongoing Projects in village:
${villageProjects.map((p) => `- ${p.titleEn} (${p.titleMr}): Status ${p.status}, Budget ₹${p.budgetLakhs} Lakhs, Progress ${p.progressPercent}%, Sanction: ${p.sanctionOrderNumber}`).join('\n')}
Public Facilities in village:
${villageFacilities.map((f) => `- ${f.nameEn} (${f.nameMr}): Category ${f.category}, Timings ${f.timingsMr}, Status ${f.operationalStatus}`).join('\n')}
Welfare Schemes on platform:
${schemes.map((s) => `- ${s.nameEn} (${s.nameMr}): ${s.category}, Benefits: ${s.shortDescEn}`).join('\n')}

Role Guidelines:
- Answer accurately based on verified platform data.
- If information is not in the verified repository, state clearly: "This information is not currently recorded in the GramDrishti verified database. Please check with your local Gram Panchayat office."
- Provide answers in concise, well-formatted English or natural Marathi based on the user's prompt.`,
      starterPromptsEn: [
        'Which welfare schemes are available for small & marginal farmers?',
        'What are the key development projects sanctioned for this village?',
        'Who are the administrative contacts for Gram Panchayat office?',
        'How does Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY) work?'
      ],
      starterPromptsMr: [
        'अल्पभूधारक शेतकऱ्यांसाठी कोणत्या शासकीय योजना उपलब्ध आहेत?',
        'गावामध्ये कोणती विकासकामे मंजूर आहेत व त्यांची सद्यस्थिती काय?',
        'ग्रामपंचायत सरपंच आणि ग्रामसेवक यांचा संपर्क क्रमांक काय आहे?',
        'महात्मा ज्योतिराव फुले जन आरोग्य योजनेचा लाभ कसा मिळतो?'
      ]
    },
    {
      id: 'agri',
      titleEn: 'Agro-Soil & Crop Consultant',
      titleMr: 'कृषी, मृदा व पीक तज्ञ',
      badge: 'ICAR & Soil Science',
      icon: <Sprout className="w-4 h-4 text-emerald-500" />,
      descriptionEn: 'Agronomy specialist for soil nutrient stoichiometry (N-P-K), crop disease control, and micro-irrigation in Maharashtra.',
      descriptionMr: 'मृदा पोषण (N-P-K समतोल), पीक रोग नियंत्रण आणि सूक्ष्म सिंचनाचे तांत्रिक कृषी सल्लागार.',
      systemInstruction: `You are the "GramDrishti Agro-Biochemist & Soil Science Advisor" affiliated with ICAR and Maharashtra Agriculture Department guidelines.
Location: ${selectedVillage.nameEn}, District: ${selectedVillage.districtEn}, Maharashtra.
Key agro-climatic profile: Black cotton soil (Vertisols), primary crops: Soybean, Cotton, Sugarcane, Turmeric, Pulses, Jowar.

Role Guidelines:
- Provide scientific, evidence-based recommendations for fertilizer application rates (NPK ratio), organic carbon replenishment, and soil pH buffering.
- Advise on drought mitigation, drip irrigation scheduling, and crop rotation best practices.
- State chemical and organic pest control protocols clearly with safety guidelines.`,
      starterPromptsEn: [
        'What is the ideal N-P-K fertilizer ratio for Soybean in black cotton soil?',
        'How can farmers increase organic carbon in semi-arid soil?',
        'Suggest pest management for pink bollworm in Bt Cotton.',
        'Which micro-irrigation schemes offer subsidies in Maharashtra?'
      ],
      starterPromptsMr: [
        'काळी कसदार जमिनीत सोयाबीनसाठी खतांचे योग्य N-P-K प्रमाण काय असावे?',
        'जमिनीतील सेंद्रिय कर्ब (Organic Carbon) वाढवण्यासाठी काय उपाय करावेत?',
        'कापसावरील बोंडअळीच्या नियंत्रणासाठी एकात्मिक कीड व्यवस्थापन सांगा.',
        'ठिबक सिंचनासाठी शासनाचे किती अनुदान मिळते?'
      ]
    },
    {
      id: 'capstone',
      titleEn: 'Academic Project Defense Tutor (For Sir)',
      titleMr: 'प्रकल्प सादरीकरण व व्हायव्हा गाईड',
      badge: 'B.Tech CSE Sem VII',
      icon: <GraduationCap className="w-4 h-4 text-indigo-500" />,
      descriptionEn: 'Helps students explain the system architecture, ER database schemas, scikit-learn models, and viva questions to their college evaluator.',
      descriptionMr: 'कॉलेज परीक्षकांसाठी (Sir) ५-स्तरीय आर्किटेक्चर, ER स्कीमा आणि ML मॉडेल्सचे तांत्रिक स्पष्टीकरण देणारा गाईड.',
      systemInstruction: `You are the "Academic Project Defense Advisor" for GramDrishti — a B.Tech Computer Science & Engineering Semester VII Capstone Project.
Report Specifications:
- 5-Layered Architecture: Presentation (React 19, TypeScript, Tailwind), API/Application (Python FastAPI), Data (PostgreSQL 16), AI/Analytics (Python scikit-learn), Operations (Git, GitHub, Docker).
- Functional Requirements (Table 3.4): FR-01 through FR-10 with 100% test pass rate.
- Relational Schema (Table 4.3): 7 Normalized Entities: Village, Category, InformationRecord, Source (data provenance), User, Role (RBAC), UpdateLog (tamper-evident audit trail).
- Machine Learning Suite: XGBoost & Random Forest for scheme and crop yield prediction, K-Means & PCA for socio-economic village clustering (silhouette score 0.68), SARIMAX & Prophet for groundwater aquifer time series, Sentinel-2 NDVI remote sensing, and IndicBERT grievance NLP classifier.

Role Guidelines:
- Speak in precise computer science engineering terminology (e.g., 3NF/BCNF normalization, algorithmic time complexity, TF-IDF vectorization, precision-recall AUC, RESTful idempotency).
- Help the student answer tough questions that external examiners or project evaluators ("Sir") ask during final year viva voce.`,
      starterPromptsEn: [
        'How should I explain FR-05 Data Provenance to the external examiner?',
        'Why did we choose Random Forest and XGBoost instead of Deep Learning?',
        'Explain the 5-layer system architecture in 2 minutes for Sir.',
        'What are the foreign key relationships in our 7-entity relational schema?'
      ],
      starterPromptsMr: [
        'परीक्षकांना (Sir) FR-05 डेटा सिद्धता (Provenance) कशी समजावून सांगावी?',
        'ग्रामीण डेटासेटसाठी डीप लर्निंगऐवजी रँडम फॉरेस्ट का निवडले?',
        'प्रकल्पाचे ५-स्तरीय आर्किटेक्चर २ मिनिटांत कसे स्पष्ट करावे?',
        'डेटाबेसमधील ७ टेबल्स आणि त्यांच्यातील फॉरेन की संबंध सांगा.'
      ]
    },
    {
      id: 'grievance',
      titleEn: 'Citizen Grievance & Public Service Officer',
      titleMr: 'तक्रार निवारण व लोकसेवा हक्क अधिकारी',
      badge: 'RTS Act & SLA Tracking',
      icon: <FileText className="w-4 h-4 text-rose-500" />,
      descriptionEn: 'Assists citizens in formulating civic complaints with proper evidence, department routing, and Maharashtra Right to Public Services timelines.',
      descriptionMr: 'महाराष्ट्र लोकसेवा हक्क अधिनियमानुसार रस्ते, पाणी, वीज तक्रारी नोंदवण्यासाठी नागरिकांना मार्गदर्शन.',
      systemInstruction: `You are the "GramDrishti Grievance Redressal Assistant" adhering to Maharashtra Right to Public Services Act (RTS 2015) and Gram Panchayat Grievance Protocols.
Departments: Water Supply & Sanitation (Zilla Parishad), Roads & Buildings (PWD), Electricity (MSEDCL/Mahavitaran), Primary Healthcare (PHC/Health Dept), Rural Education.

Role Guidelines:
- Help citizens structure actionable grievance complaints with required details (exact landmark, duration of failure, affected households, photo evidence suggestion).
- Inform citizens of the mandated Service Level Agreement (SLA) resolution turnaround times (e.g., drinking water pipe burst: 24-48 hrs; street light repair: 72 hrs).
- Explain escalation procedures to Taluka Block Development Officer (BDO) if local Gram Panchayat does not act.`,
      starterPromptsEn: [
        'How do I file an urgent complaint for drinking water pipeline leakage?',
        'What is the legal resolution timeline under Maharashtra RTS Act?',
        'Who is responsible for broken streetlights and phase failure?',
        'How can I escalate an unresolved road repair grievance to the BDO?'
      ],
      starterPromptsMr: [
        'गावातील पिण्याच्या पाण्याच्या पाईपलाईन गळतीची तातडीची तक्रार कशी करावी?',
        'महाराष्ट्र लोकसेवा हमी कायद्यानुसार तक्रार निवारणाची मुदत किती आहे?',
        'गावातील बंद पथदिवे व रोहित्र (DP) दुरुस्तीसाठी कोणाकडे दाद मागावी?',
        'ग्रामपंचायतीने तक्रारीवर कारवाई न केल्यास BDO कडे अपील कसे करावे?'
      ]
    }
  ];

  const currentRole = roles.find((r) => r.id === selectedRoleId) || roles[0];

  // Initialize multi-turn chat history
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-init-1',
        role: 'model',
        text:
          language === 'mr'
            ? `नमस्कार! मी **${currentRole.titleMr}** आहे. मी आपल्याला **${selectedVillage.nameMr}** (जि. ${selectedVillage.districtMr}) संदर्भातील माहिती, योजना, शेती सल्ला किंवा B.Tech CSE प्रकल्प सादरीकरणासाठी मदत करू शकतो. आपण खालीलपैकी प्रश्न निवडू शकता किंवा स्वतःचा प्रश्न विचारू शकता.`
            : `Namaskar! I am your **${currentRole.titleEn}**. I am initialized to assist you with verified data, welfare schemes, soil agronomy, or academic project evaluation regarding **${selectedVillage.nameEn}** (District ${selectedVillage.districtEn}, Maharashtra). How can I assist you?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
        personaUsed: currentRole.titleEn
      }
    ];
  });

  // Auto-scroll to bottom of chat thread
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

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
      } catch {
        setIsRecording(false);
      }
    }
  };

  const handleRoleChange = (roleId: 'civic' | 'agri' | 'capstone' | 'grievance') => {
    setSelectedRoleId(roleId);
    const newRole = roles.find((r) => r.id === roleId) || roles[0];
    const greetingText =
      language === 'mr'
        ? `रोल बदलला: **${newRole.titleMr}** सक्रिय आहे. आता आपण या विषयाशी संबंधित प्रश्न विचारू शकता.`
        : `Switched persona to: **${newRole.titleEn}**. I am now loaded with domain instructions for this role.`;

    setMessages((prev) => [
      ...prev,
      {
        id: `role-switch-${Date.now()}`,
        role: 'model',
        text: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
        personaUsed: newRole.titleEn
      }
    ]);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `clear-${Date.now()}`,
        role: 'model',
        text:
          language === 'mr'
            ? `संभाषण इतिहास रीसेट केला आहे. मी **${currentRole.titleMr}** म्हणून आपल्या सेवेत हजर आहे.`
            : `Conversation thread cleared. I am ready to assist you as **${currentRole.titleEn}**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
        personaUsed: currentRole.titleEn
      }
    ]);
  };

  const handleExportTranscript = () => {
    const transcriptText = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.role === 'user' ? 'USER' : `GEMINI (${m.personaUsed || 'Assistant'})`}:\n${m.text}\n`
      )
      .join('\n----------------------------------------\n\n');

    const blob = new Blob([transcriptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GramDrishti_Gemini_Chat_${selectedVillage.id}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setInput('');
    const userMessageId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });

        // Build full multi-turn conversation history for Gemini API
        const conversationParts = updatedHistory.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));

        const response = await ai.models.generateContent({
          model: selectedModel,
          contents: conversationParts,
          config: {
            systemInstruction: currentRole.systemInstruction,
            temperature: 0.65
          }
        });

        const replyText = response.text || '';
        const modelMessage: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: selectedModel,
          personaUsed: currentRole.titleEn
        };
        setMessages((prev) => [...prev, modelMessage]);
      } else {
        // High quality multi-turn domain responses when offline or testing without key
        let fallbackReply = '';
        const lowerQ = query.toLowerCase();

        if (selectedRoleId === 'capstone' || lowerQ.includes('sir') || lowerQ.includes('viva') || lowerQ.includes('fr-05')) {
          fallbackReply =
            language === 'mr'
              ? `**B.Tech CSE Semester VII प्रकल्प सादरीकरण मुद्दे (Sir साठी):**\n\n1. **सिस्टीम आर्किटेक्चर**: ५ टप्पे - Presentation (React), API (Python FastAPI), Persistence (PostgreSQL), Analytics (scikit-learn), आणि Operations (Docker).\n2. **डेटा सिद्धता (FR-05)**: प्रत्येक नोंदीमध्ये \`source_id\`, मंजुरी आदेश क्रमांक व पडताळणी तारीख नमूद आहे.\n3. **ML मॉडेल्स**: Grievance वर्गीकरणासाठी IndicBERT + TF-IDF, तर गाव विकासाच्या वर्गीकरणासाठी K-Means आणि PCA वापरले आहे.`
              : `**Key Talking Points for Project Defense (For Sir):**\n\n1. **System Architecture**: GramDrishti implements a clean 5-tier architecture separating the Presentation Layer (React 19 + TypeScript) from API (FastAPI), Data Persistence (PostgreSQL), and AI/Analytics (scikit-learn).\n2. **Requirements Traceability**: All 10 Functional Requirements (FR-01 to FR-10) are formally verified with live test runner execution.\n3. **Data Provenance (FR-05)**: Strict foreign key linkage to the \`Source\` entity (\`sanction_order_no\`, \`checked_at\`) ensures zero hallucination.\n4. **Algorithmic Justification**: Random Forest was chosen over deep neural networks due to tabular rural survey constraints, superior interpretability (SHAP values), and rapid inference latency (<12ms).`;
        } else if (selectedRoleId === 'agri' || lowerQ.includes('soil') || lowerQ.includes('crop') || lowerQ.includes('शेती') || lowerQ.includes('खत')) {
          fallbackReply =
            language === 'mr'
              ? `**मृदा व कृषी तज्ञ सल्ला (${selectedVillage.nameMr} परिसर):**\n\n• **सोयाबीन N-P-K शिफारस**: हेक्टरी २० किलो नत्र, ६० किलो स्फुरद, २० किलो पालाश (१:३:१ गुणोत्तर) पेरणीच्या वेळी द्यावे.\n• **सेंद्रिय कर्ब सुधारणा**: प्रति हेक्टरी ५ टन कुजलेले शेणखत किंवा गांडूळ खत वापरल्यास ओलावा टिकून राहतो.\n• **तपासणी**: गावातील कृषी सेवा केंद्रात माती परीक्षण अहवाल (Soil Health Card) उपलब्ध आहे.`
              : `**Agronomic Soil Consultation for ${selectedVillage.nameEn}:**\n\n• **Recommended N-P-K Ratio for Soybean**: 20:60:20 kg/ha basal dose suited for regional Vertisols (black soils).\n• **Soil Moisture Preservation**: Apply 5 tons/ha well-decomposed FYM or vermicompost to elevate organic carbon above 0.75%.\n• **Micro-irrigation**: MahaDBT provides 55% to 80% subsidy under Pradhan Mantri Krishi Sinchayee Yojana (PMKSY).`;
        } else if (selectedRoleId === 'grievance' || lowerQ.includes('water') || lowerQ.includes('road') || lowerQ.includes('पाणी') || lowerQ.includes('तक्रार')) {
          fallbackReply =
            language === 'mr'
              ? `**तक्रार निवारण व लोकसेवा हमी मार्गदर्शक:**\n\n• **विभाग**: ग्रामीण पाणीपुरवठा व स्वच्छता विभाग, जिल्हा परिषद.\n• **निवारण मुदत (SLA)**: महाराष्ट्र लोकसेवा हक्क अधिनियमानुसार पिण्याच्या पाण्याच्या पाईपलाईन दुरुस्तीसाठी कमाल ४८ तास.\n• **पुढील पायरी**: ग्रामपंचायत कार्यालयात लेखी पावती घ्या किंवा पोर्टलवरील "तक्रार नोंदवा" मेनू वापरून थेट फोटोसह टोकन जनरेट करा.`
              : `**Grievance Action Plan & Legal Resolution Window:**\n\n• **Designated Authority**: Rural Water Supply & Sanitation Wing, Zilla Parishad.\n• **Mandated Turnaround (SLA)**: Under Maharashtra Right to Public Services Act 2015, drinking water pipeline leaks must be addressed within 48 hours.\n• **Action**: You can click "Report Issue" in our navigation bar to submit photo evidence and receive an automated tracking ticket.`;
        } else {
          fallbackReply =
            language === 'mr'
              ? `आपण **${selectedVillage.nameMr}** (ता. ${selectedVillage.talukaMr}, जि. ${selectedVillage.districtMr}) विषयी प्रश्न विचारला आहे. या गावामध्ये लोकसंख्या ${selectedVillage.demographics.totalPopulation} असून साक्षरता दर ${selectedVillage.demographics.literacyRate}% आहे. सरपंच **${selectedVillage.administration.sarpanchNameMr}** असून गावात जल जीवन मिशन अंतर्गत पाणीपुरवठा सुरू आहे. आपण शेती, शाळा किंवा विकासकामांबद्दल अधिक विचारू शकता.`
              : `Regarding **${selectedVillage.nameEn}** (Taluka ${selectedVillage.talukaEn}, District ${selectedVillage.districtEn}): The village has an official Census population of ${selectedVillage.demographics.totalPopulation} and a literacy rate of ${selectedVillage.demographics.literacyRate}%. Under the 15th Finance Commission and Jal Jeevan Mission, verified infrastructure projects are actively monitored on this portal.`;
        }

        const modelMessage: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: `${selectedModel} (Local Knowledge Base)`,
          personaUsed: currentRole.titleEn
        };
        setMessages((prev) => [...prev, modelMessage]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          text:
            language === 'mr'
              ? 'क्षमस्व, संपर्क साधण्यात अडचण आली. कृपया पुन्हा प्रश्न विचारून पहा.'
              : 'Unable to reach the Gemini API endpoint. Please check your network and try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: selectedModel,
          personaUsed: 'System Diagnostic'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-16 font-sans">
      {/* Header Banner */}
      <div className="bg-stone-900 border-b border-stone-800 text-stone-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
              <Bot className="w-4 h-4 text-amber-400" />
              <span>Multi-Turn Gemini Civic & Academic Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white mt-1">
              {language === 'mr' ? 'ग्राम दृष्टी एआय चॅटबॉट्स' : 'GramDrishti Multi-Turn Gemini Chatbot'}
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Interactive multi-turn conversation interface with tailored system instructions across 4 specialized roles: Civic Mitra, Soil Scientist, B.Tech Project Defense Tutor, and Grievance Officer.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('presentation')}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold rounded shadow-xs transition-colors flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4 text-stone-950" />
              <span>Present to Sir (Viva Mode)</span>
            </button>
            <button
              onClick={() => navigateTo('village-overview')}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded border border-stone-700 transition-colors"
            >
              {language === 'mr' ? 'गाव माहिती' : 'Village Profile'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar: Role Switcher & Model Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Model Selector Card */}
            <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                Gemini Model Selection
              </span>
              <div className="mt-2 space-y-1.5">
                <button
                  onClick={() => setSelectedModel('gemini-3.8-flash')}
                  className={`w-full text-left p-2.5 rounded text-xs transition-colors border ${
                    selectedModel === 'gemini-3.8-flash'
                      ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono">gemini-3.8-flash</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded font-semibold">
                      Default
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    General Q&A, public services & schemes
                  </div>
                </button>

                <button
                  onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
                  className={`w-full text-left p-2.5 rounded text-xs transition-colors border ${
                    selectedModel === 'gemini-3.1-flash-lite'
                      ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono">gemini-3.1-flash-lite</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-stone-200 text-stone-700 rounded font-semibold">
                      Fast
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    Low-latency brief answers
                  </div>
                </button>

                <button
                  onClick={() => setSelectedModel('gemini-4-argon')}
                  className={`w-full text-left p-2.5 rounded text-xs transition-colors border ${
                    selectedModel === 'gemini-4-argon'
                      ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono">gemini-4-argon</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-purple-100 text-purple-900 rounded font-semibold">
                      Reasoning
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    Complex STEM, agronomy & architecture
                  </div>
                </button>
              </div>
            </div>

            {/* Chatbot Role / Persona Selector */}
            <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                System Instruction Persona
              </span>
              <div className="mt-2 space-y-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleRoleChange(role.id)}
                    className={`w-full text-left p-2.5 rounded text-xs transition-colors border ${
                      selectedRoleId === role.id
                        ? 'bg-stone-900 text-white border-stone-900 font-bold shadow-xs'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-stone-800 text-amber-400">
                        {role.icon}
                      </div>
                      <div className="truncate">
                        <div className="font-semibold truncate">
                          {language === 'mr' ? role.titleMr : role.titleEn}
                        </div>
                        <div
                          className={`text-[10px] ${
                            selectedRoleId === role.id ? 'text-stone-300' : 'text-stone-500'
                          }`}
                        >
                          {role.badge}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Village Context Badge */}
            <div className="bg-white border border-stone-200 rounded-lg p-3 text-xs shadow-2xs">
              <div className="text-[10px] font-mono font-bold text-stone-400 uppercase">
                Active Grounded Village
              </div>
              <div className="font-bold text-stone-900 mt-0.5">
                {language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn}
              </div>
              <div className="text-[11px] text-stone-500">
                Taluka: {selectedVillage.talukaEn} · Dist: {selectedVillage.districtEn}
              </div>
              <div className="text-[10px] text-stone-400 font-mono mt-1">
                LGD Code: {selectedVillage.lgdCode}
              </div>
            </div>
          </div>

          {/* Right Main Column: Multi-Turn Conversation Thread */}
          <div className="lg:col-span-3 flex flex-col bg-white border border-stone-300 rounded-lg shadow-sm h-[750px] overflow-hidden">
            {/* Chat Thread Header */}
            <div className="p-4 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-stone-900 text-amber-400 flex items-center justify-center font-bold">
                  {currentRole.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    {language === 'mr' ? currentRole.titleMr : currentRole.titleEn}
                  </h3>
                  <div className="text-[11px] text-stone-500 flex items-center gap-2">
                    <span>Model: {selectedModel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{messages.filter((m) => m.role === 'user').length} Turns</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearHistory}
                  title="Clear conversation"
                  className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors text-xs flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>

                <button
                  onClick={handleExportTranscript}
                  title="Download transcript"
                  className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors text-xs flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>

            {/* Scrollable Messages Thread */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="w-7 h-7 rounded bg-stone-900 text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                      <Bot className="w-4 h-4 text-amber-400" />
                    </div>
                  )}

                  <div className="max-w-[85%] sm:max-w-[78%] space-y-1">
                    <div
                      className={`p-4 rounded-lg whitespace-pre-line leading-relaxed text-xs sm:text-sm ${
                        msg.role === 'user'
                          ? 'bg-amber-600 text-white font-medium'
                          : 'bg-white text-stone-900 border border-stone-200 shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>

                    <div className="flex items-center justify-between px-1 text-[10px] text-stone-400 font-mono">
                      <span>{msg.timestamp}</span>
                      {msg.role === 'model' && (
                        <div className="flex items-center gap-2">
                          {msg.modelUsed && <span>{msg.modelUsed}</span>}
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            className="hover:text-stone-700 flex items-center gap-1"
                            title="Copy reply text"
                          >
                            {copiedMessageId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 border border-amber-300 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2.5 text-xs text-stone-700 p-3 bg-white rounded-lg border border-stone-200 max-w-sm">
                  <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                  <span className="font-medium">
                    {language === 'mr'
                      ? 'जेमिनी ३.८ फ्लॅश विचार करत आहे...'
                      : 'Gemini 3.8 Flash generating multi-turn reply...'}
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Prompts for Active Persona */}
            <div className="px-4 py-2.5 bg-white border-t border-stone-200 overflow-x-auto flex items-center gap-2 text-xs whitespace-nowrap">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-400 shrink-0">
                Suggested:
              </span>
              {(language === 'mr' ? currentRole.starterPromptsMr : currentRole.starterPromptsEn).map(
                (q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded text-xs font-medium transition-colors border border-stone-200 truncate max-w-xs"
                  >
                    {q}
                  </button>
                )
              )}
            </div>

            {/* Bottom Input Console with Speech Microphone */}
            <div className="p-3 border-t border-stone-200 bg-white flex items-center gap-2">
              {speechSupported && (
                <button
                  onClick={toggleRecording}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isRecording
                      ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-300'
                  }`}
                  title={isRecording ? 'Listening... click to stop' : 'Click to speak question'}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-600" />}
                  <span className="hidden sm:inline text-[11px]">
                    {isRecording ? (language === 'mr' ? 'ऐकत आहे...' : 'Listening...') : (language === 'mr' ? 'माईक' : 'Voice')}
                  </span>
                </button>
              )}

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder={
                  isRecording
                    ? (language === 'mr' ? 'आता बोला...' : 'Listening now...')
                    : language === 'mr'
                    ? 'आपला प्रश्न येथे टाईप करा (उदा. योजना, शेती, प्रकल्प सादरीकरण)...'
                    : `Ask ${currentRole.titleEn} (maintains multi-turn context)...`
                }
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 font-medium"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{t.search}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
