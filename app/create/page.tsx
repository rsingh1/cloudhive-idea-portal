import { IdeaForm } from '@/components/IdeaForm';
import { fetchEmployees } from '@/ideaapi/api';

export default function CreateIdea() {
  const employees = fetchEmployees();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit a New Idea</h1>
      <IdeaForm employees={employees} />
    </div>
  );
}