import React from 'react';
import { Group, Text, Rect } from 'react-konva';

export default function FlyerHeader({ width }) {
  return (
    <Group>
      <Rect width={width} height={150} fill="#e74c3c" />
      <Text 
        text="Ajeenkya DY Patil School of Engineering" 
        fontSize={28} 
        fontFamily="Arial" 
        fontStyle="bold"
        fill="white" 
        width={width} 
        align="center" 
        y={40} 
      />
      <Text 
        text="Students Progression & Corporate Relations Office" 
        fontSize={20} 
        fontFamily="Arial" 
        fill="white" 
        width={width} 
        align="center" 
        y={80} 
      />
    </Group>
  );
}
