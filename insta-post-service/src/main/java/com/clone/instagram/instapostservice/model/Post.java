package com.clone.instagram.instapostservice.model;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;

@Data
@RequiredArgsConstructor
@Document
public class Post {

    @Id
    private String id;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @CreatedBy
    private String username;

    @LastModifiedBy
    private String lastModifiedBy;

    @NonNull
    private String imageUrl; //for now post will contain only one image

    @NonNull
    private String caption;

    //@NonNull
    private HashSet<String> likerIds = new HashSet<>();
}
