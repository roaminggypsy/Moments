package com.clone.instagram.instagraphservice;

import com.clone.instagram.instagraphservice.messaging.UserEventStream;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableBinding(UserEventStream.class)
//@EnableNeo4jRepositories
//@EnableTransactionManagement
public class InstaGraphServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InstaGraphServiceApplication.class, args);
	}
}
