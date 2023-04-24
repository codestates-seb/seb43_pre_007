package com.codestates.restdocs.answer;


import com.codestates.answer.controller.AnswerController;
import com.codestates.answer.dto.AnswerDto;
import com.codestates.answer.entity.Answer;
import com.codestates.answer.mapper.AnswerMapper;
import com.codestates.answer.service.AnswerService;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.catalina.security.SecurityConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.List;

import static com.codestates.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
@ExtendWith({RestDocumentationExtension.class, SpringExtension.class}) //
@WebMvcTest(value = {AnswerController.class},
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)})
public class AnswerControllerTest {
    private MockMvc mockMvc;

    @Autowired
    WebApplicationContext webApplicationContext;

    @MockBean
    private AnswerService answerService;

    @MockBean
    private AnswerMapper mapper;

    private Gson gson = new GsonBuilder()
            .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
            .create();

    @BeforeEach
    public void setup(RestDocumentationContextProvider restDocumentation) {  //
        mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .addFilters(new CharacterEncodingFilter("UTF-8", true))
                .apply(documentationConfiguration(restDocumentation))
                .build();
    }

    @Test
    public void postAnswerTest() throws Exception {
        // ================ given ================
        //request
        long userId = 1L;
        long questionId = 1L;
        String body = "답변 글의 본문은 최소 30자 이상이어야 합니다. 그렇지 않으면 답변을 등록 할 수 없습니다.";
        AnswerDto.Post post = new AnswerDto.Post( userId, questionId, body);
        String content = gson.toJson(post);


        //mock
        given(mapper.answerPostDtoToAnswer(Mockito.any(AnswerDto.Post.class))).willReturn(new Answer());

        given(answerService.createAnswer(Mockito.any(Answer.class))).willReturn(new Answer());


        // ================ when ================
        ResultActions actions =
                mockMvc.perform(
                        post("/answers/add")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        // ================ then ================
        actions
                .andExpect(status().isCreated())
                .andDo(document(
                        "post-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("user_id").type(JsonFieldType.NUMBER).description("답변작성자 고유 식별 번호").ignored(),
                                        fieldWithPath("question_id").type(JsonFieldType.NUMBER).description("질문 고유 식별 번호"),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("답변 본문")
                                )
                        )
                ));


    }

    @Test
    public void patchAnswerTest() throws Exception {
        // ================ given ================
        //request
        long answerId = 1L;
        String body = "답변 글의 본문은 최소 30자 이상이어야 합니다. 그렇지 않으면 답변을 등록 할 수 없습니다.";
        AnswerDto.Patch patch = new AnswerDto.Patch(answerId, body);
        String content = gson.toJson(patch);

        //mock
        given(mapper.answerPatchDtoToAnswer(Mockito.any(AnswerDto.Patch.class))).willReturn(new Answer());

        given(answerService.updateAnswer(Mockito.any(Answer.class))).willReturn(new Answer());

        // ================ when ================
        ResultActions actions =
                mockMvc.perform(
                        patch("/answers/{answer-id}/edit", answerId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        // ================ then ================
        actions
                .andExpect(status().isOk())
                .andDo(document("patch-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 식별 번호")
                        )
                ));

    }

    @Test
    public void deleteAnswerTest() throws Exception {
        // ================ given ================
        long answerId = 1L;
        doNothing().when(answerService).deleteAnswer(Mockito.anyLong()); // 왜??

        // ================ when ================
        ResultActions actions =
                mockMvc.perform(
                        delete("/answers/{answer-id}", answerId)
                                .accept(MediaType.APPLICATION_JSON)
                );

        // ================ then ================
        actions
                .andExpect(status().isOk())
                .andDo(document("delete-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("answer-id").description("질문 식별 번호")
                        )
                ));


    }
}