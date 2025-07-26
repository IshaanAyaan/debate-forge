import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Link, FileText, Sparkles } from "lucide-react";
import { DebateGeminiService } from '@/services/geminiService';

interface DebateFeatureProps {
  title: string;
  description: string;
  placeholder: string;
  systemPrompt: string;
  icon: React.ReactNode;
  inputType?: 'text' | 'file' | 'url';
  featureId: string;
}

export const DebateFeature: React.FC<DebateFeatureProps> = ({
  title,
  description,
  placeholder,
  systemPrompt,
  icon,
  inputType = 'text',
  featureId
}) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide input before submitting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let response;
      
      // Call specific Gemini API function based on feature
      switch (featureId) {
        case 'rebuttal':
          response = await DebateGeminiService.generateRebuttal(input);
          break;
        case 'cardcutter':
          response = await DebateGeminiService.cutCards(input);
          break;
        case 'extemp':
          response = await DebateGeminiService.prepareExtemp(input);
          break;
        case 'wordchoice':
          response = await DebateGeminiService.optimizeForLay(input);
          break;
        case 'speechanalysis':
          response = await DebateGeminiService.analyzeSpeech(input);
          break;
        case 'processflow':
          response = await DebateGeminiService.analyzeProcessFlow(input);
          break;
        case 'storage':
          response = await DebateGeminiService.organizeStorage(input);
          break;
        default:
          response = await DebateGeminiService.generateDebateResponse({
            userInput: input,
            systemPrompt,
            feature: title
          });
      }

      if (response.success && response.result) {
        setResult(response.result);
        toast({
          title: "✨ AI Analysis Complete",
          description: `${title} generated successfully using Gemini 2.0 Flash!`,
        });
      } else {
        throw new Error(response.error || 'Failed to generate response');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderInput = () => {
    switch (inputType) {
      case 'file':
        return (
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload File</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setInput(file.name);
                }}
              />
              <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                Choose File
              </Button>
            </div>
          </div>
        );
      case 'url':
        return (
          <div className="space-y-2">
            <Label htmlFor="url-input">URL or Google Doc Link</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="url-input"
                  type="url"
                  placeholder={placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="text-input">Input</Label>
            <Textarea
              id="text-input"
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>
        );
    }
  };

  return (
    <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
            {icon}
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderInput()}
        
        <Button 
          onClick={handleSubmit} 
          disabled={loading}
          className="w-full"
          size="lg"
          variant="hero"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing with Gemini AI...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate with Gemini 2.0 Flash
            </>
          )}
        </Button>

        {result && (
          <div className="mt-6 space-y-2">
            <Label>Result</Label>
            <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-foreground">{result}</pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};