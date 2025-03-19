import { NextResponse } from 'next/server';
import { fetchIdeas, submitIdea, upvoteIdea, downvoteIdea } from '@/ideaapi/api';

// Fetch ideas with pagination
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const ideas = await fetchIdeas(page);
  return NextResponse.json(ideas);
}

// Create a new idea or handle upvotes/downvotes
export async function POST(request: Request) {
  const { action, id, ...data } = await request.json();

  if (action === 'create') {
    const newIdea = await submitIdea(data);
    return NextResponse.json(newIdea);
  } else if (action === 'upvote') {
    const updatedIdea = await upvoteIdea(id);
    return NextResponse.json(updatedIdea);
  } else if (action === 'downvote') {
    const updatedIdea = await downvoteIdea(id);
    return NextResponse.json(updatedIdea);
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}