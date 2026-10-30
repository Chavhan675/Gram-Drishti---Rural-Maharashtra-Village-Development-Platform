import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export type InspectionMode = 'true_color' | 'water_grid' | 'solar_energy' | 'agri_ndvi';

export interface PointOfInterest {
  id: string;
  nameEn: string;
  nameMr: string;
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
  category: 'governance' | 'water' | 'energy' | 'agriculture' | 'social';
  descriptionEn: string;
  descriptionMr: string;
  kpi: {
    labelEn: string;
    labelMr: string;
    value: string;
    status: 'optimal' | 'good' | 'monitoring';
  };
}

export const POINTS_OF_INTEREST: PointOfInterest[] = [
  {
    id: 'overview',
    nameEn: 'Aerial Village Overview',
    nameMr: 'गावाचे विहंगम दृश्य',
    cameraPos: [70, 58, 75],
    targetPos: [0, 2, 0],
    category: 'governance',
    descriptionEn: 'Integrated 3D Spatial Twin of Rural Infrastructure, Hydrology, Clean Energy & Farmland.',
    descriptionMr: 'ग्रामीण पायाभूत सुविधा, जलसंधारण, सौर ऊर्जा आणि शेतजमिनीची एकात्मिक ३डी डिजिटल प्रतिकृती.',
    kpi: {
      labelEn: 'Total Monitored Assets',
      labelMr: 'एकूण नोंदणीकृत मालमत्ता',
      value: '48 Geo-Assets',
      status: 'optimal'
    }
  },
  {
    id: 'panchayat',
    nameEn: 'Gram Panchayat Bhavan',
    nameMr: 'ग्रामपंचायत प्रशासकीय भवन',
    cameraPos: [14, 12, 22],
    targetPos: [0, 3, 0],
    category: 'governance',
    descriptionEn: 'Civic Governance HQ with Digital Seva Kendra, Rooftop Solar (12 kWp) & Public Meeting Hall.',
    descriptionMr: 'डिजिटल सेवा केंद्र, १२ किलोवॅट सौर पॅनेल्स आणि ग्रामसभा सभागृहासह प्रशासकीय केंद्र.',
    kpi: {
      labelEn: 'Digital Service Uptime',
      labelMr: 'डिजिटल सेवा उपलब्धता',
      value: '99.4% Online',
      status: 'optimal'
    }
  },
  {
    id: 'water_tank',
    nameEn: 'Jal Jeevan Water Reservoir (ESR)',
    nameMr: 'जल जीवन मिशन उंच पाण्याची टाकी',
    cameraPos: [-22, 24, -14],
    targetPos: [-28, 12, -24],
    category: 'water',
    descriptionEn: 'Elevated Storage Reservoir (1.5 Lakh Litres) with SCADA flow sensors & chlorination unit.',
    descriptionMr: '१.५ लाख लिटर क्षमतेची उंच टाकी, स्कॅडा फ्लो सेन्सर्स आणि शुद्ध पाणी पुरवठा जाळे.',
    kpi: {
      labelEn: 'Reservoir Water Level',
      labelMr: 'पाणी साठा पातळी',
      value: '84% (126 KL)',
      status: 'optimal'
    }
  },
  {
    id: 'solar_substation',
    nameEn: 'Solar Micro-Grid Substation',
    nameMr: 'सौर मायक्रो-ग्रीड सबस्टेशन',
    cameraPos: [32, 14, -22],
    targetPos: [24, 2, -30],
    category: 'energy',
    descriptionEn: '50 kWp ground-mounted solar farm supplying continuous power to water pumps & streetlights.',
    descriptionMr: '५० किलोवॅट सौर प्रकल्प ज्यामुळे पाणी उपसा पंप आणि रस्ते दिव्यांना अखंड वीज पुरवठा होतो.',
    kpi: {
      labelEn: 'Instant Solar Generation',
      labelMr: 'तात्काळ सौर वीज निर्मिती',
      value: '42.8 kW (Day peak)',
      status: 'optimal'
    }
  },
  {
    id: 'farmland',
    nameEn: 'Sugarcane & Precision Irrigation',
    nameMr: 'शेती व ठिबक सिंचन क्षेत्र',
    cameraPos: [-18, 14, 38],
    targetPos: [-32, 2, 24],
    category: 'agriculture',
    descriptionEn: 'Terraced farmland with concrete-lined canal, smart soil moisture telemetry & drip irrigation.',
    descriptionMr: 'सिमेंट-काँक्रीट कालवा, मृदा आर्द्रता सेन्सर्स आणि ठिबक सिंचनयुक्त बागायती शेती.',
    kpi: {
      labelEn: 'Crop NDVI Health Index',
      labelMr: 'पीक आरोग्य निर्देशांक',
      value: '0.74 (Healthy Vigorous)',
      status: 'optimal'
    }
  },
  {
    id: 'health_school',
    nameEn: 'Primary Health Centre & Smart School',
    nameMr: 'प्राथमिक आरोग्य केंद्र व जिल्हा परिषद शाळा',
    cameraPos: [36, 15, 26],
    targetPos: [28, 4, 18],
    category: 'social',
    descriptionEn: '24x7 Emergency PHC with 108 Ambulance bay adjacent to ZP Smart Digital School with assembly court.',
    descriptionMr: '१०८ रुग्णवाहिकेसह २४ तास प्राथमिक आरोग्य केंद्र आणि डिजिटल वर्गखोल्यांची शाळा.',
    kpi: {
      labelEn: 'Daily Healthcare Footfall',
      labelMr: 'दैनंदिन आरोग्य तपासणी',
      value: '42 OPD Patients',
      status: 'good'
    }
  }
];

export interface SceneEngine {
  domElement: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  setInspectionMode: (mode: InspectionMode) => void;
  flyToPoi: (poi: PointOfInterest) => void;
  dispose: () => void;
}

