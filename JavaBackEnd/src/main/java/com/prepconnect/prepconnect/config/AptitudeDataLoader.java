package com.prepconnect.prepconnect.config;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prepconnect.prepconnect.entity.AptitudeQuestion;
import com.prepconnect.prepconnect.repository.AptitudeQuestionRepository;

@Component
public class AptitudeDataLoader implements CommandLineRunner {

    private final AptitudeQuestionRepository repository;

    public AptitudeDataLoader(AptitudeQuestionRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {

        // Don't import again if questions already exist
        if (repository.count() > 0) {

            System.out.println(
                    "Aptitude questions already exist: "
                    + repository.count()
            );

            return;
        }

        ObjectMapper objectMapper = new ObjectMapper();

        ClassPathResource resource =
                new ClassPathResource("data/aptitude.json");

        try (InputStream inputStream = resource.getInputStream()) {

            AptitudeQuestion[] questions =
                    objectMapper.readValue(
                            inputStream,
                            AptitudeQuestion[].class
                    );

            List<AptitudeQuestion> questionList =
                    Arrays.asList(questions);

            repository.saveAll(questionList);

            System.out.println(
                    "======================================"
            );

            System.out.println(
                    "Aptitude questions imported successfully!"
            );

            System.out.println(
                    "Total questions imported: "
                    + questionList.size()
            );

            System.out.println(
                    "======================================"
            );
        }
    }
}