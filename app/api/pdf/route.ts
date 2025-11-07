import { NextRequest, NextResponse } from 'next/server';
import { convertMarkdownToPdf } from 'md-pdf-md';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 40;

export async function POST(req: NextRequest) {
  // Helper: Generate a unique filename
  const uniqueName = (ext: string) =>
    `tmp-${crypto.randomBytes(8).toString('hex')}.${ext}`;

  const tempDir = os.tmpdir();
  const cleanUpFiles = async (files: string[]) => {
    for (const file of files) {
      try {
        await fs.unlink(file);
      } catch {}
    }
  };

  let mdFilePath = '';
  let pdfFilePath = '';

  try {
    const body = await req.json();
    const markdown = body.markdown as string | undefined;
    if (!markdown) {
      return NextResponse.json(
        { error: 'Markdown content is required.' },
        { status: 400 }
      );
    }

    const frontmatter = `---
pdf_options:
  format: a4
  margin: 30mm 20mm
  printBackground: true
  headerTemplate: |-
    <style>
      section {
        margin: 0 auto;
        font-family: system-ui;
        font-size: 11px;
      }
    </style>
    <section>
      <span class="title"></span>
      <span class="date"></span>
    </section>
  footerTemplate: |-
    <section>
      <div>
        Page <span class="pageNumber"></span>
        of <span class="totalPages"></span>
      </div>
    </section>
---
`;

    const markdownWithFrontmatter = `${frontmatter}\n${markdown}`;

    mdFilePath = path.join(tempDir, uniqueName('md'));
    pdfFilePath = path.join(tempDir, uniqueName('pdf'));

    // Write markdown to a temp file
    await fs.writeFile(mdFilePath, markdownWithFrontmatter);

    // Convert using filesystem
    const pdf = await convertMarkdownToPdf({
      input: mdFilePath,
      output: pdfFilePath,
      theme: 'github',
      toc: true,
      pageNumbers: true
    });

    if (!pdf.success) {
      await cleanUpFiles([mdFilePath, pdfFilePath]);
      return NextResponse.json(
        { error: 'Failed to generate PDF.' },
        { status: 500 }
      );
    }

    // Read the pdf file as buffer
    const pdfBuffer = await fs.readFile(pdfFilePath);

    // Cleanup files
    await cleanUpFiles([mdFilePath, pdfFilePath]);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report.pdf"`,
      },
    });
  } catch (error: any) {
    // Clean up on error as well
    if (mdFilePath || pdfFilePath) {
      await cleanUpFiles([mdFilePath, pdfFilePath]);
    }
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: error?.message || 'Unexpected error.' },
      { status: 500 }
    );
  }
}