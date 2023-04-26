//package com.codestates.restdocs.question;
//
//
//import com.codestates.question.controller.QuestionController;
//import com.codestates.question.dto.*;
//import com.codestates.question.entity.Question;
//import com.codestates.question.mapper.QuestionMapper;
//import com.codestates.question.service.QuestionService;
//import com.google.gson.FieldNamingPolicy;
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import org.apache.catalina.security.SecurityConfig;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.context.annotation.FilterType;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.RestDocumentationContextProvider;
//import org.springframework.restdocs.RestDocumentationExtension;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.context.WebApplicationContext;
//import org.springframework.web.filter.CharacterEncodingFilter;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import static com.codestates.util.ApiDocumentUtils.getRequestPreProcessor;
//import static com.codestates.util.ApiDocumentUtils.getResponsePreProcessor;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.doNothing;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.request.RequestDocumentation.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@AutoConfigureRestDocs
//@MockBean(JpaMetamodelMappingContext.class)
//@ExtendWith({RestDocumentationExtension.class, SpringExtension.class}) //
//@WebMvcTest(value = {QuestionController.class},
//        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)}) //
//public class QuestionControllerTest {
//    private MockMvc mockMvc;
//
//    @Autowired
//    WebApplicationContext webApplicationContext; //
//
//    @MockBean
//    private QuestionService questionService;
//
//    @MockBean
//    private QuestionMapper mapper;
//
//    private Gson gson = new GsonBuilder()
//            .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
//            .create();
//
//    @BeforeEach
//    public void setup(RestDocumentationContextProvider restDocumentation) {  //
//        mockMvc = MockMvcBuilders
//                .webAppContextSetup(webApplicationContext)
//                .addFilters(new CharacterEncodingFilter("UTF-8", true))
//                .apply(documentationConfiguration(restDocumentation))
//                .build();
//    }
//    @Test
//    public void postQuestionTest() throws Exception {
//        // ================ given ================
//        //request
//        long userId = 1L;
//        String body = "질문 글의 본문은 최소 20자 이상이어야 합니다. 그렇지 않으면 질문을 등록 할 수 없습니다.";
//        List<QuestionTagDto> tags = List.of(new QuestionTagDto(1L,"자바"), new QuestionTagDto(2L,"파이썬"));
//        QuestionDto.Post post = new QuestionDto.Post( userId, "질문 제목", body, tags);
//        String content = gson.toJson(post);
//
//        //response
//        QuestionUserResponseDto user = new QuestionUserResponseDto(userId, "홍길동","image_url");
//        QuestionDto.Response question = new QuestionDto.Response(1L, "질문제목", body, false, false,
//                0, 0, new QuestionVoteResponseDto(), LocalDateTime.now(),LocalDateTime.now(),tags );
//
//        QuestionDto.POSTResponse postResponseDto = new QuestionDto.POSTResponse(user,question);
//
//        //mock
//        given(mapper.questionPostDtoToQuestion(Mockito.any(QuestionDto.Post.class))).willReturn(new Question());
//
//        given(questionService.createQuestion(Mockito.any(Question.class))).willReturn(new Question());
//
//        given(mapper.questionToQuestionPOSTResponseDto(Mockito.any(Question.class))).willReturn(postResponseDto);
//
//        // ================ when ================
//        ResultActions actions =
//                mockMvc.perform(
//                        post("/questions/add")
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                );
//
//        // ================ then ================
//        actions
//                .andExpect(status().isCreated())
//                .andDo(document(
//                        "post-question",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("user_id").type(JsonFieldType.NUMBER).description("질문작성자 고유 식별번호").ignored(),
//                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
//                                        fieldWithPath("body").type(JsonFieldType.STRING).description("질문 본문"),
//                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("사용한 태그 목록"),
//                                        fieldWithPath("tags[].tag_id").type(JsonFieldType.NUMBER).description("사용한 태그 고유 식별 번호"),
//                                        fieldWithPath("tags[].name").type(JsonFieldType.STRING).description("사용한 태그 이름")
//                                )
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("user").type(JsonFieldType.OBJECT).description("질문작성자 정보"),
//                                        fieldWithPath("user.user_id").type(JsonFieldType.NUMBER).description("질문작성자 고유 식별번호"),
//                                        fieldWithPath("user.display_name").type(JsonFieldType.STRING).description("질문작성자 이름"),
//                                        fieldWithPath("question").type(JsonFieldType.OBJECT).description("질문 정보"),
//                                        fieldWithPath("question.question_id").type(JsonFieldType.NUMBER).description("질문 고유 식별 번호"),
//                                        fieldWithPath("question.title").type(JsonFieldType.STRING).description("질문 제목"),
//                                        fieldWithPath("question.body").type(JsonFieldType.STRING).description("질문 본문"),
//                                        fieldWithPath("question.view_count").type(JsonFieldType.NUMBER).description("조회 수"),
//                                        fieldWithPath("question.answer_count").type(JsonFieldType.NUMBER).description("답변 수"),
//                                        fieldWithPath("question.creation_date").type(JsonFieldType.STRING).description("생성 날짜"),
//                                        fieldWithPath("question.last_edit_date").type(JsonFieldType.STRING).description("마지막 수정 날짜"),
//                                        fieldWithPath("question.tags").type(JsonFieldType.ARRAY).description("사용한 태그 목록"),
//                                        fieldWithPath("question.tags[].tag_id").type(JsonFieldType.NUMBER).description("사용한 태그 고유 식별 번호"),
//                                        fieldWithPath("question.tags[].name").type(JsonFieldType.STRING).description("사용한 태그 이름"),
//                                        fieldWithPath("question.is_answered").type(JsonFieldType.BOOLEAN).description("답변 존재 여부"),
//                                        fieldWithPath("question.is_accepted").type(JsonFieldType.BOOLEAN).description("채택된 질문인지 여부")
//                                )
//                        )
//                ));
//    }
//
//    @Test
//    public void patchQuestionTest() throws Exception {
//        // ================ given ================
//        //request
//        long questionId = 1L;
//        String body = "질문 글의 본문은 최소 20자 이상이어야 합니다. 그렇지 않으면 질문을 등록 할 수 없습니다.";
//        List<QuestionTagDto> tags = List.of(new QuestionTagDto(1L,"자바"), new QuestionTagDto(2L,"파이썬"));
//        QuestionDto.Patch patch = new QuestionDto.Patch(questionId, "질문 제목", body, tags);
//        String content = gson.toJson(patch);
//
//        //mock
//        given(mapper.questionPatchDtoToQuestion(Mockito.any(QuestionDto.Patch.class))).willReturn(new Question());
//
//        given(questionService.updateQuestion(Mockito.any(Question.class))).willReturn(new Question());
//
//        // ================ when ================
//        ResultActions actions =
//                mockMvc.perform(
//                        patch("/questions/{question-id}/edit", questionId)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                );
//
//        // ================ then ================
//        actions
//                .andExpect(status().isOk())
//                .andDo(document("patch-question",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        pathParameters(
//                                parameterWithName("question-id").description("질문 식별 번호")
//                        ),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("question_id").type(JsonFieldType.NUMBER).description("질문 고유 식별번호").ignored(),
//                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목").optional(),
//                                        fieldWithPath("body").type(JsonFieldType.STRING).description("질문 본문").optional(),
//                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("사용한 태그 목록").optional(),
//                                        fieldWithPath("tags[].tag_id").type(JsonFieldType.NUMBER).description("사용한 태그 고유 식별 번호").optional(),
//                                        fieldWithPath("tags[].name").type(JsonFieldType.STRING).description("사용한 태그 이름").optional()
//                                )
//                        )
//                ));
//    }
//
//    @Test
//    public void getQuestionTest() throws Exception {
//        // ================ given ================
//        //request
//        long questionId = 1L;
//
//        //response
//        QuestionUserResponseDto user = new QuestionUserResponseDto(1, "홍길동", "image_url");
//
//        String questionBody = "질문 글의 본문은 최소 20자 이상이어야 합니다. 그렇지 않으면 질문을 등록 할 수 없습니다.";
//        List<QuestionTagDto> tags = List.of(new QuestionTagDto(1L,"자바"), new QuestionTagDto(2L,"파이썬"));
//        QuestionDto.Response question = new QuestionDto.Response(1L, "질문제목", questionBody, true, false,
//                1, 2, new QuestionVoteResponseDto(),LocalDateTime.now(),LocalDateTime.now(),tags);
//
//        String answerBody = "답변 글의 본문은 최소 30자 이상이어야 합니다. 그렇지 않으면 답변을 등록 할 수 없습니다.";
//        QuestionUserResponseDto user2 = new QuestionUserResponseDto(2, "답변작성자1","image_url");
//        QuestionUserResponseDto user3 = new QuestionUserResponseDto(3, "답변작성자2", "image_url");
//        List<QuestionAnswerResponseDto> answers = List.of(new QuestionAnswerResponseDto(user2,1, answerBody,false,0,0, LocalDateTime.now(),LocalDateTime.now()),
//                                                        new QuestionAnswerResponseDto(user3,2, answerBody,false,0,0, LocalDateTime.now(),LocalDateTime.now()));
//
//        QuestionDto.GETResponse getResponseDto = new QuestionDto.GETResponse(user,question,answers);
//
//        //mock
//        given(questionService.findQuestion(Mockito.anyLong())).willReturn(new Question());
//
//        given(mapper.questionToQuestionGETResponseDto(Mockito.any(Question.class))).willReturn(getResponseDto);
//
//        // ================ when ================
//        ResultActions actions =
//                mockMvc.perform(
//                        get("/questions/{question-id}", questionId)
//                                .accept(MediaType.APPLICATION_JSON)
//                );
//
//        // ================ then ================
//        actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("get-question",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(
//                                        parameterWithName("question-id").description("질문 식별 번호")
//                                ),
//                                responseFields(
//                                        List.of(
//                                                fieldWithPath("user").type(JsonFieldType.OBJECT).description("질문작성자 정보"),
//                                                fieldWithPath("user.user_id").type(JsonFieldType.NUMBER).description("질문작성자 고유 식별 번호"),
//                                                fieldWithPath("user.display_name").type(JsonFieldType.STRING).description("질문작성자 이름"),
//                                                fieldWithPath("question").type(JsonFieldType.OBJECT).description("질문 정보"),
//                                                fieldWithPath("question.question_id").type(JsonFieldType.NUMBER).description("질문 고유 식별 번호"),
//                                                fieldWithPath("question.title").type(JsonFieldType.STRING).description("질문 제목"),
//                                                fieldWithPath("question.body").type(JsonFieldType.STRING).description("질문 본문"),
//                                                fieldWithPath("question.view_count").type(JsonFieldType.NUMBER).description("조회 수"),
//                                                fieldWithPath("question.answer_count").type(JsonFieldType.NUMBER).description("답변 수"),
//                                                fieldWithPath("question.creation_date").type(JsonFieldType.STRING).description("생성 날짜"),
//                                                fieldWithPath("question.last_edit_date").type(JsonFieldType.STRING).description("마지막 수정 날짜"),
//                                                fieldWithPath("question.tags").type(JsonFieldType.ARRAY).description("사용한 태그 목록"),
//                                                fieldWithPath("question.tags[].tag_id").type(JsonFieldType.NUMBER).description("사용한 태그 고유 식별 번호"),
//                                                fieldWithPath("question.tags[].name").type(JsonFieldType.STRING).description("사용한 태그 이름"),
//                                                fieldWithPath("question.is_answered").type(JsonFieldType.BOOLEAN).description("답변 존재 여부"),
//                                                fieldWithPath("question.is_accepted").type(JsonFieldType.BOOLEAN).description("채택된 질문인지 여부"),
//                                                fieldWithPath("answers").type(JsonFieldType.ARRAY).description("답변 목록"),
//                                                fieldWithPath("answers[].user.user_id").type(JsonFieldType.NUMBER).description("답변작성자 고유 식별 번호"),
//                                                fieldWithPath("answers[].user.display_name").type(JsonFieldType.STRING).description("답변작성자 이름"),
//                                                fieldWithPath("answers[].answer_id").type(JsonFieldType.NUMBER).description("답변 고유 식별 번호"),
//                                                fieldWithPath("answers[].body").type(JsonFieldType.STRING).description("답변 본문"),
//                                                fieldWithPath("answers[].creation_date").type(JsonFieldType.STRING).description("답변 생성 날짜"),
//                                                fieldWithPath("answers[].last_edit_date").type(JsonFieldType.STRING).description("답변 마지막 수정 날짜"),
//                                                fieldWithPath("answers[].is_accepted").type(JsonFieldType.BOOLEAN).description("채택된 답변인지 여부")
//                                        )
//                                )
//                        )
//                );
//
//    }
//
//    @Test
//    public void getQuestionsTest() throws Exception {
//        // ================ given ================
//        //request
//        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("page", "1");
//        queryParams.add("size", "10");
//
//        //response
//        Page<Question> questions = new PageImpl<>(List.of(new Question(), new Question()), PageRequest.of(0,10), 2);
//
//        QuestionUserResponseDto user1 = new QuestionUserResponseDto(1, "홍길동1", "image_url");
//        QuestionUserResponseDto user2 = new QuestionUserResponseDto(2, "홍길동2", "image_url");
//
//        String questionBody = "질문 글의 본문은 최소 20자 이상이어야 합니다. 그렇지 않으면 질문을 등록 할 수 없습니다.";
//        List<QuestionTagDto> tags = List.of(new QuestionTagDto(1L,"자바"), new QuestionTagDto(2L,"파이썬"));
//        QuestionDto.Response question1 = new QuestionDto.Response(1L, "질문제목", questionBody, true, false,
//                1, 2, new QuestionVoteResponseDto(), LocalDateTime.now(),LocalDateTime.now(), tags);
//        QuestionDto.Response question2 = new QuestionDto.Response(2L, "질문제목", questionBody, false, false,
//                0, 0, new QuestionVoteResponseDto(), LocalDateTime.now(),LocalDateTime.now(), tags);
//
//        QuestionDto.GETALLResponse response1 = new QuestionDto.GETALLResponse(user1, question1);
//        QuestionDto.GETALLResponse response2 = new QuestionDto.GETALLResponse(user2, question2);
//        List<QuestionDto.GETALLResponse> getAllResponseDto = List.of(response1,response2);
//
//        //mock
//        given(questionService.findQuestions(Mockito.anyInt(), Mockito.anyInt())).willReturn(questions);
//        given(mapper.questionsToQuestionGETALLResponseDtos(Mockito.anyList())).willReturn(getAllResponseDto);
//
//        // ================ when ================
//        ResultActions actions = mockMvc.perform(
//                get("/questions")
//                        .params(queryParams)
//                        .accept(MediaType.APPLICATION_JSON));
//
//
//        // ================ then ================
//        actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("get-questions",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                requestParameters(
//                                        List.of(
//                                                parameterWithName("page").description("Page 번호"),
//                                                parameterWithName("size").description("Page 사이즈")
//                                        )
//                                ),
//                                responseFields(
//                                        List.of(
//                                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("전체 질문 목록"),
//                                                fieldWithPath("data[].user").type(JsonFieldType.OBJECT).description("질문작성자 정보"),
//                                                fieldWithPath("data[].user.user_id").type(JsonFieldType.NUMBER).description("질문작성자 고유 식별 번호"),
//                                                fieldWithPath("data[].user.display_name").type(JsonFieldType.STRING).description("질문작성자 이름"),
//                                                fieldWithPath("data[].question").type(JsonFieldType.OBJECT).description("질문 정보"),
//                                                fieldWithPath("data[].question.question_id").type(JsonFieldType.NUMBER).description("질문 고유 식별 번호"),
//                                                fieldWithPath("data[].question.title").type(JsonFieldType.STRING).description("질문 제목"),
//                                                fieldWithPath("data[].question.body").type(JsonFieldType.STRING).description("질문 본문"),
//                                                fieldWithPath("data[].question.view_count").type(JsonFieldType.NUMBER).description("조회 수"),
//                                                fieldWithPath("data[].question.answer_count").type(JsonFieldType.NUMBER).description("답변 수"),
//                                                fieldWithPath("data[].question.creation_date").type(JsonFieldType.STRING).description("생성 날짜"),
//                                                fieldWithPath("data[].question.last_edit_date").type(JsonFieldType.STRING).description("마지막 수정 날짜"),
//                                                fieldWithPath("data[].question.tags").type(JsonFieldType.ARRAY).description("사용한 태그 목록"),
//                                                fieldWithPath("data[].question.tags[].tag_id").type(JsonFieldType.NUMBER).description("사용한 태그 고유 식별 번호"),
//                                                fieldWithPath("data[].question.tags[].name").type(JsonFieldType.STRING).description("사용한 태그 이름"),
//                                                fieldWithPath("data[].question.is_answered").type(JsonFieldType.BOOLEAN).description("답변 존재 여부"),
//                                                fieldWithPath("data[].question.is_accepted").type(JsonFieldType.BOOLEAN).description("채택된 질문인지 여부"),
//                                                fieldWithPath("page_info").type(JsonFieldType.OBJECT).description("페이지네이션 정보"),
//                                                fieldWithPath("page_info.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
//                                                fieldWithPath("page_info.size").type(JsonFieldType.NUMBER).description("페이지 사이즈"),
//                                                fieldWithPath("page_info.total_elements").type(JsonFieldType.NUMBER).description("전체 건 수"),
//                                                fieldWithPath("page_info.total_pages").type(JsonFieldType.NUMBER).description("전체 페이지 수")
//                                        )
//                                )
//                        )
//                );
//    }
//
//    @Test
//    public void deleteQuestionTest() throws Exception {
//        // ================ given ================
//        long questionId = 1L;
//        doNothing().when(questionService).deleteQuestion(Mockito.anyLong()); // 왜??
//
//        // ================ when ================
//        ResultActions actions =
//                mockMvc.perform(
//                        delete("/questions/{question-id}", questionId)
//                                .accept(MediaType.APPLICATION_JSON)
//                );
//
//        // ================ then ================
//        actions
//                .andExpect(status().isOk())
//                .andDo(document("delete-question",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        pathParameters(
//                                parameterWithName("question-id").description("질문 식별 번호")
//                        )
//                ));
//
//
//    }
//}