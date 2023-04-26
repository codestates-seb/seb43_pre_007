package com.codestates.email.repository;

import com.codestates.email.entity.EmailAuth;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.time.LocalDateTime;
import java.util.Optional;


//파라미터로 전송된 값과 DB의 값 비교하기
public class EmailAuthRepositoryImpl implements EmailAuthRepository {
    private final EntityManager entityManager;

    public EmailAuthRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Optional<EmailAuth> findAuthByEmail(String email, String authToken,
                                               LocalDateTime currentTime) {

        String query = "SELECT e FROM EmailAuth e WHERE e.email = :email AND e.authToken = :authToken AND e.expireDate >= :currentTime AND e.expired = false";
        TypedQuery<EmailAuth> typedQuery = entityManager.createQuery(query, EmailAuth.class);
        typedQuery.setParameter("email", email);
        typedQuery.setParameter("authToken", authToken);
        typedQuery.setParameter("currentTime", currentTime);
        EmailAuth emailAuth = typedQuery.getResultList().stream().findFirst().orElse(null);
        return Optional.ofNullable(emailAuth);
    }
}
