import { Check, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for individual quick decisions',
      features: [
        '3 analyses per month',
        'Standard AI agents',
        'Basic visualization',
        '7-day history',
      ],
      cta: 'Current Plan',
      variant: 'outline' as const,
    },
    {
      name: 'Pro',
      price: '$19',
      description: 'For professionals and strategic thinkers',
      features: [
        'Unlimited analyses',
        'Advanced Dialectical Agents',
        'Game Theory & Scenario Planning',
        'PDF Export & Sharing',
        'Unlimited history',
        'Priority neural processing',
      ],
      cta: 'Upgrade to Pro',
      variant: 'default' as const,
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom decision frameworks',
        'API access',
        'Dedicated support',
        'SLA guarantees',
      ],
      cta: 'Contact Sales',
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="container py-16 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          Built for serious decisions
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Pricing for decision velocity</h1>
        <p className="text-xl text-muted-foreground">
          Start with quick personal analysis, then scale into report-grade strategy workflows.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={`relative flex flex-col overflow-hidden ${plan.popular ? 'border-primary shadow-lg ring-1 ring-primary/20 scale-105 z-10' : ''}`}>
            {plan.popular && (
              <div className="bg-primary px-4 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                Most Popular for Operators
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold" variant={plan.variant}>
                {plan.name === 'Pro' && <Zap className="h-4 w-4 mr-2 fill-current" />}
                {plan.name === 'Free' && <Sparkles className="h-4 w-4 mr-2" />}
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center pt-12">
        <div className="mx-auto max-w-3xl rounded-lg border bg-muted/30 p-6 text-left">
          <h2 className="font-semibold">What changes when you upgrade?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pro is designed around repeated strategic decisions: persistent history, deeper agent passes, exportable reports, and faster iteration on alternatives.
          </p>
        </div>
      </div>
    </div>
  );
}
