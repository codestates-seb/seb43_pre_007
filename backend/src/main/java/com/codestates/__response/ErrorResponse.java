package com.codestates.__response;

import com.codestates.exception.ExceptionCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


// Todo   : ErrorResponse 클래스
// ExceptionCode 를 반환하는 것보다 ErrorResponse 객체를 반환하는 것이 좋은 상황이 있다.
// 또한 ExceptionResponse 객체를 사용하면 예외코드외에 예외에 대한 자세한정보를 전달할 수 있다.


@Getter //예외정보를 클라이언트에게 응답하기 위해 사용 (상태코드,메시지,필드에러목록)
public class ErrorResponse {
    private int status;
    private String message;
    private List<FieldError> fieldErrorList;
    private List<ConstraintViolationError> violationErrors;

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
    public ErrorResponse(List<FieldError> fieldErrorList,
                         List<ConstraintViolationError> violationErrors) {
        this.fieldErrorList = fieldErrorList;
        this.violationErrors = violationErrors;
    }




    public static ErrorResponse of(BindingResult bindingResult) {
        return new ErrorResponse(FieldError.of(bindingResult), null);
    }

    public static ErrorResponse of(Set<ConstraintViolation<?>> violations) {
        return new ErrorResponse(null, ConstraintViolationError.of(violations));
    }

    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        return new ErrorResponse(httpStatus.value(), message);
    }



    @Getter
    public static class FieldError{
        // BindingResult 객체에서 가져온 validation 에러정보를 통해
        // 응답에 전달할 필드이름, 거부된값, 에러메시지를 담아 리스트로 반환한다.
        private String field;
        private Object rejectedValue;
        private String reason;
        public FieldError(String field, Object rejectedValue, String reason) {
            this.field = field;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<FieldError> of(BindingResult bindingResult){
            // Todo: 클라이언트로부터 잘못된 요청이 들어왔을때 이것을 응답으로 변환
            //BindingResult 객체는 요청으로 들어온 데이터의 검증결과를 담고 있다.
            //BindingResult 객체에서 가져온 검증실패정보를 FieldError 변환해서 리스트로 반환한다.
            //반환된 리스트는 ErrorResponse 객체생성에 사용된다.


            // 검증에 실패한 필드와 에러정보를 가져온다.
            final List<org.springframework.validation.FieldError> fieldErrors =
                    bindingResult.getFieldErrors();

            //검증에실패한 필드,거부된값,메세지를 FiledError 객체로 변환해서 리스트로 반환한다.
            return fieldErrors.stream()
                    .map(error-> new FieldError(
                            error.getField(),
                            error.getRejectedValue() == null ? "":error.getRejectedValue().toString(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }




    @Getter
    public static class ConstraintViolationError {
        // Todo: ConstraintViolationError 에러
        // 객체의 필드나 메소드 파라미터 등에 대한 제약조건 위반 시 발생하는 예외

        // Todo: ConstraintViolationError 클래스
        // @NotNull,@NotEmpty,@Size 등의 어노테이션 유효성검증 실패시 발생하는 ConstraintViolationException 처리를위해 사용.
        // 검증실패객체의 속성정보, 검증실패값, 검증실패이유를 저장.

        private String propertyPath; //검증실패 객체의 속성정보
        private Object rejectedValue;//검증실패 값
        private String reason; //검증실패 이유
        public ConstraintViolationError(String propertyPath, Object rejectedValue, String reason) {
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {
            // Todo: 클라이언트로부터 잘못된 요청이 들어왔을때 이것을 응답으로 변환
            // ConstraintViolationException 에서 발생하는 모든 ConstraintViolationError 를 리스트로 변환
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()))
                    .collect(Collectors.toList());
        }
    }
}






// Todo
//  생성자1 : 상태코드와 메시지만을 받아서 ErrorResponse 객체생성
//  생성자2 : 필드에러목록과 제약조건위반(notnull,pattern등 위반) 에러목록을 받아 ErrorResponse 객체생성
//        : 둘다 유효성검사에서 발생한 오류를 의미하나 발생위치•종류가 다름

// 필드에러는 필드에대한 유효성검사가 실패한 경우 발생 (ex. 이메일주소를 올바르게 입력하세요)
// 제약조건위반에러는 데이터베이스의 제약조건(유니크 등)에 위반되는 조작수행시 발생 (ex. 중복된 이메일입니다!)

