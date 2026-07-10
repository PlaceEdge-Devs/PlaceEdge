import React from 'react';
import { Group } from 'react-konva';
import StudentCard from './StudentCard';

export default function PhotoGrid({ students, y, width, identicalRoles }) {
  const count = students.length;
  let layout = [];
  
  // Adjusted sizes for 1080x1080 layout
  const cardWidth = count <= 3 ? 240 : 180;
  const gap = count <= 3 ? 60 : 30;

  if (count <= 4) {
    const totalWidth = count * cardWidth + (count - 1) * gap;
    const startX = (width - totalWidth) / 2;
    for(let i=0; i<count; i++) {
      layout.push({ x: startX + i * (cardWidth + gap), y: 0 });
    }
  } else if (count === 5) {
    const topWidth = 3 * cardWidth + 2 * gap;
    const topStartX = (width - topWidth) / 2;
    
    const botWidth = 2 * cardWidth + gap;
    const botStartX = (width - botWidth) / 2;
    
    layout = [
      { x: topStartX, y: 0 },
      { x: topStartX + cardWidth + gap, y: 0 },
      { x: topStartX + 2 * (cardWidth + gap), y: 0 },
      { x: botStartX, y: cardWidth * 1.25 + 160 },
      { x: botStartX + cardWidth + gap, y: cardWidth * 1.25 + 160 }
    ];
  }

  return (
    <Group y={y}>
      {students.map((student, i) => (
        <StudentCard 
          key={i} 
          x={layout[i]?.x || 0} 
          y={layout[i]?.y || 0} 
          size={cardWidth} 
          student={student} 
          identicalRoles={identicalRoles}
        />
      ))}
    </Group>
  );
}
