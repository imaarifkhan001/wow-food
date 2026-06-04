package com.wowfood.backend.repository;

import com.wowfood.backend.model.FoodOrder;
import com.wowfood.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<FoodOrder, Long> {
    List<FoodOrder> findByUserOrderByOrderDateDesc(User user);
}
