package com.codestates.restdocs.user;


import com.codestates.user.controller.UserController;
import com.codestates.user.mapper.UserMapper;
import com.codestates.user.service.UserService;
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import java.util.List;

import static com.codestates.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    // (1)
    @MockBean
    private UserService userService;

    // (2)
    @MockBean
    private UserMapper mapper;

    @Autowired
    private Gson gson;

    @Test
    public void postUserTest() throws Exception {
        // ================ given ================


        // ================ when ================


        // ================ then ================


    }

    @Test
    public void patchUserTest() throws Exception {
        // ================ given ================


        // ================ when ================


        // ================ then ================

    }

    @Test
    public void getUserTest() throws Exception {
        // ================ given ================


        // ================ when ================


        // ================ then ================


    }

    @Test
    public void getUsersTest() throws Exception {
        // ================ given ================


        // ================ when ================


        // ================ then ================


    }

    @Test
    public void deleteUserTest() throws Exception {
        // ================ given ================


        // ================ when ================


        // ================ then ================


    }
}