package com.maven.Controller;

import com.maven.Model.AdminGroups;
import com.maven.Model.User;
import com.maven.Model.UserPermission;
import com.maven.Services.IAdminGroupsService;
import com.maven.Services.IPermissionService;
import com.maven.Services.IUserService;
import com.maven.Model.dtos.UserDto;
import com.maven.exception.InvalidCredentialsException;
import com.maven.exception.ResourceNotFoundException;
import com.maven.exception.UserNameAlreadyExistsException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/taskmgt")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private IAdminGroupsService adminGroupsService;

    @Autowired
    private IPermissionService permissionService;

    @Autowired
    private IUserService userService;


    @PostConstruct
    public void createAdmin() throws UserNameAlreadyExistsException {
        User user=new User();
        user.setFirstName("Super");
        user.setLastName("Admin");
        user.setEmail("superadmin@gmail.com");
        user.setContact("7058613500");
        user.setPassword("superadmin123");
        try {
            String imagePath = "/static/admin.jpg";
            ClassPathResource imgFile = new ClassPathResource(imagePath);
            byte[] imageBytes = StreamUtils.copyToByteArray(imgFile.getInputStream());
            user.setImage(imageBytes);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load admin image");
        }
        AdminGroups g = new AdminGroups();
        g.setId(1L);
        g.setGroup_name("SUPER_ADMIN");
        g.setDescription(("This is super admin group"));
        AdminGroups group = adminGroupsService.createGroup(g);
        user.setAdminGroups(group);
        Set<String> module_list = new HashSet<>();
        module_list.add("Admin");
        module_list.add("Admin Groups");
        module_list.add("Designations");
        module_list.add("Members");
        module_list.add("Categories");
        module_list.add("Project");
        module_list.add("Task");
        module_list.add("Productivities");
        module_list.add("Reports");
        module_list.add("Settings");
        final int[] id = {0};
        module_list.forEach(m->{
            id[0] += 1;
            UserPermission p = new UserPermission();
            p.setId(id[0]);
            p.setModules(m);
            p.setShowPermission(Boolean.TRUE);
            p.setCreatePermission(Boolean.TRUE);
            p.setEditPermission(Boolean.TRUE);
            p.setDeletePermission(Boolean.TRUE);
            p.setAdminGroups(group);
            permissionService.setPermissions(p);
        });

        userService.addUser(user);
    }

    @PostMapping("/addUser")
    public User addUser(@RequestParam("firstName") String firstName,
                        @RequestParam("lastName") String lastName,
                        @RequestParam("email") String email,
                        @RequestParam("contact")String contact,
                        @RequestParam("password")String password,
                        @RequestParam("groupId")Long groupId,
                        @RequestParam("image")MultipartFile image
                        ) throws UserNameAlreadyExistsException, IOException {


        User user=new User();

        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(password);
        user.setContact(contact);
        user.setDate(LocalDate.now().toString());
        user.setImage(image.getBytes());
        AdminGroups groupById = adminGroupsService.getGroupById(groupId);
        user.setAdminGroups(groupById);
        return userService.addUser(user);
    }


    @GetMapping("/getAllUser")
    public List<UserDto> getAllUser(){
        return userService.getAllUser();
    }


    @PostMapping("/login")
    public User login(@RequestBody User user) throws InvalidCredentialsException {
        return userService.login(user);
    }

    @PatchMapping("/updateUser")
    private ResponseEntity<?> updateUser(
            @RequestParam("id") Long id,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("contact")String contact,
            @RequestParam("password")String password,
            @RequestParam("groupId")Long groupId,
            @RequestParam("date")LocalDate date,
            @RequestParam("image")MultipartFile image
    ) throws IOException, ResourceNotFoundException {
        User user=new User();

        user.setId(id);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(password);
        user.setContact(contact);
        user.setDate(LocalDate.now().toString());
        user.setImage(image.getBytes());
        AdminGroups groupById = adminGroupsService.getGroupById(groupId);
        user.setAdminGroups(groupById);
        user.setDate(date.toString());
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @DeleteMapping("/deleteUser/{userId}")
    private ResponseEntity<?> deleteUser(@PathVariable Long userId){
       return ResponseEntity.ok(userService.deleteUser(userId));
    }

}
