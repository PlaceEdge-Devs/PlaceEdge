import React from 'react';
import { Group, Text, Rect } from 'react-konva';

export default function FlyerFooter({ width, y }) {
  return (
    <Group y={y}>
      <Rect width={width} height={100} fill="#34495e" />
      <Text 
        text="www.adypg.edu.in | SPCR Office" 
        fontSize={18} 
        fontFamily="Arial" 
        fill="white" 
        width={width} 
        align="center" 
        y={40} 
      />
    </Group>
  );
}
