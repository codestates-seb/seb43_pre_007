package com.codestates.__config;

import com.codestates.__auth.filter.JwtAuthenticationFilter;
import com.codestates.__auth.filter.JwtVerificationFilter;
import com.codestates.__auth.handler.UserAuthenticationEntryPoint;
import com.codestates.__auth.handler.UserAuthenticationFailureHandler;
import com.codestates.__auth.handler.UserAuthenticationSuccessHandler;
import com.codestates.__auth.jwt.JwtTokenizer;
import com.codestates.__auth.userdetails.UserDetailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
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

    private final JwtTokenizer jwtTokenizer;
    public final UserDetailService userDetailService;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, UserDetailService userDetailService) {
        this.jwtTokenizer = jwtTokenizer;
        this.userDetailService = userDetailService;
    }


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
                .apply(new CustomFilterConfigurer())
                .and()

//Todo ----- 인증오류,권한오류(현재빠져있음) 발생시 처리방법 설정부분 -----
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .and()
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
        corsConfiguration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }


    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception {

            // AuthenticationManager 객체를 가지고 옴
            AuthenticationManager authenticationManager =
                    builder.getSharedObject(AuthenticationManager.class);


            // JwtAuthenticationFilter 객체를 생성하고 인증필터가 처리해야하는 URL 설정
            // 설정한 url 로 요청이 들어오면 jwtAuthenticationFilter 가 해당요청을 처리
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/users/login");


            //인증성공 또는 인증실패시 호출될 객체를 설정
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer);


            // 빌더객체에 JwtAuthenticationFilter,JwtVerificationFilter 를 추가해 JWT 인증•검증기능을 적용
            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter,JwtAuthenticationFilter.class);
        }
    }
}




