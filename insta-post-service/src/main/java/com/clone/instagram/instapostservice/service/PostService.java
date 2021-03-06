package com.clone.instagram.instapostservice.service;

import com.clone.instagram.instapostservice.exception.NotAllowedException;
import com.clone.instagram.instapostservice.exception.ResourceNotFoundException;
import com.clone.instagram.instapostservice.messaging.PostEventSender;
import com.clone.instagram.instapostservice.model.Comment;
import com.clone.instagram.instapostservice.model.Post;
import com.clone.instagram.instapostservice.payload.CommentRequest;
import com.clone.instagram.instapostservice.payload.PostRequest;
import com.clone.instagram.instapostservice.repository.CommentRepository;
import com.clone.instagram.instapostservice.repository.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;


@Service
@Slf4j
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostEventSender postEventSender;

    public Post createPost(PostRequest postRequest) {
        log.info("creating post image url {}", postRequest.getImageUrl());

        Post post = new Post(postRequest.getImageUrl(), postRequest.getCaption());

        post = postRepository.save(post);
        postEventSender.sendPostCreated(post);

        log.info("post {} is saved successfully for user {}",
                post.getId(), post.getUsername());

        return post;
    }

    public void deletePost(String postId, String username) {
        log.info("deleting post {}", postId);

        postRepository
                .findById(postId)
                .map(post -> {
                    if(!post.getUsername().equals(username)) {
                        log.warn("user {} is not allowed to delete post id {}", username, postId);
                        throw new NotAllowedException(username, "post id " + postId, "delete");
                    }

                    postRepository.delete(post);
                    postEventSender.sendPostDeleted(post);
                    return post;
                })
                .orElseThrow(() -> {
                    log.warn("post not found id {}", postId);
                    return new ResourceNotFoundException(postId);
                });
    }

    public void likePost(String postId, String username) {
        log.info("user{} liking post {}", username, postId);

        postRepository
                .findById(postId)
                .map(post -> {
                    post.getLikerIds().add(username);
                    postRepository.save(post);
                    return post;
                })
                .orElseThrow(() -> {
                    log.warn("post not found id {}", postId);
                    return new ResourceNotFoundException(postId);
                });
    }

    public void unlikePost(String postId, String username) {
        log.info("user{} unliking post {}", username, postId);

        postRepository
                .findById(postId)
                .map(post -> {
                    post.getLikerIds().remove(username);
                    postRepository.save(post);
                    return post;
                })
                .orElseThrow(() -> {
                    log.warn("post not found id {}", postId);
                    return new ResourceNotFoundException(postId);
                });
    }

    public Comment createComment(CommentRequest commentRequest, String postId, String username) {
        log.info("creating comment {} for post {}", commentRequest.getComment(), postId);

        Comment comment = new Comment(commentRequest.getComment());

        comment = commentRepository.save(comment);

        Comment finalComment = comment;
        postRepository
                .findById(postId)
                .map(post -> {
                    post.getComments().add(finalComment);
                    postRepository.save(post);
                    postEventSender.sendPostUpdated(post);
                    return post;
                })
                .orElseThrow(() -> {
                    log.warn("post not found id {}", postId);
                    return new ResourceNotFoundException(postId);
                });

        log.info("comment {} for post {} is saved successfully for user {}",
                comment.getId(), postId, comment.getUsername());

        return comment;
    }

    public List<Post> postsByUsername(String username) {
        return postRepository.findByUsernameOrderByCreatedAtDesc(username);
    }

    public List<Post> postsByIdIn(List<String> ids) {
        return postRepository.findByIdInOrderByCreatedAtDesc(ids);
    }
}
