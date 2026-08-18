import React, { useMemo, useState } from 'react';
import { Layer, Rect, Text, Image as KonvaImage, Group } from 'react-konva';
import useImage from 'use-image';

export default function SingleStudentLayout({ student, formData, logoImage, headerHeight, logoScale }) {
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

        {formData.stipend && (
          <Group y={520}>
            <Text text={`${formData.compensationType || 'Package'}: `} fontSize={26} fontStyle="bold" fill="#0c2340" />
            <Text text={formData.stipend} fontSize={26} fontStyle="bold" fill="#c8102e" x={120} />
          </Group>
        )}
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