// Check software GL fallback per Three.js skill
function isSoftwareRenderer(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean {
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (!debugInfo) return false;
  const rendererString = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
  return /swiftshader|llvmpipe|softpipe|mesa/i.test(rendererString);
}

// Procedural Canvas Textures
function createRoadTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Dark asphalt base
  ctx.fillStyle = '#2b2d31';
  ctx.fillRect(0, 0, 512, 512);

  // Grain noise
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const shade = Math.floor(35 + Math.random() * 25);
    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // White road curbs
  ctx.fillStyle = '#9ca3af';
  ctx.fillRect(10, 0, 8, 512);
  ctx.fillRect(494, 0, 8, 512);

  // Dashed yellow/white center line
  ctx.fillStyle = '#fbbf24';
  const dashLength = 40;
  const gapLength = 24;
  for (let y = 0; y < 512; y += dashLength + gapLength) {
    ctx.fillRect(252, y, 8, dashLength);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createSolarPanelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Deep navy blue monocrystalline silicon
  ctx.fillStyle = '#102244';
  ctx.fillRect(0, 0, 256, 256);

  // Cell dividers
  ctx.strokeStyle = '#2b4c7e';
  ctx.lineWidth = 2;
  for (let i = 32; i < 256; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(256, 1);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(256, i);
    ctx.stroke();
  }

  // Silver conductor busbars
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  for (let x = 16; x < 256; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createTerracottaTileTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Warm terracotta base
  ctx.fillStyle = '#b44a2b';
  ctx.fillRect(0, 0, 256, 256);

  // Clay tile horizontal rows
  const rowHeight = 20;
  for (let y = 0; y < 256; y += rowHeight) {
    ctx.fillStyle = y % (rowHeight * 2) === 0 ? '#9a381c' : '#c25333';
    ctx.fillRect(0, y, 256, rowHeight - 2);

    // Ridge shadow
    ctx.fillStyle = '#5c1f0d';
    ctx.fillRect(0, y + rowHeight - 2, 256, 2);

    // Subtle individual tile divisions
    for (let x = (y % 40 === 0 ? 0 : 15); x < 256; x += 30) {
      ctx.fillStyle = '#7a2712';
      ctx.fillRect(x, y, 2, rowHeight - 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createSoilTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Maharashtra black cotton soil / Deccan red loam base
  ctx.fillStyle = '#452c1e';
  ctx.fillRect(0, 0, 256, 256);

  // Furrows
  for (let y = 0; y < 256; y += 12) {
    ctx.fillStyle = '#321e14';
    ctx.fillRect(0, y, 256, 4);
    ctx.fillStyle = '#573a28';
    ctx.fillRect(0, y + 4, 256, 8);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function initVillage3DScene(container: HTMLElement): SceneEngine {
  // 1. Scene & Camera
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xd7e6f4);
  scene.fog = new THREE.FogExp2(0xd7e6f4, 0.0075);

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / Math.max(container.clientHeight, 1),
    0.5,
    350
  );
  camera.position.set(70, 58, 75);

  // 2. Renderer & Software GL check
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const isSoftGl = isSoftwareRenderer(renderer.getContext());
  renderer.setPixelRatio(isSoftGl ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = !isSoftGl;
  if (!isSoftGl) {
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  container.replaceChildren(renderer.domElement);

  // 3. Studio PBR Environment via PMREMGenerator
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  pmremGenerator.dispose();

  // 4. Lighting
  // Hemisphere light: warm sky, earthy ground fill
  const hemiLight = new THREE.HemisphereLight(0xfff6e8, 0x5a6345, 0.85);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  // Sun directional light with soft shadows
  const sunLight = new THREE.DirectionalLight(0xfff3db, 1.6);
  sunLight.position.set(50, 65, 40);
  sunLight.castShadow = !isSoftGl;
  if (!isSoftGl) {
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 180;
    const d = 65;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0004;
  }
  scene.add(sunLight);

  // Ambient fill
  const ambientLight = new THREE.AmbientLight(0xdcebf8, 0.45);
  scene.add(ambientLight);

  // 5. OrbitControls with smooth damping
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2.05; // Keep above ground
  controls.minDistance = 6;
  controls.maxDistance = 180;
  controls.target.set(0, 2, 0);

  // Shared reusable procedural textures
  const roadTexture = createRoadTexture();
  const solarTexture = createSolarPanelTexture();
  const terracottaTexture = createTerracottaTileTexture();
  const soilTexture = createSoilTexture();

  // Mode material containers to switch visualization shaders easily
  const waterGridMeshes: THREE.Mesh[] = [];
  const solarMeshes: THREE.Mesh[] = [];
  const agriMeshes: THREE.Mesh[] = [];
  const standardMeshes: { mesh: THREE.Mesh; originalMat: THREE.Material | THREE.Material[] }[] = [];

  // Reusable materials
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0xdedede, roughness: 0.85, metalness: 0.05 });
  const panchayatWallMat = new THREE.MeshStandardMaterial({ color: 0xfbf6ea, roughness: 0.75, metalness: 0.02 });
  const woodTrimMat = new THREE.MeshStandardMaterial({ color: 0x613b1e, roughness: 0.65 });
  const terracottaMat = new THREE.MeshStandardMaterial({
    map: terracottaTexture,
    roughness: 0.7,
    metalness: 0.05
  });
  terracottaTexture.repeat.set(4, 4);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x93c5fd,
    roughness: 0.1,
    transmission: 0.6,
    thickness: 0.5,
    transparent: true,
    opacity: 0.75
  });

  const waterPipeNormalMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.35,
    metalness: 0.4
  });

  const waterPipeGlowMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.85,
    roughness: 0.2
  });

  const solarPanelPbrMat = new THREE.MeshStandardMaterial({
    map: solarTexture,
    roughness: 0.25,
    metalness: 0.7
  });
  solarTexture.repeat.set(2, 2);

  const solarGlowMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.9,
    roughness: 0.3
  });

  const agriNormalMat = new THREE.MeshStandardMaterial({
    color: 0x2e7d32,
    roughness: 0.85,
    metalness: 0.0
  });

  const agriNdviHighMat = new THREE.MeshStandardMaterial({
    color: 0x15803d,
    emissive: 0x16a34a,
    emissiveIntensity: 0.45,
    roughness: 0.5
  });

  // Soft Contact Shadow Plane Helper
  function createContactShadow(width: number, length: number, y = 0.02): THREE.Mesh {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const tex = new THREE.CanvasTexture(canvas);
    const geo = new THREE.PlaneGeometry(width, length);
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthWrite: false
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = y;
    return mesh;
  }

  // -------------------------------------------------------------
  // 6. BUILD PROCEDURAL VILLAGE SCENE
  // -------------------------------------------------------------

  // Root Village Hierarchy Group
  const villageRoot = new THREE.Group();
  scene.add(villageRoot);

  // A. Terrain Platform with realistic rural ground
  const terrainGeo = new THREE.BoxGeometry(160, 2, 160);
  const terrainMat = new THREE.MeshStandardMaterial({
    color: 0x8a9a6b, // Lush rural Maharashtra plateau green/dry gold
    roughness: 0.95,
    metalness: 0.0
  });
  const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
  terrainMesh.position.y = -1;
  terrainMesh.receiveShadow = !isSoftGl;
  villageRoot.add(terrainMesh);

  // Village Boundary Earth Ring / Hillocks
  const bermGeo = new THREE.RingGeometry(72, 86, 32);
  const bermMat = new THREE.MeshStandardMaterial({ color: 0x6e7b54, roughness: 0.9 });
  const bermMesh = new THREE.Mesh(bermGeo, bermMat);
  bermMesh.rotation.x = -Math.PI / 2;
  bermMesh.position.y = 0.01;
  villageRoot.add(bermMesh);

  // B. Village Main Road & Internal Streets (Composite 3 parts)
  const roadGroup = new THREE.Group();
  // Main PWD Highway spine
  roadTexture.repeat.set(1, 24);
  const mainRoadGeo = new THREE.PlaneGeometry(7, 140);
  const mainRoadMat = new THREE.MeshStandardMaterial({
    map: roadTexture,
    roughness: 0.8,
    metalness: 0.1
  });
  const mainRoadMesh = new THREE.Mesh(mainRoadGeo, mainRoadMat);
  mainRoadMesh.rotation.x = -Math.PI / 2;
  mainRoadMesh.position.set(0, 0.03, 0);
  mainRoadMesh.receiveShadow = !isSoftGl;
  roadGroup.add(mainRoadMesh);

  // East-West Connecting Street
  const crossRoadGeo = new THREE.PlaneGeometry(90, 5.5);
  const crossRoadMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    roughness: 0.85
  });
  const crossRoadMesh = new THREE.Mesh(crossRoadGeo, crossRoadMat);
  crossRoadMesh.rotation.x = -Math.PI / 2;
  crossRoadMesh.position.set(0, 0.035, 6);
  crossRoadMesh.receiveShadow = !isSoftGl;
  roadGroup.add(crossRoadMesh);

  // Road shoulders (crushed gravel)
  const shoulderGeo = new THREE.PlaneGeometry(1.5, 140);
  const shoulderMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.95 });
  const shoulderLeft = new THREE.Mesh(shoulderGeo, shoulderMat);
  shoulderLeft.rotation.x = -Math.PI / 2;
  shoulderLeft.position.set(-4.25, 0.025, 0);
  const shoulderRight = shoulderLeft.clone();
  shoulderRight.position.x = 4.25;
  roadGroup.add(shoulderLeft, shoulderRight);
  villageRoot.add(roadGroup);

  // -------------------------------------------------------------
  // C. COMPOSITE HERO 1: Gram Panchayat Bhavan (9 Parts)
  // -------------------------------------------------------------
  const panchayatGroup = new THREE.Group();
  panchayatGroup.position.set(0, 0, -10);

  // Part 1: Raised Stone Plinth Foundation
  const plinthGeo = new THREE.BoxGeometry(16, 0.8, 14);
  const plinthMesh = new THREE.Mesh(plinthGeo, concreteMat);
  plinthMesh.position.y = 0.4;
  plinthMesh.castShadow = !isSoftGl;
  plinthMesh.receiveShadow = !isSoftGl;
  panchayatGroup.add(plinthMesh);

  // Part 2: Main Two-Storey Administrative Block
  const mainBlockGeo = new THREE.BoxGeometry(14, 5.5, 11);
  const mainBlockMesh = new THREE.Mesh(mainBlockGeo, panchayatWallMat);
  mainBlockMesh.position.y = 3.55;
  mainBlockMesh.castShadow = !isSoftGl;
  mainBlockMesh.receiveShadow = !isSoftGl;
  panchayatGroup.add(mainBlockMesh);

  // Part 3: Entrance Portico Porch with 4 Classic Columns
  const porticoSlabGeo = new THREE.BoxGeometry(9, 0.4, 4);
  const porticoSlab = new THREE.Mesh(porticoSlabGeo, concreteMat);
  porticoSlab.position.set(0, 4.2, 7.5);
  porticoSlab.castShadow = !isSoftGl;
  panchayatGroup.add(porticoSlab);

  const colGeo = new THREE.CylinderGeometry(0.25, 0.3, 3.4, 16);
  const colMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
  [-3.6, -1.2, 1.2, 3.6].forEach((x) => {
    const col = new THREE.Mesh(colGeo, colMat);
    col.position.set(x, 2.5, 9);
    col.castShadow = !isSoftGl;
    panchayatGroup.add(col);
  });

  // Part 4: Terracotta Pitched Roof
  const roofGeo = new THREE.ConeGeometry(11, 2.8, 4);
  const roofMesh = new THREE.Mesh(roofGeo, terracottaMat);
  roofMesh.position.set(0, 7.7, 0);
  roofMesh.rotation.y = Math.PI / 4;
  roofMesh.scale.set(1.1, 1, 0.9);
  roofMesh.castShadow = !isSoftGl;
  panchayatGroup.add(roofMesh);

  // Part 5: Veranda Steps
  for (let i = 0; i < 3; i++) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(7 - i * 0.8, 0.25, 1.2),
      concreteMat
    );
    step.position.set(0, 0.15 + i * 0.25, 7.8 + (2 - i) * 0.6);
    panchayatGroup.add(step);
  }

  // Part 6: Glazed Double Entrance Doors & Office Windows
  const doorGeo = new THREE.BoxGeometry(2.4, 2.8, 0.1);
  const doorMesh = new THREE.Mesh(doorGeo, woodTrimMat);
  doorMesh.position.set(0, 2.2, 5.55);
  panchayatGroup.add(doorMesh);

  [-4.2, -1.8, 1.8, 4.2].forEach((x) => {
    const win = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.6, 0.15), glassMat);
    win.position.set(x, 4.2, 5.55);
    panchayatGroup.add(win);
  });

  // Part 7: Rooftop Solar PV Generation Unit (12 kWp)
  const rooftopSolarBank = new THREE.Group();
  for (let i = -2; i <= 2; i++) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 1.1), solarPanelPbrMat);
    panel.position.set(i * 2.1, 7.2, -1.8);
    panel.rotation.x = -Math.PI / 8;
    panel.castShadow = !isSoftGl;
    rooftopSolarBank.add(panel);
    solarMeshes.push(panel);
  }
  panchayatGroup.add(rooftopSolarBank);

  // Part 8: Indian National Tricolor Flag Mast & Brass Finial
  const flagMastGeo = new THREE.CylinderGeometry(0.08, 0.12, 9, 12);
  const flagMastMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.2 });
  const flagMast = new THREE.Mesh(flagMastGeo, flagMastMat);
  flagMast.position.set(6, 4.5, 9);
  flagMast.castShadow = !isSoftGl;
  panchayatGroup.add(flagMast);

  const flagGeo = new THREE.PlaneGeometry(1.8, 1.1, 8, 4);
  const flagTexCanvas = document.createElement('canvas');
  flagTexCanvas.width = 120;
  flagTexCanvas.height = 80;
  const flagCtx = flagTexCanvas.getContext('2d')!;
  flagCtx.fillStyle = '#ff9933'; // Saffron
  flagCtx.fillRect(0, 0, 120, 26);
  flagCtx.fillStyle = '#ffffff'; // White
  flagCtx.fillRect(0, 26, 120, 28);
  flagCtx.fillStyle = '#138808'; // Green
  flagCtx.fillRect(0, 54, 120, 26);
  flagCtx.strokeStyle = '#000080'; // Ashoka Chakra
  flagCtx.beginPath();
  flagCtx.arc(60, 40, 10, 0, Math.PI * 2);
  flagCtx.stroke();
  const flagTex = new THREE.CanvasTexture(flagTexCanvas);
  flagTex.colorSpace = THREE.SRGBColorSpace;
  const flagMat = new THREE.MeshStandardMaterial({ map: flagTex, side: THREE.DoubleSide, roughness: 0.6 });
  const flagMesh = new THREE.Mesh(flagGeo, flagMat);
  flagMesh.position.set(6.9, 8.2, 9);
  panchayatGroup.add(flagMesh);

  // Part 9: Contact Shadow & Emblem Signboard
  panchayatGroup.add(createContactShadow(20, 18));
  villageRoot.add(panchayatGroup);

  // -------------------------------------------------------------
  // D. COMPOSITE HERO 2: Jal Jeevan Elevated Water Reservoir (ESR) (8 Parts)
  // -------------------------------------------------------------
  const waterTankGroup = new THREE.Group();
  waterTankGroup.position.set(-28, 0, -24);

  // Part 1: Circular Reinforced Concrete Foundation Ring
  const fndGeo = new THREE.CylinderGeometry(6.5, 7.2, 1, 24);
  const fndMesh = new THREE.Mesh(fndGeo, concreteMat);
  fndMesh.position.y = 0.5;
  fndMesh.castShadow = !isSoftGl;
  waterTankGroup.add(fndMesh);

  // Part 2: 4 Staging Reinforced Concrete Columns
  const pylonGeo = new THREE.CylinderGeometry(0.55, 0.65, 14, 16);
  const pylonPositions = [
    [-3.8, -3.8],
    [3.8, -3.8],
    [-3.8, 3.8],
    [3.8, 3.8]
  ];
  pylonPositions.forEach(([x, z]) => {
    const pylon = new THREE.Mesh(pylonGeo, concreteMat);
    pylon.position.set(x, 8, z);
    pylon.castShadow = !isSoftGl;
    waterTankGroup.add(pylon);
  });

  // Part 3: Intermediate Tie-Beams / Cross Ring Bracing
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(5.4, 0.25, 8, 24), concreteMat);
  ring1.rotation.x = Math.PI / 2;
  ring1.position.y = 6;
  const ring2 = ring1.clone();
  ring2.position.y = 11;
  waterTankGroup.add(ring1, ring2);

  // Part 4: Truncated Cone Hopper Floor & Main Cylindrical Tank
  const hopperGeo = new THREE.CylinderGeometry(7, 4.2, 2.5, 24);
  const hopperMesh = new THREE.Mesh(hopperGeo, concreteMat);
  hopperMesh.position.y = 15.25;
  hopperMesh.castShadow = !isSoftGl;
  waterTankGroup.add(hopperMesh);

  const tankGeo = new THREE.CylinderGeometry(7, 7, 5, 24);
  const tankMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.4,
    metalness: 0.15
  });
  const tankMesh = new THREE.Mesh(tankGeo, tankMat);
  tankMesh.position.y = 19;
  tankMesh.castShadow = !isSoftGl;
  waterTankGroup.add(tankMesh);
  waterGridMeshes.push(tankMesh);

  // Part 5: Spherical Dome Roof with Ventilator Lantern
  const domeGeo = new THREE.SphereGeometry(7.05, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const domeMesh = new THREE.Mesh(domeGeo, concreteMat);
  domeMesh.position.y = 21.5;
  domeMesh.castShadow = !isSoftGl;
  waterTankGroup.add(domeMesh);

  const lanternGeo = new THREE.CylinderGeometry(1.2, 1.2, 1, 16);
  const lantern = new THREE.Mesh(lanternGeo, concreteMat);
  lantern.position.y = 24.2;
  waterTankGroup.add(lantern);

  // Part 6: Vertical Inlet/Outlet Riser Pipe
  const riserPipeGeo = new THREE.CylinderGeometry(0.35, 0.35, 19, 16);
  const riserPipe = new THREE.Mesh(riserPipeGeo, waterPipeNormalMat);
  riserPipe.position.set(0, 9.5, 0);
  waterTankGroup.add(riserPipe);
  waterGridMeshes.push(riserPipe);

  // Part 7: Caged Access Ladder & Safe Landing
  const ladderGeo = new THREE.BoxGeometry(0.6, 21, 0.2);
  const ladderMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });
  const ladder = new THREE.Mesh(ladderGeo, ladderMat);
  ladder.position.set(4.4, 11, 4.4);
  waterTankGroup.add(ladder);

  // Part 8: Contact Shadow Plane
  waterTankGroup.add(createContactShadow(18, 18));
  villageRoot.add(waterTankGroup);

  // Underground Water Grid Network Lines (Connecting Tank to Panchayat, PHC, and Farm)
  const pipelineSegments = [
    { start: new THREE.Vector3(-28, 0.15, -24), end: new THREE.Vector3(-5, 0.15, -10), radius: 0.25 },
    { start: new THREE.Vector3(-5, 0.15, -10), end: new THREE.Vector3(26, 0.15, 18), radius: 0.2 },
    { start: new THREE.Vector3(-28, 0.15, -24), end: new THREE.Vector3(-30, 0.15, 15), radius: 0.3 }
  ];

  pipelineSegments.forEach((seg) => {
    const dir = new THREE.Vector3().subVectors(seg.end, seg.start);
    const len = dir.length();
    const pipeGeo = new THREE.CylinderGeometry(seg.radius, seg.radius, len, 12);
    const pipe = new THREE.Mesh(pipeGeo, waterPipeNormalMat);
    pipe.position.copy(seg.start).addScaledVector(dir, 0.5);
    pipe.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    villageRoot.add(pipe);
    waterGridMeshes.push(pipe);
  });

  // -------------------------------------------------------------
  // E. COMPOSITE HERO 3: Solar Micro-Grid Substation (7 Parts)
  // -------------------------------------------------------------
  const solarFarmGroup = new THREE.Group();
  solarFarmGroup.position.set(24, 0, -30);

  // Part 1: Crushed gravel foundation yard
  const gravelGeo = new THREE.BoxGeometry(28, 0.2, 22);
  const gravelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.95 });
  const gravelMesh = new THREE.Mesh(gravelGeo, gravelMat);
  gravelMesh.position.y = 0.1;
  solarFarmGroup.add(gravelMesh);

  // Part 2: 4 Rows of Dual-Axis Tilt Solar Arrays
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const panelRow = new THREE.Group();
      panelRow.position.set(-9 + c * 6, 0.2, -6 + r * 6);

      // Aluminum rack pylon
      const rack = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.15, 1.8, 8),
        new THREE.MeshStandardMaterial({ color: 0xcfd8dc, metalness: 0.85 })
      );
      rack.position.y = 0.9;
      panelRow.add(rack);

      // PV Module Glass Face
      const pvMesh = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.1, 2.4), solarPanelPbrMat);
      pvMesh.position.y = 1.8;
      pvMesh.rotation.x = -Math.PI / 6; // 30 deg optimal Maharashtra tilt
      pvMesh.castShadow = !isSoftGl;
      panelRow.add(pvMesh);
      solarMeshes.push(pvMesh);

      solarFarmGroup.add(panelRow);
    }
  }

  // Part 3: Central Inverter & Transformer Cubicle
  const inverterGeo = new THREE.BoxGeometry(3.6, 2.6, 2.4);
  const inverterMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.7 });
  const inverterMesh = new THREE.Mesh(inverterGeo, inverterMat);
  inverterMesh.position.set(10, 1.4, 4);
  inverterMesh.castShadow = !isSoftGl;
  solarFarmGroup.add(inverterMesh);

  // Part 4: High-Voltage Transmission Pylon Tower
  const towerGroup = new THREE.Group();
  towerGroup.position.set(10, 0, 8);
  const pylonBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.8, 14, 8),
    new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 })
  );
  pylonBase.position.y = 7;
  towerGroup.add(pylonBase);
  // Crossarms
  const arm = new THREE.Mesh(new THREE.BoxGeometry(6, 0.3, 0.3), concreteMat);
  arm.position.y = 12;
  towerGroup.add(arm);
  solarFarmGroup.add(towerGroup);

  // Part 5: Perimeter Chain-Link Fence Posts
  const fencePosts = [
    [-13.8, -10.8],
    [13.8, -10.8],
    [-13.8, 10.8],
    [13.8, 10.8],
    [0, -10.8],
    [0, 10.8]
  ];
  fencePosts.forEach(([x, z]) => {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 2.5, 8),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 })
    );
    post.position.set(x, 1.25, z);
    solarFarmGroup.add(post);
  });

  // Part 6: Lightning Arrestor Finial
  const arrestor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.05, 3, 8),
    new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95 })
  );
  arrestor.position.set(10, 15.5, 8);
  solarFarmGroup.add(arrestor);

  // Part 7: Contact Shadow Plane
  solarFarmGroup.add(createContactShadow(30, 24));
  villageRoot.add(solarFarmGroup);

  // -------------------------------------------------------------
  // F. COMPOSITE HERO 4: Zilla Parishad Smart Digital School (7 Parts)
  // -------------------------------------------------------------
  const schoolGroup = new THREE.Group();
  schoolGroup.position.set(28, 0, 16);

  // Part 1: Main Classroom Wing
  const schoolBuilding = new THREE.Mesh(
    new THREE.BoxGeometry(18, 5, 8),
    new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8 }) // Classic ZP school yellow/ochre
  );
  schoolBuilding.position.y = 2.5;
  schoolBuilding.castShadow = !isSoftGl;
  schoolGroup.add(schoolBuilding);

  // Part 2: Gabled Terracotta Tiled Roof
  const schoolRoof = new THREE.Mesh(
    new THREE.ConeGeometry(14, 2.5, 4),
    terracottaMat
  );
  schoolRoof.position.y = 6.25;
  schoolRoof.rotation.y = Math.PI / 4;
  schoolRoof.scale.set(1.4, 1, 0.65);
  schoolRoof.castShadow = !isSoftGl;
  schoolGroup.add(schoolRoof);

  // Part 3: Front Veranda Corridor with Painted Pillars
  for (let i = -6; i <= 6; i += 3) {
    const pillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.25, 4, 12),
      new THREE.MeshStandardMaterial({ color: 0x0284c7 })
    );
    pillar.position.set(i, 2, 4.8);
    pillar.castShadow = !isSoftGl;
    schoolGroup.add(pillar);
  }

  // Part 4: Open Assembly Ground with Flag Mast & Sports Pitch
  const playground = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 14),
    new THREE.MeshStandardMaterial({ color: 0xd6c4a5, roughness: 0.95 })
  );
  playground.rotation.x = -Math.PI / 2;
  playground.position.set(0, 0.04, 12);
  schoolGroup.add(playground);

  // Part 5: Basketball Board & Hoop
  const hoopPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 3.8, 8),
    new THREE.MeshStandardMaterial({ color: 0x334155 })
  );
  hoopPole.position.set(8, 1.9, 15);
  const backboard = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 1.1, 0.1),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  backboard.position.set(8, 3.5, 14.6);
  schoolGroup.add(hoopPole, backboard);

  // Part 6: School Bell Tower Crest
  const bellTower = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2.5, 2),
    concreteMat
  );
  bellTower.position.set(0, 7.2, 0);
  schoolGroup.add(bellTower);

  // Part 7: Contact Shadow Plane
  schoolGroup.add(createContactShadow(24, 22));
  villageRoot.add(schoolGroup);

  // -------------------------------------------------------------
  // G. COMPOSITE HERO 5: Primary Health Centre (PHC) & Ambulance (8 Parts)
  // -------------------------------------------------------------
  const phcGroup = new THREE.Group();
  phcGroup.position.set(28, 0, -8);

  // Part 1: Clean Clinical Pavilion Body
  const phcBody = new THREE.Mesh(
    new THREE.BoxGeometry(14, 4.2, 9),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 })
  );
  phcBody.position.y = 2.1;
  phcBody.castShadow = !isSoftGl;
  phcGroup.add(phcBody);

  // Part 2: Emergency Red Cross Emblem
  const crossGroup = new THREE.Group();
  crossGroup.position.set(0, 3.2, 4.56);
  const crossH = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.45, 0.1), new THREE.MeshBasicMaterial({ color: 0xdc2626 }));
  const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.4, 0.1), new THREE.MeshBasicMaterial({ color: 0xdc2626 }));
  crossGroup.add(crossH, crossV);
  phcGroup.add(crossGroup);

  // Part 3: Covered Emergency Ambulance Portico
  const portico = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.3, 5),
    concreteMat
  );
  portico.position.set(0, 3.8, 6.8);
  phcGroup.add(portico);

  // Part 4: Parked 108 Emergency Ambulance (Composite sub-model)
  const ambulanceGroup = new THREE.Group();
  ambulanceGroup.position.set(0, 0, 7.5);
  // Chassis & box body
  const ambBody = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 1.6, 4.2),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
  );
  ambBody.position.y = 1.1;
  ambulanceGroup.add(ambBody);

  // Green emergency stripe
  const ambStripe = new THREE.Mesh(
    new THREE.BoxGeometry(2.42, 0.3, 4.22),
    new THREE.MeshBasicMaterial({ color: 0x16a34a })
  );
  ambStripe.position.y = 1.0;
  ambulanceGroup.add(ambStripe);

  // 4 Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });
  [
    [-1.2, 0.35, -1.2],
    [1.2, 0.35, -1.2],
    [-1.2, 0.35, 1.2],
    [1.2, 0.35, 1.2]
  ].forEach(([x, y, z]) => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, y, z);
    ambulanceGroup.add(wheel);
  });

  // Emergency Siren Lightbar
  const siren = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.18, 0.3),
    new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 0.8 })
  );
  siren.position.set(0, 2.0, 0.4);
  ambulanceGroup.add(siren);
  phcGroup.add(ambulanceGroup);

  // Part 5: Rooftop Solar & Water Storage
  const phcTank = new THREE.Mesh(
    new THREE.CylinderGeometry(0.9, 0.9, 1.2, 16),
    new THREE.MeshStandardMaterial({ color: 0x0284c7 })
  );
  phcTank.position.set(4, 4.8, -2);
  phcGroup.add(phcTank);

  // Part 6: Accessible Ramp
  const ramp = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.2, 2.5),
    concreteMat
  );
  ramp.position.set(-5, 0.1, 4.5);
  phcGroup.add(ramp);

  // Part 7: Contact Shadow Plane
  phcGroup.add(createContactShadow(18, 16));
  villageRoot.add(phcGroup);

  // -------------------------------------------------------------
  // H. COMPOSITE HERO 6: Farmland, Canals & Automated Weather Station (AWS)
  // -------------------------------------------------------------
  const agriGroup = new THREE.Group();
  agriGroup.position.set(-34, 0, 22);

  // Part 1: Farmland Terraced Plot with soil furrows
  const farmPlotGeo = new THREE.BoxGeometry(36, 0.3, 34);
  const farmPlot = new THREE.Mesh(farmPlotGeo, new THREE.MeshStandardMaterial({
    map: soilTexture,
    roughness: 0.9
  }));
  farmPlot.position.y = 0.15;
  farmPlot.receiveShadow = !isSoftGl;
  agriGroup.add(farmPlot);

  // Part 2: Concrete-Lined Irrigation Canal
  const canalBed = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.6, 34),
    concreteMat
  );
  canalBed.position.set(16, 0.2, 0);
  agriGroup.add(canalBed);

  // Flowing Water Surface in Canal
  const canalWaterGeo = new THREE.PlaneGeometry(2.6, 33.8);
  const canalWaterMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.8,
    transparent: true,
    opacity: 0.85
  });
  const canalWater = new THREE.Mesh(canalWaterGeo, canalWaterMat);
  canalWater.rotation.x = -Math.PI / 2;
  canalWater.position.set(16, 0.45, 0);
  agriGroup.add(canalWater);
  waterGridMeshes.push(canalWater);

  // Part 3: 4 Crop Zones (Sugarcane, Cotton, Horticulture, Jowar)
  const cropRowsGroup = new THREE.Group();
  const caneGeo = new THREE.CylinderGeometry(0.12, 0.18, 2.4, 6);
  caneGeo.translate(0, 1.2, 0);

  // Sugarcane patch (dense tall stalks)
  for (let z = -12; z <= -2; z += 1.8) {
    for (let x = -14; x <= -2; x += 1.4) {
      const stalk = new THREE.Mesh(caneGeo, agriNormalMat);
      stalk.position.set(x + Math.sin(z) * 0.2, 0.3, z);
      stalk.scale.setScalar(0.85 + Math.random() * 0.3);
      stalk.castShadow = !isSoftGl;
      cropRowsGroup.add(stalk);
      agriMeshes.push(stalk);
    }
  }

  // Cotton / Vegetable patch (medium bushes with white bolls)
  const cottonBushGeo = new THREE.SphereGeometry(0.55, 8, 8);
  cottonBushGeo.translate(0, 0.55, 0);
  const cottonMat = new THREE.MeshStandardMaterial({ color: 0x3f6212, roughness: 0.8 });
  const cottonBollMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 });

  for (let z = 2; z <= 12; z += 2.2) {
    for (let x = -14; x <= 12; x += 2.0) {
      const bush = new THREE.Mesh(cottonBushGeo, cottonMat);
      bush.position.set(x, 0.3, z);
      cropRowsGroup.add(bush);
      agriMeshes.push(bush);

      // Accent cotton boll
      const boll = new THREE.Mesh(new THREE.SphereGeometry(0.16, 6, 6), cottonBollMat);
      boll.position.set(x + 0.15, 1.0, z);
      cropRowsGroup.add(boll);
    }
  }
  agriGroup.add(cropRowsGroup);

  // Part 4: Farmer's Tractor (Composite model)
  const tractor = new THREE.Group();
  tractor.position.set(-6, 0.3, -8);
  // Red bonnet/chassis
  const tractorBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 1.2, 3),
    new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.4, metalness: 0.4 })
  );
  tractorBody.position.y = 1.0;
  tractor.add(tractorBody);
  // Big rear wheels
  const rearWheelGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.5, 16);
  const rearWheelL = new THREE.Mesh(rearWheelGeo, wheelMat);
  rearWheelL.rotation.z = Math.PI / 2;
  rearWheelL.position.set(-1.1, 0.7, -0.8);
  const rearWheelR = rearWheelL.clone();
  rearWheelR.position.x = 1.1;
  // Small front wheels
  const frontWheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.4, 16);
  const frontWheelL = new THREE.Mesh(frontWheelGeo, wheelMat);
  frontWheelL.rotation.z = Math.PI / 2;
  frontWheelL.position.set(-1.0, 0.4, 1.0);
  const frontWheelR = frontWheelL.clone();
  frontWheelR.position.x = 1.0;
  // Exhaust vertical pipe
  const exhaust = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8),
    new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.9 })
  );
  exhaust.position.set(0.6, 2.0, 0.8);
  tractor.add(rearWheelL, rearWheelR, frontWheelL, frontWheelR, exhaust);
  agriGroup.add(tractor);

  // Part 5: Agro-Meteorological Automated Weather Station (AWS)
  const awsGroup = new THREE.Group();
  awsGroup.position.set(10, 0.3, -10);

  // Mast tripod
  const mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.15, 4.5, 8),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85 })
  );
  mast.position.y = 2.25;
  awsGroup.add(mast);

  // Stevenson screen box
  const stevenson = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
  );
  stevenson.position.y = 1.8;
  awsGroup.add(stevenson);

  // Rotating 3-cup anemometer
  const anemometerGroup = new THREE.Group();
  anemometerGroup.position.y = 4.6;
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI * 2) / 3;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.04, 0.04), concreteMat);
    arm.position.set(Math.cos(angle) * 0.2, 0, Math.sin(angle) * 0.2);
    arm.rotation.y = -angle;
    const cup = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8, 0, Math.PI), concreteMat);
    cup.position.set(Math.cos(angle) * 0.4, 0, Math.sin(angle) * 0.4);
    anemometerGroup.add(arm, cup);
  }
  awsGroup.add(anemometerGroup);
  agriGroup.add(awsGroup);

  // Part 6: Windbreak Neem / Teak Trees along Field Border
  const treeTrunkGeo = new THREE.CylinderGeometry(0.2, 0.35, 2.5, 8);
  const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
  const treeFoliageGeo = new THREE.SphereGeometry(1.4, 8, 8);
  const treeFoliageMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.75 });

  for (let i = -16; i <= 16; i += 4) {
    const tree = new THREE.Group();
    tree.position.set(-17.5, 0.3, i);
    const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
    trunk.position.y = 1.25;
    const leaves = new THREE.Mesh(treeFoliageGeo, treeFoliageMat);
    leaves.position.y = 3.2;
    leaves.scale.set(1, 1.3, 1);
    tree.add(trunk, leaves);
    agriGroup.add(tree);
  }

  // Part 7: Contact Shadow Plane
  agriGroup.add(createContactShadow(38, 36));
  villageRoot.add(agriGroup);

  // -------------------------------------------------------------
  // I. PERCOLATION TANK / WATER CONSERVATION POND
  // -------------------------------------------------------------
  const pondGroup = new THREE.Group();
  pondGroup.position.set(-18, 0, -2);
  const pondBedGeo = new THREE.CylinderGeometry(8, 9, 0.8, 24);
  const pondBedMat = new THREE.MeshStandardMaterial({ color: 0x422006, roughness: 0.95 });
  const pondBed = new THREE.Mesh(pondBedGeo, pondBedMat);
  pondBed.position.y = 0.4;
  pondGroup.add(pondBed);

  const pondWaterGeo = new THREE.CylinderGeometry(7.8, 7.8, 0.1, 24);
  const pondWaterMat = new THREE.MeshPhysicalMaterial({
    color: 0x0369a1,
    roughness: 0.08,
    transmission: 0.7,
    transparent: true,
    opacity: 0.88
  });
  const pondWater = new THREE.Mesh(pondWaterGeo, pondWaterMat);
  pondWater.position.y = 0.8;
  pondGroup.add(pondWater);
  waterGridMeshes.push(pondWater);
  villageRoot.add(pondGroup);

  // -------------------------------------------------------------
  // J. STREET LIGHTING POLES (Energy Grid)
  // -------------------------------------------------------------
  const streetLightPositions: [number, number][] = [
    [-2, 25],
    [2, 10],
    [-2, -5],
    [2, -20],
    [-2, -35]
  ];
  streetLightPositions.forEach(([x, z]) => {
    const pole = new THREE.Group();
    pole.position.set(x, 0, z);
    const pMast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 5, 8),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 })
    );
    pMast.position.y = 2.5;
    const pArm = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 0.06), concreteMat);
    pArm.position.set(x > 0 ? -0.4 : 0.4, 4.9, 0);
    const lamp = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfde047, emissiveIntensity: 0.8 })
    );
    lamp.position.set(x > 0 ? -0.75 : 0.75, 4.8, 0);
    pole.add(pMast, pArm, lamp);
    solarMeshes.push(lamp);
    villageRoot.add(pole);
  });

  // Track standard meshes for reverting modes cleanly
  villageRoot.traverse((obj) => {
    if (obj instanceof THREE.Mesh && !waterGridMeshes.includes(obj) && !solarMeshes.includes(obj) && !agriMeshes.includes(obj)) {
      standardMeshes.push({ mesh: obj, originalMat: obj.material });
    }
  });

  // -------------------------------------------------------------
  // 7. INSPECTION MODE SWITCHER
  // -------------------------------------------------------------
  let currentInspectionMode: InspectionMode = 'true_color';

  function setInspectionMode(mode: InspectionMode) {
    currentInspectionMode = mode;

    if (mode === 'true_color') {
      // Restore standard materials
      scene.background = new THREE.Color(0xd7e6f4);
      scene.fog = new THREE.FogExp2(0xd7e6f4, 0.0075);
      sunLight.color.setHex(0xfff3db);
      sunLight.intensity = 1.6;

      waterGridMeshes.forEach((mesh) => {
        mesh.material = waterPipeNormalMat;
      });
      solarMeshes.forEach((mesh) => {
        mesh.material = solarPanelPbrMat;
      });
      agriMeshes.forEach((mesh) => {
        mesh.material = agriNormalMat;
      });
      standardMeshes.forEach(({ mesh, originalMat }) => {
        mesh.material = originalMat;
      });
    } else if (mode === 'water_grid') {
      // Dim background to midnight blue to accentuate hydraulic flows
      scene.background = new THREE.Color(0x0f172a);
      scene.fog = new THREE.FogExp2(0x0f172a, 0.008);
      sunLight.intensity = 0.5;

      // Glow the water network
      waterGridMeshes.forEach((mesh) => {
        mesh.material = waterPipeGlowMat;
      });
      solarMeshes.forEach((mesh) => {
        mesh.material = concreteMat;
      });
      agriMeshes.forEach((mesh) => {
        mesh.material = concreteMat;
      });
    } else if (mode === 'solar_energy') {
      // Sunset/clean grid twilight atmosphere
      scene.background = new THREE.Color(0x18181b);
      scene.fog = new THREE.FogExp2(0x18181b, 0.008);
      sunLight.intensity = 0.6;

      solarMeshes.forEach((mesh) => {
        mesh.material = solarGlowMat;
      });
      waterGridMeshes.forEach((mesh) => {
        mesh.material = concreteMat;
      });
      agriMeshes.forEach((mesh) => {
        mesh.material = concreteMat;
      });
    } else if (mode === 'agri_ndvi') {
      // False color infrared satellite view
      scene.background = new THREE.Color(0x141e17);
      scene.fog = new THREE.FogExp2(0x141e17, 0.007);
      sunLight.intensity = 1.1;

      agriMeshes.forEach((mesh) => {
        mesh.material = agriNdviHighMat;
      });
      solarMeshes.forEach((mesh) => {
        mesh.material = concreteMat;
      });
      waterGridMeshes.forEach((mesh) => {
        mesh.material = waterPipeNormalMat;
      });
    }
  }

  // -------------------------------------------------------------
  // 8. CAMERA FLY-TO POI LOGIC
  // -------------------------------------------------------------
  let isFlying = false;
  let flyStartTime = 0;
  const flyDuration = 1400; // ms
  const startCamPos = new THREE.Vector3();
  const targetCamPos = new THREE.Vector3();
  const startLookAt = new THREE.Vector3();
  const targetLookAt = new THREE.Vector3();

  function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  function flyToPoi(poi: PointOfInterest) {
    startCamPos.copy(camera.position);
    targetCamPos.set(...poi.cameraPos);
    startLookAt.copy(controls.target);
    targetLookAt.set(...poi.targetPos);
    flyStartTime = performance.now();
    isFlying = true;
  }

  // -------------------------------------------------------------
  // 9. ANIMATION LOOP
  // -------------------------------------------------------------
  let reqId: number;
  let lastTime = performance.now();

  function animate(now: number) {
    reqId = requestAnimationFrame(animate);
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    // Smooth camera transition if flying
    if (isFlying) {
      const elapsed = now - flyStartTime;
      const progress = Math.min(elapsed / flyDuration, 1.0);
      const t = easeInOutCubic(progress);

      camera.position.lerpVectors(startCamPos, targetCamPos, t);
      controls.target.lerpVectors(startLookAt, targetLookAt, t);

      if (progress >= 1.0) {
        isFlying = false;
      }
    }

    // Micro-rotations: Anemometer wind cups
    anemometerGroup.rotation.y += dt * 3.5;

    // Tricolor flag subtle fluttering wave
    const flagPositions = flagGeo.attributes.position;
    for (let i = 0; i < flagPositions.count; i++) {
      const x = flagPositions.getX(i);
      const wave = Math.sin(now * 0.005 + x * 2) * 0.12 * (x / 1.8);
      flagPositions.setZ(i, wave);
    }
    flagPositions.needsUpdate = true;

    // Canal water texture/pulse in Water Grid mode
    if (currentInspectionMode === 'water_grid') {
      const glowScale = 0.75 + Math.sin(now * 0.004) * 0.25;
      waterPipeGlowMat.emissiveIntensity = glowScale;
    } else if (currentInspectionMode === 'solar_energy') {
      const solarPulse = 0.8 + Math.cos(now * 0.003) * 0.2;
      solarGlowMat.emissiveIntensity = solarPulse;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  reqId = requestAnimationFrame(animate);

  // Resize listener
  function handleResize() {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', handleResize);

  return {
    domElement: renderer.domElement,
    renderer,
    scene,
    camera,
    controls,
    setInspectionMode,
    flyToPoi,
    dispose: () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
    }
  };
}
