
package com.prepconnect.prepconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PrepconnectApplication {

    public static void main(String[] args) {

        SpringApplication.run(
                PrepconnectApplication.class,
                args
        );
    }
}
