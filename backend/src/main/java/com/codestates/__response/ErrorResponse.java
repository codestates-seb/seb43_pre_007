package com.codestates.__response;

import com.codestates.exception.ExceptionCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

//Todo
// 생성자1 : 상태코드와 메시지만을 받아서 ErrorResponse 객체생성
// 생성자2 : 필드에러목록과 제약조건위반(notnull,pattern등 위반) 에러목록을 받아 ErrorResponse 객체생성
//       : 둘다 유효성검사에서 발생한 오류를 의미하나 발생위치•종류가 다름

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
        // FiledError 클래스
        // BindingResult 객체에서 가져온 validation 에러정보를 통해
        // 응답에 전달할 필드이름, 거부된값, 에러메시지를 가지고 있다.

        private String field;
        private Object rejectedValue;
        private String reason;

        public FieldError(String field, Object rejectedValue, String reason) {
            this.field = field;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<FieldError> of(BindingResult bindingResult){
            //of() 메서드
            //BindingResult 객체에서 가져온 validation 에러정보를 FieldError 객체로 변환해 리스트로 반환함.
            //반환된 리스트는 ErrorResponse 객체생성에 사용

            final List<org.springframework.validation.FieldError> fieldErrors =
                    bindingResult.getFieldErrors();
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
        //ConstraintViolationError 클래스
        // @NotNull,@NotEmpty,@Size 등의 어노테이션 유효성검증 실패시 발생하는 ConstraintViolationException 처리를위해 사용.
        // 검증실패객체의 속성정보, 검증실패값, 검증실패이유를 저장.

        private String propertyPath; //검증실패 객체의 속성정보
        private Object rejectedValue;//검증실패 값
        private String reason; //검증실패 이유

        public ConstraintViolationError(String propertyPath,
                                        Object rejectedValue,
                                        String reason) {
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {
            //of() 메서드
            //ConstraintViolationException 에서 발생하는 모든 ConstraintViolationError 를 리스트로 변환
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()))
                    .collect(Collectors.toList());
        }
    }
}
