package com.ohgiraffers.comprehensive.order.service;

import com.ohgiraffers.comprehensive.common.exception.ConflictException;
import com.ohgiraffers.comprehensive.common.exception.NotFoundException;
import com.ohgiraffers.comprehensive.common.exception.type.ExceptionCode;
import com.ohgiraffers.comprehensive.jwt.CustomUser;
import com.ohgiraffers.comprehensive.order.domain.Order;
import com.ohgiraffers.comprehensive.order.domain.repository.OrderRepository;
import com.ohgiraffers.comprehensive.order.dto.request.OrderCreateRequest;
import com.ohgiraffers.comprehensive.order.dto.response.OrderResponse;
import com.ohgiraffers.comprehensive.product.domain.Product;
import com.ohgiraffers.comprehensive.product.domain.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static com.ohgiraffers.comprehensive.common.exception.type.ExceptionCode.NOT_FOUND_STOCK;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderReqository;
    private final ProductRepository productRepository;

    public void save(OrderCreateRequest orderRequest, CustomUser customUser) {

        Product product = productRepository.findById(orderRequest.getProductCode()) //재고 확인
                .orElseThrow(() -> new NotFoundException(ExceptionCode.NOT_FOUND_PRODUCT_CODE));

        // 주문 가능 여부 확인
        if (product.getProductStock() < orderRequest.getOrderAmount()) {
            throw new ConflictException(NOT_FOUND_STOCK); //주문량보다 많이 시킬때를 위해 오류코드
        }

        // 재고 수정
        product.updateStock(orderRequest.getOrderAmount());

        final Order newOrder = Order.of(
                product,
                customUser.getMemberCode(),
                orderRequest.getOrderPhone(),
                orderRequest.getOrderEmail(),
                orderRequest.getOrderReceiver(),
                orderRequest.getOrderAddress(),
                orderRequest.getOrderAmount()
        );

        // 주문 저장
        orderReqository.save(newOrder);
    }

    private Pageable getPageable(final Integer page) {
        return PageRequest.of(page - 1, 5, Sort.by("orderCode").descending());
    }

    //주문목록 조회
    public Page<OrderResponse> getOrders(Integer page, CustomUser customUser) {

        Page<Order> orders = orderReqository.findByMemberCode(getPageable(page), customUser.getMemberCode());

        return orders.map(order -> OrderResponse.from(order));
    }
}
