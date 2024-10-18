import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function GET() {
  const [owner, repo] = process.env.GITHUB_REPO!.split('/');

  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'data.json',
    });

    if ('content' in data) {
      const content = Buffer.from(data.content, 'base64').toString();
      return NextResponse.json(JSON.parse(content));
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const [owner, repo] = process.env.GITHUB_REPO!.split('/');

  try {
    const newData = await request.json();

    const { data: existingFile } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'data.json',
    });

    if ('sha' in existingFile) {
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'data.json',
        message: 'Update data.json',
        content: Buffer.from(JSON.stringify(newData, null, 2)).toString('base64'),
        sha: existingFile.sha,
      });

      return NextResponse.json({ message: 'Data updated successfully' });
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

