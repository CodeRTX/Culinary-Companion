import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { RecipeRequestSchema } from "@/shared/types";

interface WorkerEnv {
  DB: D1Database;
  QLOO_API_KEY: string;
  MOCHA_USERS_SERVICE_API_KEY: string;
  MOCHA_USERS_SERVICE_API_URL: string;
}

const app = new Hono<{ Bindings: WorkerEnv }>();

// Enable CORS for all routes
app.use('/*', cors());



import { QlooService } from './qloo-service';

// Recipe generation endpoint
app.post(
  '/api/recipes/generate',
  zValidator('json', RecipeRequestSchema),
  async (c) => {
    try {
      const request = c.req.valid('json');
      const qlooService = new QlooService(c.env.QLOO_API_KEY);

      // Parse ingredients string into array
      const ingredientsArray = request.ingredients
        .split(',')
        .map(ing => ing.trim())
        .filter(ing => ing.length > 0);

      // Generate recipes using Qloo API
      const qlooRecipes = await qlooService.generateRecipes({
        ingredients: ingredientsArray,
        dietary_restrictions: request.dietaryRestrictions,
        cuisine_style: request.cuisineStyle,
        language: request.language,
      });

      // Transform Qloo response to our recipe format
      const recipes = qlooRecipes.map(recipe => ({
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        cuisineType: recipe.cuisine_type,
        difficultyLevel: recipe.difficulty,
        prepTime: recipe.prep_time,
        cookTime: recipe.cook_time,
        servings: recipe.servings,
        tips: recipe.tips || []
      }));

      const responseData = { recipes };

      // Store the request in database
      const db = c.env.DB;
      await db.prepare(`
        INSERT INTO recipe_requests (input_text, input_type, response_data, language, created_at, updated_at)
        VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
      `).bind(
        request.ingredients,
        request.inputType,
        JSON.stringify(responseData),
        request.language
      ).run();

      return c.json({
        recipes,
        language: request.language,
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      console.error('Recipe generation error:', error);
      return c.json(
        { 
          error: 'Failed to generate recipes', 
          details: error instanceof Error ? error.message : 'Unknown error' 
        },
        500
      );
    }
  }
);

// Get recipe history endpoint
app.get('/api/recipes/history', async (c) => {
  try {
    const db = c.env.DB;
    const results = await db.prepare(`
      SELECT * FROM recipe_requests 
      ORDER BY created_at DESC 
      LIMIT 10
    `).all();

    return c.json({ history: results.results });
  } catch (error) {
    console.error('History fetch error:', error);
    return c.json({ error: 'Failed to fetch history' }, 500);
  }
});

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

export default app;
