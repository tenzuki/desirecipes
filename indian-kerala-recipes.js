// Indian & Kerala Recipes Database
const indianKeralaRecipes = [
    // Kerala Special Dishes
    {
        name: "Kerala Fish Curry (Meen Curry)",
        category: "Kerala",
        type: "kerala",
        cuisine: "Kerala",
        vegetarian: false,
        restaurant: false,
        image: "",
        ingredients: [
            "500g fish (kingfish/pomfret)",
            "2 onions, sliced",
            "3 tomatoes, chopped",
            "2 green chilies, slit",
            "1 tbsp ginger-garlic paste",
            "1 tsp turmeric powder",
            "2 tsp red chili powder",
            "1 tsp coriander powder",
            "1/2 tsp fenugreek seeds",
            "1/2 cup coconut milk",
            "2 tbsp coconut oil",
            "Curry leaves",
            "Salt to taste"
        ],
        instructions: [
            "Clean and cut fish into medium pieces. Marinate with turmeric and salt.",
            "Heat coconut oil in a clay pot or kadai. Add fenugreek seeds and curry leaves.",
            "Add sliced onions and sauté until golden brown.",
            "Add ginger-garlic paste and green chilies. Cook for 2 minutes.",
            "Add tomatoes and cook until soft and mushy.",
            "Add turmeric, red chili powder, and coriander powder. Mix well.",
            "Add 2 cups of water and bring to a boil.",
            "Gently add fish pieces and cook for 8-10 minutes on medium heat.",
            "Add coconut milk and simmer for 5 minutes.",
            "Garnish with curry leaves and serve hot with rice."
        ],
        restaurant: "Traditional Kerala Style"
    },
    {
        name: "Kerala Beef Fry (Beef Ularthiyathu)",
        category: "Kerala",
        type: "kerala",
        cuisine: "Kerala",
        vegetarian: false,
        restaurant: false,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
        ingredients: [
            "500g beef, cut into small pieces",
            "2 large onions, sliced",
            "2 tbsp ginger-garlic paste",
            "2 green chilies, slit",
            "1 tsp turmeric powder",
            "2 tsp red chili powder",
            "1 tsp coriander powder",
            "1/2 tsp garam masala",
            "1/2 tsp fennel seeds",
            "1/2 tsp black pepper powder",
            "2 tbsp coconut oil",
            "Curry leaves",
            "Salt to taste"
        ],
        instructions: [
            "Marinate beef with turmeric, red chili powder, coriander powder, and salt for 30 minutes.",
            "Pressure cook beef with 1 cup water for 3-4 whistles until tender.",
            "Heat coconut oil in a pan. Add fennel seeds and curry leaves.",
            "Add sliced onions and sauté until golden brown.",
            "Add ginger-garlic paste and green chilies. Cook for 2 minutes.",
            "Add the cooked beef along with its stock.",
            "Cook on high heat until the gravy thickens and beef is well coated.",
            "Add garam masala and black pepper powder. Mix well.",
            "Fry until the beef is dry and slightly crispy.",
            "Garnish with curry leaves and serve hot."
        ],
        restaurant: "Traditional Kerala Style"
    },
    {
        name: "Kerala Appam with Stew",
        category: "Kerala",
        type: "kerala",
        cuisine: "Kerala",
        vegetarian: true,
        restaurant: true,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800",
        ingredients: [
            "2 cups raw rice",
            "1/2 cup cooked rice",
            "1/4 cup grated coconut",
            "1 tsp active dry yeast",
            "1 tsp sugar",
            "1/2 cup coconut milk",
            "Salt to taste",
            "For Stew: 2 cups mixed vegetables, 1 cup coconut milk, 2 onions, ginger, green chilies, curry leaves"
        ],
        instructions: [
            "Soak raw rice for 4-5 hours. Grind with cooked rice and coconut to a smooth batter.",
            "Dissolve yeast and sugar in warm water. Add to the batter.",
            "Ferment the batter for 6-8 hours. Add coconut milk and salt before cooking.",
            "Heat an appam pan. Pour a ladle of batter and swirl to spread.",
            "Cover and cook until edges are crispy and center is soft.",
            "For stew: Sauté onions, ginger, and green chilies. Add vegetables and cook.",
            "Add coconut milk and simmer. Season with salt and curry leaves.",
            "Serve hot appam with vegetable stew."
        ],
        restaurant: "Kerala Breakfast Special"
    },
    {
        name: "Kerala Puttu",
        category: "Kerala",
        type: "kerala",
        cuisine: "Kerala",
        vegetarian: true,
        restaurant: false,
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
        ingredients: [
            "2 cups rice flour",
            "1/2 cup grated coconut",
            "1 tsp salt",
            "Water as needed"
        ],
        instructions: [
            "Mix rice flour with salt. Sprinkle water and mix until it forms small granules.",
            "Layer the puttu maker: coconut, rice flour, coconut, rice flour.",
            "Steam for 5-7 minutes until cooked.",
            "Serve hot with kadala curry or banana."
        ],
        restaurant: "Traditional Kerala Breakfast"
    },
    {
        name: "Kerala Sadya (Full Meal)",
        category: "Kerala",
        type: "kerala",
        cuisine: "Kerala",
        vegetarian: true,
        restaurant: true,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        ingredients: [
            "Rice, Sambar, Avial, Thoran, Olan, Pachadi, Kichadi, Pickle, Papadam, Payasam"
        ],
        instructions: [
            "Prepare all dishes: Sambar, Avial, Thoran, Olan, Pachadi, Kichadi.",
            "Serve on a banana leaf: rice in the center, vegetables around it.",
            "Add pickle, papadam, and finish with payasam.",
            "Traditionally eaten with hands."
        ],
        restaurant: "Kerala Traditional Feast"
    },
    // Restaurant Style Indian Dishes
    {
        name: "Butter Chicken (Restaurant Style)",
        category: "Indian",
        type: "restaurant",
        cuisine: "Indian",
        vegetarian: false,
        restaurant: true,
        image: "",
        ingredients: [
            "500g chicken, boneless",
            "2 large onions, pureed",
            "4 tomatoes, pureed",
            "1/2 cup cashew paste",
            "2 tbsp butter",
            "1 tbsp cream",
            "1 tbsp ginger-garlic paste",
            "1 tsp garam masala",
            "1 tsp red chili powder",
            "1/2 tsp turmeric",
            "1 tsp kasuri methi",
            "Salt and sugar to taste"
        ],
        instructions: [
            "Marinate chicken with yogurt, ginger-garlic paste, and spices for 2 hours.",
            "Grill or pan-fry chicken until cooked. Set aside.",
            "Heat butter in a pan. Add onion puree and cook until golden.",
            "Add tomato puree and cook until oil separates.",
            "Add cashew paste and cook for 2 minutes.",
            "Add spices, salt, and sugar. Mix well.",
            "Add cream and kasuri methi. Simmer for 5 minutes.",
            "Add cooked chicken pieces. Simmer for 2 minutes.",
            "Garnish with cream and serve hot with naan or rice."
        ],
        restaurant: "North Indian Restaurant Style"
    },
    {
        name: "Biryani (Hyderabadi Style)",
        category: "Indian",
        type: "restaurant",
        cuisine: "Indian",
        vegetarian: false,
        restaurant: true,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800",
        ingredients: [
            "500g basmati rice",
            "500g chicken/mutton",
            "3 onions, sliced",
            "2 tomatoes, chopped",
            "1 cup yogurt",
            "2 tbsp biryani masala",
            "Saffron strands",
            "Mint and coriander leaves",
            "Ghee",
            "Whole spices (cardamom, cinnamon, cloves, bay leaves)"
        ],
        instructions: [
            "Marinate meat with yogurt, biryani masala, and spices for 2 hours.",
            "Cook rice until 70% done. Drain and set aside.",
            "Heat ghee. Add whole spices and sliced onions. Fry until golden.",
            "Add marinated meat and cook until tender.",
            "Layer in a heavy-bottomed pot: rice, meat, fried onions, mint, saffron milk.",
            "Repeat layers. Cover and cook on dum (low heat) for 20 minutes.",
            "Let it rest for 10 minutes before serving.",
            "Serve hot with raita and pickle."
        ],
        restaurant: "Hyderabadi Restaurant Style"
    },
    {
        name: "Paneer Tikka Masala",
        category: "Indian",
        type: "restaurant",
        cuisine: "Indian",
        vegetarian: true,
        restaurant: true,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
        ingredients: [
            "300g paneer, cubed",
            "2 bell peppers, cubed",
            "1 onion, cubed",
            "2 tomatoes, pureed",
            "1/2 cup cashew paste",
            "2 tbsp butter",
            "1 tbsp cream",
            "1 tsp garam masala",
            "1 tsp red chili powder",
            "1/2 tsp turmeric",
            "Yogurt for marination"
        ],
        instructions: [
            "Marinate paneer and vegetables in yogurt and spices for 1 hour.",
            "Grill or pan-fry until slightly charred. Set aside.",
            "Heat butter. Add tomato puree and cook until oil separates.",
            "Add cashew paste and spices. Cook for 2 minutes.",
            "Add cream and mix well. Simmer for 5 minutes.",
            "Add grilled paneer and vegetables. Simmer for 2 minutes.",
            "Garnish with cream and coriander. Serve hot."
        ],
        restaurant: "North Indian Restaurant Style"
    },
    {
        name: "Kerala Parotta with Chicken Curry",
        category: "Kerala",
        type: "restaurant",
        cuisine: "Kerala",
        vegetarian: false,
        restaurant: true,
        image: "",
        ingredients: [
            "3 cups all-purpose flour",
            "2 eggs",
            "1/2 cup oil",
            "Salt and water",
            "For curry: 500g chicken, onions, tomatoes, spices, coconut milk"
        ],
        instructions: [
            "Knead flour with eggs, oil, salt, and water to a soft dough.",
            "Divide into balls. Roll each ball thin and fold like a fan.",
            "Coil the folded dough and roll again into a circle.",
            "Cook on a hot tawa with oil until golden and flaky.",
            "For curry: Cook chicken with onions, tomatoes, and spices.",
            "Add coconut milk and simmer. Season with curry leaves.",
            "Serve hot parotta with chicken curry."
        ],
        restaurant: "Kerala Restaurant Style"
    },
    {
        name: "Kerala Prawn Curry",
        category: "Kerala",
        type: "kerala",
        cuisine: "Kerala",
        vegetarian: false,
        restaurant: false,
        image: "",
        ingredients: [
            "500g prawns, cleaned",
            "1 cup coconut milk",
            "2 onions, sliced",
            "2 tomatoes, chopped",
            "1 tbsp ginger-garlic paste",
            "1 tsp turmeric",
            "2 tsp red chili powder",
            "1 tsp coriander powder",
            "1/2 tsp fenugreek seeds",
            "2 tbsp coconut oil",
            "Curry leaves",
            "Salt to taste"
        ],
        instructions: [
            "Marinate prawns with turmeric and salt for 15 minutes.",
            "Heat coconut oil. Add fenugreek seeds and curry leaves.",
            "Add onions and sauté until golden. Add ginger-garlic paste.",
            "Add tomatoes and cook until soft.",
            "Add spices and mix well. Add 1 cup water and bring to boil.",
            "Add prawns and cook for 5 minutes.",
            "Add coconut milk and simmer for 3 minutes.",
            "Garnish with curry leaves. Serve hot with rice."
        ],
        restaurant: "Traditional Kerala Style"
    },
    {
        name: "Kerala Avial",
        category: "Kerala",
        type: "kerala",
        cuisine: "Kerala",
        vegetarian: true,
        restaurant: false,
        image: "https://images.unsplash.com/photo-1512621772391-15325c7630f5?w=800",
        ingredients: [
            "Mixed vegetables (yam, plantain, beans, carrots, drumsticks)",
            "1 cup grated coconut",
            "2 green chilies",
            "1/2 tsp cumin seeds",
            "1 cup yogurt",
            "2 tbsp coconut oil",
            "Curry leaves",
            "Salt to taste"
        ],
        instructions: [
            "Cut vegetables into long pieces. Cook with salt and turmeric.",
            "Grind coconut, green chilies, and cumin to a coarse paste.",
            "Add the paste to cooked vegetables. Mix gently.",
            "Add yogurt and mix. Do not boil after adding yogurt.",
            "Heat coconut oil. Add curry leaves and pour over avial.",
            "Serve as part of sadya or with rice."
        ],
        restaurant: "Traditional Kerala Style"
    },
    {
        name: "Kerala Chicken Roast",
        category: "Kerala",
        type: "kerala",
        cuisine: "Kerala",
        vegetarian: false,
        restaurant: true,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
        ingredients: [
            "1 kg chicken, cut into pieces",
            "3 onions, sliced",
            "2 tomatoes, chopped",
            "2 tbsp ginger-garlic paste",
            "2 green chilies, slit",
            "1 tsp turmeric",
            "2 tsp red chili powder",
            "1 tsp coriander powder",
            "1/2 tsp garam masala",
            "2 tbsp coconut oil",
            "Curry leaves",
            "Salt to taste"
        ],
        instructions: [
            "Marinate chicken with turmeric, red chili powder, and salt for 30 minutes.",
            "Heat coconut oil in a pan. Add curry leaves.",
            "Add sliced onions and sauté until golden brown.",
            "Add ginger-garlic paste and green chilies. Cook for 2 minutes.",
            "Add tomatoes and cook until soft.",
            "Add marinated chicken and cook on high heat for 5 minutes.",
            "Reduce heat, cover and cook until chicken is tender.",
            "Remove lid and roast until dry and slightly charred.",
            "Add garam masala and mix. Serve hot."
        ],
        restaurant: "Kerala Restaurant Style"
    },
    {
        name: "Dal Makhani (Restaurant Style)",
        category: "Indian",
        type: "restaurant",
        cuisine: "Indian",
        vegetarian: true,
        restaurant: true,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800",
        ingredients: [
            "1 cup black urad dal",
            "1/4 cup rajma (kidney beans)",
            "2 onions, pureed",
            "2 tomatoes, pureed",
            "2 tbsp butter",
            "1/2 cup cream",
            "1 tbsp ginger-garlic paste",
            "1 tsp garam masala",
            "1 tsp red chili powder",
            "1 tsp kasuri methi",
            "Salt to taste"
        ],
        instructions: [
            "Soak dals overnight. Pressure cook until very soft.",
            "Heat butter. Add onion puree and cook until golden.",
            "Add tomato puree and cook until oil separates.",
            "Add ginger-garlic paste and spices. Mix well.",
            "Add cooked dal and mix. Simmer for 20 minutes.",
            "Add cream and kasuri methi. Mix well.",
            "Garnish with butter and cream. Serve hot with naan."
        ],
        restaurant: "North Indian Restaurant Style"
    }
];

// Function to get recipes by filter
function getFilteredRecipes(filter) {
    if (filter === 'all') {
        return indianKeralaRecipes;
    }
    
    return indianKeralaRecipes.filter(recipe => {
        if (filter === 'kerala') return recipe.type === 'kerala';
        if (filter === 'restaurant') return recipe.restaurant === true || recipe.type === 'restaurant';
        if (filter === 'vegetarian') return recipe.vegetarian === true;
        if (filter === 'non-vegetarian') return recipe.vegetarian === false;
        return true;
    });
}

