import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { auth } from '@/auth';
import { FullReport } from '@/components/report/full-report';
import { ReportEmail } from '@/components/emails/report-email/report-email';
import { CareerPathResponseSchema } from '@/lib/zod-schemas';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import React from 'react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 40;

const resend = new Resend(process.env.RESEND_API_KEY);

async function getBrowser() {
    if (process.env.VERCEL_ENV) {
        const exePath = await chromium.executablePath();
        return puppeteer.launch({
            args: chromium.args,
            executablePath: exePath,
            headless: true,
        });
    } else {
        const puppeteer = await import('puppeteer');
        return puppeteer.launch({ headless: true });
    }
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let browser;
    try {
        const body = await req.json();
        const reportData = CareerPathResponseSchema.parse(body.report);

        const ReactDOMServer = (await import('react-dom/server')).default
        const reportHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(FullReport, { report: reportData }));

        browser = await getBrowser();
        const page = await browser.newPage();
        await page.setContent(reportHtml, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();

        const emailHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(ReportEmail, { markdownContent: "" }));

        await resend.emails.send({
            from: 'GoCareerPath <noreply@gocareerpath.com>',
            to: session.user.email,
            subject: 'Your Career Path Report is Ready',
            html: emailHtml,
            attachments: [
                {
                    filename: 'career-path-report.pdf',
                    content: pdfBuffer as Buffer,
                },
            ],
        });

        return NextResponse.json({ message: 'PDF generated and sent successfully.' });
    } catch (error: any) {
        if (browser) await browser.close();
        console.error('PDF generation error:', error);
        return NextResponse.json({ error: 'Failed to generate and send PDF.' }, { status: 500 });
    }
}
