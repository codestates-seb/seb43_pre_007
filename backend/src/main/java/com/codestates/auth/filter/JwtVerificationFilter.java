package com.codestates.__auth.filter;

import com.codestates.__auth.jwt.JwtTokenizer;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
   //private final CustomAuthorityUtils authorityUtils; 권한사용시 필요

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }



//Todo: doFilterInternal 메서드
//JWT 토큰검증을 수행하고 검증된정보를 SecurityContextHolder 를 통해 Spring Security 에 전달
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request,response);
    }




//Todo: shouldNotFilter 메서드
//JWT 토큰이 유효한 Authorization 헤더(Bearer Token)를 포함하고 있는지 확인하여 필터링여부를 결정
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization"); //사용자요청에서 헤더 추출
        return authorization == null || !authorization.startsWith("Bearer");
    }



//Todo: verifyJws 메서드
//사용자요청 헤더에서 JWT 토큰을 추출하고 JwtTokenizer 를 사용해 검증을 수행하는데,
//검증결과로 얻은 클레임정보를 Map<String,Object>타입으로 반환
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        return claims;
    }



//Todo: setAuthenticationToContext 메서드
//검증된 클레임정보를 바탕으로 사용자 인증정보와 권한정보를 생성해서 SecurityContextHolder 에 저장
    private void setAuthenticationToContext(Map<String, Object> claims){
        Map<String, Object> principal = new HashMap<>();
        principal.put("userId", claims.get("userId"));
        principal.put("username", claims.get("username"));
        //String username = (String) claims.get("username");
        //List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles")); 권한사용시 필요
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);

    }

}
