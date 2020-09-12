package com.clone.instagram.instagraphservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableNeo4jRepositories(basePackages = "com.clone.instagram.instagraphservice.repository")
@EnableTransactionManagement // 激活SDN隐式事务
public class Neo4jConfig {
}
