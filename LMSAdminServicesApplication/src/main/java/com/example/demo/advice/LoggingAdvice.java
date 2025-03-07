package com.example.demo.advice;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
 
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
 
@Aspect
@Component
@Order(1)
public class LoggingAdvice {
 
    private static final Logger log = LoggerFactory.getLogger(LoggingAdvice.class);
 
    ObjectMapper mapper = new ObjectMapper().registerModule(new Jdk8Module());
 
    @Pointcut(value = "execution(* com.example.demo.*.*.*(..))")
    public void myPointcut() {
    }
 
    @Before("myPointcut()")
    public void logMethodInvocation(JoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        Object[] array = joinPoint.getArgs();
 
log.info("Method invoked: {}.{}() with arguments: {}", className, methodName, mapper.writeValueAsString(array));
    }
 
    @AfterReturning(pointcut = "myPointcut()", returning = "result")
    public void logMethodResponse(JoinPoint joinPoint, Object result) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
 
log.info("Method response: {}.{}() with response: {}", className, methodName, mapper.writeValueAsString(result));
    }
 
    @AfterThrowing(pointcut = "myPointcut()", throwing = "exception")
    public void logAfterThrowing(JoinPoint joinPoint, Exception exception) throws JsonProcessingException {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        Object[] array = joinPoint.getArgs();
 
        log.error("Exception in {}.{}() with arguments: {}. Exception: {}", className, methodName, mapper.writeValueAsString(array), exception.getMessage(), exception);
    }
}