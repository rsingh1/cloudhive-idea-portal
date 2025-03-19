'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IdeaFormProps {
  employees: { id: string; name: string }[];
}

export const IdeaForm = ({ employees }: IdeaFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', ...data }),
      });
      return response.json();
    },
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['ideas'] }); 
      router.push('/');
    },
  });

  const onSubmit = (data: any) => {
    submitMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('summary', { required: 'Summary is required' })}
          placeholder="Summary"
          className="w-full p-2 border rounded"
        />
        {errors.summary && (
          <p className="text-red-500 text-sm">{errors.summary?.message?.toString()}</p>
        )}
      </div>
      <div>
        <textarea
          {...register('description', { required: 'Description is required' })}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message?.toString()}</p>
        )}
      </div>
      <div>
        <select
          {...register('employeeId', { required: 'Employee is required' })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        {errors.employeeId && (
          <p className="text-red-500 text-sm">{errors.employeeId.message?.toString()}</p>
        )}
      </div>
      <div>
        <select
          {...register('priority')}
          className="w-full p-2 border rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" className="w-full p-2 action-button text-white rounded">
        Submit
      </button>
    </form>
  );
};