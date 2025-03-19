'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchIdeas } from '@/ideaapi/api';
import { IdeaCard } from '@/components/IdeaCard';
import { Pagination } from '@/components/Pagination';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: ideas, isLoading } = useQuery({
    queryKey: ['ideas', page],
    queryFn: () => fetchIdeas(page),
  });
  const filteredAndSortedIdeas = ideas
    ?.filter(
      (idea) =>
        idea.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.upvotes - a.upvotes);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CloudHive’s Feature Idea Portal</h1>
      <Link
        href="/create"
        className="mb-4 inline-block px-4 py-2 action-button text-white rounded"
      >
        Submit a New Idea
      </Link>
      <SearchBar onSearch={setSearchTerm} />

     
      <div className="space-y-4">
        {filteredAndSortedIdeas?.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={5} />
    </div>
  );
}