package com.wowfood.backend.util;

import com.wowfood.backend.model.FoodItem;
import com.wowfood.backend.repository.FoodRepository;
import com.wowfood.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public void run(String... args) throws Exception {
        // Dynamically update the wrap image URL in the database if it already exists
        foodRepository.findAll().forEach(item -> {
            if ("Grilled Paneer Tikka Wrap".equals(item.getName())) {
                item.setImageUrl("https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&auto=format&fit=crop&q=80");
                foodRepository.save(item);
            }
            if ("Tawa Handi Paneer".equals(item.getName())) {
                item.setImageUrl("https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80");
                foodRepository.save(item);
            }
            if ("Punjabi Sweet Lassi".equals(item.getName())) {
                item.setImageUrl("https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80");
                foodRepository.save(item);
            }
        });

        if (foodRepository.count() == 0) {
            List<FoodItem> defaultFoods = Arrays.asList(
                // Fast Food
                new FoodItem(
                    "Wow Double Cheeseburger",
                    "Fast Food",
                    189.0,
                    "Double flame-grilled patties, double melted Cheddar cheese, fresh lettuce, tomatoes, and our signature Wow sauce in a toasted brioche bun.",
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
                    4.8
                ),
                new FoodItem(
                    "Peri Peri Crispy Fries",
                    "Fast Food",
                    120.0,
                    "Golden, crispy french fries seasoned with spicy peri-peri mix. Served with a side of creamy garlic mayonnaise.",
                    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
                    4.5
                ),
                new FoodItem(
                    "Spicy Buffalo Chicken Wings",
                    "Fast Food",
                    249.0,
                    "Crispy fried chicken wings tossed in our signature hot buffalo sauce, served with a blue cheese dip and celery sticks.",
                    "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop&q=80",
                    4.7
                ),
                new FoodItem(
                    "Grilled Paneer Tikka Wrap",
                    "Fast Food",
                    160.0,
                    "Tandoori-spiced paneer cubes grilled to perfection, rolled in a soft tortilla with crisp cabbage, onions, and spicy mint chutney.",
                    "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&auto=format&fit=crop&q=80",
                    4.6
                ),
                new FoodItem(
                    "Tandoori Paneer Tikka",
                    "Fast Food",
                    199.0,
                    "Cottage cheese chunks marinated in spiced yogurt, grilled in a clay oven with onions and bell peppers. Served with mint dip.",
                    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80",
                    4.8
                ),

                // Main Course
                new FoodItem(
                    "Butter Chicken & Butter Naan Combo",
                    "Main Course",
                    349.0,
                    "Boneless tandoori chicken cooked in a rich, buttery, and creamy tomato gravy. Served with 2 fresh, fluffy butter naans.",
                    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80",
                    4.9
                ),
                new FoodItem(
                    "Paneer Butter Masala & Jeera Rice",
                    "Main Course",
                    299.0,
                    "Fresh cottage cheese cubes in a luscious tomato-onion butter gravy, served alongside aromatic jeera (cumin) rice.",
                    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
                    4.7
                ),
                new FoodItem(
                    "Dal Makhani with Garlic Naan",
                    "Main Course",
                    260.0,
                    "Slow-cooked black lentils and red kidney beans simmered overnight with butter and cream. Served with fresh garlic naan.",
                    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
                    4.8
                ),
                new FoodItem(
                    "Hyderabadi Veg Biryani",
                    "Main Course",
                    220.0,
                    "Fragrant long-grain basmati rice layered with spiced vegetables, saffron, and caramelized onions, cooked on 'dum'. Served with raita.",
                    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
                    4.7
                ),
                new FoodItem(
                    "Special Chicken Biryani",
                    "Main Course",
                    280.0,
                    "Succulent chicken pieces marinated in yogurt and spices, slow-cooked in layers of aromatic basmati rice and herbs. Served with salan.",
                    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80",
                    4.9
                ),
                new FoodItem(
                    "Tawa Handi Paneer",
                    "Main Course",
                    260.0,
                    "Soft cottage cheese cubes cooked in a traditional handi gravy with freshly ground whole spices, capsicum, and thick onion sauce.",
                    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
                    4.6
                ),
                new FoodItem(
                    "Desi Handi Chicken",
                    "Main Course",
                    320.0,
                    "Tender bone-in chicken slow-cooked in a sealed clay handi with rich Indian spices, ginger, garlic, and tomato-based masala.",
                    "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80",
                    4.8
                ),

                // Drinks
                new FoodItem(
                    "Aromatic Masala Chai",
                    "Drinks",
                    49.0,
                    "Strong brewed tea with milk and infused with freshly crushed green cardamom, ginger, cloves, and cinnamon.",
                    "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
                    4.9
                ),
                new FoodItem(
                    "Cold Coffee with Vanilla Ice Cream",
                    "Drinks",
                    129.0,
                    "Rich blended espresso, milk, and chocolate syrup topped with a scoop of premium vanilla ice cream and chocolate shavings.",
                    "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
                    4.7
                ),
                new FoodItem(
                    "Sweet Mango Lassi",
                    "Drinks",
                    99.0,
                    "A thick and creamy traditional yogurt drink blended with sweet Alphonanso mango pulp and garnished with saffron strands.",
                    "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80",
                    4.6
                ),
                new FoodItem(
                    "Refreshing Masala Chaach",
                    "Drinks",
                    39.0,
                    "A light, salted buttermilk spiced with roasted cumin powder, black salt, fresh coriander, and green chillies.",
                    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80",
                    4.5
                ),
                new FoodItem(
                    "Punjabi Sweet Lassi",
                    "Drinks",
                    69.0,
                    "Thick, rich, churned yogurt drink sweetened with sugar and flavored with green cardamom. Topped with a layer of fresh malai.",
                    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
                    4.7
                ),
                new FoodItem(
                    "Sparkling Fresh Lime Soda",
                    "Drinks",
                    79.0,
                    "Refreshing soda mixed with fresh lime juice, mint leaves, sugar, and black salt for a perfect sweet & salty twist.",
                    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
                    4.4
                )
            );
            foodRepository.saveAll(defaultFoods);
            System.out.println(">> Database pre-seeded with updated Wow Food items!");
        } else {
            System.out.println(">> Database already contains updated food items. Seeding skipped.");
        }
    }
}
