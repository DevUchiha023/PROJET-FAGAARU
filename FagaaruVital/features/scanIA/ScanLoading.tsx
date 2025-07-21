import React from 'react';
import AnimatedLoading from '../../components/AnimatedLoading';

export default function ScanLoading() {
  return (
    <AnimatedLoading 
      text="Analyse en cours..." 
      color="#007AFF"
      size={40}
    />
  );
} 