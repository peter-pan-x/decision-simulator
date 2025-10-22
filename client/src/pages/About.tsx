import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, Users, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-16 space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Decision Simulator
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We help people make better decisions by visualizing the cascade effects and multi-dimensional impacts of their choices.
            </p>
          </div>

          {/* Mission */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Decision-making is one of the most critical skills in life, yet most people struggle with complex choices that have far-reaching consequences. Traditional decision-making tools focus on simple pros and cons lists, but they fail to capture the <strong>butterfly effect</strong> - how small decisions cascade into larger impacts over time.
              </p>
              <p className="leading-relaxed">
                Decision Simulator was created to fill this gap. We combine advanced analytical frameworks with intuitive visualizations to help you see not just the immediate effects of your choices, but also the second-order and third-order consequences that most people overlook.
              </p>
            </CardContent>
          </Card>

          {/* How It Works */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <Brain className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">1. Describe Your Decision</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Input your decision scenario and the options you're considering. Be as specific as possible.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">2. Cascade Analysis</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Our engine analyzes first, second, and third-order effects across multiple dimensions.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">3. Visualize Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  See interactive flow charts showing how your decision cascades through different areas of life.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">4. Make Informed Choice</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Compare options side-by-side and choose the path that aligns with your values and goals.
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Multi-Dimensional Analysis</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  We don't just look at financial impact. We analyze how your decision affects your career, relationships, health, lifestyle, and time investment - giving you a holistic view.
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Cascade Effect Modeling</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Most tools only show immediate consequences. We trace the ripple effects through three levels of impact, revealing hidden long-term consequences you might miss.
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Interactive Visualizations</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Complex decisions deserve clear visuals. Our flow charts and radar graphs make it easy to understand and compare different paths forward.
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Scenario Planning</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  We show you the best case, most likely case, and worst case scenarios for each option - helping you prepare for uncertainty.
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4 py-8">
            <h2 className="text-3xl font-bold">Ready to Make Better Decisions?</h2>
            <p className="text-muted-foreground">Start analyzing your next big choice today.</p>
            <Link href="/">
              <Button size="lg" className="text-lg px-8">
                <Zap className="h-5 w-5 mr-2" />
                Start Analysis
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>{t('footer.tagline')}</p>
          <p className="mt-2">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}

