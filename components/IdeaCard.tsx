import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

export const IdeaCard = ({ idea }: { idea: any }) => {
  const queryClient = useQueryClient();

  const upvoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upvote', id }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] }); // Refresh the ideas list
    },
  });

  const downvoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'downvote', id }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] }); // Refresh the ideas list
    },
  });

  const handleUpvote = () => {
    upvoteMutation.mutate(idea.id);
  };

  const handleDownvote = () => {
    downvoteMutation.mutate(idea.id);
  };

  return (

    <div className="border p-4 rounded-lg shadow-sm idea-card">
      <Link href={`/ideas/${idea.id}`}>
        <h3 className="font-bold mb-4">{idea.summary}</h3>
        <p className="text-sm text-gray-800 mb-4">{idea.description}</p>
        
      </Link>
      <p className="text-sm mb-4">Submitted by: {idea.employeeId}</p>
        <p className="text-sm mb-4">Priority: {idea?.priority}</p>
      <div className="flex gap-2 mt-2 mb-4">
        <button onClick={handleUpvote} className="flex items-center gap-1">
          👍 {idea.upvotes}
        </button>
        <button onClick={handleDownvote} className="flex items-center gap-1">
          👎 {idea.downvotes}
        </button>
      </div>
      <Link
        href={`/ideas/${idea.id}/edit`}
        className="px-2 py-1 action-button text-white rounded"
      >
        Edit
      </Link>
    </div>
  );
};