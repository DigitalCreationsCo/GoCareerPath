'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';

type DownloadReportButtonProps = {
  markdownContent: string;
};

export function DownloadReportButton({ markdownContent }: DownloadReportButtonProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loading) {
      setProgress(0);
      const totalMs = 5000;
      const intervalMs = 100;
      const totalSteps = totalMs / intervalMs;
      let currentStep = 0;

      intervalRef.current = setInterval(() => {
        currentStep += 1;
        setProgress(Math.min(100, (currentStep / totalSteps) * 100));
        if (currentStep >= totalSteps) {
          clearInterval(intervalRef.current!);
        }
      }, intervalMs);
    } else {
      setProgress(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loading]);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: markdownContent }),
      });
      if (!res.ok) {
        throw new Error('Failed to generate PDF');
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor to download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (e) {
      alert('Failed to download PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '4px',
            width: '100%',
            zIndex: 10000,
            background: 'rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background:
                'linear-gradient(90deg, #6e96ff 0%, #1ca7ec 100%)',
              transition: 'width 0.1s linear',
            }}
          ></div>
        </div>
      )}
      <Button
        onClick={handleDownload}
        className="bg-primary text-white px-4 py-2 font-bold shadow-lg w-60"
        disabled={loading}
      >
        {loading ? 'Downloading...' : 'Download this report as PDF'}
      </Button>
    </>
  );
}

