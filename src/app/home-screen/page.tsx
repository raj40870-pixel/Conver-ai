import React from 'react';
import AppLayout from '@/components/AppLayout';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import ToolsGrid from './components/ToolsGrid';
import FeaturesSection from './components/FeaturesSection';
import FormatsSection from './components/FormatsSection';
import CtaSection from './components/CtaSection';
import FooterSection from './components/FooterSection';

export default function HomeScreen() {
  return (
    <AppLayout>
      <div className="bg-grid-pattern">
        <div className="bg-radial-glow">
          <HeroSection />
        </div>
        <StatsBar />
        <ToolsGrid />
        <FeaturesSection />
        <FormatsSection />
        <CtaSection />
        <FooterSection />
      </div>
    </AppLayout>
  );
}