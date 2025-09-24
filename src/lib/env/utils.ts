// Function to retrieve an environment variable by name, throws an error if it's missing
export function getEnvVar(name: string): string {
  // Get the value of the environment variable
  const value = process.env[name];

  // If the environment variable is found, return its value
  if (value !== undefined)
    return value;

  // If the variable is not found, throw an error indicating the missing variable
  throw new Error(`Missing required environment variable: ${name}`);
}