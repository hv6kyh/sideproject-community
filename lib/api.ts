
import { mockIdeas } from './mock-data';
import type { Idea, Category } from '@/types/idea';

const SIMULATED_DELAY = 500; // 0.5 seconds

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches all ideas.
 */
export const getIdeas = async (): Promise<Idea[]> => {
  console.log("Fetching all ideas...");
  await delay(SIMULATED_DELAY);
  console.log("Finished fetching ideas.");
  return mockIdeas;
};

/**
 * Fetches a single idea by its ID.
 * @param id The ID of the idea to fetch.
 */
export const getIdeaById = async (id: string): Promise<Idea | undefined> => {
  console.log(`Fetching idea with id: ${id}...`);
  await delay(SIMULATED_DELAY);
  const idea = mockIdeas.find((idea) => idea.id === id);
  console.log(`Finished fetching idea: ${idea?.title}`);
  return idea;
};

/**
 * Fetches all unique categories with their counts.
 */
export const getCategories = async (): Promise<Category[]> => {
  console.log("Fetching categories...");
  await delay(SIMULATED_DELAY);
  
  const categoryCounts = mockIdeas.reduce((acc, idea) => {
    idea.category.forEach(catName => {
      acc[catName] = (acc[catName] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const categories: Category[] = Object.entries(categoryCounts).map(([name, count], index) => ({
    id: String(index + 1),
    name,
    count,
  }));

  console.log("Finished fetching categories.");
  return categories;
};
