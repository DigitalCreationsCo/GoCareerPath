'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mixpanel } from '@/lib/mixpanel';
import { updateTeam } from './actions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function OnboardingPage() {
  const [ step, setStep ] = useState(1);
  const [ teamName, setTeamName ] = useState('');
  const [ roles, setRoles ] = useState('');
  const [ emails, setEmails ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Mixpanel.track('Onboarding Started');
  }, []);

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
          <CardTitle className="mb-0! text-transparent heading bg-gradient-accent bg-clip-text">Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          { step === 1 && (
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
