package com.clone.instagram.instafeedservice.model;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.time.Instant;
import java.util.HashSet;


@Data
@Builder
@ToString
public class Post {

    private String id;
    private Instant createdAt;
    private String username;
    private String userProfilePic;
    private Instant updatedAt;
    private String lastModifiedBy;
    private String imageUrl;
    private String caption;
    private HashSet<String> likerIds;
    private boolean isLikedByCurrUser;
}
