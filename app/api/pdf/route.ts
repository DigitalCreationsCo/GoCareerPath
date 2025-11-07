import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { marked } from 'marked';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 40;

// GitHub-like CSS styling
const getHTMLTemplate = (content: string, title: string = 'Document') => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #24292f;
      background-color: #ffffff;
      max-width: 980px;
      margin: 0 auto;
      padding: 45px;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
    }
    h1 {
      font-size: 2em;
      border-bottom: 1px solid #d0d7de;
      padding-bottom: 0.3em;
    }
    h2 {
      font-size: 1.5em;
      border-bottom: 1px solid #d0d7de;
      padding-bottom: 0.3em;
    }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1em; }
    h5 { font-size: 0.875em; }
    h6 { font-size: 0.85em; color: #57606a; }
    
    p { margin-top: 0; margin-bottom: 16px; }
    
    a {
      color: #0969da;
      text-decoration: none;
    }
    a:hover { text-decoration: underline; }
    
    code {
      background-color: rgba(175,184,193,0.2);
      padding: 0.2em 0.4em;
      border-radius: 6px;
      font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
      font-size: 85%;
    }
    
    pre {
      background-color: #f6f8fa;
      border-radius: 6px;
      padding: 16px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
    }
    pre code {
      background-color: transparent;
      padding: 0;
      border-radius: 0;
    }
    
    blockquote {
      padding: 0 1em;
      color: #57606a;
      border-left: 0.25em solid #d0d7de;
      margin: 0 0 16px 0;
    }
    
    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 16px;
    }
    th, td {
      padding: 6px 13px;
      border: 1px solid #d0d7de;
    }
    th {
      font-weight: 600;
      background-color: #f6f8fa;
    }
    tr:nth-child(2n) {
      background-color: #f6f8fa;
    }
    
    ul, ol {
      padding-left: 2em;
      margin-top: 0;
      margin-bottom: 16px;
    }
    
    img {
      max-width: 100%;
      box-sizing: border-box;
    }
    
    hr {
      height: 0.25em;
      padding: 0;
      margin: 24px 0;
      background-color: #d0d7de;
      border: 0;
    }

    /* Table of Contents */
    .toc {
      background-color: #f6f8fa;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .toc h2 {
      margin-top: 0;
      border-bottom: none;
      font-size: 1.25em;
    }
    .toc ul {
      list-style: none;
      padding-left: 0;
    }
    .toc ul ul {
      padding-left: 20px;
    }
    .toc a {
      color: #0969da;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
`;

// Generate table of contents from markdown
const generateTOC = (html: string): string => {
  const headingRegex = /<h([1-3])[^>]*>(.*?)<\/h\1>/gi;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, ''); // Strip HTML tags
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ level, text, id });
  }

  if (headings.length === 0) return '';

  let toc = '<div class="toc"><h2>Table of Contents</h2><ul>';
  let currentLevel = 1;

  headings.forEach((heading) => {
    while (currentLevel < heading.level) {
      toc += '<ul>';
      currentLevel++;
    }
    while (currentLevel > heading.level) {
      toc += '</ul>';
      currentLevel--;
    }
    toc += `<li><a href="#${heading.id}">${heading.text}</a></li>`;
  });

  while (currentLevel > 1) {
    toc += '</ul>';
    currentLevel--;
  }
  toc += '</ul></div>';

  return toc;
};

// Add IDs to headings for TOC links
const addHeadingIds = (html: string): string => {
  return html.replace(/<h([1-3])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
    const plainText = text.replace(/<[^>]*>/g, '');
    const id = plainText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
};

export async function POST(req: NextRequest) {
  let browser;

  try {
    const body = await req.json();
    const markdown = body.markdown as string | undefined;
    const includeTOC = body.toc !== false; // Default to true

    if (!markdown) {
      return NextResponse.json(
        { error: 'Markdown content is required.' },
        { status: 400 }
      );
    }

    // Convert markdown to HTML
    const rawHtml = await marked.parse(markdown);
    const htmlWithIds = addHeadingIds(rawHtml);
    const toc = includeTOC ? generateTOC(htmlWithIds) : '';
    const finalHtml = toc + htmlWithIds;
    const fullHtml = getHTMLTemplate(finalHtml);

    // Launch browser with serverless chromium
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '30mm',
        right: '20mm',
        bottom: '30mm',
        left: '20mm',
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; margin: 0 20mm;">
          <span class="title"></span>
          <span class="date" style="margin-left: 10px;"></span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });

    await browser.close();

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report-${crypto.randomBytes(4).toString('hex')}.pdf"`,
      },
    });
  } catch (error: any) {
    if (browser) {
      try {
        await browser.close();
      } catch {}
    }
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: error?.message || 'Unexpected error during PDF generation.' },
      { status: 500 }
    );
  }
}