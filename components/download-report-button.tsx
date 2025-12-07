'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { CareerPathResponse } from '@/lib/types';

type DownloadReportButtonProps = {
  report: CareerPathResponse;
};

export function DownloadReportButton({ report }: DownloadReportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    setLoading(true);
    toast.info('Generating and sending your report. This may take a moment...');
    try {
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report }),
      });

      if (!res.ok) {
        throw new Error('Failed to send PDF report.');
      }

      const result = await res.json();
      toast.success(result.message);
    } catch (e) {
      toast.error('Failed to send PDF report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="link"
      onClick={handleSendEmail}
      className="font-bold text-md"
      disabled={loading}
    >
      {loading ? 'Sending...' : 'Email me this report as a PDF'}
    </Button>
  );
}
