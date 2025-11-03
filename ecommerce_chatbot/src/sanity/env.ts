

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-19'

// Use SANITY_STUDIO_ variables for Sanity Studio
export const dataset = process.env.SANITY_STUDIO_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.SANITY_STUDIO_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vi4v34hi';
export const token = process.env.SANITY_API_TOKEN
console.log("Sanity Token:", token);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (!v) {
    throw new Error(errorMessage)
  }
  return v
}
