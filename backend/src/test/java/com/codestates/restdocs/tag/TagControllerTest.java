//package com.codestates.restdocs.tag;
//
//
//import com.codestates.question.entity.QuestionTag;
//import com.codestates.response.CustomResponseDto;
//import com.codestates.tag.controller.TagController;
//import com.codestates.tag.dto.AllTagResponseDto;
//import com.codestates.tag.dto.OneTagResponseDto;
//import com.codestates.tag.dto.TagDto;
//import com.codestates.tag.entity.Tag;
//import com.codestates.tag.mapper.TagMapper;
//import com.codestates.tag.service.TagService;
//import com.google.gson.FieldNamingPolicy;
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.RestDocumentationContextProvider;
//import org.springframework.restdocs.payload.JsonFieldType;
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
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(TagController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//public class TagControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    WebApplicationContext webApplicationContext;
//
//    @MockBean
//    private TagService tagService;
//
//    // (2)
//    @MockBean
//    private TagMapper tagmapper;
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
//
//
//
//    @Test
//    public void getTagTest() throws Exception {
//        // ================ given ================
//        //request
//        long tagId = 1L;
//        MultiValueMap<String,String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("page","1");
//        queryParams.add("size","10");
//
//        //response
//        String name = "자바";
//        String info = "자바에 대한 설명입니다.";
//
//        Page<QuestionTag> questionTagPage = new PageImpl<>(List.of(new QuestionTag(), new QuestionTag()), PageRequest.of(0,10),2);
//        List<TagDto.TagQuestionResponseDto> tags = List.of(new TagDto.TagQuestionResponseDto(1,"자바"));
//
//        OneTagResponseDto oneTag = new OneTagResponseDto(1,"질문제목","질문내용",false,false,0,0,LocalDateTime.now(),1,"홍길동","image",tags);
//        CustomResponseDto response = new CustomResponseDto(name,info, (List<OneTagResponseDto>) oneTag,questionTagPage);
//
//        //mock
//        given(tagService.findTag(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyInt())).willReturn(questionTagPage);
//        given(tagmapper.tagToTagResponseDto(Mockito.anyList())).willReturn((List<OneTagResponseDto>) response);
//
//
//        // ================ when ================
//        ResultActions actions =
//                mockMvc.perform(
//                        get("/tags/{tag-id}",tagId)
//                                .accept(MediaType.APPLICATION_JSON));
//
//
//        // ================ then ================
//        actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("get-tag",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(
//                                        parameterWithName("tag-id").description("태그 식별 번호")),
//                                responseFields(
//                                        List.of(
//                                                fieldWithPath("user.user_id").type(JsonFieldType.NUMBER).description("질문작성자 고유 식별 번호"),
//                                                fieldWithPath("user.display_name").type(JsonFieldType.STRING).description("질문작성자 이름"),
//                                                fieldWithPath("question.question_id").type(JsonFieldType.NUMBER).description("질문 고유 식별 번호"),
//                                                fieldWithPath("question.title").type(JsonFieldType.STRING).description("질문 제목"),
//                                                fieldWithPath("question.body").type(JsonFieldType.STRING).description("질문 본문"),
//                                                fieldWithPath("question.is_answered").type(JsonFieldType.BOOLEAN).description("답변 존재 여부"),
//                                                fieldWithPath("question.is_accepted").type(JsonFieldType.BOOLEAN).description("채택된 질문인지 여부"),
//                                                fieldWithPath("question.answer_count").type(JsonFieldType.NUMBER).description("답변 수"),
//                                                fieldWithPath("question.score").type(JsonFieldType.NUMBER).description("질문점수"),
//                                                fieldWithPath("question.creation_date").type(JsonFieldType.STRING).description("생성 날짜"),
//                                                fieldWithPath("question.tags").type(JsonFieldType.ARRAY).description("사용한 태그 목록"),
//                                                fieldWithPath("question.tags[].tag_id").type(JsonFieldType.NUMBER).description("사용한 태그 고유 식별 번호"),
//                                                fieldWithPath("question.tags[].name").type(JsonFieldType.STRING).description("사용한 태그 이름")))));
//    }
//
//
//    @Test
//    public void getTagsTest() throws Exception {
//        // ================ given ================
//        //request
//        MultiValueMap<String,String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("page","1");
//        queryParams.add("size","10");
//
//        //response
//        long tagId = 1L;
//        int questionAmount = 0;
//        String javaInfo = "자바에 대한 설명입니다.";
//        String springInfo = "스프링에 대한 설명입니다.";
//        Page<Tag> tagPage = new PageImpl<>(List.of(new Tag(), new Tag()), PageRequest.of(0,10),2);
//        List<Tag> tags = List.of(new Tag(1,"자바", javaInfo), new Tag(2, "스프링",springInfo));
//
//
//        AllTagResponseDto allTag1 = new AllTagResponseDto(1L,"자바",javaInfo,0);
//
//        //mock
//        given(tagService.findTag(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyInt())).willReturn(questionTagPage);
//        given(tagmapper.tagToTagResponseDto(Mockito.anyList())).willReturn((List<OneTagResponseDto>) response);
//
//
//
//        // ================ when ================
//
//
//        // ================ then ================
//
//
//    }
//}