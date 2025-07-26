import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { DebateFeature } from './DebateFeature';
import { 
  Swords, 
  Scissors, 
  Archive, 
  Mic, 
  MessageSquare, 
  BarChart3, 
  Workflow,
  Trophy,
  Settings,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const DebateApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('rebuttal');

  const features = [
    {
      id: 'rebuttal',
      title: 'Rebuttal Maker',
      description: 'Generate strategic rebuttals based on your round strategy',
      placeholder: 'Enter your round strategy, opponent arguments, and any specific points you want to address...',
      systemPrompt: 'You are a world-class debate strategist. Generate compelling rebuttals that address the opponent\'s arguments while strengthening the user\'s position. Focus on logical flow, evidence-based responses, and strategic considerations.',
      icon: <Swords className="h-5 w-5" />,
      inputType: 'text' as const
    },
    {
      id: 'cardcutter',
      title: 'Card Cutter',
      description: 'Extract and organize evidence from URLs and documents',
      placeholder: 'https://example.com/article or paste your content...',
      systemPrompt: 'You are an expert evidence analyst. Extract key arguments, statistics, and quotable content from the provided source. Organize findings by topic and provide proper citations.',
      icon: <Scissors className="h-5 w-5" />,
      inputType: 'url' as const
    },
    {
      id: 'storage',
      title: 'Organized Storage',
      description: 'Manage and categorize your debate materials',
      placeholder: 'Search your stored arguments, evidence, and strategies...',
      systemPrompt: 'Help organize and retrieve debate materials efficiently. Categorize by topic, strength, and relevance.',
      icon: <Archive className="h-5 w-5" />,
      inputType: 'text' as const
    },
    {
      id: 'extemp',
      title: 'Extemp Prep',
      description: 'Rapid preparation for extemporaneous speaking',
      placeholder: 'Enter your extemp topic or question...',
      systemPrompt: 'You are an extemporaneous speaking coach. Provide a structured outline with compelling arguments, current examples, and strategic flow for the given topic.',
      icon: <Mic className="h-5 w-5" />,
      inputType: 'text' as const
    },
    {
      id: 'wordchoice',
      title: 'Word Choice for Lay',
      description: 'Optimize language for lay judges and audiences',
      placeholder: 'Paste your speech or argument to optimize for lay audiences...',
      systemPrompt: 'You are a communication expert specializing in making complex arguments accessible to lay audiences. Simplify jargon, improve clarity, and maintain persuasive impact.',
      icon: <MessageSquare className="h-5 w-5" />,
      inputType: 'text' as const
    },
    {
      id: 'speechanalysis',
      title: 'Speech Analysis',
      description: 'Get critiques on word efficiency and delivery',
      placeholder: 'Upload your speech file or paste the transcript...',
      systemPrompt: 'You are a speech and debate coach. Analyze the provided speech for word efficiency, clarity, flow, impact, and overall effectiveness. Provide specific improvement suggestions.',
      icon: <BarChart3 className="h-5 w-5" />,
      inputType: 'file' as const
    },
    {
      id: 'processflow',
      title: 'Process Flows',
      description: 'Get strategic advice for your debate rounds',
      placeholder: 'Describe your current round situation, arguments made, and strategic concerns...',
      systemPrompt: 'You are a master debate strategist. Analyze the round flow and provide tactical advice for the next speech, including argument prioritization and strategic considerations.',
      icon: <Workflow className="h-5 w-5" />,
      inputType: 'text' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
              <Trophy className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              DebatePro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-accent text-accent-foreground text-sm">
              <Sparkles className="h-3 w-3" />
              Powered by Gemini 2.0 Flash
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            AI-Powered Debate Tools
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose a tool below to enhance your debate preparation with advanced AI assistance
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-8 h-auto p-1 bg-muted/50">
            {features.map((feature) => (
              <TabsTrigger 
                key={feature.id} 
                value={feature.id}
                className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-background data-[state=active]:shadow-card"
              >
                <div className="p-1.5 rounded-md bg-gradient-primary text-primary-foreground opacity-70 data-[state=active]:opacity-100">
                  {feature.icon}
                </div>
                <span className="text-xs font-medium hidden sm:block">{feature.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <Card className="max-w-4xl mx-auto">
                <DebateFeature
                  title={feature.title}
                  description={feature.description}
                  placeholder={feature.placeholder}
                  systemPrompt={feature.systemPrompt}
                  icon={feature.icon}
                  inputType={feature.inputType}
                  featureId={feature.id}
                />
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 text-center shadow-card">
            <div className="text-2xl font-bold text-primary mb-1">10K+</div>
            <div className="text-sm text-muted-foreground">Debates Won</div>
          </Card>
          <Card className="p-6 text-center shadow-card">
            <div className="text-2xl font-bold text-primary mb-1">50K+</div>
            <div className="text-sm text-muted-foreground">Rebuttals Generated</div>
          </Card>
          <Card className="p-6 text-center shadow-card">
            <div className="text-2xl font-bold text-primary mb-1">25K+</div>
            <div className="text-sm text-muted-foreground">Cards Cut</div>
          </Card>
          <Card className="p-6 text-center shadow-card">
            <div className="text-2xl font-bold text-primary mb-1">99%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </Card>
        </div>
      </div>
    </div>
  );
};