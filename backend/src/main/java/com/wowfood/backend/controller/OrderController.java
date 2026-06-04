package com.wowfood.backend.controller;

import com.wowfood.backend.model.FoodItem;
import com.wowfood.backend.model.FoodOrder;
import com.wowfood.backend.model.OrderItem;
import com.wowfood.backend.model.User;
import com.wowfood.backend.repository.FoodRepository;
import com.wowfood.backend.repository.OrderRepository;
import com.wowfood.backend.repository.UserRepository;
import com.wowfood.backend.security.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest orderRequest, HttpServletRequest request) {
        // Authenticate User from Authorization Header
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Authorization token is missing or invalid"));
        }

        String token = authHeader.substring(7);
        String email;
        try {
            email = jwtTokenUtil.getEmailFromToken(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Failed to parse token"));
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !jwtTokenUtil.validateToken(token, email)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Session expired or user not found"));
        }

        User user = userOpt.get();

        if (orderRequest.getAddress() == null || orderRequest.getAddress().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Address is required"));
        }
        if (orderRequest.getPhone() == null || orderRequest.getPhone().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Phone number is required"));
        }
        if (orderRequest.getItems() == null || orderRequest.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Cart cannot be empty"));
        }

        // Create FoodOrder object
        FoodOrder order = new FoodOrder();
        order.setUser(user);
        order.setAddress(orderRequest.getAddress().trim());
        order.setPhone(orderRequest.getPhone().trim());
        order.setOrderDate(LocalDateTime.now());

        double totalAmount = 0;
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequest itemReq : orderRequest.getItems()) {
            Optional<FoodItem> foodItemOpt = foodRepository.findById(itemReq.getFoodItemId());
            if (foodItemOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(new MessageResponse("Food item not found: ID " + itemReq.getFoodItemId()));
            }

            FoodItem foodItem = foodItemOpt.get();
            int quantity = itemReq.getQuantity() != null ? itemReq.getQuantity() : 1;
            double itemPrice = foodItem.getPrice();
            totalAmount += itemPrice * quantity;

            OrderItem orderItem = new OrderItem(order, foodItem, quantity, itemPrice);
            orderItems.add(orderItem);
        }

        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems);

        // Save order and cascading orderItems
        FoodOrder savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<?> getMyOrders(HttpServletRequest request) {
        // Authenticate User from Authorization Header
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Authorization token is missing or invalid"));
        }

        String token = authHeader.substring(7);
        String email;
        try {
            email = jwtTokenUtil.getEmailFromToken(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Failed to parse token"));
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !jwtTokenUtil.validateToken(token, email)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Session expired or user not found"));
        }

        User user = userOpt.get();
        List<FoodOrder> myOrders = orderRepository.findByUserOrderByOrderDateDesc(user);
        return ResponseEntity.ok(myOrders);
    }

    // Admin endpoint: Get all orders in the system
    @GetMapping("/all")
    public ResponseEntity<?> getAllOrders(HttpServletRequest request) {
        // Retrieve and return all orders (newest first by reversing or sorting in frontend)
        List<FoodOrder> allOrders = orderRepository.findAll();
        return ResponseEntity.ok(allOrders);
    }

    // Admin endpoint: Update order status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody StatusRequest statusRequest) {
        Optional<FoodOrder> orderOpt = orderRepository.findById(id);
        if (orderOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Order not found"));
        }

        FoodOrder order = orderOpt.get();
        String newStatus = statusRequest.getStatus();
        if (newStatus == null || newStatus.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Status is required"));
        }

        order.setStatus(newStatus.trim().toUpperCase());
        FoodOrder savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    // Static inner DTOs for placing orders
    public static class OrderRequest {
        private String address;
        private String phone;
        private List<OrderItemRequest> items;

        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public List<OrderItemRequest> getItems() { return items; }
        public void setItems(List<OrderItemRequest> items) { this.items = items; }
    }

    public static class OrderItemRequest {
        private Long foodItemId;
        private Integer quantity;

        public Long getFoodItemId() { return foodItemId; }
        public void setFoodItemId(Long foodItemId) { this.foodItemId = foodItemId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public static class StatusRequest {
        private String status;
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    public static class MessageResponse {
        private String message;
        public MessageResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
    }
}
