import z from "zod";

// User preference schemas
export const UserPreferencesSchema = z.object({
  language: z.string().default('en'),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  dietaryRestrictions: z.array(z.string()).optional(),
  cuisinePreferences: z.array(z.string()).optional(),
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

// Recipe generation request schema
export const RecipeRequestSchema = z.object({
  ingredients: z.string().min(1, "Please provide some ingredients"),
  inputType: z.enum(['text', 'audio']).default('text'),
  language: z.string().default('en'),
  dietaryRestrictions: z.array(z.string()).optional(),
  cuisineStyle: z.string().optional(),
});

export type RecipeRequest = z.infer<typeof RecipeRequestSchema>;

// Recipe schema
export const RecipeSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  cuisineType: z.string(),
  difficultyLevel: z.string(),
  prepTime: z.number(),
  cookTime: z.number(),
  servings: z.number(),
  imageUrl: z.string().optional(),
  tips: z.array(z.string()).optional(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

// API Response schema
export const RecipeResponseSchema = z.object({
  recipes: z.array(RecipeSchema),
  language: z.string(),
  timestamp: z.string(),
});

export type RecipeResponse = z.infer<typeof RecipeResponseSchema>;

// User schema
export const UserSchema = z.object({
  id: z.number().optional(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  preferredLanguage: z.string().default('en'),
  skillLevel: z.string().default('beginner'),
  dietaryRestrictions: z.string().optional(),
  cuisinePreferences: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
