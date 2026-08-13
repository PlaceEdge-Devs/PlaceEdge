import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Group, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const COLORS = {
  red: '#C8202F',
  redDark: '#A31A26',
  redSoft: '#F2D6D9',
  blue: '#1F3C88',
  gray: '#EAEAEA',
  grayLine: '#D8D8D8',
  textDark: '#1A1A1A',
  textMuted: '#666666',
  white: '#FFFFFF',
  placeholderFill: '#F5F5F5',
  placeholderStroke: '#BBBBBB',
  placeholderText: '#969696',
};

const FONTS = {
  base: 'Poppins, Arial, sans-serif',
  devanagari: 'Khand, Arial, sans-serif',
};

const CANVAS = { width: 720, height: 906 };
const CONTENT_X = 50;
const CONTENT_W = CANVAS.width - CONTENT_X * 2;

// ============================================================================
// DEFAULT CONTENT
// ============================================================================

export const DEFAULT_CONTENT = {
  // ---- header ----
  tagline: '"Empowerment through quality technical education"',
  collegeNameLine1: 'AJEENKYA',
  collegeNameLine2: 'DY Patil School of Engineering',
  approvalLine:
    'An Autonomous Institute Affiliated to Savitribai Phule Pune University, Approved by AICTE, Recognized by Govt. of Maharashtra',

  // ---- hero ----
  brandWord: 'सेतु',
  eventTag: 'CAMPUS TO CORPORATE',
  seminarTitle:
    'Seminar on "Recent Advances and Emerging Trends in\nMechanical Engineering" with Ms. Anushree Madan\nFounder-Akzsi Academy',

  // ---- date / time / platform ----
  date: 'Date: Saturday, 1st August 2026',
  time: 'Time: 11:30 AM',
  platform: 'Platform: Virtual (Online)',

  // ---- body ----
  attendHeading: 'Who Should Attend:',
  attendBullets: [
    'Undergraduates from Mechanical\nEngineering and allied branches',
    'Research Scholars & Academicians:\nResearchers and faculty members\ninterested in current advancements,\nsmart manufacturing, and emerging\ntechnologies in mechanical domains.',
    'Industry Professionals & Aspiring\nEngineers: Individuals looking to\nupgrade their skills, understand\nmodern industry expectations, and\ntransition into emerging mechanical\nand automation fields.',
  ],

  speakerPhotoSrc: '',
  speakerName: 'Ms. Anushree Madan',
  speakerTitle: 'Founder-Akzsi Academy',

  // ---- footer ----
  organizedByLabel: 'Organized By:',
  organizedByText: 'Students Progression & Corporate Relations Office, ADYPG',
};

// ============================================================================
// HELPERS
// ============================================================================

function measureTextWidth(text, fontSize, fontStyle = 'normal', fontFamily = FONTS.base) {
  if (typeof document === 'undefined') return text.length * fontSize * 0.55;
  if (!measureTextWidth._canvas) measureTextWidth._canvas = document.createElement('canvas');
  const ctx = measureTextWidth._canvas.getContext('2d');
  ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
  return ctx.measureText(text).width;
}

function PlaceholderImage({ src, x, y, width, height, label, cornerRadius = 0 }) {
  const [image] = useImage(src || '', 'anonymous');

  if (src && image) {
    return (
      <KonvaImage
        image={image}
        x={x}
        y={y}
        width={width}
        height={height}
        cornerRadius={cornerRadius}
      />
    );
  }

  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={COLORS.placeholderFill}
        stroke={COLORS.placeholderStroke}
        strokeWidth={2}
        dash={[8, 6]}
        cornerRadius={cornerRadius}
      />
      <Text
        x={x + 6}
        y={y + height / 2 - 9}
        width={width - 12}
        align="center"
        text={label || 'ADD\nIMAGE'}
        fontSize={12}
        fontStyle="bold"
        fill={COLORS.placeholderText}
        fontFamily={FONTS.base}
        wrap="word"
      />
    </Group>
  );
}

