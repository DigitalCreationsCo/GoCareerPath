import '../landing.css'
import { CheckSquareIcon, Star, TrendingUp, Users, AlertTriangle, Target } from 'lucide-react';
import { Browser } from '@/components/browser';
import { copyright } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/design-system/Card';

export default async function LandingPage() {
  return (
    <>
      <main className="h-screen min-h-screen overflow-y-scroll bg-gradient-hero text-foreground md:overflow-hidden md:h-auto scroll-smooth snap-y snap-mandatory md:snap-none">
        {/* Hero Section */}
        <section className="relative flex justify-center min-h-screen p-2 bg-gradient-primary-glow md:items-center sm:px-6 lg:px-8 snap-start md:snap-none">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background" />
          <div className="relative max-w-md sm:max-w-[80%] mx-auto text-center space-y-8 animate-slide-up mt-20 md:mt-0">
            <div className="space-y-4 cursor-default md:pt-4">
              <div className="items-center hidden gap-2 px-4 py-2 mb-0 md:inline-flex text-warning">
                <Logo size="md" />
                <p className="text-lg shiny-text">The Upskilling ROI Engine That Pays for Itself</p>
              </div>
              <h1 className="text-5xl leading-tight tracking-tight lg:text-7xl">
                <span className="font-medium text-transparent bg-gradient-primary bg-clip-text">
                  Stop Throwing Millions
                </span>
                <br />
                <span className="block font-medium text-warning">
                  at Training You Can’t Measure
                </span>
              </h1>
              <p className="max-w-2xl mx-auto subtitle">
                Every year, companies spend 2–5% of revenue on learning programs. Most of it disappears into guesswork. GoCareerPath turns your training budget into measurable ROI by analyzing the career conversations your team is already having.
                <br className="hidden md:block" />
                <span className="text-foreground">Measure L&D ROI, identify future leaders, and prevent attrition before it costs you millions.</span> 
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Link href="/sign-up?role=owner" legacyBehavior>
                <Button
                  variant="hero"
                  size="xl"
                  className='w-full max-w-xs'
                >
                  Start Measuring Your Training ROI
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative px-4 pt-20 pb-32 sm:px-6 lg:px-8 bg-gradient-primary-glow snap-start md:snap-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 from-[1%] to-background" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-8 text-center">
            <div>
              <h2 className="mb-3 heading">
                <span className="text-transparent bg-gradient-warning bg-clip-text">
                  Turn Manager Insights Into Hard Dollars
                </span>
              </h2>
              <p className="mx-auto subtitle md:max-w-2xl">
                Your team already talks about careers, skills, and goals. 
                <span className="text-foreground">We transform career coaching conversations and manager observations into data that predicts performance, optimizes training spend, and strengthens your bench.</span>
              </p>
            </div>
            <div className="mt-2">
              <ul className="grid max-w-2xl gap-3 mx-auto mt-5 text-left md:grid-cols-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <TrendingUp className="mt-1 text-success" size={24} />
                  <div>
                    <span className="font-semibold text-foreground">Training ROI Estimates</span>
                    <div>See which programs generate 3x–10x returns — and stop funding the ones that don’t.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="mt-1 text-accent" size={24} />
                  <div>
                    <span className="font-semibold text-foreground">Promotion Readiness Scores</span>
                    <div>Avoid mis-hires and the “Peter Principle.” Promote the right people, faster.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 text-warning" size={24} />
                  <div>
                    <span className="font-semibold text-foreground">Attrition Risk Alerts</span>
                    <div>Prevent top talent from leaving — every avoided flight is $50K–$150K saved.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="mt-1 text-primary" size={24} />
                  <div>
                    <span className="font-semibold text-foreground">Bench Strength Analysis</span>
                    <div>Spot hidden high-potential talent for critical roles. Save $30K+ per internal hire.</div>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/sign-up?role=owner" legacyBehavior>
                  <Button
                  variant="cta"
                  size="xl"
                >
                  See Your Team's ROI Potential
                </Button>
              </Link>
            </div>
            </div>
          </div>
        </section>
        
        <section className="px-4 pt-20 pb-32 sm:px-6 lg:px-8 bg-gradient-to-bl from-background/80 via-muted/20 to-background snap-start md:snap-none">
          <div className="max-w-3xl mx-auto space-y-8 text-center">
            <div className="mt-2">
              <h3 className="mb-2 text-xl text-transparent heading sm:text-2xl bg-gradient-accent bg-clip-text">
                Zero Friction. Maximum Insight.
              </h3>
              <p className="mx-auto subtitle md:max-w-2xl">
                No surveys. No spreadsheets. GoCareerPath pulls intelligence directly from workflow interactions, validated by managers.
              </p>
              <ul className="grid max-w-2xl gap-3 mx-auto mt-5 text-left md:grid-cols-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">⚡</span>
                  <div>
                    <span className="font-semibold text-foreground">Passive Data Capture</span>
                    <div>
                      Automatically extract skills and performance insights from career coaching sessions and manager notes.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🤖</span>
                  <div>
                    <span className="font-semibold text-foreground">AI-modeled Skill Gaps</span>
                    <div>
                      Identify automation risk, skill gaps, and high-potential employees with predictive accuracy.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🛡️</span>
                  <div>
                    <span className="font-semibold text-foreground">Future-Proof Teams</span>
                    <div>
                      Map every role against emerging AI disruption — see which teams are vulnerable today.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🔄</span>
                  <div>
                    <span className="font-semibold text-foreground">Internal Mobility Matching</span>
                    <div>
                      Instantly identify employees ready for promotion, lateral moves, or reskilling — reduce hiring costs and improve retention.
                    </div>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/sign-up?role=owner" legacyBehavior>
                  <Button
                    variant="cta"
                    size="xl"
                  >
                    Start Benchmarking Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Product Features Grid */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-t from-background to-muted snap-start md:snap-none">
          <div className="mx-auto md:max-w-2xl">
            <div className="mb-4 text-center">
              <h2 className="mb-2 heading">
                <span className="text-transparent bg-gradient-accent bg-clip-text">
                  Executive Dashboard: Metrics That Matter
                </span>
              </h2>
              <p className="mx-auto mb-4 subtitle md:max-w-2xl">
                Know exactly where to invest and who will deliver the biggest ROI.
              </p>
            </div>
            <ul className="grid max-w-2xl gap-4 mx-auto text-left md:grid-cols-2">
              <Card className="p-4 hover:border-accent/50">
                <span className='text-2xl'>💰</span>{' '}
                <span className="font-semibold">Who maximizes training investment?</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  Identify high-learning-velocity employees yielding 3x–10x ROI on upskilling.
                </p>
              </Card>
              <Card className="p-4 hover:border-accent/50">
                <span className='text-2xl'>📉</span>{' '}
                <span className="font-semibold">Who is about to leave?</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  Detect disengagement, stagnation, and flight risk before it hits revenue.
                </p>
              </Card>
              <Card className="p-4 hover:border-accent/50">
                <span className='text-2xl'>🚀</span>{' '}
                <span className="font-semibold">Who should lead next?</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  Succession planning based on capability, not tenure — ensure continuity and results.
                </p>
              </Card>
              <Card className="p-4 hover:border-accent/50">
                <span className='text-2xl'>🤖</span>{' '}
                <span className="font-semibold">Where is automation risk highest?</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  Team heatmaps show which functions need immediate reskilling to survive AI disruption.
                </p>
              </Card>
            </ul>
          </div>
        </section>

        {/* Example Report / Preview */}
        <section className="px-4 pt-20 pb-32 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20 snap-start md:snap-none">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center heading">
              <span className="text-transparent bg-gradient-accent bg-clip-text">
              Preview: <span className="italic">Candidate Promotion Assessment</span>
              </span>
            </h2>
            {/* Demo Report */}
            <Browser className="mx-auto lg:w-5xl bg-muted/20">
              <div className="max-w-4xl p-8 mx-auto space-y-8 bg-gradient-card rounded-2xl">
                <div className="flex items-end justify-between pb-4 border-b border-border">
                  <div>
                    <h3 className="flex items-center gap-2 mb-1 text-lg text-primary">
                      <span className='text-2xl'>👤</span> Sarah Chen
                    </h3>
                    <p className="text-muted-foreground">Current: Senior Marketing Manager</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Proposed Role:</p>
                    <p className="font-semibold text-foreground">VP of Growth</p>
                  </div>
                </div>

                <div>
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="py-1 space-y-3 text-sm rounded-lg text-muted-foreground">
                      <div className="flex items-center justify-between p-2 rounded bg-background/40">
                        <span>Readiness Score:</span>
                        <span className="text-lg font-bold text-success">88%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-background/40">
                        <span>Training ROI Potential:</span>
                        <span className="text-lg font-bold text-success">4.5x</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-background/40">
                        <span>Retention Risk:</span>
                        <span className="font-bold text-warning">Medium</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-background/40">
                        <span>Internal Move Savings:</span>
                        <span className="font-bold text-primary">$42,000 vs External Hire</span>
                      </div>
                    </div>

                    <div className="text-muted-foreground">
                      <div className="space-y-3 rounded-lg">
                        <h4 className="mb-1 font-semibold text-accent">Critical Gaps:
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center justify-between">
                            <span className="flex items-center"><CheckSquareIcon className="mr-2 text-muted-foreground" size={ 16 } />• Financial Modeling</span>
                            <span className="text-xs bg-warning/20 text-warning px-2 py-0.5 rounded">- Required</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="flex items-center"><CheckSquareIcon className="mr-2 text-muted-foreground" size={ 16 } />• Team Org Design</span>
                            <span className="text-xs bg-warning/20 text-warning px-2 py-0.5 rounded">- Required</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="flex items-center"><CheckSquareIcon className="mr-2 text-success" size={ 16 } />• Strategic Planning</span>
                            <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded">- Mastered</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="px-4 mb-2 text-sm font-semibold text-muted-foreground">
                    Recommended Action Plan:
                  </p>
                  <ul className="p-4 space-y-2 border rounded-lg bg-gradient-to-r from-blue-500/10 via-sky-400/10 to-purple-500/10 border-blue-500/20">
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">1.</span>
                      <span className="text-foreground">Enroll in "Executive Finance for Marketing Leaders" (4 weeks)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">2.</span>
                      <span className="text-foreground">Assign 6-month mentorship with CFO</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">3.</span>
                      <span className="text-foreground">Re-assess promotion readiness in Q3</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Browser>
            <div className="mt-8 mb-4 text-center">
              <Link href="/sign-up?role=owner" legacyBehavior>
                <Button
                  variant="cta"
                  size="xl"
                >
                  Start Your Analysis
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Social Proof (Condensed for B2B) */}
         <section className="px-4 py-12 sm:px-6 lg:px-8 bg-gradient-card snap-start md:snap-none">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <h2 className="text-xl font-semibold tracking-widest uppercase text-muted-foreground">
              Trusted by Forward-Thinking Leaders
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 mx-auto text-left">
                <p className="mb-4 text-lg italic text-foreground/80">
                  “GoCareerPath made our training spend accountable. $150K saved in recruiting and better promotions in Q1 alone.”  
                </p>
                <p className="font-semibold">VP of People, <span className="font-normal text-muted-foreground">Mid-Market Fintech</span></p>
              </div>

              <div className="p-6 mx-auto text-left">
                <p className="mb-4 text-lg italic text-foreground/80">
                  “Mapped my entire engineering org’s skill gaps in a single afternoon. No friction, full insight.”  
                </p>
                <p className="font-semibold">CTO, <span className="font-normal text-muted-foreground">HealthTech Scale-Up</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/20 to-background snap-start md:snap-none min-h-[50vh] items-center justify-center">
          <div className="flex flex-col items-center justify-center h-full gap-8 m-auto text-center">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold whitespace-pre-line heading text-warning sm:text-4xl">
                Your Training Budget Should Work as Hard as Your People
              </h2>
              <p className="max-w-md mx-auto subtitle md:max-w-2xl">
                Stop wasting budget. Promote the right talent. Retain your top performers. Build a bench that drives measurable growth.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Link href="/sign-up?role=owner" legacyBehavior>
                <Button
                  variant="cta"
                  size="xl"
                >
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-10 sm:px-6 lg:px-8 snap-start md:snap-none bg-muted">
          <div className="max-w-6xl mx-auto text-xs text-center text-muted-foreground">
            <p>{copyright}</p>
          </div>
        </footer>
      </main>
    </>
  );
}
