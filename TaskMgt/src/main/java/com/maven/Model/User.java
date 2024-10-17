package com.maven.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String contact;
    private String password;
    private String status;
    private String date;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;
    @ManyToOne
    private AdminGroups adminGroups;

}
