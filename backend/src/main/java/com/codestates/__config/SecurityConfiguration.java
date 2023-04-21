package com.codestates.__config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {


//      Todo: sameOrigin - 현재페이지의 출처(url)과 같은 경우에만 페이지렌더링 허용
//            csrf       - csrf 공격에 대한 보안 비활성화 설정
//            formLogin  - 기본로그인 페이지 사용 비활성화
//            httpBasic  - JWT토큰 사용을 위한 HTTP 기본인증방식 사용 비활성화

//      Todo: authenticationEntryPoint - 인증오류발생 시 처리하는 핸들러 설정
//            accessDeniedHandler      - 권한오류발생 시 처리하는 핸들러 설정
//            sessionCreationPolicy    - 세션관리방식을 STATELESS 지정하여 세션미사용 설정
//                                       (모든 요청은 인증토큰에 의해서만 인증됨)

//      Todo: formLogin  - 기본로그인 페이지 사용 비활성화
//            httpBasic  - JWT 토큰 사용을 위한 HTTP 기본인증방식 사용 비활성화


        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()

//Todo ----- 인증오류,권한오류 발생시 처리방법 설정부분 -----
//                .exceptionHandling()
//                .authenticationEntryPoint()
//                .accessDeniedHandler()

                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll());
        return http.build();

    }

    @Bean // 사용자 비밀번호를 암호화 하기 위한 PasswordEncoder 생성메서드를 Bean 으로 등록
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
        // CORS 설정로직으로, 요청을 허용할 Origin 과 HTTP Method 설정
        // CorsConfiguration 객체 : 모든 도메인의 요청을 허용, 아래 메서드에 대한 요청 허용
        // UrlBased...Source 객체 : CorsConfiguration 객체등록 및 CORS 설정을 등록할 URL 패턴지정
        CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}




