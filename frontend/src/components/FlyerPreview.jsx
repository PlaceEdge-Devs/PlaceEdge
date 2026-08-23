import React, { useRef, useMemo, useState } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage, Group } from 'react-konva';
import useImage from 'use-image';
import PhotoGrid from './konva/PhotoGrid';
import SingleStudentLayout from './Flyers/1_Student';
import MultiStudentLayout from './Flyers/Multi_Student';

export default function FlyerPreview({ formData, onExportReady }) {
  const stageRef = useRef(null);

  // Canvas size perfectly square
  const flyerWidth = 1080;
  const flyerHeight = 1080;

  const isAdypu = formData.headerType === 'ADYPU';
  const [bgImage] = useImage('/elements/Background.webp');
  const [headerImage] = useImage(isAdypu ? '/elements/header2.png' : '/elements/header.webp');
  const [footerImage] = useImage(isAdypu ? '/elements/footer2.png' : '/elements/lower element.webp');
  const [logoImage] = useImage(formData.companyLogo);

  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  React.useEffect(() => {
    if (stageRef.current) {
      onExportReady(stageRef.current);
    }
  }, [formData, onExportReady, bgImage, headerImage, footerImage, logoImage]);

  const renderStudents = formData.students;

  // ADYPSOE Header 1 default settings (locked aspect ratio)
  const header1X = 0;
  const header1Y = 0;
  const header1Width = flyerWidth;
  const header1Height = headerImage && !isAdypu ? (headerImage.height * flyerWidth) / headerImage.width : 200;

  // ADYPU Header 2 manual settings (locked aspect ratio)
  // Edit these values to manually adjust header 2 position and width
  const header2X = 0;
  const header2Y = 0;
  const header2Width = flyerWidth;
  const header2Height = headerImage && isAdypu ? (headerImage.height * header2Width) / headerImage.width : 200;

  const headerX = isAdypu ? header2X : header1X;
  const headerY = isAdypu ? header2Y : header1Y;
  const headerWidth = isAdypu ? header2Width : header1Width;
  const headerHeight = isAdypu ? header2Height : header1Height;

  // Footer building size (adjusting so it sits cleanly on the right)
  const footerW = flyerWidth * 0.85;
  const footerScale = footerImage ? footerW / footerImage.width : 1;
  const footerH = footerImage ? footerImage.height * footerScale : 300;

  return (
    <div className="flyer-preview" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div 
        className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-zinc-200/60 bg-white"
        style={{ width: flyerWidth * 0.5, height: flyerHeight * 0.5 }}
      >
        <Stage width={flyerWidth * 0.5} height={flyerHeight * 0.5} scale={{ x: 0.5, y: 0.5 }} ref={stageRef}>
          <Layer>
            <Rect width={flyerWidth} height={flyerHeight} fill="#ffffff" />

            {bgImage && (
              <KonvaImage
                image={bgImage}
                width={flyerWidth}
                height={flyerHeight}
              />
            )}

            {headerImage && (
              <KonvaImage
                image={headerImage}
                x={headerX}
                y={headerY}
                width={headerWidth}
                height={headerHeight}
              />
            )}

            <Text
              key={fontsLoaded ? 'font-loaded' : 'font-loading'}
              text="Congratulations"
              fontSize={65}
              fill="#c8102e"
              width={flyerWidth}
              align="center"
              y={headerHeight +27}
              fontFamily="Halimun"
            />
          </Layer>

          {renderStudents.length === 1 ? (
            <SingleStudentLayout
              student={renderStudents[0]}
              formData={formData}
              logoImage={logoImage}
              headerHeight={headerHeight}
              logoScale={formData.logoScale ?? 200}
            />
          ) : (
            <MultiStudentLayout
              students={renderStudents}
              formData={formData}
              logoImage={logoImage}
              flyerWidth={flyerWidth}
              headerHeight={headerHeight}
              logoScale={formData.logoScale ?? 200}
            />
          )}

          <Layer listening={false}>
            {/* Red divider line */}
            <Rect
              x={80}
              y={flyerHeight - 110}
              width={50}
              height={6}
              fill="#c8102e"
            />

            <Text
              text="Students Progression &"
              fontSize={24}
              fill="#0c2340"
              x={80}
              y={flyerHeight - 100}
              fontStyle="bold"
            />
            <Text
              text="Corporate Relations Office (ADYPG)"
              fontSize={24}
              fill="#0c2340"
              x={80}
              y={flyerHeight - 70}
              fontStyle="bold"
            />

            {footerImage && (
              <KonvaImage
                image={footerImage}
                x={flyerWidth - footerW}
                y={flyerHeight - footerH}
                width={footerW}
                height={footerH}
              />
            )}

            {/* Website URL on bottom right */}
            <Text
              text={isAdypu ? "https://adypu.edu.in/" : "https://adypsoe.in/"}
              fontSize={20}
              fill="#c8102e"
              x={flyerWidth - (isAdypu ? 200 : 190)}
              y={flyerHeight - 60}
              fontStyle="bold"
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
