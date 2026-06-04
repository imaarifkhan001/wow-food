package com.wowfood.backend.repository;

import com.wowfood.backend.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FoodRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByCategory(String category);
}
