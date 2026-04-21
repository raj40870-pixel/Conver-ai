import React, { Suspense } from 'react';
import AppLayout from '@/components/AppLayout';
import ConversionWorkspace from './components/ConversionWorkspace';

export default function FileConversionToolScreen() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <ConversionWorkspace />
      </Suspense>
    </AppLayout>
  );
}