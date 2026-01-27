package com.cipress.backend.config;

import com.cipress.backend.entity.AppConfig;
import com.cipress.backend.repository.AppConfigRepository;
import com.cipress.backend.entity.User;
import com.cipress.backend.repository.UserRepository;
import com.cipress.backend.entity.HeroHeading;
import com.cipress.backend.repository.HeroHeadingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Configuration
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private AppConfigRepository appConfigRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HeroHeadingRepository heroHeadingRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if seeding is already done
        if (appConfigRepository.existsById("INITIAL_SEED_DONE")) {
            System.out.println("✅ DataSeeder: Database already initialized. Skipping.");
            return;
        }

        System.out.println("⚡ DataSeeder: Empty database detected. Initializing default data...");

        seedUsers();
        seedHeroHeading();

        // Mark seeding as done
        AppConfig flag = new AppConfig();
        flag.setKey("INITIAL_SEED_DONE");
        flag.setValue("true");
        flag.setDescription("Flag to indicate that initial data seeding has been completed.");
        appConfigRepository.save(flag);

        System.out.println("🏁 DataSeeder: Initialization completed successfully.");
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@cipress.cl");
            admin.setPasswordHash("admin123"); // Note: In production, use BCrypt
            admin.setRole("ADMIN");
            admin.setCreatedAt(LocalDateTime.now());
            userRepository.save(admin);
            System.out.println("   + Created default Admin User");
        }
    }

    private void seedHeroHeading() {
        if (heroHeadingRepository.count() == 0) {
            HeroHeading heading = new HeroHeading();
            heading.setMainText("El Círculo de Periodistas de Santiago");
            heading.setSubText(
                    "Un espacio para la innovación, el aprendizaje y el encuentro de los profesionales de la comunicación.");
            heroHeadingRepository.save(heading);
            System.out.println("   + Created default Hero Heading");
        }
    }

    // NOTE: Add more seed methods here for other entities as needed
}
