import React, { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { DebateApp } from '@/components/DebateApp';

const Index = () => {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <DebateApp />;
  }

  return <LandingPage onGetStarted={() => setShowApp(true)} />;
};

export default Index;