function BulletList({ x, y, width, items, fontSize = 11, lineHeight = 1.2, gap = 8 }) {
  const textRefs = useRef([]);
  const [offsets, setOffsets] = useState(items.map((_, i) => i * 40));

  useLayoutEffect(() => {
    let cursor = 0;
    const next = items.map((_, i) => {
      const top = cursor;
      const node = textRefs.current[i];
      const h = node ? node.height() : fontSize * lineHeight * 2;
      cursor += h + gap;
      return top;
    });
    setOffsets(next);
  }, [items, width, fontSize]);

  return (
    <Group x={x} y={y}>
      {items.map((item, i) => (
        <Group key={i} y={offsets[i] || 0}>
          <Circle x={5} y={fontSize * 0.72} radius={2.5} fill={COLORS.textDark} />
          <Text
            ref={(node) => (textRefs.current[i] = node)}
            x={16}
            y={0}
            width={width - 16}
            text={item}
            fontSize={fontSize}
            lineHeight={lineHeight}
            fill={COLORS.textDark}
            fontFamily={FONTS.base}
          />
        </Group>
      ))}
    </Group>
  );
}

function OrganizedByLine({ y, label, text, fontSize = 11 }) {
  const labelWidth = measureTextWidth(label + ' ', fontSize, 'bold', FONTS.base);
  const textWidth = measureTextWidth(text, fontSize, 'normal', FONTS.base);
  const totalWidth = labelWidth + textWidth;
  const startX = CANVAS.width / 2 - totalWidth / 2;

  return (
    <Group y={y}>
      <Text x={startX} y={0} text={label} fontSize={fontSize} fontStyle="bold" fill={COLORS.red} fontFamily={FONTS.base} />
      <Text x={startX + labelWidth} y={0} text={text} fontSize={fontSize} fill={COLORS.textDark} fontFamily={FONTS.base} />
    </Group>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SetuEventPoster({ content = DEFAULT_CONTENT, width = CANVAS.width, height = CANVAS.height, onExportReady }) {
  const c = { ...DEFAULT_CONTENT, ...content };
  const scale = width / CANVAS.width;
  const stageRef = useRef(null);

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [bg0] = useImage('/setu_elements/Setu_background0.png');
  const [bg1] = useImage('/setu_elements/Setu_background1.png');
  const [rightRibbon] = useImage('/setu_elements/right_ribbon.png');
  const [leftRibbon] = useImage('/setu_elements/left_ribbon.png');
  const [venueBar] = useImage('/setu_elements/Venue_bar.png');
  const [headerImage] = useImage('/setu_elements/header.jpeg');
  
  const headerHeight = headerImage ? (headerImage.height * 656) / headerImage.width : 130;
  const [naacLogo] = useImage('/elements/naac.png');
  const [nirfLogo] = useImage('/elements/nirf.png');
  const [isoLogo] = useImage('/elements/iso.png');

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const poppins = new FontFace('Poppins', 'url(/setu_elements/Poppins-Bold.ttf)');
        const khand = new FontFace('Khand', 'url(/setu_elements/Khand-SemiBold.ttf)');
        await Promise.all([poppins.load(), khand.load()]);
        document.fonts.add(poppins);
        document.fonts.add(khand);
      } catch (err) {
        console.error("Font loading error:", err);
      }
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    if (stageRef.current && onExportReady && fontsLoaded && bg0) {
      onExportReady(stageRef.current);
    }
  }, [onExportReady, fontsLoaded, bg0, bg1, rightRibbon, leftRibbon, venueBar, headerImage]);

  if (!fontsLoaded) return null;

  return (
    <Stage width={width} height={height} scaleX={scale} scaleY={scale} ref={stageRef}>
      <Layer>
        {/* Background Layers */}
        {bg0 && <KonvaImage image={bg0} x={0} y={0} width={720} height={906} />}
        {bg1 && <KonvaImage image={bg1} x={32} y={35} width={656} height={836} />}

        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}
        {headerImage && (
          <KonvaImage
            image={headerImage}
            x={37}
            y={39}
            width={645}
            height={headerHeight}
          />
        )}
        <Rect x={45} y={35 + headerHeight + 5} width={630} height={1.5} fill={COLORS.grayLine} />

        {/* Ribbons (Drawn on top of header to prevent overlap issues) */}
        {rightRibbon && <KonvaImage image={rightRibbon} x={620} y={130} width={103} height={196} />}
        {leftRibbon && <KonvaImage image={leftRibbon} x={0} y={590} width={91} height={196} />}

        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                             */}
        {/* ---------------------------------------------------------------- */}
        <Text
          x={CONTENT_X}
          y={170}
          width={CONTENT_W}
          align="center"
          text={c.brandWord}
          fontSize={100}
          fontStyle="bold"
          fill={COLORS.red}
          fontFamily={FONTS.devanagari}
        />

        <Text
          x={CONTENT_X}
          y={280}
          width={CONTENT_W}
          align="center"
          text={c.eventTag}
          fontSize={24}
          fontStyle="bold"
          fill={COLORS.textDark}
          fontFamily={FONTS.base}
          letterSpacing={0.5}
        />

        <Text
          x={CONTENT_X + 10}
          y={320}
          width={CONTENT_W - 20}
          align="center"
          text={c.seminarTitle}
          fontSize={16}
          lineHeight={1.3}
          fill={COLORS.textDark}
          fontFamily={FONTS.base}
        />

        {/* ---------------------------------------------------------------- */}
        {/* Date / time bar                                                  */}
        {/* ---------------------------------------------------------------- */}
        <Group x={75} y={395}>
          {venueBar && <KonvaImage image={venueBar} x={0} y={0} width={570} height={45} />}
          {!venueBar && <Rect x={0} y={0} width={570} height={45} fill={COLORS.gray} cornerRadius={6} />}
          
          <Text x={40} y={17} text={c.date} fontSize={14} fontStyle="bold" fill={COLORS.textDark} fontFamily={FONTS.base} />
          <Text x={430} y={17} text={c.time} fontSize={14} fontStyle="bold" fill={COLORS.textDark} fontFamily={FONTS.base} />
        </Group>

        <Text
          x={CONTENT_X}
          y={465}
          width={CONTENT_W}
          align="center"
          text={`Platform: ${c.platform.replace('Platform: ', '')}`}
          fontSize={18}
          fontStyle="bold"
          fill={COLORS.textDark}
          fontFamily={FONTS.base}
        />

        {/* ---------------------------------------------------------------- */}
        {/* Body                                                             */}
        {/* ---------------------------------------------------------------- */}
        <Text
          x={100}
          y={510}
          text={c.attendHeading}
          fontSize={20}
          fontStyle="bold"
          fill={COLORS.red}
          fontFamily={FONTS.base}
        />
        <BulletList x={100} y={540} width={310} items={c.attendBullets} fontSize={14} gap={12} />

        <PlaceholderImage
          src={c.speakerPhotoSrc}
          x={410}
          y={515}
          width={245}
          height={280}
          cornerRadius={20}
          label="SPEAKER\nPHOTO"
        />
        <Rect x={410} y={515 + 280 - 45} width={245} height={45} fill={COLORS.red} opacity={0.94} cornerRadius={[0, 0, 20, 20]} />
        <Text
          x={410}
          y={515 + 280 - 40}
          width={245}
          align="center"
          text={c.speakerName}
          fontSize={16}
          fontStyle="bold"
          fill={COLORS.white}
          fontFamily={FONTS.base}
        />
        <Text
          x={410}
          y={515 + 280 - 20}
          width={245}
          align="center"
          text={c.speakerTitle}
          fontSize={13}
          fill={COLORS.white}
          fontFamily={FONTS.base}
        />

        {/* ---------------------------------------------------------------- */}
        {/* Footer                                                           */}
        {/* ---------------------------------------------------------------- */}
        <OrganizedByLine y={835} label={c.organizedByLabel} text={c.organizedByText} fontSize={17} />
      </Layer>
    </Stage>
  );
}
