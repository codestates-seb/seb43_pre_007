package com.codestates.__auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Component
public class JwtTokenizer {

// Todo:  @Value 는 application.yml 에 등록된 값을 패당 필드에 주입해준다.
// - secretKey   : JWT 생성•검증에 사용됨
// - access ...  : AccessToken 만료시간 정보
// - refresh ... : RefreshToken 만료시간 정보

    @Getter
    @Value("${jwt.key}")
    private String secretKey;
    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;
    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;




// Todo : encodeBase64SecretKey 메서드
// 전달된 secretKey 문자열을 Base64로 인코딩해서 반환하는 메서드
// 인코딩된 문자열은 JWT 에서 사용되는 SecretKey 설정시 사용
// -- SecretKey 는 암호화와 복호화과정에서 사용되는 문자열
    public String encodeBase64SecretKey(String secretKey){
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }



// Todo : generateAccessToken 메서드 - JWT AccessToken 을 생성한다.
// - claims     : JWT 페이로드에 담을 정보들을 Map 형태로 받아옴
// - subject    : 인증된 사용자의 ID 등 인증을 식별할 수 있는 정보
// - expiration : AccessToken 의 만료시간을 설정
// - base64 ... : JWT Token 을 서명하기위한 SecretKey 를 인코딩한 문자열을 전달함
    public String generateAccessToken(Map<String, Object> claims,
                                      String subject, Date expiration,
                                      String base64EncodedSecretKey){

        //인코딩한 문자열을 디코딩해서 Key 객체로 변환
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        // JWT 토큰생성 : key 를 이용해 JWT 토큰 서명
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key) //key 객체로 JWT 서명
                .compact();
    }


// Todo : generateRefreshToken 메서드 - JWT RefreshToken 을 생성한다.
// - RefreshToken 은 claims 가 필요없다.
    public String generateRefreshToken(String subject, Date expiration,
                                       String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }



// Todo : getClaims 메서드 - JWT 서명 유효성 검증 후 Claims 를 반환한다.
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key).build()
                .parseClaimsJws(jws);

        return claims; //JWT 에서 추출한 클레임정보를 포함하고 있음
    }



// Todo : verifySignature 메서드 - 단순히 JWT 서명 유효성 검증만 한다.
    public void verifySignature(String jws, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key).build()
                .parseClaimsJws(jws);
    }




// Todo : getTokenExpiration 메서드 - JWT 토큰의 만료시간을 계산할때 사용한다.
    public Date getTokenExpiration(int expirationMinutes){
        Calendar calendar = Calendar.getInstance(); //현재시간 가져오기
        calendar.add(Calendar.MINUTE, expirationMinutes);//expirationMinutes 분 만큼 현재시간에 더하기
        Date expiration = calendar.getTime(); //Data 객체로 변환하기

        return expiration;
    }





// Todo : getKeyFromBase64EncodedKey 메서드 - 시크릿키를 디코딩해서 Key 객체로 변환한다.
// - key 객체는 JWT 서명 및 검증에 사용된다.
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);
        return key;
    }
}
