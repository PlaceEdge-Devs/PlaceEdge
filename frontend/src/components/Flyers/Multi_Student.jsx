import React, { useState } from 'react';
import { Layer, Text, Image as KonvaImage, Group } from 'react-konva';
import PhotoGrid from '../konva/PhotoGrid';

export default function MultiStudentLayout({ students, formData, logoImage, flyerWidth, headerHeight, logoScale }) {
  const firstRole = students[0]?.role || '';
  const defaultLogoY = formData.stipend ? 130 : 90;
  const [logoPos, setLogoPos] = useState({ x: 0, y: defaultLogoY });

  return (
    <Layer>
      <PhotoGrid
        students={students}
        y={headerHeight + 130}
        width={flyerWidth}
        identicalRoles={true}
      />

      <Group x={80} y={headerHeight + 615}>
        {/* Global Details - Left Aligned */}
        <Group y={0}>
          <Text text="Role: " fontSize={26} fontStyle="bold" fill="#0c2340" />
          <Text text={firstRole} fontSize={26} fontStyle="bold" fill="#c8102e" x={75} />
        </Group>

        <Group y={40}>
          <Text text="Company - " fontSize={26} fontStyle="bold" fill="#0c2340" />
          <Text text={formData.companyName || ''} fontSize={26} fontStyle="bold" fill="#c8102e" x={145} />
        </Group>

        {formData.stipend && (
          <Group y={80}>
            <Text text={`${formData.compensationType || 'Package'}: `} fontSize={26} fontStyle="bold" fill="#0c2340" />
            <Text text={formData.stipend} fontSize={26} fontStyle="bold" fill="#c8102e" x={120} />
          </Group>
        )}

        {/* Company Logo */}
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
      </Group>
    </Layer>
  );
}
