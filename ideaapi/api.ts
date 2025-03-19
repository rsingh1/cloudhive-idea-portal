import employees from '@/data/employees.json';
import ideas from '@/data/ideas.json';
import path from 'path';
import { promises as fs } from 'fs';

const ideasFilePath = path.join(process.cwd(), 'data', 'ideas.json');

// Fetch employees
export const fetchEmployees = () => {
    return employees;
};

// Fetch an idea by ID
export const fetchIdeaById = async (id: string) => {
    const idea = ideas.find((i) => i.id === id);
    if (!idea) throw new Error('Idea not found');
    return idea;
};

// Update an idea
export const updateIdea = async (id: string, updatedData: any) => {

    const index = ideas.findIndex((idea: { id: string; }) => idea.id === id);
    if (index !== -1) {
        ideas[index] = { ...ideas[index], ...updatedData };
        await fs?.writeFile(ideasFilePath, JSON.stringify(ideas, null, 2));
    }
    return ideas[index];
};
// Fetch ideas with pagination
export const fetchIdeas = async (page: number, limit: number = 20) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return ideas.slice(start, end);
};


// Submit a new idea
export const submitIdea = async (idea: any) => {
    const newIdea = { ...idea, id: String(ideas.length + 1), upvotes: 0, downvotes: 0 };
    ideas.push(newIdea);
    await fs?.writeFile(ideasFilePath, JSON.stringify(ideas, null, 2));
    return newIdea;
};

// Upvote an idea
export const upvoteIdea = async (id: string) => {
    const idea = ideas.find((i) => i.id === id);
    if (idea) idea.upvotes++;
    await fs?.writeFile(ideasFilePath, JSON.stringify(ideas, null, 2));
    return idea;
};

// Downvote an idea
export const downvoteIdea = async (id: string) => {
    const idea = ideas.find((i) => i.id === id);
    if (idea) idea.downvotes++;
    await fs?.writeFile(ideasFilePath, JSON.stringify(ideas, null, 2));
    return idea;
};