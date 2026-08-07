import React, { useRef, useMemo, useState } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage, Group } from 'react-konva';
import useImage from 'use-image';
import PhotoGrid from './konva/PhotoGrid';

function SingleStudentLayout({ student, formData, logoImage, headerHeight, logoScale }) {
  const [studentImg] = useImage(student.photoDataUrl);

  const yearPrefix = student.year === 'Second Year' ? 'SE' : student.year === 'Third Year' ? 'TE' : 'BE';
  const deptText = `${yearPrefix} ${student.department || 'Computer Engineering'} | `;

  // Memoize expensive canvas text measurement — avoids creating a DOM element every render
  const deptWidth = useMemo(() => {
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    ctx.font = 'bold 24px Arial';
    return ctx.measureText(deptText).width;
  }, [deptText]);

  // Track dragged logo position
  const [logoPos, setLogoPos] = useState({ x: 160, y: headerHeight + 680 });

  return (
    <Layer>
      <Group x={80} y={headerHeight + 130}>
        {/* Student Photo */}
        <Group clipFunc={(ctx) => {
          ctx.beginPath();
          ctx.moveTo(25, 0);
          ctx.lineTo(280 - 25, 0);
          ctx.quadraticCurveTo(280, 0, 280, 25);
          ctx.lineTo(280, 320 - 25);
          ctx.quadraticCurveTo(280, 320, 280 - 25, 320);
          ctx.lineTo(25, 320);
          ctx.quadraticCurveTo(0, 320, 0, 320 - 25);
          ctx.lineTo(0, 25);
          ctx.quadraticCurveTo(0, 0, 25, 0);
          ctx.closePath();
        }}>
          <Rect width={280} height={320} fill="#bdc3c7" />
          {studentImg && (
            <KonvaImage
              image={studentImg}
              width={280}
              height={320}
            />
          )}
        </Group>

        <Text
          text={student.name || 'Student Name'}
          fontSize={38}
          fontStyle="bold"
          fill="#c8102e"
          y={340}
        />

        {/* Department and Batch */}
        <Group y={390}>
          <Text text={deptText} fontSize={24} fontStyle="bold" fill="#0c2340" />
          <Rect x={deptWidth} y={-2} width={150} height={30} fill="#c8102e" cornerRadius={6} />
          <Text text={`Batch: ${student.batch || '2027'}`} fontSize={20} fontStyle="bold" fill="white" x={deptWidth + 12} y={3} />
        </Group>

        {/* Role */}
        <Group y={440}>
          <Text text="Role: " fontSize={26} fontStyle="bold" fill="#0c2340" />
          <Text text={student.role} fontSize={26} fontStyle="bold" fill="#c8102e" x={75} />
        </Group>

        {/* Company and Stipend */}
        <Group y={480}>
          <Text text="Company - " fontSize={26} fontStyle="bold" fill="#0c2340" />
          <Text text={formData.companyName} fontSize={26} fontStyle="bold" fill="#c8102e" x={145} />
        </Group>

        <Group y={520}>
          <Text text="Stipend: " fontSize={26} fontStyle="bold" fill="#0c2340" />
          <Text text={formData.stipend} fontSize={26} fontStyle="bold" fill="#c8102e" x={120} />
        </Group>
      </Group>

      {logoImage && (
        <KonvaImage
          image={logoImage}
          x={logoPos.x}
          y={logoPos.y}
          width={logoScale}
          height={(logoImage.height * logoScale) / logoImage.width}
          draggable
          onMouseEnter={() => { document.body.style.cursor = 'move'; }}
          onMouseLeave={() => { document.body.style.cursor = 'default'; }}
          onDragEnd={(e) => {
            setLogoPos({ x: e.target.x(), y: e.target.y() });
          }}
        />
      )}
    </Layer>
  );
}

function MultiStudentLayout({ students, formData, logoImage, flyerWidth, headerHeight, logoScale }) {
  const allRoles = students.map(s => s.role).filter(Boolean);
  const identicalRoles = allRoles.length > 1 && allRoles.every(r => r === allRoles[0]);

  const defaultLogoY = formData.stipend ? (identicalRoles ? 130 : 90) : (identicalRoles ? 90 : 50);
  const [logoPos, setLogoPos] = useState({ x: 0, y: defaultLogoY });

  return (
    <Layer>
      <PhotoGrid
        students={students}
        y={headerHeight + 110}
        width={flyerWidth}
        identicalRoles={identicalRoles}
      />

      <Group x={80} y={headerHeight + 600}>
        {/* Global Details - Left Aligned */}
        {formData.stipend && (
          <Group y={0}>
            <Text text="Package: " fontSize={26} fontStyle="bold" fill="#0c2340" />
            <Text text={formData.stipend} fontSize={26} fontStyle="bold" fill="#c8102e" x={125} />
          </Group>
        )}

        <Group y={formData.stipend ? 40 : 0}>
          <Text text="Placed at: " fontSize={26} fontStyle="bold" fill="#0c2340" />
          <Text text={formData.companyName || 'Company Name'} fontSize={26} fontStyle="bold" fill="#c8102e" x={135} />
        </Group>

        {identicalRoles && (
          <Group y={formData.stipend ? 80 : 40}>
            <Text text="Position: " fontSize={26} fontStyle="bold" fill="#0c2340" />
            <Text text={allRoles[0]} fontSize={26} fontStyle="bold" fill="#c8102e" x={125} />
          </Group>
        )}

        {/* Company Logo */}
        {logoImage ? (
          <KonvaImage
            image={logoImage}
            x={logoPos.x}
            y={logoPos.y}
            width={logoScale}
            height={(logoImage.height * logoScale) / logoImage.width}
            draggable
            onMouseEnter={() => { document.body.style.cursor = 'move'; }}
            onMouseLeave={() => { document.body.style.cursor = 'default'; }}
            onDragEnd={(e) => {
              setLogoPos({ x: e.target.x(), y: e.target.y() });
            }}
          />
        ) : (
          <Text
            text={formData.companyName || 'Company Name'}
            fontSize={40}
            fontStyle="bold"
            fill="#0c2340"
            x={0}
            y={formData.stipend ? (identicalRoles ? 130 : 90) : (identicalRoles ? 90 : 50)}
          />
        )}
      </Group>
    </Layer>
  );
}

export default function FlyerPreview({ formData, onExportReady }) {
  const stageRef = useRef(null);

  // Canvas size perfectly square
  const flyerWidth = 1080;
  const flyerHeight = 1080;

  const [bgImage] = useImage('/elements/Background.png');
  const [headerImage] = useImage('/elements/header.jpeg');
  const [footerImage] = useImage('/elements/lower element.png');
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

  const headerHeight = headerImage ? (headerImage.height * flyerWidth) / headerImage.width : 200;

  // Footer building size (adjusting so it sits cleanly on the right)
  const footerW = flyerWidth * 0.85;
  const footerScale = footerImage ? footerW / footerImage.width : 1;
  const footerH = footerImage ? footerImage.height * footerScale : 300;

  return (
    <div className="flyer-preview" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: flyerWidth * 0.5, height: flyerHeight * 0.5 }}>
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
                width={flyerWidth}
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
              text="https://adypsoe.in/"
              fontSize={20}
              fill="#c8102e"
              x={flyerWidth - 190}
              y={flyerHeight - 60}
              fontStyle="bold"
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
