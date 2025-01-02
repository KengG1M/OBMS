package com.ecom.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecom.model.OrderCount;

@Repository
public interface OrderRepository extends JpaRepository<OrderCount, Integer> {

    @Query("SELECT o.product, COUNT(o) as orderCount " +
           "FROM OrderCount o " +
           "WHERE o.orderDate BETWEEN :startDate AND :endDate " +
           "GROUP BY o.product " +
           "ORDER BY orderCount DESC")
    List<Object[]> findPopularProducts(@Param("startDate") LocalDateTime startDate,
                                       @Param("endDate") LocalDateTime endDate);
}
