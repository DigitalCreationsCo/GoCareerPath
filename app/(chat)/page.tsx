import './landing.css'
import { CheckSquareIcon, Star } from 'lucide-react';
import { Browser } from '@/components/browser';
import { copyright, dateJobsDisplaced, numJobsDisplaced } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button/button';
import Link from 'next/link';

export default async function LandingPage() {
  return (
    <>
      <main className="h-screen min-h-screen overflow-y-scroll bg-gradient-hero text-foreground md:overflow-hidden md:h-auto scroll-smooth snap-y snap-mandatory md:snap-none">
        {/* Hero Section */}
        <section className="relative flex justify-center min-h-screen p-2 bg-gradient-primary-glow md:items-center sm:px-6 lg:px-8 snap-start md:snap-none">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background" />
          <div className="relative z-10 max-w-md sm:max-w-[80%] mx-auto text-center space-y-8 animate-slide-up mt-20 md:mt-0">
            <div className="space-y-4 md:pt-4">
              <div className="items-center hidden gap-2 px-4 py-2 mb-0 md:inline-flex text-warning">
                <Logo size="md" />
                <p className="text-lg shiny-text">{`AI is eliminating over ${numJobsDisplaced} jobs by ${dateJobsDisplaced} — Are you prepared?`}</p>
              </div>
              <h1 className="text-5xl leading-tight tracking-tight lg:text-7xl">
                <span className="font-medium text-transparent bg-gradient-primary bg-clip-text">
                  AI-Proof Your Career
                </span>
                <br />
                <span className="block font-medium text-warning">
                  Before It’s Too Late
                </span>
              </h1>
              <p className="max-w-2xl mx-auto subtitle">
                Get your <span className="text-foreground">personalized Career Path Report</span>—discover <span className='text-foreground'>4 high-paying, AI-resistant roles</span> you can thrive in using skills you already have.<br /><br />
                <span className="text-base subtext">
                  Join <span className="text-accent">1,000+ professionals</span> future-proofing their careers in the AI economy.
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Link href="/sign-up" legacyBehavior>
                <Button
                  variant="cta"
                  size="xl"
                  className="items-center w-full max-w-xs text-background"
                >
                  Get My Career Path Report
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
                  Why Upskilling Matters Now
                </span>
              </h2>
              <p className="mx-auto subtitle md:max-w-2xl">
                The world of work is changing faster than ever—<span className="text-foreground">waiting to adapt means falling behind.</span> Upskilling today is your best defense against job displacement, and your smartest move for a secure, fulfilling future.
              </p>
            </div>
            <div className="mt-2">
              <h3 className="mb-2 text-xl heading sm:text-2xl">
                How Your Career Path Report Is <span className="text-accent">Personalized</span>
              </h3>
              <p className="mx-auto subtitle md:max-w-2xl">
                Your career isn’t generic—your roadmap shouldn’t be either. We personalize your Career Path Report using your <span className="text-foreground">location, experience, skills, and salary goals</span> to show you real opportunities you can pursue with confidence.
              </p>
              <ul className="grid max-w-2xl gap-3 mx-auto mt-5 text-left md:grid-cols-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🌎</span>
                  <div>
                    <span className="text-foreground">Your Geography</span>
                    <div>Spot roles and industries hiring in your area for faster job placement.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🎓</span>
                  <div>
                    <span className="text-foreground">Your Experience</span>
                    <div>See which in-demand careers match your current level—skip entry-level job boards.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🛠️</span>
                  <div>
                    <span className="text-foreground">Transferable Skills</span>
                    <div>Leverage what you already know. Pivot with less time, cost, and risk.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">💰</span>
                  <div>
                    <span className="text-foreground">Salary Target</span>
                    <div>Zero in on career paths that actually match your earning goals.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 md:col-span-2">
                  <span className="mt-1 text-lg">⚡</span>
                  <div>
                    <span className="text-foreground">Plus Your Unique Ambitions</span>
                    <div>Your aspirations, strengths, and timeline are the blueprint for your plan.</div>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/sign-up" legacyBehavior>
                  <Button
                  variant="cta"
                  size="xl"
                  className="max-w-md mx-auto break-words whitespace-normal text-background"
                >
                  Unlock All 4 Career Paths – Get My Complete Report
                </Button>
              </Link>
            </div>
            </div>
          </div>
        </section>
        
        <section className="px-4 pt-20 pb-32 sm:px-6 lg:px-8 bg-gradient-to-bl from-background/80 from-accent/10 via-muted/20 to-background snap-start md:snap-none">
          <div className="max-w-3xl mx-auto space-y-8 text-center">
            <div className="mt-2">
              <h3 className="mb-2 text-xl text-transparent heading sm:text-2xl bg-gradient-accent bg-clip-text">
                Why A Personalized Approach Is Best
              </h3>
              <p className="mx-auto subtitle md:max-w-2xl">
              A personalized career report helps you avoid mistakes, save time, and earn more by showing you the fastest, best-fit career paths.
              </p>
              <ul className="grid max-w-2xl gap-3 mx-auto mt-5 text-left md:grid-cols-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">⚡</span>
                  <div>
                    <span className="text-foreground">Outpace AI Disruption</span>
                    <div>
                      Identify and avoid roles most at risk—pivot with confidence into resilient careers.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🚀</span>
                  <div>
                    <span className="text-foreground">Get a Step-by-Step Plan</span>
                    <div>
                      Move from uncertainty to momentum, starting on day one.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🔒</span>
                  <div>
                    <span className="text-foreground">Invest In A Secure Path</span>
                    <div>The right upskilling today shields you from displacement tomorrow.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-lg">🎯</span>
                  <div>
                    <span className="text-foreground">No More Guesswork</span>
                    <div>Skip wasted months—get clarity on skills that actually matter for your goals.</div>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/sign-up" legacyBehavior>
                  <Button
                    variant="cta"
                    size="xl"
                    className="w-full max-w-sm mx-auto text-background"
                  >
                    Start My Personalized Career Report
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Product Features / What's Included */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-t from-background to-muted/20 snap-start md:snap-none">
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
                <span>Custom Strategy Plan</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  A step-by-step roadmap to pivot into resilient roles that fit your background.
                </p>
              </li>
              <li className="p-4 transition rounded-lg hover:bg-gradient-to-l hover:from-indigo-200/30 hover:to-purple-100/30">
                <span className='text-2xl'>📚</span>{' '}
                <span>Skills Gap Analysis</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  See exactly which skills to upgrade (and which to skip)—no wasted time or money.
                </p>
              </li>
              <li className="p-4 transition rounded-lg hover:bg-gradient-to-r hover:from-green-200/20 hover:to-blue-100/20">
                <span className='text-2xl'>🚀</span>{' '}
                <span>30-Day Sprint</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  Compact, daily action plan for rapid momentum—start moving day one.
                </p>
              </li>
              <li className="p-4 transition rounded-lg hover:bg-gradient-to-l hover:from-yellow-100/40 hover:to-pink-100/20">
                <span className='text-2xl'>💼</span>{' '}
                <span>Offer-Getting Scripts</span>
                <p className="mt-1 ml-1 text-muted-foreground">
                  Outreach templates and salary scripts designed to help land interviews and increase offers.
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
              Preview: <span className="italic">Marketing Director → AI-Ready Career</span>
              </span>
            </h2>
            {/* Demo Report */}
            <Browser className="mx-auto lg:w-5xl bg-muted/20">
              <div className="max-w-4xl p-8 mx-auto space-y-8 bg-gradient-card rounded-2xl">
                <div className="pb-4 border-b border-border">
                  <h3 className="flex items-center gap-2 mb-2 text-lg text-primary">
                    <span className='text-2xl'>🎯</span> AI-Resistant Path #1
                  </h3>
                  <p className="text-muted-foreground ">Revenue Operations Director</p>
                </div>

                <div>
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="py-1 space-y-1 text-sm rounded-lg text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Salary Range:</span>
                        <span className="text-success">$75K - $120K</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Automation Risk:</span>
                        <span className="text-success">Low (15%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transferability:</span>
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
                            Salesforce Admin Cert (40 hrs)
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
                    Your custom plan includes:
                  </p>
                  <ul className="p-4 space-y-2 border rounded-lg bg-gradient-to-r from-blue-500/10 via-sky-400/10 to-purple-500/10 border-blue-500/20">
                    <li>
                      <span className="text-muted-foreground">- 30-Day Sprint:</span>
                    </li>
                    <li>
                      <span className="text-muted-foreground">- Week 1: Complete Salesforce training, Update LinkedIn, Reach out to hiring managers...)</span>
                    </li>
                    <li>
                      <span className="text-muted-foreground">- Outreach templates</span>
                    </li>
                    <li>
                      <span className="text-muted-foreground">- Salary negotiation scripts</span>
                    </li>
                    <li>
                      <span className="text-muted-foreground">- More practical, actionable tools</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Browser>
            <div className="mt-8 mb-4 text-center">
              <p className="w-full max-w-lg mx-auto my-8 text-muted-foreground">
              Discover <span className="text-accent">4 high-paying, AI-resistant career paths</span> tailored to you.
              </p>
              <Link href="/sign-up" legacyBehavior>
                <Button
                  variant="cta"
                  size="xl"
                  className="max-w-md mx-auto break-words whitespace-normal text-background"
                >
                  Unlock All 4 Career Paths – Get My Complete Report
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
              <h2 className="text-2xl font-semibold whitespace-pre-line heading text-warning sm:text-3xl">⚠️ {numJobsDisplaced} jobs will be displaced by {dateJobsDisplaced}
              </h2>
              <p className="max-w-xs mx-auto subtitle sm:max-w-md md:max-w-2xl">
              Don’t wait and get left behind. Land a high-paying, resilient job that matches your current skills—take the first step toward a secure, fulfilling career today.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Link href="/sign-up" legacyBehavior>
                <Button
                  variant="cta"
                  size="xl"
                  className="items-center w-full max-w-xs text-background"
                >
                  Get My Career Path Report
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-10 sm:px-6 lg:px-8 snap-start md:snap-none">
          <div className="max-w-6xl mx-auto text-xs text-center text-muted-foreground">
            <p>{copyright}</p>
          </div>
        </footer>
      </main>
    </>
  );
}