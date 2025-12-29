// API Configuration - Using TheMealDB (free, no API key needed)
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Clear results when switching tabs
            document.getElementById('dish-results').innerHTML = '';
            document.getElementById('ingredients-results').innerHTML = '';
            
            // Initialize AI chat if switching to AI tab
            if (targetTab === 'ai-assistant' && document.getElementById('ai-chat').children.length === 0) {
                initializeAIChat();
            }
            
        });
    });
    
    // Initialize AI Chat
    function initializeAIChat() {
        const aiChat = document.getElementById('ai-chat');
        aiChat.innerHTML = `
            <div class="ai-empty-state">
                <p>👋 Hi! I'm your AI Cooking Assistant</p>
                <span>Ask me anything about cooking, recipes, substitutions, or get personalized recipe suggestions!</span>
            </div>
        `;
    }
    
    // Search by dish name
    const dishInput = document.getElementById('dish-input');
    const searchDishBtn = document.getElementById('search-dish-btn');
    const dishResults = document.getElementById('dish-results');
    
    // Fuzzy search function to handle typos
    function fuzzyMatch(searchTerm, target) {
        const search = searchTerm.toLowerCase().replace(/[^a-z0-9]/g, '');
        const targ = target.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Exact match
        if (targ.includes(search) || search.includes(targ)) return true;
        
        // Common typo patterns
        const typoMap = {
            'biriyani': 'biryani',
            'biriani': 'biryani',
            'biryani': 'biryani',
            'biryani': 'biriyani',
            'curry': 'curry',
            'curri': 'curry',
            'pasta': 'pasta',
            'pasta': 'pasta',
            'chicken': 'chicken',
            'chiken': 'chicken'
        };
        
        // Check if search term matches after typo correction
        const correctedSearch = typoMap[search] || search;
        const correctedTarget = typoMap[targ] || targ;
        
        if (correctedTarget.includes(correctedSearch) || correctedSearch.includes(correctedTarget)) {
            return true;
        }
        
        // Levenshtein-like simple matching (check if 80% of characters match)
        let matches = 0;
        const minLen = Math.min(search.length, targ.length);
        for (let i = 0; i < minLen; i++) {
            if (search[i] === targ[i] || search.includes(targ[i]) || targ.includes(search[i])) {
                matches++;
            }
        }
        
        return matches / Math.max(search.length, targ.length) >= 0.7;
    }
    
    async function searchDish() {
        const dishName = dishInput.value.trim();
        
        if (!dishName) {
            dishResults.innerHTML = '<div class="error-message"><strong>Error:</strong> Please enter a dish name</div>';
            return;
        }
        
        // Show loading state
        searchDishBtn.classList.add('loading');
        searchDishBtn.disabled = true;
        dishResults.innerHTML = '<div class="loading-state"><div class="loading-spinner"></div><p>Searching recipes...</p></div>';
        
        const normalizedSearch = dishName.toLowerCase();
        let localRecipes = [];
        
        // Check local Indian/Kerala recipes with fuzzy matching
        if (typeof indianKeralaRecipes !== 'undefined') {
            localRecipes = indianKeralaRecipes.filter(recipe => 
                fuzzyMatch(dishName, recipe.name) ||
                fuzzyMatch(dishName, recipe.category) ||
                fuzzyMatch(dishName, recipe.cuisine) ||
                recipe.name.toLowerCase().includes(normalizedSearch) ||
                recipe.category.toLowerCase().includes(normalizedSearch) ||
                recipe.cuisine.toLowerCase().includes(normalizedSearch)
            );
        }
        
        try {
            // Try exact search first
            let response = await fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(dishName)}`);
            let data = await response.json();
            
            // If no results, try common typo corrections
            if (!data.meals || data.meals.length === 0) {
                const typoCorrections = {
                    'biriyani': 'biryani',
                    'biriani': 'biryani',
                    'curri': 'curry',
                    'chiken': 'chicken',
                    'pasta': 'pasta'
                };
                
                const corrected = typoCorrections[normalizedSearch] || dishName;
                if (corrected !== dishName) {
                    response = await fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(corrected)}`);
                    data = await response.json();
                }
            }
            
            // If still no results, try fuzzy search on all meals
            if ((!data.meals || data.meals.length === 0) && localRecipes.length === 0) {
                // Try searching for similar terms
                const similarTerms = ['chicken', 'beef', 'pasta', 'rice', 'curry', 'biryani'];
                for (const term of similarTerms) {
                    if (fuzzyMatch(dishName, term)) {
                        response = await fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(term)}`);
                        data = await response.json();
                        if (data.meals && data.meals.length > 0) {
                            // Filter results to only show relevant ones
                            data.meals = data.meals.filter(meal => 
                                fuzzyMatch(dishName, meal.strMeal)
                            );
                            if (data.meals.length > 0) break;
                        }
                    }
                }
            }
            
            let allRecipes = [];
            
            // Add local recipes
            if (localRecipes.length > 0) {
                localRecipes.forEach((recipe, index) => {
                    allRecipes.push({
                        type: 'local',
                        data: recipe,
                        index: index
                    });
                });
            }
            
            // Add API recipes
            if (data.meals && data.meals.length > 0) {
                data.meals.forEach((meal, index) => {
                    allRecipes.push({
                        type: 'api',
                        data: meal,
                        index: localRecipes.length + index
                    });
                });
            }
            
            if (allRecipes.length > 0) {
                // Display all matching recipes
                dishResults.innerHTML = allRecipes.map((item, idx) => {
                    if (item.type === 'local') {
                        return renderLocalRecipeCard(item.data, idx);
                    } else {
                        return renderRecipeCard(item.data, idx);
                    }
                }).join('');
                
                // Animate cards in sequence
                const cards = dishResults.querySelectorAll('.recipe-card');
                cards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                });
            } else {
                // If no results, try to get AI-generated recipe info
                dishResults.innerHTML = `
                    <div class="no-results">
                        <p>No recipe found for "${dishName}" in our database</p>
                        <p style="margin-top: 15px; font-size: 0.95em;">Try asking the AI Chef tab for help with this dish, or search for: Pasta, Chicken, Pancakes, Kerala Fish Curry, Biryani</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error fetching recipe:', error);
            dishResults.innerHTML = `
                <div class="error-message">
                    <strong>Error:</strong> Unable to fetch recipes. Please check your internet connection and try again.
                </div>
            `;
        } finally {
            searchDishBtn.classList.remove('loading');
            searchDishBtn.disabled = false;
        }
    }
    
    function renderLocalRecipeCard(recipe, index) {
        const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients];
        const steps = Array.isArray(recipe.instructions) ? recipe.instructions : [recipe.instructions];
        const defaultServings = recipe.servings || 4;
        const recipeId = `recipe-local-${index}-${Date.now()}`;
        
        return `
            <div class="recipe-card" style="animation-delay: ${index * 0.1}s" data-recipe-id="${recipeId}">
                <div class="recipe-card-content">
                    <div class="recipe-badges">
                        <span class="badge badge-cuisine">${recipe.cuisine || recipe.category}</span>
                        ${recipe.restaurant ? '<span class="badge badge-restaurant">Restaurant Style</span>' : ''}
                        ${recipe.vegetarian ? '<span class="badge badge-veg">Vegetarian</span>' : '<span class="badge badge-nonveg">Non-Veg</span>'}
                    </div>
                    <h3>${recipe.name}</h3>
                    ${recipe.restaurant ? `<p class="recipe-restaurant">${recipe.restaurant}</p>` : ''}
                    
                    <div class="serving-controls">
                        <label for="servings-${recipeId}">Serves:</label>
                        <div class="serving-input-group">
                            <button class="serving-btn" onclick="adjustServing('${recipeId}', -1)">−</button>
                            <input type="number" id="servings-${recipeId}" class="serving-input" value="${defaultServings}" min="1" max="20" onchange="updateServings('${recipeId}', ${defaultServings}, null)">
                            <button class="serving-btn" onclick="adjustServing('${recipeId}', 1)">+</button>
                        </div>
                        <span class="serving-label">people</span>
                    </div>
                    
                    <div class="recipe-section">
                        <h4>📋 Ingredients</h4>
                        <ul class="ingredients-list" id="ingredients-${recipeId}">
                            ${ingredients.map((ing, idx) => `<li data-original="${ing.replace(/"/g, '&quot;')}">${ing}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="recipe-section">
                        <h4>👨‍🍳 Instructions</h4>
                        <ol class="steps-list">
                            ${steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Function to adjust ingredient quantities based on serving size
    function adjustIngredientQuantity(ingredient, originalServings, newServings) {
        if (originalServings === newServings) return ingredient;
        
        const ratio = newServings / originalServings;
        
        // Extract numbers and units from ingredient string
        const numberPattern = /(\d+(?:\.\d+)?(?:\/\d+)?)\s*([a-zA-Z]+|cup|cups|tbsp|tsp|oz|lb|g|kg|ml|l|teaspoon|tablespoon|ounce|ounces|pound|pounds|gram|grams|kilogram|kilograms|milliliter|milliliters|liter|liters)?/gi;
        
        return ingredient.replace(numberPattern, (match, num, unit) => {
            // Parse fraction if exists
            let value;
            if (num.includes('/')) {
                const [numerator, denominator] = num.split('/');
                value = parseFloat(numerator) / parseFloat(denominator);
            } else {
                value = parseFloat(num);
            }
            
            const newValue = value * ratio;
            
            // Format the result
            if (newValue < 1 && newValue > 0) {
                // Convert to fraction or smaller unit
                const fraction = simplifyFraction(newValue);
                return `${fraction} ${unit || ''}`.trim();
            } else {
                // Round to 1 decimal place if needed
                const rounded = Math.round(newValue * 10) / 10;
                return `${rounded} ${unit || ''}`.trim();
            }
        });
    }
    
    function simplifyFraction(decimal) {
        const tolerance = 0.01;
        const fractions = [
            [1, 8, 0.125], [1, 4, 0.25], [1, 3, 0.333], [1, 2, 0.5], 
            [2, 3, 0.667], [3, 4, 0.75], [7, 8, 0.875]
        ];
        
        for (const [num, den, val] of fractions) {
            if (Math.abs(decimal - val) < tolerance) {
                return `${num}/${den}`;
            }
        }
        
        return Math.round(decimal * 4) / 4; // Round to nearest quarter
    }
    
    // Global functions for serving adjustment
    window.adjustServing = function(recipeId, change) {
        const input = document.getElementById(`servings-${recipeId}`);
        if (!input) return;
        const currentValue = parseInt(input.value) || 4;
        const newValue = Math.max(1, Math.min(20, currentValue + change));
        input.value = newValue;
        updateServings(recipeId, 4, null);
    };
    
    window.updateServings = function(recipeId, originalServings, originalIngredients) {
        const input = document.getElementById(`servings-${recipeId}`);
        if (!input) return;
        
        const newServings = parseInt(input.value) || originalServings;
        const ingredientsList = document.getElementById(`ingredients-${recipeId}`);
        
        if (ingredientsList) {
            const items = ingredientsList.querySelectorAll('li');
            items.forEach(item => {
                const original = item.getAttribute('data-original');
                if (original) {
                    const adjusted = adjustIngredientQuantity(original, originalServings, newServings);
                    item.textContent = adjusted;
                }
            });
        }
    };
    
    searchDishBtn.addEventListener('click', searchDish);
    dishInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchDish();
        }
    });
    
    // Search by ingredients
    const ingredientInput = document.getElementById('ingredient-input');
    const addIngredientBtn = document.getElementById('add-ingredient-btn');
    const searchIngredientsBtn = document.getElementById('search-ingredients-btn');
    const ingredientsList = document.getElementById('ingredients-list');
    const ingredientsResults = document.getElementById('ingredients-results');
    
    let selectedIngredients = [];
    
    function addIngredient() {
        const ingredient = ingredientInput.value.trim();
        
        if (!ingredient) {
            return;
        }
        
        const normalizedIngredient = normalizeString(ingredient);
        
        // Check if ingredient already exists
        if (selectedIngredients.some(ing => normalizeString(ing) === normalizedIngredient)) {
            ingredientInput.value = '';
            return;
        }
        
        selectedIngredients.push(ingredient);
        updateIngredientsDisplay();
        ingredientInput.value = '';
        ingredientInput.focus();
    }
    
    function removeIngredient(ingredient) {
        selectedIngredients = selectedIngredients.filter(ing => ing !== ingredient);
        updateIngredientsDisplay();
    }
    
    function updateIngredientsDisplay() {
        ingredientsList.innerHTML = '';
        selectedIngredients.forEach(ingredient => {
            const tag = document.createElement('div');
            tag.className = 'ingredient-tag';
            tag.innerHTML = `
                <span>${ingredient}</span>
                <span class="remove" onclick="removeIngredientFromList('${ingredient.replace(/'/g, "\\'")}')">×</span>
            `;
            ingredientsList.appendChild(tag);
        });
    }
    
    // Make removeIngredient accessible globally for onclick
    window.removeIngredientFromList = function(ingredient) {
        removeIngredient(ingredient);
    };
    
    addIngredientBtn.addEventListener('click', addIngredient);
    ingredientInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addIngredient();
        }
    });
    
        searchIngredientsBtn.addEventListener('click', async () => {
        if (selectedIngredients.length === 0) {
            ingredientsResults.innerHTML = '<div class="error-message"><strong>Error:</strong> Please add at least one ingredient</div>';
            return;
        }
        
        // Show loading state
        searchIngredientsBtn.classList.add('loading');
        searchIngredientsBtn.disabled = true;
        ingredientsResults.innerHTML = '<div class="loading-state"><div class="loading-spinner"></div><p>Finding recipes with your ingredients...</p></div>';
        
        try {
            // Fetch recipes for each ingredient and combine results
            const allMeals = [];
            const mealIds = new Set();
            
            for (const ingredient of selectedIngredients) {
                try {
                    const response = await fetch(`${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
                    const data = await response.json();
                    
                    if (data.meals) {
                        data.meals.forEach(meal => {
                            if (!mealIds.has(meal.idMeal)) {
                                mealIds.add(meal.idMeal);
                                allMeals.push(meal);
                            }
                        });
                    }
                } catch (err) {
                    console.error(`Error fetching recipes for ${ingredient}:`, err);
                }
            }
            
            if (allMeals.length > 0) {
                // Fetch full recipe details for each meal
                const detailedMeals = await Promise.all(
                    allMeals.slice(0, 20).map(async (meal) => {
                        try {
                            const response = await fetch(`${API_BASE_URL}/lookup.php?i=${meal.idMeal}`);
                            const data = await response.json();
                            return data.meals ? data.meals[0] : null;
                        } catch (err) {
                            console.error(`Error fetching details for ${meal.idMeal}:`, err);
                            return null;
                        }
                    })
                );
                
                const validMeals = detailedMeals.filter(meal => meal !== null);
                
                // Calculate match scores
                const mealsWithScores = validMeals.map(meal => {
                    const mealIngredients = extractIngredients(meal);
                    const matchResult = calculateMatch(mealIngredients, selectedIngredients);
                    return {
                        meal: meal,
                        ...matchResult
                    };
                });
                
                // Sort by match percentage
                mealsWithScores.sort((a, b) => b.matchPercentage - a.matchPercentage);
                
                // Display results
                if (mealsWithScores.length > 0) {
                    ingredientsResults.innerHTML = mealsWithScores.map((result, index) => {
                        return renderRecipeCard(result.meal, index, result);
                    }).join('');
                    
                    // Animate cards in sequence
                    const cards = ingredientsResults.querySelectorAll('.recipe-card');
                    cards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 0.1}s`;
                    });
                } else {
                    ingredientsResults.innerHTML = `
                        <div class="no-results">
                            <p>No recipes found with the available ingredients</p>
                            <p style="margin-top: 15px; font-size: 0.95em;">Try adding more ingredients or different ones</p>
                        </div>
                    `;
                }
            } else {
                ingredientsResults.innerHTML = `
                    <div class="no-results">
                        <p>No recipes found with the available ingredients</p>
                        <p style="margin-top: 15px; font-size: 0.95em;">Try adding more ingredients or different ones</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error searching by ingredients:', error);
            ingredientsResults.innerHTML = `
                <div class="error-message">
                    <strong>Error:</strong> Unable to fetch recipes. Please check your internet connection and try again.
                </div>
            `;
        } finally {
            searchIngredientsBtn.classList.remove('loading');
            searchIngredientsBtn.disabled = false;
        }
    });
    
    function renderRecipeCard(meal, index, matchInfo = null) {
        const ingredients = extractIngredients(meal);
        const instructions = meal.strInstructions || 'No instructions available.';
        const steps = formatInstructions(instructions);
        
        let matchHTML = '';
        if (matchInfo) {
            const hasAll = matchInfo.missingIngredients.length === 0;
            matchHTML = `
                <div class="match-info ${hasAll ? 'has-all' : ''}">
                    <strong>${hasAll ? '✓ You have all ingredients!' : `Match: ${matchInfo.matchCount}/${matchInfo.totalIngredients} ingredients`}</strong>
                    ${matchInfo.missingIngredients.length > 0 ? 
                        `<div class="missing"><strong>Missing:</strong> ${matchInfo.missingIngredients.join(', ')}</div>` : 
                        ''}
                </div>
            `;
        }
        
        const metaHTML = `
            <div class="recipe-meta">
                ${meal.strCategory ? `
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2z"></path>
                            <path d="M3 7l9 6 9-6"></path>
                        </svg>
                        <span>${meal.strCategory}</span>
                    </div>
                ` : ''}
                ${meal.strArea ? `
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span>${meal.strArea}</span>
                    </div>
                ` : ''}
            </div>
        `;
        
        const defaultServings = 4;
        const recipeId = `recipe-api-${index}-${Date.now()}`;
        
        return `
            <div class="recipe-card" style="animation-delay: ${index * 0.1}s" data-recipe-id="${recipeId}">
                <div class="recipe-card-content">
                    <h3>${meal.strMeal || 'Unknown Recipe'}</h3>
                    ${metaHTML}
                    
                    <div class="serving-controls">
                        <label for="servings-${recipeId}">Serves:</label>
                        <div class="serving-input-group">
                            <button class="serving-btn" onclick="adjustServing('${recipeId}', -1)">−</button>
                            <input type="number" id="servings-${recipeId}" class="serving-input" value="${defaultServings}" min="1" max="20" onchange="updateServings('${recipeId}', ${defaultServings}, ${JSON.stringify(ingredients).replace(/"/g, '&quot;')})">
                            <button class="serving-btn" onclick="adjustServing('${recipeId}', 1)">+</button>
                        </div>
                        <span class="serving-label">people</span>
                    </div>
                    
                    <div class="recipe-section">
                        <h4>📋 Ingredients</h4>
                        <ul class="ingredients-list" id="ingredients-${recipeId}">
                            ${ingredients.map((ing, idx) => `<li data-original="${ing.replace(/"/g, '&quot;')}">${ing}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="recipe-section">
                        <h4>👨‍🍳 Instructions</h4>
                        <ol class="steps-list">
                            ${steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                    
                    ${matchHTML}
                </div>
            </div>
        `;
    }
    
    function extractIngredients(meal) {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                const measureText = measure ? measure.trim() : '';
                ingredients.push(`${measureText} ${ingredient}`.trim());
            }
        }
        return ingredients;
    }
    
    function formatInstructions(instructions) {
        // Split instructions by periods, newlines, or numbers
        let steps = instructions
            .split(/\d+\.|\n\n|\r\n\r\n/)
            .map(step => step.trim())
            .filter(step => step.length > 10);
        
        // If no good splits, try splitting by periods
        if (steps.length < 2) {
            steps = instructions
                .split(/\.\s+/)
                .map(step => step.trim())
                .filter(step => step.length > 10);
        }
        
        // If still no good splits, return as single step
        if (steps.length < 2) {
            return [instructions];
        }
        
        return steps;
    }
    
    function calculateMatch(recipeIngredients, availableIngredients) {
        const normalizedAvailable = availableIngredients.map(ing => normalizeString(ing));
        const normalizedRecipe = recipeIngredients.map(ing => normalizeString(ing));
        
        const matching = [];
        const missing = [];
        
        normalizedRecipe.forEach(recipeIng => {
            // Extract main ingredient name (remove measurements)
            const mainIng = recipeIng.replace(/^\d+\/\d+\s+|\d+\s+|cup|tbsp|tsp|oz|lb|g|kg|ml|l|teaspoon|tablespoon|cup|cups|ounce|ounces|pound|pounds|gram|grams|kilogram|kilograms|milliliter|milliliters|liter|liters/gi, '').trim();
            
            let found = false;
            for (const available of normalizedAvailable) {
                // Check if ingredient contains available item or vice versa
                if (recipeIng.includes(available) || available.includes(mainIng) || mainIng.includes(available)) {
                    matching.push(recipeIng);
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                missing.push(recipeIng);
            }
        });
        
        const matchPercentage = normalizedRecipe.length > 0 
            ? (matching.length / normalizedRecipe.length) * 100 
            : 0;
        
        return {
            matchCount: matching.length,
            totalIngredients: normalizedRecipe.length,
            matchPercentage: matchPercentage,
            missingIngredients: missing
        };
    }
    
    function normalizeString(str) {
        return str.toLowerCase().trim().replace(/[^\w\s]/g, '');
    }
    
    // AI Assistant Functionality
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send-btn');
    const aiChat = document.getElementById('ai-chat');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    
    // Initialize AI chat on page load if AI tab is active
    if (document.getElementById('ai-assistant').classList.contains('active')) {
        initializeAIChat();
    }
    
    // Send message on button click
    aiSendBtn.addEventListener('click', sendAIMessage);
    
    // Send message on Enter key
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendAIMessage();
        }
    });
    
    // Suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const suggestion = chip.getAttribute('data-suggestion');
            aiInput.value = suggestion;
            sendAIMessage();
        });
    });
    
    async function sendAIMessage() {
        const message = aiInput.value.trim();
        
        if (!message) return;
        
        // Clear empty state
        if (aiChat.querySelector('.ai-empty-state')) {
            aiChat.innerHTML = '';
        }
        
        // Add user message
        addMessageToChat('user', message);
        aiInput.value = '';
        aiSendBtn.classList.add('loading');
        aiSendBtn.disabled = true;
        
        // Show typing indicator
        const typingIndicator = addTypingIndicator();
        
        try {
            const response = await getAIResponse(message);
            removeTypingIndicator(typingIndicator);
            addMessageToChat('assistant', response);
        } catch (error) {
            removeTypingIndicator(typingIndicator);
            addMessageToChat('assistant', 'Sorry, I encountered an error. Please try again or check your API configuration.');
            console.error('AI Error:', error);
        } finally {
            aiSendBtn.classList.remove('loading');
            aiSendBtn.disabled = false;
            aiInput.focus();
        }
    }
    
    function addMessageToChat(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${role}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'ai-message-avatar';
        avatar.textContent = role === 'user' ? '👤' : '🤖';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'ai-message-content';
        
        // Format the message (support basic markdown-like formatting)
        const formattedContent = formatAIMessage(content);
        messageContent.innerHTML = formattedContent;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        aiChat.appendChild(messageDiv);
        
        // Scroll to bottom
        aiChat.scrollTop = aiChat.scrollHeight;
    }
    
    function formatAIMessage(text) {
        // Convert newlines to paragraphs
        let formatted = text.replace(/\n\n/g, '</p><p>');
        formatted = '<p>' + formatted + '</p>';
        
        // Convert numbered lists
        formatted = formatted.replace(/(\d+)\.\s+(.+)/g, '<li>$2</li>');
        formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
        
        // Convert bullet points
        formatted = formatted.replace(/[-•]\s+(.+)/g, '<li>$1</li>');
        formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // Bold text
        formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        
        return formatted;
    }
    
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message assistant';
        typingDiv.innerHTML = `
            <div class="ai-message-avatar">🤖</div>
            <div class="ai-typing">
                <div class="ai-typing-dot"></div>
                <div class="ai-typing-dot"></div>
                <div class="ai-typing-dot"></div>
            </div>
        `;
        aiChat.appendChild(typingDiv);
        aiChat.scrollTop = aiChat.scrollHeight;
        return typingDiv;
    }
    
    function removeTypingIndicator(indicator) {
        if (indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }
    
    async function getAIResponse(message) {
        if (typeof CONFIG === 'undefined') {
            return await getFreeAIResponse(message);
        }
        
        const service = CONFIG.AI_SERVICE || 'free';
        
        // Try Groq first (free and fast)
        if (service === 'groq' && CONFIG.GROQ_API_KEY) {
            try {
                return await getGroqResponse(message);
            } catch (err) {
                console.error('Groq error:', err);
                // Fallback to free mode
            }
        }
        
        // Try Hugging Face (works without API key too)
        if (service === 'huggingface') {
            try {
                return await getHuggingFaceResponse(message);
            } catch (err) {
                console.error('Hugging Face error:', err);
            }
        }
        
        // Try Gemini
        if (service === 'gemini' && CONFIG.GEMINI_API_KEY) {
            try {
                return await getGeminiResponse(message);
            } catch (err) {
                console.error('Gemini error:', err);
            }
        }
        
        // Try OpenAI
        if (service === 'openai' && CONFIG.OPENAI_API_KEY) {
            try {
                return await getOpenAIResponse(message);
            } catch (err) {
                console.error('OpenAI error:', err);
            }
        }
        
        // Fallback to free mode
        return await getFreeAIResponse(message);
    }
    
    // Groq API (FREE - Fast & Generous)
    async function getGroqResponse(message) {
        const apiKey = CONFIG.GROQ_API_KEY;
        
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant', // Fast and free model
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful and friendly cooking assistant. Provide clear, concise, and practical cooking advice, recipe suggestions, and tips. Be conversational and encouraging. Keep responses under 500 words.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error('Groq API error');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
    
    // Hugging Face Inference API (FREE - No API key needed for basic use)
    async function getHuggingFaceResponse(message) {
        const apiKey = CONFIG.HUGGINGFACE_API_KEY || '';
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (apiKey) {
            headers['Authorization'] = `Bearer ${apiKey}`;
        }
        
        const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                inputs: {
                    past_user_inputs: [],
                    generated_responses: [],
                    text: `You are a cooking assistant. ${message}`
                }
            })
        });
        
        if (!response.ok) {
            // Try alternative model
            const altResponse = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-base', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    inputs: `Cooking question: ${message}`
                })
            });
            
            if (!altResponse.ok) {
                throw new Error('Hugging Face API error');
            }
            
            const altData = await altResponse.json();
            return altData[0]?.generated_text || 'I apologize, but I had trouble processing that. Could you rephrase your cooking question?';
        }
        
        const data = await response.json();
        return data.generated_text || 'I\'m here to help with cooking questions! What would you like to know?';
    }
    
    // Google Gemini API (FREE Tier)
    async function getGeminiResponse(message) {
        const apiKey = CONFIG.GEMINI_API_KEY;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a helpful cooking assistant. Answer this question about cooking: ${message}`
                    }]
                }]
            })
        });
        
        if (!response.ok) {
            throw new Error('Gemini API error');
        }
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }
    
    async function getOpenAIResponse(message) {
        const apiKey = typeof CONFIG !== 'undefined' ? CONFIG.OPENAI_API_KEY : '';
        const model = typeof CONFIG !== 'undefined' ? CONFIG.OPENAI_MODEL : 'gpt-3.5-turbo';
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful and friendly cooking assistant. Provide clear, concise, and practical cooking advice, recipe suggestions, and tips. Be conversational and encouraging.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error('OpenAI API error');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
    
    // Helper function to extract dish name from message
    function extractDishName(msg) {
        const patterns = [
            /(?:how to make|how to cook|recipe for|ingredients for|how do i make|how do i cook)\s+(.+)/i,
            /make\s+(.+?)(?:\s+recipe|\s+with|$)/i,
            /cook\s+(.+?)(?:\s+recipe|\s+with|$)/i
        ];
        
        for (const pattern of patterns) {
            const match = msg.match(pattern);
            if (match && match[1]) {
                return match[1].trim().replace(/\?/g, '');
            }
        }
        
        if (msg.length < 50 && !msg.includes('?') && !msg.includes('how')) {
            return msg.trim();
        }
        
        return null;
    }
    
    async function getFreeAIResponse(message) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
        
        const lowerMessage = message.toLowerCase();
        
        // Check if it's a recipe request that might be in our database or API
        const recipeKeywords = ['recipe', 'how to make', 'how to cook', 'how do i make', 'how do i cook', 'ingredients for', 'steps to make'];
        const isRecipeRequest = recipeKeywords.some(keyword => lowerMessage.includes(keyword));
        
        if (isRecipeRequest) {
            // Try to fetch from API first
            const dishName = extractDishName(message);
            if (dishName) {
                try {
                    const response = await fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(dishName)}`);
                    const data = await response.json();
                    
                    if (data.meals && data.meals.length > 0) {
                        const meal = data.meals[0];
                        const ingredients = extractIngredients(meal);
                        const instructions = formatInstructions(meal.strInstructions || '');
                        
                        return `Here's how to make **${meal.strMeal}**:\n\n**Ingredients:**\n${ingredients.map((ing, i) => `${i + 1}. ${ing}`).join('\n')}\n\n**Instructions:**\n${instructions.map((step, i) => `${i + 1}. ${step}`).join('\n\n')}\n\n${meal.strArea ? `**Cuisine:** ${meal.strArea}` : ''}${meal.strCategory ? `\n**Category:** ${meal.strCategory}` : ''}`;
                    }
                } catch (err) {
                    console.error('Error fetching recipe:', err);
                }
            }
            
            // Check local recipes
            if (typeof indianKeralaRecipes !== 'undefined' && dishName) {
                const localRecipe = indianKeralaRecipes.find(recipe => 
                    recipe.name.toLowerCase().includes(dishName.toLowerCase())
                );
                
                if (localRecipe) {
                    const ingredients = Array.isArray(localRecipe.ingredients) ? localRecipe.ingredients : [localRecipe.ingredients];
                    const steps = Array.isArray(localRecipe.instructions) ? localRecipe.instructions : [localRecipe.instructions];
                    
                    return `Here's how to make **${localRecipe.name}**:\n\n**Ingredients:**\n${ingredients.map((ing, i) => `${i + 1}. ${ing}`).join('\n')}\n\n**Instructions:**\n${steps.map((step, i) => `${i + 1}. ${step}`).join('\n\n')}\n\n**Cuisine:** ${localRecipe.cuisine || localRecipe.category}${localRecipe.restaurant ? `\n**Style:** ${localRecipe.restaurant}` : ''}`;
                }
            }
        }
        
        // Basic cooking techniques
        if (lowerMessage.includes('boil') && lowerMessage.includes('egg')) {
            return `**How to Boil Eggs Perfectly:**\n\n**Soft Boiled (6-7 minutes):**\n1. Bring water to a rolling boil\n2. Gently lower eggs into boiling water\n3. Cook for 6-7 minutes for runny yolk\n4. Immediately transfer to ice water to stop cooking\n\n**Medium Boiled (8-9 minutes):**\n1. Follow same steps but cook for 8-9 minutes\n2. Yolk will be slightly soft but not runny\n\n**Hard Boiled (10-12 minutes):**\n1. Bring water to boil\n2. Add eggs and cook for 10-12 minutes\n3. Transfer to ice water immediately\n4. Peel when cool\n\n**Tips:**\n• Use room temperature eggs for easier peeling\n• Add a pinch of salt to prevent cracking\n• Start timing when water returns to boil\n• Ice bath stops cooking and makes peeling easier`;
        }
        
        if (lowerMessage.includes('cook rice') || lowerMessage.includes('make rice') || lowerMessage.includes('boil rice')) {
            return `**How to Cook Perfect Rice:**\n\n**Basic Method:**\n1. Rinse rice until water runs clear (removes excess starch)\n2. Use ratio: 1 cup rice to 1.5-2 cups water (adjust for rice type)\n3. Bring water to boil, add rice and salt\n4. Reduce heat to low, cover tightly\n5. Cook for 15-20 minutes (white rice) or 40-45 minutes (brown rice)\n6. Remove from heat, let sit covered for 5-10 minutes\n7. Fluff with fork before serving\n\n**Tips:**\n• Don't peek while cooking - steam is important\n• Basmati rice: 1:1.5 ratio, soak 30 minutes first\n• Jasmine rice: 1:1.25 ratio\n• Brown rice needs more water and time\n• Let it rest after cooking for best texture`;
        }
        
        if (lowerMessage.includes('cook pasta') || lowerMessage.includes('boil pasta')) {
            return `**How to Cook Pasta Perfectly:**\n\n**Steps:**\n1. Use large pot with plenty of water (4-6 quarts per pound)\n2. Add salt when water boils (should taste like sea water)\n3. Add pasta when water is at rolling boil\n4. Stir immediately to prevent sticking\n5. Cook according to package time, but start checking 2 minutes early\n6. Pasta should be "al dente" - slightly firm to bite\n7. Reserve 1 cup pasta water before draining\n8. Don't rinse pasta (unless making cold salad)\n9. Toss with sauce immediately while hot\n\n**Tips:**\n• Never add oil to water - prevents sauce from sticking\n• Save pasta water - it's liquid gold for sauces\n• Fresh pasta cooks much faster (2-4 minutes)\n• Test by tasting, not just timing\n• Toss pasta with sauce in the pan, not on the plate`;
        }
        
        if (lowerMessage.includes('chop') || lowerMessage.includes('cut') || lowerMessage.includes('dice')) {
            return `**Basic Knife Skills:**\n\n**Dice (small cubes):**\n1. Cut into planks, then sticks, then cubes\n2. Keep tip of knife on cutting board\n3. Use rocking motion with knife\n\n**Julienne (matchsticks):**\n1. Cut into thin slices\n2. Stack slices and cut into thin strips\n\n**Mince (very fine):**\n1. Chop roughly first\n2. Use back-and-forth motion\n3. Keep going until very fine\n\n**Chiffonade (for herbs/leaves):**\n1. Stack leaves\n2. Roll tightly\n3. Slice thinly across the roll\n\n**Safety Tips:**\n• Keep knives sharp (dull knives are dangerous)\n• Use proper cutting board\n• Curl fingers under when holding food\n• Always cut away from your body`;
        }
        
        if (lowerMessage.includes('marinate') || lowerMessage.includes('marination')) {
            return `**How to Marinate Properly:**\n\n**Basic Steps:**\n1. Choose acidic base (lemon, vinegar, yogurt) + oil + spices\n2. Mix marinade ingredients well\n3. Place meat/vegetables in non-reactive container (glass, ceramic, plastic)\n4. Cover completely with marinade\n5. Refrigerate (never marinate at room temperature)\n6. Marinate times:\n   • Fish: 15-30 minutes\n   • Chicken: 2-4 hours\n   • Beef/Pork: 4-12 hours\n   • Vegetables: 30 minutes - 2 hours\n\n**Tips:**\n• Don't over-marinate (can make meat mushy)\n• Pat dry before cooking for better browning\n• Don't reuse marinade that touched raw meat\n• Add salt at the end or it will draw out moisture\n• Use zip-lock bags for easy marinating`;
        }
        
        if (lowerMessage.includes('season') || lowerMessage.includes('spice')) {
            return `**Seasoning Basics:**\n\n**Essential Spices:**\n• Salt - enhances all flavors\n• Black pepper - adds heat and depth\n• Garlic powder - savory flavor\n• Onion powder - sweet, savory base\n• Paprika - color and mild heat\n• Cumin - earthy, warm flavor\n• Coriander - citrusy, fresh\n• Turmeric - earthy, yellow color\n\n**When to Season:**\n• Salt meat 40 minutes before cooking (or right before)\n• Season vegetables while cooking\n• Taste and adjust as you cook\n• Add fresh herbs at the end\n\n**Tips:**\n• Toast whole spices before grinding for more flavor\n• Build layers of flavor (start with aromatics)\n• Don't be afraid of salt - it's essential\n• Fresh herbs vs dried: 3:1 ratio (3x fresh = 1x dried)`;
        }
        
        if (lowerMessage.includes('substitute') || lowerMessage.includes('replace') || lowerMessage.includes('instead')) {
            if (lowerMessage.includes('egg')) {
                return `Great question! Here are excellent egg substitutes for baking:\n\n**For binding:**\n• 1/4 cup applesauce = 1 egg\n• 1/4 cup mashed banana = 1 egg\n• 1 tablespoon ground flaxseed + 3 tablespoons water = 1 egg\n\n**For leavening:**\n• 1 teaspoon baking powder + 1 tablespoon vinegar + 1 tablespoon water = 1 egg\n• Commercial egg replacer (follow package instructions)\n\n**For moisture:**\n• 1/4 cup yogurt or buttermilk = 1 egg\n• 1/4 cup silken tofu (blended) = 1 egg\n\nFor savory dishes, you can use aquafaba (chickpea water) or mashed avocado.`;
            }
            if (lowerMessage.includes('butter')) {
                return `Here are great butter substitutes:\n\n**For baking:**\n• Coconut oil (1:1 ratio)\n• Vegetable oil (use 3/4 cup for every 1 cup butter)\n• Applesauce (for reduced fat, use 1/2 cup for 1 cup butter)\n\n**For cooking:**\n• Olive oil\n• Avocado oil\n• Ghee (clarified butter)\n\n**For spreading:**\n• Margarine\n• Nut butters\n• Avocado`;
            }
            if (lowerMessage.includes('milk')) {
                return `Milk substitutes for cooking and baking:\n\n**Non-dairy options:**\n• Almond milk (1:1 ratio)\n• Oat milk (great for creamy textures)\n• Coconut milk (richer, use in moderation)\n• Soy milk (high protein)\n\n**For baking specifically:**\n• Buttermilk: 1 cup milk + 1 tablespoon lemon juice/vinegar\n• Heavy cream: 3/4 cup milk + 1/3 cup butter\n\nAll work well in most recipes!`;
            }
            return `I can help with substitutions! Common ingredient swaps:\n\n• **Eggs:** Applesauce, banana, or flaxseed\n• **Butter:** Coconut oil, olive oil, or margarine\n• **Milk:** Almond, oat, or soy milk\n• **Flour:** Almond flour, coconut flour (adjust ratios)\n• **Sugar:** Honey, maple syrup, or stevia\n\nWhat specific ingredient would you like to substitute?`;
        }
        
        if (lowerMessage.includes('pasta') || lowerMessage.includes('spaghetti') || lowerMessage.includes('noodles')) {
            return `Here are some amazing pasta tips:\n\n**Cooking perfect pasta:**\n1. Use plenty of salted boiling water (tastes like the sea)\n2. Don't add oil to the water - it prevents sauce from sticking\n3. Cook until al dente (slightly firm to the bite)\n4. Save pasta water! It's liquid gold for sauces\n5. Don't rinse pasta (unless making cold salad)\n\n**Sauce tips:**\n• Toss pasta with sauce in the pan, not on the plate\n• Add a splash of pasta water to help sauce cling\n• Finish with fresh herbs, cheese, or a drizzle of olive oil\n\n**Pro tip:** Heat your serving bowl with hot water before adding pasta - keeps it warm longer!`;
        }
        
        if (lowerMessage.includes('easy') || lowerMessage.includes('simple') || lowerMessage.includes('quick')) {
            return `Here are some easy dinner ideas:\n\n**30-minute meals:**\n• One-pan chicken and vegetables\n• Pasta with garlic and olive oil (aglio e olio)\n• Stir-fry with your favorite protein\n• Sheet pan salmon with vegetables\n• Quesadillas with fillings\n\n**15-minute meals:**\n• Scrambled eggs with toast\n• Grilled cheese with tomato soup\n• Simple pasta with jarred sauce\n• Avocado toast with eggs\n• Smoothie bowls\n\n**Tips for easy cooking:**\n• Prep ingredients ahead of time\n• Use one-pan or sheet pan methods\n• Keep pantry staples on hand\n• Don't be afraid of simple recipes - they're often the best!`;
        }
        
        if (lowerMessage.includes('healthy') || lowerMessage.includes('nutrition')) {
            return `Here are healthy cooking tips:\n\n**Cooking methods:**\n• Steam, bake, grill, or roast instead of frying\n• Use herbs and spices instead of salt\n• Choose lean proteins (chicken, fish, beans)\n\n**Ingredient swaps:**\n• Greek yogurt instead of sour cream\n• Whole grain instead of white flour\n• Zucchini noodles instead of pasta\n• Cauliflower rice instead of white rice\n\n**Portion control:**\n• Fill half your plate with vegetables\n• Use smaller plates\n• Eat slowly and mindfully\n\n**Meal prep:**\n• Prep vegetables on weekends\n• Cook grains in bulk\n• Make healthy snacks accessible\n\nRemember: Healthy eating is about balance, not perfection!`;
        }
        
        if (lowerMessage.includes('tip') || lowerMessage.includes('trick') || lowerMessage.includes('advice')) {
            return `Here are my favorite cooking tips:\n\n**General tips:**\n• Taste as you cook - adjust seasoning gradually\n• Keep your knives sharp - makes everything easier\n• Read the entire recipe before starting\n• Prep all ingredients first (mise en place)\n• Don't overcrowd the pan when searing\n\n**Flavor enhancement:**\n• Add a pinch of salt to sweet dishes\n• Finish with fresh herbs or a squeeze of lemon\n• Toast spices before using for deeper flavor\n• Use quality ingredients - they make a difference\n\n**Time savers:**\n• Cook in batches and freeze portions\n• Use a slow cooker or pressure cooker\n• Prep vegetables while something else cooks\n• Clean as you go\n\n**Pro tip:** Keep a small notebook to record what works and what doesn't!`;
        }
        
        if (lowerMessage.includes('recipe') || lowerMessage.includes('make') || lowerMessage.includes('cook')) {
            return `I'd love to help you with recipes! Here's what I can do:\n\n**I can help you:**\n• Find recipes based on ingredients you have\n• Suggest recipe modifications\n• Provide cooking techniques\n• Answer specific cooking questions\n\n**Try asking me:**\n• "How do I make [dish name]?"\n• "What can I make with [ingredients]?"\n• "How do I improve [dish]?"\n• "What's the best way to cook [ingredient]?"\n\nYou can also use the Search and Ingredients tabs above to find specific recipes from our database!\n\nWhat would you like to cook today?`;
        }
        
        // More cooking techniques
        if (lowerMessage.includes('fry') || lowerMessage.includes('frying')) {
            return `**Frying Techniques:**\n\n**Shallow Frying:**\n• Use enough oil to cover half the food\n• Heat oil to 350-375°F (test with bread crumb)\n• Don't overcrowd the pan\n• Turn food halfway through\n\n**Deep Frying:**\n• Use enough oil to fully submerge food\n• Maintain temperature (350-375°F)\n• Fry in batches\n• Drain on paper towels\n\n**Pan Frying:**\n• Use medium-high heat\n• Add oil when pan is hot\n• Don't move food immediately (let it sear)\n• Flip only once when golden\n\n**Tips:**\n• Pat food dry before frying (prevents splatter)\n• Season before frying\n• Use thermometer for accurate temperature\n• Don't reuse oil too many times`;
        }
        
        if (lowerMessage.includes('bake') || lowerMessage.includes('baking')) {
            return `**Baking Basics:**\n\n**Temperature:**\n• Most baked goods: 350-375°F (175-190°C)\n• Bread: 400-450°F (200-230°C)\n• Cookies: 350-375°F\n• Cakes: 325-350°F\n\n**Tips:**\n• Preheat oven 15-20 minutes before baking\n• Use correct pan size (affects cooking time)\n• Don't open oven door too early\n• Rotate pans halfway for even baking\n• Test doneness with toothpick/skewer\n• Let baked goods cool before removing from pan\n\n**Common Issues:**\n• Over-browning: Cover with foil\n• Under-cooked: Lower temperature, longer time\n• Dry: Check oven temperature, don't overmix`;
        }
        
        if (lowerMessage.includes('grill') || lowerMessage.includes('grilling')) {
            return `**Grilling Tips:**\n\n**Preparation:**\n• Preheat grill 10-15 minutes\n• Clean grates when hot\n• Oil grates to prevent sticking\n• Pat food dry before grilling\n\n**Cooking:**\n• Don't move food immediately (let it sear)\n• Use direct heat for thin cuts\n• Use indirect heat for thick cuts\n• Flip only once (when it releases easily)\n• Use thermometer for meat\n\n**Temperatures:**\n• Chicken: 165°F\n• Beef (medium): 145°F\n• Pork: 145°F\n• Fish: 145°F\n\n**Tips:**\n• Let meat rest after grilling\n• Don't press down on burgers\n• Keep lid closed for even cooking`;
        }
        
        // General food questions
        if (lowerMessage.includes('temperature') || lowerMessage.includes('temp') || lowerMessage.includes('cook at')) {
            return `**Cooking Temperatures Guide:**\n\n**Oven Temperatures:**\n• Low: 250-300°F (120-150°C) - slow cooking\n• Medium: 325-375°F (160-190°C) - most baking\n• High: 400-450°F (200-230°C) - roasting, baking bread\n• Very High: 475-500°F (245-260°C) - pizza, quick roasting\n\n**Meat Internal Temperatures:**\n• Chicken/Turkey: 165°F (74°C)\n• Beef (rare): 125°F (52°C)\n• Beef (medium): 145°F (63°C)\n• Beef (well): 160°F (71°C)\n• Pork: 145°F (63°C)\n• Fish: 145°F (63°C)\n\n**Stovetop:**\n• Low: Simmer, gentle cooking\n• Medium: Most cooking\n• High: Searing, boiling\n\nAlways use a meat thermometer for accuracy!`;
        }
        
        if (lowerMessage.includes('store') || lowerMessage.includes('storage') || lowerMessage.includes('keep fresh')) {
            return `**Food Storage Tips:**\n\n**Refrigerator (40°F or below):**\n• Raw meat: 1-2 days\n• Cooked meat: 3-4 days\n• Leftovers: 3-4 days\n• Eggs: 3-5 weeks\n• Milk: Check expiration\n\n**Freezer (0°F or below):**\n• Raw meat: 3-6 months\n• Cooked meat: 2-3 months\n• Vegetables: 8-12 months\n• Bread: 2-3 months\n\n**Pantry (room temperature):**\n• Potatoes, onions: Cool, dark place\n• Tomatoes: Room temp until ripe\n• Bananas: Room temp\n• Bread: 2-3 days (or freeze)\n\n**Tips:**\n• Store raw meat on bottom shelf\n• Use airtight containers\n• Label with dates\n• Don't refreeze thawed food\n• When in doubt, throw it out!`;
        }
        
        // Default helpful response
        return `Thanks for your question! I'm here to help with:\n\n• Recipe suggestions and modifications\n• Cooking tips and techniques (boiling, frying, baking, grilling)\n• Ingredient substitutions\n• Food storage and safety\n• Meal planning ideas\n• Answering any cooking questions\n\n**Try asking me:**\n• "How to boil an egg?"\n• "How to cook rice?"\n• "How to marinate chicken?"\n• "Cooking temperatures?"\n• "How to make [dish name]?"\n• Or any specific cooking question!\n\nYou can also use the Search tab to find recipes by dish name (including Indian & Kerala dishes), or the Ingredients tab to find recipes based on what you have available.`;
    }
    
    // Contact Form Functionality
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            recipeName: document.getElementById('contact-recipe-name').value,
            cuisine: document.getElementById('contact-cuisine').value,
            ingredients: document.getElementById('contact-ingredients').value,
            instructions: document.getElementById('contact-instructions').value,
            notes: document.getElementById('contact-notes').value
        };
        
        // Show loading
        const submitBtn = contactForm.querySelector('.contact-submit-btn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Create email content
        const emailSubject = encodeURIComponent(`New Recipe Submission: ${formData.recipeName}`);
        const emailBody = encodeURIComponent(`
Recipe Name: ${formData.recipeName}
Cuisine Type: ${formData.cuisine || 'Not specified'}
Submitted by: ${formData.name}
Email: ${formData.email}

INGREDIENTS:
${formData.ingredients}

INSTRUCTIONS:
${formData.instructions}

ADDITIONAL NOTES:
${formData.notes || 'None'}
        `);
        
        // Open email client
        const mailtoLink = `mailto:desirecipe62@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        window.location.href = mailtoLink;
        
        // Show success message
        setTimeout(() => {
            contactMessage.innerHTML = `
                <div class="success-message">
                    <strong>✓ Thank you!</strong>
                    <p>Your email client should open. If it doesn't, please send your recipe to: <strong>desirecipe62@gmail.com</strong></p>
                    <p style="margin-top: 10px; font-size: 0.9em;">We'll review your recipe and add it to our collection!</p>
                </div>
            `;
            contactForm.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 500);
    });
});
