import './landing.css'
import { Badge, CheckSquareIcon, SparkleIcon, Star } from 'lucide-react';
import { Browser } from '@/components/browser';
import { copyright, dateJobsDisplaced, numJobsDisplaced } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function LandingPage() {
  const isPurchaseable = process.env.NEXT_PUBLIC_IS_REPORT_PURCHASABLE || true;

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
                <p className="text-lg shiny-text">{ `AI is eliminating over ${numJobsDisplaced} jobs by ${dateJobsDisplaced}.\nYour next step determines whether you stay ahead—or fall behind.` }</p>
              </div>
              <h1 className="text-5xl leading-tight tracking-tight lg:text-7xl">
                <span className="font-medium text-transparent bg-gradient-primary bg-clip-text">
                  Future-Proof Your Career
                </span>
                <br />
                <span className="block font-medium text-success">
                  in the AI Economy
                </span>
              </h1>
              <p className="max-w-2xl text-base! mx-auto subtitle">
                Join <span className="text-accent">1,000+ professionals</span> using GoCareerPath. Get <span className='text-foreground'>4 high-paying, AI-resistant roles</span> you can transition into using skills you already have.
              </p>
            </div>
            <div className="flex flex-col items-center">
              { isPurchaseable && (
                <div className="space-y-2">
                  <p className="text-base subtext font-medium">Start today: $29 <span className="line-through">  $99</span> one-time</p>
                  <p className="heading text-muted-foreground font-[Outfit]">Save <span className="text-success">70% </span><span className="text-muted-foreground">(limited time)</span></p>
                </div>
              ) }
              <Link href="/sign-up" legacyBehavior>
                <Button
                  variant="hero"
                  size="xl"
                  className='w-full relative py-4 max-w-sm'
                >
                  <div className='z-10'>{ isPurchaseable && `Get 4 AI-resistant roles for $29 (one-time)` || `Get My Career Path Report` }</div>
                  {/* <Badge className="absolute stroke-warning stroke-2 fill-destructive right-9 bottom-0" size={ 80 } /> */ }
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative px-4 pt-20 pb-32 sm:px-6 lg:px-20 bg-gradient-primary-glow snap-start md:snap-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 from-[1%] to-background" />
          <div className="relative z-10 max-w-3xl lg:max-w-full mx-auto space-y-8 text-center">
            <div>
              <h2 className="mb-3 heading">
                <span className="text-transparent bg-gradient-warning bg-clip-text">
                  A Clear Path Forward—Built For You
                </span>
              </h2>
              <p className="mx-auto subtitle md:max-w-2xl text-foreground">
                Automation is ready to change the world by redefining every job. <span className="text-muted-foreground">Adapting quickly is how you stay relevant in the new job market, secure higher income, and protect your future. </span>
              </p>
            </div>
            <div className="mt-2">
              <h3 className="mb-2 text-xl heading sm:text-2xl">
                How Your Career Path Report Is <span className="text-accent">Personalized</span>
              </h3>
              <ul className="grid max-w-2xl border lg:max-w-full gap-3 mx-auto mt-5 text-left md:grid-cols-2 lg:grid-cols-5 text-muted-foreground">
                <li className="flex lg:flex-col items-start gap-3">
                  <span className="mt-1 text-lg">🌎</span>
                  <div>
                    <span className="text-foreground">Location</span>
                    <div>Find roles growing in your region or country—faster interviews, fewer dead ends.</div>
                  </div>
                </li>
                <li className="flex lg:flex-col items-start gap-3">
                  <span className="mt-1 text-lg lg:text-4xl">🎓</span>
                  <div>
                    <span className="text-foreground">Experience Level</span>
                    <div>Match into realistic, in-demand roles that align with your background.</div>
                  </div>
                </li>
                <li className="flex lg:flex-col items-start gap-3">
                  <span className="mt-1 text-lg lg:text-4xl">🛠️</span>
                  <div>
                    <span className="text-foreground">Transferable Skills</span>
                    <div>Understand exactly how your current skills translate into stronger opportunities.</div>
                  </div>
                </li>
                <li className="flex lg:flex-col items-start gap-3">
                  <span className="mt-1 text-lg lg:text-4xl">💰</span>
                  <div>
                    <span className="text-foreground">Salary Goals</span>
                    <div>Explore career paths that meet or exceed your earning targets.</div>
                  </div>
                </li>
                <li className="flex lg:flex-col items-start gap-3 md:col-span-2 lg:col-span-1">
                  <span className="mt-1 text-lg lg:text-4xl">🎯</span>
                  <div>
                    <span className="text-foreground">Personal Ambitions</span>
                    <div>Your interests, strengths, and timeline inform every recommendation.</div>
                  </div>
                </li>
              </ul>
              <div className="mt-8 space-y-6">
                <p className="mx-auto subtitle md:max-w-2xl">
                  Your report is custom-built—no generic templates. Pivot with confidence.
                </p>
                <Link href="/sign-up" legacyBehavior>
                  <Button
                  variant="cta"
                  size="xl"
                >
                    { isPurchaseable && `Unlock All 4 Career Paths – Get My Complete Report ($29)` || `Unlock All 4 Career Paths – Get My Complete Report` }
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
                Why Personalization Matters
              </h3>
              <p className="mx-auto subtitle md:max-w-2xl">
                A personalized career report saves months of uncertainty and helps you pivot efficiently into work that stays strong in the AI era.
              </p>
              <ul className="grid max-w-2xl gap-4 mx-auto mt-5 text-left md:grid-cols-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">⚡</span>
                  <div>
                    <span className="text-foreground">Avoid High-Risk Roles</span>
                    <div>
                      Spot your exposure to automation and get safer, more resilient options.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🚀</span>
                  <div>
                    <span className="text-foreground">Step-by-Step Action Plan</span>
                    <div>
                      Know what to learn, what to ignore, and what to do first.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🔒</span>
                  <div>
                    <span className="text-foreground">Increase Career Stability</span>
                    <div>The right role today protects you from displacement tomorrow.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🎯</span>
                  <div>
                    <span className="text-foreground">Skip Guesswork</span>
                    <div>Move forward with clarity, direction, and evidence-backed paths.</div>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/sign-up" legacyBehavior>
                  <Button
                    variant="cta"
                    size="xl"
                  >
                    Start My Personalized Career Report
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Product Features / What's Included */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-t from-background to-muted snap-start md:snap-none">
          <div className="mx-auto md:max-w-2xl">
            <div className="mb-4 text-center">
              <h2 className="mb-2 heading">
                <span className="text-transparent bg-gradient-accent bg-clip-text">
                  What's Inside
                </span>
              </h2>
              <p className="mx-auto mb-4 subtitle md:max-w-2xl">
                Every personalized Career Path Report includes:
              </p>
            </div>
            <ul className="grid max-w-2xl gap-4 mx-auto text-left md:grid-cols-2">
              <li className="p-4 transition rounded-lg hover:bg-gradient-to-r hover:from-pink-200/40 hover:to-blue-100/30">
                <span className='text-2xl'>🎯</span>{' '}
                <span>Custom Career Strategy</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  A structured roadmap showing how to transition into 4 AI-resistant roles.
                </p>
              </li>
              <li className="p-4 transition rounded-lg hover:bg-gradient-to-l hover:from-indigo-200/30 hover:to-purple-100/30">
                <span className='text-2xl'>📚</span>{' '}
                <span>Skills Gap Analysis</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  Identify the exact skills you must strengthen with time estimates to complete them.
                </p>
              </li>
              <li className="p-4 transition rounded-lg hover:bg-gradient-to-r hover:from-green-200/20 hover:to-blue-100/20">
                <span className='text-2xl'>🚀</span>{' '}
                <span>30-Day Sprint</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  A daily mini-action plan that builds confidence and progress quickly.
                </p>
              </li>
              <li className="p-4 transition rounded-lg hover:bg-gradient-to-l hover:from-yellow-100/40 hover:to-pink-100/20">
                <span className='text-2xl'>💼</span>{' '}
                <span>Hiring Scripts & Outreach Templates</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  Messages designed to help you secure interviews faster and negotiate stronger offers.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Example Report */}
        <section className="px-4 pt-20 pb-32 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20 snap-start md:snap-none">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 heading">
              <span className="text-transparent bg-gradient-accent bg-clip-text">
              Example Preview: <span className="italic">Marketing Director → AI-Ready Career</span>
              </span>
            </h2>
            {/* Demo Report */}
            <Browser className="mx-auto lg:w-5xl bg-muted/20">
              <div className="max-w-4xl p-8 mx-auto space-y-8 bg-gradient-card rounded-2xl">
                <div className="pb-4 border-b border-border">
                  <h3 className="flex items-center gap-2 mb-2 text-lg text-muted-foreground">
                    <span className='text-2xl'>🎯</span> Recommended Path #1: Revenue Operations Director
                  </h3>
                </div>

                <div>
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="py-1 space-y-1 text-sm rounded-lg text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Salary Range:</span>
                        <span className="text-success">$75K–$120K</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Automation Risk:</span>
                        <span className="text-success">Low (15%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Skill Transfer:</span>
                        <span className="text-primary">85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Pivot Time:</span>
                        <span className="text-primary">3–4 months</span>
                      </div>
                    </div>

                    <div className="text-muted-foreground">
                      <div className="space-y-3 rounded-lg">
                        <h4 className="mb-1 text-accent">
                          <span className='text-xl'>📚</span> Skills Gap Analysis
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center">
                            <CheckSquareIcon className="mr-2 text-success" size={16} />
                            Salesforce Admin (40 hrs)
                          </li>
                          <li className="flex items-center">
                            <CheckSquareIcon className="mr-2 text-success" size={16} />
                            HubSpot Revenue Ops (20 hrs)
                          </li>
                          <li className="flex items-center">
                            <CheckSquareIcon className="mr-2 text-success" size={16} />
                            SQL for Analytics (30 hrs)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="px-4 mb-2 text-sm text-muted-foreground">
                    Your personalized plan includes:
                  </p>
                  <ul className="p-4 space-y-2 border rounded-lg bg-gradient-to-r from-blue-500/10 via-sky-400/10 to-purple-500/10 border-blue-500/20">
                    <li>
                      <span className="text-muted-foreground">- A focused 30-day sprint</span>
                    </li>
                    <li>
                      <span className="text-muted-foreground">- Optimized LinkedIn update steps</span>
                    </li>
                    <li>
                      <span className="text-muted-foreground">- Hiring manager outreach templates</span>
                    </li>
                    <li>
                      <span className="text-muted-foreground">- Salary negotiation scripts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Browser>
            <div className="mt-8 mb-4 text-center">
              <p className="w-full max-w-lg mx-auto my-8 text-muted-foreground">
                Discover <span className="text-accent">4 high-paying, AI-resistant paths just like this</span>——tailored to you.
              </p>
              <Link href="/sign-up" legacyBehavior>
                <Button
                  variant="cta"
                  size="xl"
                >
                  { isPurchaseable && `Unlock All 4 Career Paths – Get My Complete Report for $29` || `Unlock All 4 Career Paths – Get My Complete Report` }
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Social Proof (Testimonials) */}
        {/* <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-gradient-card to-indigo-50 snap-start md:snap-none"> */}
        {/* <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-card snap-start md:snap-none">
          <div className="max-w-4xl mx-auto space-y-10 text-center">
            <h2 className="text-transparent heading bg-gradient-primary bg-clip-text">
              Join 1,000+ Professionals Who've Already AI-Proofed Their Careers
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="max-w-md p-6 mx-auto bg-gradient-card rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="mr-1 text-yellow-400" size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-4 italic text-muted-foreground">
                “The career path report gave me total clarity, and got me moving immediately. Today I'm earning $95K in cybersecurity.”
                </p>
                <p>Sarah Chen<br /><span className="text-sm text-muted-foreground">Cybersecurity Analyst</span></p>
              </div>

              <div className="max-w-md p-6 mx-auto bg-muted/30 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="mr-1 text-yellow-400" size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-4 italic text-muted-foreground">
                  “The skills gap analysis was spot-on.  I went from technical support to a RevOps role in just 4 months using the report.”
                </p>
                <p>Marcus Rodriguez<br /><span className="text-sm text-muted-foreground">Revenue Operations Manager</span></p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Final CTA */}
        <section className="flex py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/20 to-background snap-start md:snap-none min-h-[70vh] items-center justify-center">
        {/* <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-tl from-muted/30 via-pink-100/50 to-background snap-start md:snap-none"> */}
          <div className="flex flex-col items-center justify-center h-full gap-8 m-auto text-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold whitespace-pre-line heading text-warning sm:text-3xl">Take Control Before AI Changes Your Options. 
              </h2>
              <p className="max-w-xs mx-auto subtitle sm:max-w-md md:max-w-2xl">
                { `⚠️ ${numJobsDisplaced} jobs will be displaced by ${dateJobsDisplaced}. The safest move is a strategic one—into a high-paying, future-proof role. \n
                Take the right step toward a secure future today.`}
              </p>
            </div>
            <div className="flex flex-col items-center">
              { isPurchaseable && (
                <div className="space-y-2">
                  <p className="text-base subtext font-medium">Launch Special: $29 <span className="line-through">  $99</span> one-time</p>
                  <p className="heading text-muted-foreground font-[Outfit]">Save <span className="text-success">70% </span>today <span className="text-muted-foreground">(limited time)</span></p>
                </div>
              ) }
              <Link href="/sign-up" legacyBehavior>
                <Button
                  variant="cta"
                  size="xl"
                >
                  Get My Career Path Report ($29)
                </Button>
              </Link>
              { isPurchaseable && (
                <div className="text-xs text-red-400 mt-2">
                  Instant digital access. All sales are final.
                </div>
              ) }
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