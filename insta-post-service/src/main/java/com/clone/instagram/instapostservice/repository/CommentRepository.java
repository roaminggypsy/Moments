package com.clone.instagram.instapostservice.repository;

import com.clone.instagram.instapostservice.model.Comment;
import com.clone.instagram.instapostservice.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface CommentRepository extends MongoRepository<Comment, String> {
}