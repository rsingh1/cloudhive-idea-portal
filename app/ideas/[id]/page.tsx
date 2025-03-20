'use client'
import { useQuery } from '@tanstack/react-query';
import { fetchIdeaById } from '@/ideaapi/api';

export default function IdeaDetails({ params }: { params: { id: string } }) {
  const { data: idea, isLoading } = useQuery({
    queryKey: ['idea', params.id],
    queryFn: () => fetchIdeaById(params.id),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{idea?.summary}</h1>
      <p className="text-gray-800">{idea?.description}</p>
      <p className="mt-4">Submitted by: {idea?.employeeId}</p>
      <p className="mt-4">Priority: {idea?.priority}</p>
      <div className="flex gap-2 mt-4">
        <button>👍 {idea?.upvotes}</button>
        <button>👎 {idea?.downvotes}</button>
      </div>
    </div>
  );
}