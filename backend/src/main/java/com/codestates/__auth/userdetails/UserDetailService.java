package com.codestates.__auth.userdetails;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.user.entity.User;
import com.codestates.user.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Component
public class UserDetailService implements UserDetailsService {
   //private final CustomAuthorityUtils authorityUtils; 권한생성 클래스
    private final UserRepository userRepository;

    public UserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @Override // DB 에서 조회한 사용자정보를 UserDetails 객체에 담아 반환하는 메서드
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return new UserDetail(findUser);
    }



    //Todo: UserDetail 내부클래스 (인증•인가에 사용되는 객체)
    //      엔티티필드값을 UserDetails 인터페이스에서 요구하는 값으로 매핑해서 반환
    //      엔티티 변경시 UserDetail 객체도 자동업데이트
    public final class UserDetail extends User implements UserDetails {
        UserDetail(User user) {
            setUserId(user.getUserId());
            setDisplayName(user.getDisplayName());
            setImageUrl(user.getImageUrl());
            setEmail(user.getEmail());
            setPassword(user.getPassword());
           //setRoles(user.getRoles());  권한가져오기
        }



        @Override //사용자가 가진 권한목록 반환 (Role 미사용시 빈리스트 반환)
        public Collection<? extends GrantedAuthority> getAuthorities() {
           //return authorityUtils.createAuthorities(this.getRoles());  권한목록생성•반환
            return Collections.emptyList();
        }

        @Override // 사용자 아이디 반환
        public String getUsername() {
            return getEmail();
        }

        @Override // 사용자계정 만료여부 반환 (만료시 false)
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override // 사용자계정의 잠금여부 반환 (잠금시 false)
        public boolean isAccountNonLocked() {
            return true; //true 설정은 여러번 로그인을 시도해도 계정이 안잠김.
        }

        @Override // 사용자 비밀번호 만료여부 반환 (만료시 false)
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override // 사용자 활성화여부 반환 (비활성화시 false)
        public boolean isEnabled() {
            return true;
        }
    }





}
