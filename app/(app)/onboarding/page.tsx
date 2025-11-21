'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Mixpanel } from '@/lib/mixpanel';
import { updateTeam } from './actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, User } from 'lucide-react';

export default function OnboardingPage() {
  const [ step, setStep ] = useState(0);
  const [ teamName, setTeamName ] = useState('');
  const [ roles, setRoles ] = useState('');
  const [ emails, setEmails ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const { update } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  useEffect(() => {
    Mixpanel.track('Onboarding Started');
    if (role === 'owner') {
      setStep(2); // Skip to Team Creation
    } else {
      setStep(0); // Show Selection
    }
  }, [role]);

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setMessage('Please enter a team name.');
      return;
    }
    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('teamName', teamName);

    const result = await updateTeam(
      { teamName },
      formData
    );

    if (result?.error) {
      setMessage(result.error);
      setIsLoading(false);
      return;
    }

    await update(); // Update session to include new teamId

    Mixpanel.track('Team Created', { teamName });
    setIsLoading(false);
    setStep(3);
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailList = emails.split(',').map(email => email.trim()).filter(email => email);
    if (emailList.length === 0) {
      setMessage('Please enter at least one valid email.');
      return;
    }
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/invites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails: emailList, teamName }),
      });

      if (response.ok) {
        Mixpanel.track('Invitations Sent', { emailCount: emailList.length });
        setMessage('Invitations sent successfully!');
        setEmails('');
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to send invitations.'}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative container flex items-center justify-center min-h-[calc(100vh-8rem)] p-4 mx-auto">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="mb-0! text-transparent heading bg-gradient-accent bg-clip-text">
            {step === 0 ? 'Welcome to GoCareerPath' : 'Onboarding'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          { step === 0 && (
            <motion.div
              initial={ { opacity: 0, y: 20 } }
              animate={ { opacity: 1, y: 0 } }
              transition={ { duration: 0.7 } }
              className="space-y-8 text-center"
            >
              <div>
                <h2 className="subtext">How are you using GoCareerPath?</h2>
                <p className="subtext">Choose the option that best describes you.</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card
                  className="flex flex-col items-center p-6 cursor-pointer hover:border-primary/50 hover:bg-primary/10"
                  onClick={() => router.push('/chat')}
                >
                  <div className="p-3 mb-4 transition-transform rounded-full text-primary bg-primary/20 group-hover:scale-110">
                    <User size={32} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">For Myself</h3>
                  <p className="text-sm text-muted-foreground">I want personalized career advice and upskilling.</p>
                </Card>

                <Card
                  className="flex flex-col items-center p-6 cursor-pointer hover:border-primary/50 hover:bg-primary/10"
                  onClick={() => setStep(2)}
                >
                  <div className="p-3 mb-4 text-blue-500 transition-transform rounded-full bg-primary/20 group-hover:scale-110">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">For My Team</h3>
                  <p className="text-sm text-muted-foreground">I want to manage skills and career paths for my employees.</p>
                </Card>
              </div>
            </motion.div>
          ) }

          { step === 1 && (
             // Deprecated step, but keeping logic just in case fallback is needed
            <motion.div
              initial={ { opacity: 0, y: 20 } }
              animate={ { opacity: 1, y: 0 } }
              transition={ { duration: 0.7 } }
              className="space-y-8 text-center"
            >
              <div>
                <h2 className="subtitle">Welcome to GoCareerPath.</h2>
                <p className="subtitle">Let's get your organization set up for success.</p>
              </div>
              <Button onClick={ () => setStep(2) } size="lg" variant="cta">Get Started</Button>
            </motion.div>
          ) }

          { step === 2 && (
            <motion.div
              initial={ { opacity: 0, x: -30 } }
              animate={ { opacity: 1, x: 0 } }
              transition={ { duration: 0.5 } }
            >
              <CardHeader className='px-0'>
                <CardTitle>Create Your Team</CardTitle>
                <CardDescription>Tell us about your team.</CardDescription>
              </CardHeader>
              <form onSubmit={ handleTeamSubmit } className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    type="text"
                    value={ teamName }
                    onChange={ (e) => setTeamName(e.target.value) }
                    placeholder="Your Team Name"
                    required
                    disabled={ isLoading }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roles">Highly Sought Roles or Vacancies</Label>
                  <Textarea
                    id="roles"
                    value={ roles }
                    onChange={ (e) => setRoles(e.target.value) }
                    placeholder="e.g., Senior Software Engineer, Product Manager, Data Scientist"
                    disabled={ isLoading }
                  />
                </div>
                <div className="place-items-center">
                  <Button type="submit" variant="cta" disabled={ isLoading }>
                    { isLoading ? 'Creating...' : 'Create Team' }
                  </Button>
                </div>
              </form>
            </motion.div>
          ) }

          { step === 3 && (
            <motion.div
              initial={ { opacity: 0, x: 30 } }
              animate={ { opacity: 1, x: 0 } }
              transition={ { duration: 0.5 } }
            >
              <CardHeader className='px-0'>
                <CardTitle>Invite Your Team</CardTitle>
                <CardDescription>
                  Send email invites to your employees so they can complete their 3-minute skill snapshot.
                  You can enter emails separated by commas or paste a list.
                </CardDescription>
              </CardHeader>
              <form onSubmit={ handleInviteSubmit } className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emails">Employee Emails</Label>
                  <Textarea
                    id="emails"
                    value={ emails }
                    onChange={ (e) => setEmails(e.target.value) }
                    placeholder="employee1@example.com, employee2@example.com"
                    rows={ 5 }
                    required
                    disabled={ isLoading }
                  />
                </div>
                <Button type="submit" variant="cta" disabled={ isLoading }>
                  { isLoading ? 'Sending...' : 'Send Invites' }
                </Button>
              </form>
            </motion.div>
          ) }
          { message && <p className="mt-4 text-sm text-center subtext">{ message }</p> }
        </CardContent>
      </Card>
    </div>
  );
}
