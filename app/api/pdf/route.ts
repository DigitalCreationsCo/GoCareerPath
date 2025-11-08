import { NextRequest, NextResponse } from 'next/server';
import { marked } from 'marked';
import crypto from 'crypto';
import fs from 'fs/promises';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 40;

/**
 * Inspect the executable file for debugging purposes
 */
async function inspectExecutable(filePath: string) {
  try {
    const stat = await fs.stat(filePath);
    const mode = stat.mode;
    const size = stat.size;
    
    // Read first 8 bytes to verify it's a valid binary
    const fd = await fs.open(filePath, 'r');
    const { buffer } = await fd.read(Buffer.alloc(8), 0, 8, 0);
    await fd.close();
    const firstBytesHex = Buffer.from(buffer).toString('hex');
    
    return { exists: true, mode, size, firstBytesHex, isExecutable: (mode & 0o111) !== 0 };
  } catch (err: any) {
    return { exists: false, error: err.message || String(err) };
  }
}

/**
 * Ensure the chromium binary has executable permissions
 */
async function ensureExecutablePermissions(exePath: string) {
  const inspect = await inspectExecutable(exePath);
  
  console.log('Chromium executable inspection:', {
    path: exePath,
    platform: process.platform,
    arch: process.arch,
    ...inspect
  });

  if (!inspect.exists) {
    throw new Error(`Chromium binary not found at path: ${exePath}`);
  }

  if (inspect.isExecutable === false) {
    try {
      await fs.chmod(exePath, 0o755);
      console.log('Set executable permissions (755) on chromium binary');
    } catch (chmodErr) {
      console.warn('Failed to chmod chromium binary:', String(chmodErr));
    }
  }

  return inspect;
}

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
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, '');
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
  return html.replace(/<h([1-6])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
    const plainText = text.replace(/<[^>]*>/g, '');
    const id = plainText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
};

export async function POST(req: NextRequest) {
  let browser: any;

  try {
    const body = await req.json();
    const markdown = body.markdown as string | undefined;
    const html = body.html as string | undefined;
    const includeTOC = body.toc !== false;

    // Support both markdown and raw HTML input
    if (!markdown && !html) {
      return new NextResponse('Either markdown or html content is required.', { status: 400 });
    }

    // Prepare HTML content
    let finalHtml: string;
    
    if (markdown) {
      // Process markdown with TOC
      const rawHtml = await marked.parse(markdown);
      const htmlWithIds = addHeadingIds(rawHtml);
      const toc = includeTOC ? generateTOC(htmlWithIds) : '';
      const contentHtml = toc + htmlWithIds;
      finalHtml = getHTMLTemplate(contentHtml);
    } else {
      // Use raw HTML directly
      finalHtml = html!;
    }

    // Detect environment
    const isVercel = !!process.env.VERCEL_ENV;
    const isLocal = process.env.NODE_ENV === 'development';
    
    console.log('Environment detected:', { isVercel, isLocal, nodeEnv: process.env.NODE_ENV });

    let puppeteer: any;

    // Load appropriate dependencies based on environment
    if (isVercel || !isLocal) {
      // Production: Use chrome-aws-lambda
      const chromium = await import('chrome-aws-lambda');
      puppeteer = await import('puppeteer-core');
      
      // Get executable path (it's a property, not a function)
      const exePath = await chromium.default.executablePath;
      
      console.log('Using chrome-aws-lambda');
      console.log('Executable path:', exePath);

      // Ensure executable permissions and inspect binary
      await ensureExecutablePermissions(exePath);

      console.log('Launching puppeteer with chrome-aws-lambda');
      console.log('Args count:', chromium.default.args.length);

      try {
        browser = await puppeteer.default.launch({
          args: chromium.default.args,
          defaultViewport: chromium.default.defaultViewport,
          executablePath: exePath,
          headless: chromium.default.headless,
          ignoreHTTPSErrors: true,
        });
      } catch (launchErr: any) {
        console.error('Puppeteer launch failed:', {
          message: launchErr?.message || String(launchErr),
          code: launchErr?.code,
          errno: launchErr?.errno,
          syscall: launchErr?.syscall,
          exePath,
          platform: process.platform,
          arch: process.arch,
          env: {
            LD_LIBRARY_PATH: process.env.LD_LIBRARY_PATH,
          }
        });
        throw new Error(`Failed to launch Chromium: ${launchErr?.message || 'Unknown error'}`);
      }
    } else {
      // Local development: Use full puppeteer
      console.log('Using local puppeteer');
      puppeteer = await import('puppeteer');
      browser = await puppeteer.default.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }

    console.log('Browser launched successfully');

    // Generate PDF
    const page = await browser.newPage();
    await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

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

    const filename = markdown 
      ? `report-${crypto.randomBytes(4).toString('hex')}.pdf`
      : 'output.pdf';

    console.log('PDF generated successfully, size:', pdfBuffer.length, 'bytes');

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    // Cleanup browser on error
    if (browser) {
      try {
        await browser.close();
      } catch (closeErr) {
        console.error('Failed to close browser:', closeErr);
      }
    }

    // Comprehensive error logging
    console.error('PDF generation error:', {
      message: error?.message || String(error),
      code: error?.code,
      errno: error?.errno,
      syscall: error?.syscall,
      stack: error?.stack,
    });

    return NextResponse.json(
      { 
        error: error?.message || 'Unexpected error during PDF generation.',
        code: error?.code,
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}