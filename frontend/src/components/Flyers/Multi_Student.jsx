import React, { useState } from 'react';
import { Layer, Text, Image as KonvaImage, Group } from 'react-konva';
import PhotoGrid from '../konva/PhotoGrid';

export default function MultiStudentLayout({ students, formData, logoImage, flyerWidth, headerHeight, logoScale }) {
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
            <Text text={`${formData.compensationType || 'Package'}: `} fontSize={26} fontStyle="bold" fill="#0c2340" />
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
