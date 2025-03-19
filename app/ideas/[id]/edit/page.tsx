'use client';

import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { fetchIdeaById, updateIdea, fetchEmployees } from '@/ideaapi/api';

export default function EditIdea() {
  const router = useRouter();
  const params = useParams(); // Use useParams to access dynamic route parameters
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch the idea details based on the ID
  useEffect(() => {
    if (!params.id) return; // Ensure params.id is available

    const fetchIdea = async () => {
      const idea = await fetchIdeaById(params.id as string);
      if (idea) {
        setValue('summary', idea.summary);
        setValue('description', idea.description);
        setValue('employeeId', idea.employeeId);
        setValue('priority', idea.priority);
      }
    };
    fetchIdea();
  }, [params.id, setValue]);

  const onSubmit = async (data: any) => {
    if (!params.id) return; // Ensure params.id is available
    await updateIdea(params.id as string, data);
    router.push(`/`);
  };

  // Fetch employees for the dropdown
  const employees = fetchEmployees();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Idea</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('summary', { required: 'Summary is required' })}
            placeholder="Summary"
            className="w-full p-2 border rounded"
          />
          {errors.summary && (
            <p className="text-red-500 text-sm">{errors.summary.message as string}</p>
          )}
        </div>
        <div>
          <textarea
            {...register('description', { required: 'Description is required' })}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          {errors.description?.message && (
            <p className="text-red-500 text-sm">{errors.description.message as string}</p>
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
            <p className="text-red-500 text-sm">{errors.employeeId.message as string}</p>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}