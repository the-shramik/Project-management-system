package com.maven.Repository;

import com.maven.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {
    User getUserByEmailAndPassword(String email,String password);

    User findByEmail(String email);
}
