package com.maven.Services;

import com.maven.Model.Role;
import com.maven.Model.User;
import com.maven.Model.dtos.UserDto;
import com.maven.exception.InvalidCredentialsException;
import com.maven.exception.ResourceNotFoundException;
import com.maven.exception.UserNameAlreadyExistsException;

import java.util.List;
public interface IUserService {
    User addUser(User user) throws UserNameAlreadyExistsException;

    Role addRole(Role role);

    User login(User user) throws InvalidCredentialsException;

    List<UserDto> getAllUser();

    User updateUser(User user) throws ResourceNotFoundException;

    String deleteUser(Long userId);

}
