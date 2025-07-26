import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Zap, 
  Shield, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Rebuttal Generator",
      description: "AI-powered rebuttals based on your round strategy"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Card Cutter",
      description: "Extract and organize evidence from URLs and documents"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Speech Analysis",
      description: "Get critiques on word efficiency and delivery"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Extemp Prep",
      description: "Rapid preparation for extemporaneous speaking"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      school: "Harvard Debate Team",
      quote: "DebatePro transformed my preparation process. The AI rebuttals are incredibly strategic.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      school: "Stanford Policy Debate",
      quote: "The card cutting feature saved me hours of research time. Game changer!",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      school: "Yale Debate Society",
      quote: "Speech analysis helped me improve my delivery dramatically. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
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
            <Badge variant="secondary">Free Version Available</Badge>
            <Button variant="ghost">Sign In</Button>
            <Button variant="hero" onClick={onGetStarted}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-gradient-accent text-accent-foreground border-none">
            🏆 Trusted by 10,000+ Debaters
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Win Every Debate with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            DebatePro is the ultimate AI-powered platform for debate preparation. 
            Generate rebuttals, cut cards, analyze speeches, and dominate your rounds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="hero" onClick={onGetStarted}>
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="xl" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Win</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive suite of AI tools covers every aspect of debate preparation
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 rounded-lg bg-gradient-primary text-primary-foreground w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Loved by Top Debaters</h2>
            <p className="text-muted-foreground">See what champions are saying about DebatePro</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.school}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground">Start free, upgrade when you're ready to dominate</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Free Tier</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="text-3xl font-bold">$0<span className="text-lg text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>5 AI generations per day</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Basic rebuttal generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Limited card cutting</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline" onClick={onGetStarted}>
                  Start Free
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-glow border-accent">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-gradient-accent text-accent-foreground border-none">Most Popular</Badge>
                <CardTitle className="text-2xl">Pro Plan</CardTitle>
                <CardDescription>For serious debaters</CardDescription>
                <div className="text-3xl font-bold">$19<span className="text-lg text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Unlimited AI generations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Advanced OpenAI integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Complete feature access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Priority support</span>
                  </div>
                </div>
                <Button className="w-full" variant="premium">
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Dominate Your Next Debate?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of debaters who've transformed their game with DebatePro's AI-powered tools.
          </p>
          <Button size="xl" variant="secondary" onClick={onGetStarted}>
            Get Started Now - It's Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-6 w-6" />
            <span className="text-2xl font-bold">DebatePro</span>
          </div>
          <p className="text-primary-foreground/80">
            © 2024 DebatePro. Empowering debaters with AI technology.
          </p>
        </div>
      </footer>
    </div>
  );
};