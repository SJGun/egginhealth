package com.egginhealth.data.repository;

import com.egginhealth.data.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findById(int id);
}
