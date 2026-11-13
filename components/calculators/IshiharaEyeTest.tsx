'use client';

import React, { useState, useMemo } from 'react';
import {
  Eye,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  HelpCircle,
  ChevronLeft,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { toNepaliDigits } from '@/lib/nepaliDate';

export interface IshiharaPlateConfig {
  id: number;
  numberStr: string;
  options: string[];
  correctOption: string;
  fgColors: string[];
  bgColors: string[];
  typeEn: string;
  typeNe: string;
  normalSeesEn: string;
  normalSeesNe: string;
  deficientSeesEn: string;
  deficientSeesNe: string;
}

export const ISHIHARA_PLATES: IshiharaPlateConfig[] = [
  {
    id: 1,
    numberStr: '12',
    options: ['12', '17', '21', 'Nothing'],
    correctOption: '12',
    fgColors: ['#e85d35', '#f07148', '#d94e28', '#f4845f'],
    bgColors: ['#7fa650', '#92b665', '#6b913e', '#a3c47a', '#85ab58'],
    typeEn: 'Control Plate (All Vision Types)',
    typeNe: 'नियन्त्रण प्लेट (सबै दृष्टिका लागि)',
    normalSeesEn: 'Everyone (including color-blind individuals) clearly sees 12.',
    normalSeesNe: 'सामान्य र रङ पहिचान समस्या भएका दुवै व्यक्तिले स्पष्ट १२ देख्छन्।',
    deficientSeesEn: 'Reads as 12 by all vision types.',
    deficientSeesNe: 'सबै प्रकारका आँखाले १२ नै देख्छन्।'
  },
  {
    id: 2,
    numberStr: '8',
    options: ['8', '3', '6', 'Nothing'],
    correctOption: '8',
    fgColors: ['#e05a47', '#eb7360', '#d14936', '#f28b79'],
    bgColors: ['#7c9d59', '#91b06e', '#698946', '#a4be83', '#869a68'],
    typeEn: 'Red-Green Deficiency Screening',
    typeNe: 'रातो-हरियो रङ पहिचान परीक्षण',
    normalSeesEn: 'Normal vision sees 8.',
    normalSeesNe: 'सामान्य दृष्टि भएकाले ८ देख्छन्।',
    deficientSeesEn: 'Red-green color deficiency often reads 3 or nothing.',
    deficientSeesNe: 'रातो-हरियो रङ छुट्याउन नसक्नेले ३ वा खाली देख्छन्।'
  },
  {
    id: 3,
    numberStr: '29',
    options: ['29', '70', '20', 'Nothing'],
    correctOption: '29',
    fgColors: ['#df6342', '#ec7b5a', '#cc5130', '#f39274'],
    bgColors: ['#779e5c', '#8cb170', '#638949', '#9ec084', '#81986c'],
    typeEn: 'Red-Green Transformation Plate',
    typeNe: 'रातो-हरियो रूपान्तरण प्लेट',
    normalSeesEn: 'Normal vision clearly sees 29.',
    normalSeesNe: 'सामान्य दृष्टि भएकाले स्पष्ट २९ देख्छन्।',
    deficientSeesEn: 'Red-green deficiency often reads 70.',
    deficientSeesNe: 'रातो-हरियो कमजोरी भएकाले प्रायः ७० देख्छन्।'
  },
  {
    id: 4,
    numberStr: '5',
    options: ['5', '2', '8', 'Nothing'],
    correctOption: '5',
    fgColors: ['#d9563f', '#e76f56', '#c6432d', '#f08770'],
    bgColors: ['#6f9a5b', '#84ad70', '#5c8548', '#99bd85', '#7d9668'],
    typeEn: 'Vanishing Digit Plate (Green-Red)',
    typeNe: 'हरियो-रातो परीक्षण प्लेट',
    normalSeesEn: 'Normal vision sees 5.',
    normalSeesNe: 'सामान्य दृष्टि भएकाले ५ देख्छन्।',
    deficientSeesEn: 'Red-green deficiency often reads 2 or cannot see a number.',
    deficientSeesNe: 'रङ कमजोरी भएकाले २ देख्छन् वा कुनै अंक देख्दैनन्।'
  },
  {
    id: 5,
    numberStr: '3',
    options: ['3', '5', '8', 'Nothing'],
    correctOption: '3',
    fgColors: ['#e15d44', '#ed765e', '#cf4931', '#f48e78'],
    bgColors: ['#789d56', '#8db06a', '#648844', '#a0bf80', '#839865'],
    typeEn: 'Red-Green Perception Check',
    typeNe: 'रातो-हरियो दृष्टि जाँच',
    normalSeesEn: 'Normal vision sees 3.',
    normalSeesNe: 'सामान्य दृष्टि भएकाले ३ देख्छन्।',
    deficientSeesEn: 'Red-green deficiency typically reads 5.',
    deficientSeesNe: 'रातो-हरियो कमजोरी भएकाले प्रायः ५ देख्छन्।'
  },
  {
    id: 6,
    numberStr: '15',
    options: ['15', '17', '13', 'Nothing'],
    correctOption: '15',
    fgColors: ['#de6640', '#ea7e59', '#cb532e', '#f29573'],
    bgColors: ['#729b5e', '#87ae72', '#5f864b', '#9bbd87', '#7b946a'],
    typeEn: 'Two-Digit Signal Recognition',
    typeNe: 'दुई अंकको संकेत पहिचान',
    normalSeesEn: 'Normal vision sees 15.',
    normalSeesNe: 'सामान्य दृष्टि भएकाले १५ देख्छन्।',
    deficientSeesEn: 'Red-green deficiency often sees 17.',
    deficientSeesNe: 'रङ पहिचान समस्या भएकाले १७ देख्न सक्छन्।'
  },
  {
    id: 7,
    numberStr: '74',
    options: ['74', '21', '71', 'Nothing'],
    correctOption: '74',
    fgColors: ['#699c52', '#7eb066', '#568740', '#92c07b'],
    bgColors: ['#d86545', '#e57c5d', '#c45132', '#ef9377', '#b87658'],
    typeEn: 'Green-on-Red Reversal Plate',
    typeNe: 'रातो पृष्ठभूमिमा हरियो अंक जाँच',
    normalSeesEn: 'Normal vision sees 74.',
    normalSeesNe: 'सामान्य दृष्टि भएकाले ७४ देख्छन्।',
    deficientSeesEn: 'Red-green deficiency often reads 21.',
    deficientSeesNe: 'रातो-हरियो कमजोरी भएकाले प्रायः २१ देख्छन्।'
  },
  {
    id: 8,
    numberStr: '6',
    options: ['6', '5', '8', 'Nothing'],
    correctOption: '6',
    fgColors: ['#e05841', '#ec715b', '#cd462f', '#f48975'],
    bgColors: ['#7b9e59', '#90b16d', '#678946', '#a3c182', '#859a68'],
    typeEn: 'Vanishing Plate (Traffic Signal Red)',
    typeNe: 'ट्राफिक सिग्नल रातो पहिचान',
    normalSeesEn: 'Normal vision clearly sees 6.',
    normalSeesNe: 'सामान्य दृष्टि भएकाले स्पष्ट ६ देख्छन्।',
    deficientSeesEn: 'Majority with color deficiency cannot read this number.',
    deficientSeesNe: 'रङ छुट्याउन नसक्ने व्यक्तिले यो अंक देख्न सक्दैनन्।'
  },
  {
    id: 9,
    numberStr: '45',
    options: ['45', '42', '15', 'Nothing'],
    correctOption: '45',
    fgColors: ['#dc603d', '#e97856', '#c94c2b', '#f19070'],
    bgColors: ['#749c57', '#89af6b', '#608744', '#9dbf80', '#7e9764'],
    typeEn: 'Dual-Digit Contrast Test',
    typeNe: 'दोहोरो अंक कन्ट्रास्ट परीक्षण',
    normalSeesEn: 'Normal vision sees 45.',
    normalSeesNe: 'सामान्य दृष्टि भएकाले ४५ देख्छन्।',
    deficientSeesEn: 'Color vision deficiency usually sees no clear digits.',
    deficientSeesNe: 'रङ कमजोरी भएकाले स्पष्ट अंक देख्दैनन्।'
  },
  {
    id: 10,
    numberStr: '7',
    options: ['7', '1', '9', 'Nothing'],
    correctOption: '7',
    fgColors: ['#6e9f50', '#83b364', '#5b8a3e', '#97c379'],
    bgColors: ['#da5f44', '#e7765c', '#c74b31', '#f08e76', '#bb7256'],
    typeEn: 'Green Signal Perception Plate',
    typeNe: 'हरियो सिग्नल पहिचान प्लेट',
    normalSeesEn: 'Normal vision sees 7.',
    normalSeesNe: 'सामान्य दृष्टि भएकाले ७ देख्छन्।',
    deficientSeesEn: 'Deficient color vision typically cannot distinguish the 7.',
    deficientSeesNe: 'रङ पहिचान कमजोरी भएकाले ७ छुट्याउन सक्दैनन्।'
  },
  {
    id: 11,
    numberStr: '16',
    options: ['16', '18', '10', 'Nothing'],
    correctOption: '16',
    fgColors: ['#df5942', '#eb725c', '#cc4730', '#f38a76'],
    bgColors: ['#779c58', '#8caf6c', '#638745', '#9fbf81', '#819766'],
    typeEn: 'Fine Hue Discrimination Plate',
    typeNe: 'सूक्ष्म रङ विभेद परीक्षण',
    normalSeesEn: 'Normal vision sees 16.',
    normalSeesNe: 'सामान्य दृष्टि भएकाले १६ देख्छन्।',
    deficientSeesEn: 'Color blind individuals generally see nothing.',
    deficientSeesNe: 'रङ कमजोरी भएकाले प्रायः केही देख्दैनन्।'
  },
  {
    id: 12,
    numberStr: '42',
    options: ['42', '4', '2', 'Nothing'],
    correctOption: '42',
    fgColors: ['#d84654', '#e65d6b', '#c63543', '#ef7682'],
    bgColors: ['#7b8679', '#8f998d', '#677265', '#a2aba0', '#848e82'],
    typeEn: 'Protanopia vs Deuteranopia Diagnostic',
    typeNe: 'प्रोटानोपिया र ड्युटेरानोपिया विभेद परीक्षण',
    normalSeesEn: 'Normal vision clearly sees 42.',
    normalSeesNe: 'सामान्य दृष्टि भएकाले स्पष्ट ४२ देख्छन्।',
    deficientSeesEn: 'Red-blind (Protan) sees only 2; Green-blind (Deutan) sees only 4.',
    deficientSeesNe: 'रातो नदेख्नेले २ मात्र र हरियो नदेख्नेले ४ मात्र देख्छन्।'
  }
];

// 7x9 clean bitmap font for digits 0-9
const DIGIT_BITMAPS: Record<string, string[]> = {
  '0': [
    '0111110',
    '1111111',
    '1100011',
    '1100011',
    '1100011',
    '1100011',
    '1100011',
    '1111111',
    '0111110'
  ],
  '1': [
    '0011100',
    '0111100',
    '1111100',
    '0011100',
    '0011100',
    '0011100',
    '0011100',
    '1111111',
    '1111111'
  ],
  '2': [
    '0111110',
    '1111111',
    '1100011',
    '0000111',
    '0011110',
    '0111000',
    '1110000',
    '1111111',
    '1111111'
  ],
  '3': [
    '0111110',
    '1111111',
    '0000011',
    '0011110',
    '0011110',
    '0000011',
    '1100011',
    '1111111',
    '0111110'
  ],
  '4': [
    '0001110',
    '0011110',
    '0110110',
    '1100110',
    '1111111',
    '1111111',
    '0000110',
    '0000110',
    '0000110'
  ],
  '5': [
    '1111111',
    '1111111',
    '1100000',
    '1111110',
    '1111111',
    '0000011',
    '1100011',
    '1111111',
    '0111110'
  ],
  '6': [
    '0111110',
    '1111111',
    '1100000',
    '1111110',
    '1111111',
    '1100011',
    '1100011',
    '1111111',
    '0111110'
  ],
  '7': [
    '1111111',
    '1111111',
    '0000111',
    '0001110',
    '0011100',
    '0011100',
    '0111000',
    '0111000',
    '0111000'
  ],
  '8': [
    '0111110',
    '1111111',
    '1100011',
    '0111110',
    '0111110',
    '1100011',
    '1100011',
    '1111111',
    '0111110'
  ],
  '9': [
    '0111110',
    '1111111',
    '1100011',
    '1100011',
    '1111111',
    '0111111',
    '0000011',
    '1111111',
    '0111110'
  ]
};

function isPointInsideNumber(x: number, y: number, numberStr: string): boolean {
  // Normalize plate center (150, 150)
  const chars = numberStr.split('');
  const charWidth = 7;
  const charHeight = 9;
  const gap = 2;
  const totalCols = chars.length * charWidth + (chars.length - 1) * gap;
  const pixelSize = chars.length === 1 ? 15 : 12.5;

  const boxWidth = totalCols * pixelSize;
  const boxHeight = charHeight * pixelSize;
  const startX = 150 - boxWidth / 2;
  const startY = 150 - boxHeight / 2;

  if (x < startX || x > startX + boxWidth || y < startY || y > startY + boxHeight) {
    return false;
  }

  const colFloat = (x - startX) / pixelSize;
  const row = Math.floor((y - startY) / pixelSize);
  const col = Math.floor(colFloat);

  if (row < 0 || row >= charHeight || col < 0 || col >= totalCols) {
    return false;
  }

  for (let cIdx = 0; cIdx < chars.length; cIdx++) {
    const cStart = cIdx * (charWidth + gap);
    const cEnd = cStart + charWidth;
    if (col >= cStart && col < cEnd) {
      const localCol = col - cStart;
      const bitmap = DIGIT_BITMAPS[chars[cIdx]];
      return bitmap ? bitmap[row][localCol] === '1' : false;
    }
  }

  return false;
}

interface DotItem {
  cx: number;
  cy: number;
  r: number;
  fill: string;
}

function generatePlateDots(plate: IshiharaPlateConfig): DotItem[] {
  const dots: DotItem[] = [];
  const centerX = 150;
  const centerY = 150;
  const plateRadius = 138;

  // Deterministic pseudo-random generator seeded by plate id
  let seed = plate.id * 98765 + 4321;
  const nextRand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  // Multi-pass circle packing for realistic Ishihara texture
  const radiiSchedule = [8.5, 7, 5.8, 4.6, 3.6];
  for (const baseR of radiiSchedule) {
    const attempts = baseR > 6 ? 650 : 950;
    for (let i = 0; i < attempts; i++) {
      const angle = nextRand() * Math.PI * 2;
      const dist = Math.sqrt(nextRand()) * (plateRadius - baseR);
      const cx = centerX + Math.cos(angle) * dist;
      const cy = centerY + Math.sin(angle) * dist;
      const r = baseR * (0.88 + nextRand() * 0.22);

      // Check collision
      let overlaps = false;
      for (let j = 0; j < dots.length; j++) {
        const d = dots[j];
        const dx = cx - d.cx;
        const dy = cy - d.cy;
        const minDist = r + d.r + 1.4;
        if (dx * dx + dy * dy < minDist * minDist) {
          overlaps = true;
          break;
        }
      }

      if (!overlaps) {
        const inside = isPointInsideNumber(cx, cy, plate.numberStr);
        const palette = inside ? plate.fgColors : plate.bgColors;
        const fill = palette[Math.floor(nextRand() * palette.length)];
        dots.push({ cx, cy, r, fill });
      }
    }
  }

  return dots;
}

export function MiniIshiharaPlate({ size = 84 }: { size?: number }) {
  const dots = useMemo(() => generatePlateDots(ISHIHARA_PLATES[0]), []);
  return (
    <svg viewBox="0 0 300 300" width={size} height={size} role="img" aria-label="Ishihara Eye Test Preview">
      <circle cx="150" cy="150" r="145" fill="#ffffff" />
      {dots.map((dot, idx) => (
        <circle key={idx} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.fill} />
      ))}
    </svg>
  );
}

