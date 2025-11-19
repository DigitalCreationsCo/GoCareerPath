'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mixpanel } from '@/lib/mixpanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [organizationName, setOrganizationName] = useState('');
  const [roles, setRoles] = useState('');
  const [emails, setEmails] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Mixpanel.track('Onboarding Started');
  }, []);

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationName.trim()) {
      setMessage('Please enter an organization name.');
      return;
    }
    setIsLoading(true);
    setMessage('');
    // In a real app, you'd call an API to create the organization.
    // For now, we'll simulate an API call and move to the next step.
    await new Promise(resolve => setTimeout(resolve, 1000));
    Mixpanel.track('Organization Created', { organizationName });
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
        body: JSON.stringify({ emails: emailList, organizationName }),
      });

      if (response.ok) {
        Mixpanel.track('Invitations Sent', { emailCount: emailList.length });
        setMessage('Invitations sent successfully!');
        setEmails('');
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
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] p-4 mx-auto">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <h2 className="mb-2 text-2xl font-semibold">Welcome to GoCareerPath</h2>
              <p className="mb-6 text-muted-foreground">Let's get your organization set up for success.</p>
              <Button onClick={() => setStep(2)} size="lg">Get Started</Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardHeader>
                <CardTitle>Create Your Organization</CardTitle>
                <CardDescription>Tell us a bit about your company.</CardDescription>
              </CardHeader>
              <form onSubmit={handleOrgSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="Your Company, Inc."
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roles">Highly Sought Roles or Vacancies</Label>
                  <Textarea
                    id="roles"
                    value={roles}
                    onChange={(e) => setRoles(e.target.value)}
                    placeholder="e.g., Senior Software Engineer, Product Manager, Data Scientist"
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Organization'}
                </Button>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardHeader>
                <CardTitle>Invite Your Team</CardTitle>
                <CardDescription>
                  Send email invites to your employees so they can complete their 3-minute skill snapshot.
                  You can enter emails separated by commas or paste a list.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emails">Employee Emails</Label>
                  <Textarea
                    id="emails"
                    value={emails}
                    onChange={(e) => setEmails(e.target.value)}
                    placeholder="employee1@example.com, employee2@example.com"
                    rows={5}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Invites'}
                </Button>
              </form>
            </motion.div>
          )}
          {message && <p className="mt-4 text-sm text-center">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
