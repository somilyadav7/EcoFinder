package com.example.backend.Service;

import com.example.backend.Entity.Order;
import com.example.backend.Payload.OrderDto;
import com.example.backend.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order createOrder(String username, OrderDto orderDto) {
        Order order = new Order();
        order.setModel(orderDto.getModel());
        order.setPhone(orderDto.getPhone());
        order.setDate(orderDto.getDate());
        order.setPrice(orderDto.getPrice());
        order.setFacility(orderDto.getFacility());
        order.setUsername(username);
        order.setLocation(orderDto.getLocation());
        order.setCategory(orderDto.getCategory());
        order.setStatus("Order Booked");  // Set initial status

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUsername(String username) {
        return orderRepository.findByUsername(username);
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }

    public Order updateOrder(String id, OrderDto orderDto) {
        Optional<Order> optionalOrder = orderRepository.findById(id);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setModel(orderDto.getModel());
            order.setPhone(orderDto.getPhone());
            order.setDate(orderDto.getDate());
            order.setPrice(orderDto.getPrice());
            order.setFacility(orderDto.getFacility());
            order.setCategory(orderDto.getCategory());
            order.setLocation(orderDto.getLocation());
            // Do not overwrite the status unless it's provided in the orderDto
            if (orderDto.getStatus() != null) {
                order.setStatus(orderDto.getStatus());
            }

            return orderRepository.save(order);
        } else {
            throw new RuntimeException("Order not found with id " + id);
        }
    }

    public Order getOrderById(String id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }
}