export function IshiharaEyeTest() {
  const { language, t } = useLanguage();
  const isNe = language === 'ne';

  const [stage, setStage] = useState<'testing' | 'result'>('testing');
  const [currentPlateIdx, setCurrentPlateIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showHint, setShowHint] = useState<boolean>(false);

  const currentPlate = ISHIHARA_PLATES[currentPlateIdx];
  const totalPlates = ISHIHARA_PLATES.length;

  const currentDots = useMemo(() => {
    return generatePlateDots(currentPlate);
  }, [currentPlate]);

  const handleStart = () => {
    setAnswers({});
    setCurrentPlateIdx(0);
    setShowHint(false);
    setStage('testing');
  };

  const handleSelectAnswer = (option: string) => {
    const updated = { ...answers, [currentPlate.id]: option };
    setAnswers(updated);
    setShowHint(false);

    if (currentPlateIdx + 1 < totalPlates) {
      setCurrentPlateIdx(prev => prev + 1);
    } else {
      setStage('result');
    }
  };

  const correctCount = useMemo(() => {
    return ISHIHARA_PLATES.reduce((acc, p) => {
      return answers[p.id] === p.correctOption ? acc + 1 : acc;
    }, 0);
  }, [answers]);

  const isVisionPassed = correctCount >= 10; // 10/12 or better considered Normal for DoTM medical

  const formatNum = (n: number | string) => (isNe ? toNepaliDigits(n) : String(n));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* LikhitExam Centered Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 6px' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '9999px',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '12px'
          }}
        >
          {t('Important for Safe Driving', 'सुरक्षित ड्राइभिङका लागि अनिवार्य')}
        </div>
        <h1
          style={{
            fontSize: 'clamp(26px, 3.8vw, 38px)',
            fontWeight: 900,
            color: '#111827',
            lineHeight: 1.22,
            margin: '0 0 12px'
          }}
        >
          <span style={{ color: '#003893', position: 'relative', display: 'inline-block' }}>
            {t('Color Vision Test', 'आँखा रङ पहिचान परीक्षण')}
            <svg
              style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '11px' }}
              viewBox="0 0 358 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path d="M3 9C118.957 4.47226 184.456 -1.86658 355 9" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
          {t(' for Driving', ' (लाइसेन्स मेडिकल)')}
        </h1>
        <p style={{ fontSize: '16px', color: '#4b5563', margin: 0, lineHeight: 1.55 }}>
          {t(
            'Screen your red-green color vision using 12 Ishihara plates required for the DoTM medical examination.',
            'यातायात मेडिकल जाँचअघि १२ इशहारा प्लेट मार्फत आफ्नो रातो-हरियो रङ पहिचान क्षमता जाँच्नुहोस्।'
          )}
        </p>
      </div>

      {/* Main Interactive Card */}
      <div
        className="white-card"
        style={{
          padding: '0',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          backgroundColor: '#ffffff',
          boxShadow: '0 10px 30px rgba(0, 56, 147, 0.06)'
        }}
      >
        {/* Top Progress Header Bar (LikhitExam Blue Gradient) */}
        <div
          style={{
            background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Eye size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {t('Ishihara Color Vision Screening', 'इशहारा आँखा रङ परीक्षण')}
              </h2>
              <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)', margin: '2px 0 0' }}>
                {t('Identify the number inside each colored dot plate', 'प्रत्येक प्लेटभित्र देखिने नम्बर छान्नुहोस्')}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {Object.keys(answers).length > 0 && stage === 'testing' && (
              <button
                type="button"
                onClick={handleStart}
                style={{
                  padding: '6px 13px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  backgroundColor: 'rgba(255, 255, 255, 0.14)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <RotateCcw size={13} />
                <span>{t('Reset', 'रिसेट')}</span>
              </button>
            )}
            <div
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{t('Plates:', 'प्लेटहरू:')}</span>
              <span>
                {formatNum(Object.keys(answers).length)} / {formatNum(totalPlates)}
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ACTIVE PLATE TESTING (Opens directly into Plate #1)          */}
        {/* ============================================================ */}
        {stage === 'testing' && (
          <div style={{ padding: '28px 24px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '28px',
                alignItems: 'center'
              }}
            >
              {/* Left Column: Progress & Ishihara Plate SVG */}
              <div
                style={{
                  padding: '24px',
                  borderRadius: '18px',
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  textAlign: 'center'
                }}
              >
                {/* Progress Bar & Dots */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                    <span>{t('Test Progress', 'परीक्षण प्रगति')}</span>
                    <span style={{ color: '#003893', fontWeight: 800 }}>
                      {t('Plate', 'प्लेट')} {formatNum(currentPlateIdx + 1)} / {formatNum(totalPlates)}
                    </span>
                  </div>
                  <div style={{ height: '8px', width: '100%', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${((currentPlateIdx + 1) / totalPlates) * 100}%`,
                        backgroundColor: '#003893',
                        borderRadius: '9999px',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                  {/* 12 Step Dots */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
                    {ISHIHARA_PLATES.map((p, idx) => {
                      const answered = answers[p.id] !== undefined;
                      const isCurrent = idx === currentPlateIdx;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setCurrentPlateIdx(idx)}
                          style={{
                            width: isCurrent ? '24px' : '10px',
                            height: '10px',
                            borderRadius: '9999px',
                            border: 'none',
                            backgroundColor: isCurrent ? '#003893' : answered ? '#10b981' : '#cbd5e1',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            padding: 0
                          }}
                          title={`${t('Plate', 'प्लेट')} ${idx + 1}`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* SVG Ishihara Dot Plate */}
                <div
                  style={{
                    width: '280px',
                    height: '280px',
                    margin: '0 auto',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '4px solid #e2e8f0',
                    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <svg viewBox="0 0 300 300" width="100%" height="100%" role="img" aria-label="Ishihara Color Vision Plate">
                    <circle cx="150" cy="150" r="145" fill="#ffffff" />
                    {currentDots.map((dot, idx) => (
                      <circle key={idx} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.fill} />
                    ))}
                  </svg>
                </div>

                <div style={{ marginTop: '14px', fontSize: '12.5px', fontWeight: 700, color: '#64748b' }}>
                  {isNe ? currentPlate.typeNe : currentPlate.typeEn}
                </div>
              </div>

              {/* Right Column: Question & Answer Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
                    {t('What number do you see in the circle?', 'वृत्तभित्र तपाईं कुन नम्बर देख्नुहुन्छ?')}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
                    {t(
                      'Tap the number you see, or choose "Nothing".',
                      'देखिएको नम्बर छान्नुहोस् वा "केही देखिँदैन" थिच्नुहोस्।'
                    )}
                  </p>
                </div>

                {/* 4 Option Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {currentPlate.options.map((opt) => {
                    const isNothing = opt === 'Nothing';
                    const isSelected = answers[currentPlate.id] === opt;
                    const displayLabel = isNothing
                      ? t('Nothing / No Number', 'केही देखिँदैन')
                      : formatNum(opt);

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectAnswer(opt)}
                        style={{
                          padding: isNothing ? '16px 14px' : '18px 16px',
                          borderRadius: '14px',
                          border: isSelected ? '2px solid #003893' : '1.5px solid #cbd5e1',
                          backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                          color: isSelected ? '#003893' : '#0f172a',
                          fontSize: isNothing ? '14px' : '22px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
                        }}
                        className="hover-lift"
                      >
                        <span>{displayLabel}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation & Diagnostic Hint */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid #f1f5f9',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      disabled={currentPlateIdx === 0}
                      onClick={() => setCurrentPlateIdx(prev => Math.max(0, prev - 1))}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: currentPlateIdx === 0 ? '#cbd5e1' : '#334155',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: currentPlateIdx === 0 ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ChevronLeft size={16} />
                      <span>{t('Previous', 'अघिल्लो')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowHint(prev => !prev)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        border: '1px solid #bfdbfe',
                        backgroundColor: '#eff6ff',
                        color: '#003893',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <HelpCircle size={15} />
                      <span>{showHint ? t('Hide Explanation', 'जानकारी लुकाउनुहोस्') : t('Clinical Explanation', 'मेडिकल जानकारी')}</span>
                    </button>
                  </div>

                  {Object.keys(answers).length > 0 && (
                    <button
                      type="button"
                      onClick={() => setStage('result')}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        border: '1px solid #a7f3d0',
                        backgroundColor: '#ecfdf5',
                        color: '#047857',
                        fontSize: '12.5px',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {t('Finish Early', 'नतिजा हेर्नुहोस्')} →
                    </button>
                  )}
                </div>

                {showHint && (
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      fontSize: '12.5px',
                      color: '#334155',
                      lineHeight: 1.5
                    }}
                  >
                    <div>
                      <strong style={{ color: '#059669' }}>✓ {t('Normal Vision:', 'सामान्य दृष्टि:')} </strong>
                      {isNe ? currentPlate.normalSeesNe : currentPlate.normalSeesEn}
                    </div>
                    <div style={{ marginTop: '4px' }}>
                      <strong style={{ color: '#d97706' }}>⚠ {t('Color Deficiency:', 'रङ पहिचान समस्या:')} </strong>
                      {isNe ? currentPlate.deficientSeesNe : currentPlate.deficientSeesEn}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 3: VISION ASSESSMENT REPORT                            */}
        {/* ============================================================ */}
        {stage === 'result' && (
          <div style={{ padding: '32px 24px' }}>
            {/* Top Summary Banner */}
            <div
              style={{
                padding: '28px 24px',
                borderRadius: '18px',
                backgroundColor: isVisionPassed ? '#ecfdf5' : '#fffbeb',
                border: `2px solid ${isVisionPassed ? '#a7f3d0' : '#fde68a'}`,
                textAlign: 'center',
                marginBottom: '28px'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: isVisionPassed ? '#10b981' : '#f59e0b',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px'
                }}
              >
                {isVisionPassed ? <Award size={30} /> : <AlertTriangle size={30} />}
              </div>

              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: isVisionPassed ? '#047857' : '#b45309'
                }}
              >
                {isVisionPassed
                  ? t('Normal Color Vision — Eligible for DoTM Medical Pass', 'सामान्य रङ दृष्टि — यातायात मेडिकल जाँचको लागि योग्य')
                  : t('Possible Red-Green Color Deficiency Detected', 'रातो-हरियो रङ पहिचानमा केही कमजोरी देखियो')}
              </span>

              <h3 style={{ fontSize: '34px', fontWeight: 900, color: '#0f172a', margin: '8px 0' }}>
                {formatNum(correctCount)} / {formatNum(totalPlates)} ({formatNum(Math.round((correctCount / totalPlates) * 100))}%)
              </h3>

              <p style={{ fontSize: '14px', color: '#334155', maxWidth: '560px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                {isVisionPassed
                  ? t(
                      'Great job! You accurately identified the Ishihara plates required at the Nepal Transport Management Office medical counter.',
                      'बधाई छ! तपाईंले यातायात व्यवस्था कार्यालयको बायोमेट्रिक मेडिकल जाँचमा सोधिने इशहारा प्लेटहरू सफलतापूर्वक पहिचान गर्नुभयो।'
                    )
                  : t(
                      'You missed several red-green screening plates. We recommend practicing under natural daylight or consulting an optometrist before your DoTM medical appointment.',
                      'तपाईंले केही रातो-हरियो प्लेटहरूमा गल्ती गर्नुभयो। पर्याप्त उज्यालोमा पुनः प्रयास गर्नुहोस् वा यातायात कार्यालय जानुअघि आँखा विशेषज्ञसँग परामर्श लिनुहोस्।'
                    )}
              </p>

              <button
                type="button"
                onClick={handleStart}
                style={{
                  padding: '12px 26px',
                  borderRadius: '12px',
                  backgroundColor: '#003893',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                className="hover-lift"
              >
                <RotateCcw size={16} />
                <span>{t('Retake Eye Test', 'पुनः आँखा परीक्षण गर्नुहोस्')}</span>
              </button>
            </div>

            {/* Plate-by-Plate Breakdown Grid */}
            <h4 style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', margin: '0 0 14px' }}>
              {t('Plate-by-Plate Vision Review', 'प्रत्येक प्लेटको विस्तृत नतिजा')}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
              {ISHIHARA_PLATES.map((p, idx) => {
                const userAns = answers[p.id];
                const isCorrect = userAns === p.correctOption;
                return (
                  <div
                    key={p.id}
                    style={{
                      padding: '14px',
                      borderRadius: '14px',
                      border: `1.5px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
                      backgroundColor: isCorrect ? '#fafffd' : '#fffbfa',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#475569' }}>
                        {t('Plate', 'प्लेट')} #{formatNum(idx + 1)}
                      </span>
                      {isCorrect ? (
                        <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={14} /> {t('Correct', 'सही')}
                        </span>
                      ) : (
                        <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#dc2626', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <XCircle size={14} /> {t('Missed', 'गलत')}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', margin: '4px 0' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{t('Correct Number', 'सही अंक')}</div>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: '#059669' }}>{formatNum(p.correctOption)}</div>
                      </div>
                      <div style={{ width: '1px', height: '28px', backgroundColor: '#e2e8f0' }} />
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{t('Your Answer', 'तपाईंको उत्तर')}</div>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: isCorrect ? '#0f172a' : '#dc2626' }}>
                          {userAns ? (userAns === 'Nothing' ? t('None', 'खाली') : formatNum(userAns)) : '—'}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '11.5px', color: '#64748b', lineHeight: 1.4 }}>
                      {isNe ? p.normalSeesNe : p.normalSeesEn}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Educational Info Cards (Like likhitexam.com/eye-test bottom section) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div className="white-card" style={{ padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <ShieldCheck size={20} color="#003893" />
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              {t('Why DoTM Requires Color Vision Screening', 'यातायात कार्यालयले किन रङ परीक्षण लिन्छ?')}
            </h4>
          </div>
          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
            {t(
              'Under the Motor Vehicles and Transport Management Act 2049, drivers must accurately distinguish red stop signals, amber cautionary lights, green go signals, and red prohibitory road signs under all lighting conditions.',
              'सवारी तथा यातायात व्यवस्था ऐन २०४९ अनुसार चालकले ट्राफिक बत्तीको रातो, पहेंलो र हरियो संकेत तथा सडकका निषेधात्मक चिन्हहरू स्पष्ट छुट्याउन सक्नुपर्छ।'
            )}
          </p>
        </div>

        <div className="white-card" style={{ padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Eye size={20} color="#059669" />
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              {t('What Happens on Biometric Medical Day?', 'मेडिकल जाँचको दिन के-के हुन्छ?')}
            </h4>
          </div>
          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
            {t(
              'At the Transport Office medical counter, the doctor will show you 4 to 6 random pages from an Ishihara book and ask you to read the numbers aloud within 3 seconds per plate, followed by a basic distance letter chart check.',
              'यातायात कार्यालयको मेडिकल कक्षमा डाक्टरले इशहारा पुस्तिकाका ४ देखि ६ वटा पाना देखाई ३ सेकेन्डभित्र अंक भन्न लगाउँछन् र टाढाको अक्षर पढ्ने सामान्य जाँच गर्छन्।'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

