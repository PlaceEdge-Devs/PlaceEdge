import React from 'react';
import { Group, Text, Rect, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

export default function StudentCard({ x, y, size, student, identicalRoles }) {
  const [img] = useImage(student.photoDataUrl);
  
  const width = size;
  const height = size * 1.25;
  const cornerRadius = 25; // increased for larger image

  return (
    <Group x={x} y={y}>
      <Group clipFunc={(ctx) => {
        ctx.beginPath();
        ctx.moveTo(cornerRadius, 0);
        ctx.lineTo(width - cornerRadius, 0);
        ctx.quadraticCurveTo(width, 0, width, cornerRadius);
        ctx.lineTo(width, height - cornerRadius);
        ctx.quadraticCurveTo(width, height, width - cornerRadius, height);
        ctx.lineTo(cornerRadius, height);
        ctx.quadraticCurveTo(0, height, 0, height - cornerRadius);
        ctx.lineTo(0, cornerRadius);
        ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
        ctx.closePath();
      }}>
        <Rect width={width} height={height} fill="#bdc3c7" />
        {img && (
          <KonvaImage 
            image={img} 
            width={width} 
            height={height} 
          />
        )}
      </Group>
      
      <Text 
        text={student.name || 'Student Name'} 
        fontSize={28} 
        fontStyle="bold"
        align="center" 
        width={width} 
        y={height + 25} 
        fill="#c8102e"
      />
      
      <Text 
        text={student.department || 'Department'} 
        fontSize={22} 
        fontStyle="bold"
        align="center" 
        width={width} 
        y={height + 65} 
        fill="#0c2340"
      />
      
      <Text 
        text={`Batch ${student.batch || '2026'}`} 
        fontSize={22} 
        align="center" 
        width={width} 
        y={height + 95} 
        fill="#0c2340"
      />
      
      {!identicalRoles && student.role && (
        <Text 
          text={student.role} 
          fontSize={22} 
          fontStyle="italic"
          align="center" 
          width={width} 
          y={height + 125} 
          fill="#c8102e"
        />
      )}
    </Group>
  );
}
