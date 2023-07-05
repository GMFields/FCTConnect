package pt.unl.fct.di.apdc.firstwebapp.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import pt.unl.fct.di.apdc.firstwebapp.util.Post;

import javax.ws.rs.core.MediaType;

public interface ChatApi {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/addpost")
    Response addPost(Post post /* @QueryParam("tokenObjStr") String tokenObjStr */);

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/updatepost")
    Response updatePost(Post post /* @QueryParam("tokenObjStr") String tokenObjStr */);

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/addreply")
    Response addReply(Post reply /* String tokenObjStr */);

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/updatereply")
    Response updateReply(Post reply /* String tokenObjStr */);

    @POST
    @Path("/addbookmark")
    Response bookmarkPost(@QueryParam("postId") String postId, @QueryParam("username") String username/*
                                                                                                       * , @QueryParam(
                                                                                                       * "tokenObjString")
                                                                                                       * String
                                                                                                       * tokenObjString
                                                                                                       */);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/listbookmarks")
    Response listUserBookmarks(@QueryParam("username") String username/*
                                                                       * @QueryParam("tokenObjStr") String tokenObjStr
                                                                       */ );

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/listreply")
    Response listReply(@QueryParam("parentId") String parentId/* String tokenObjStr */);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/listpost")
    Response listPosts(/* String tokenObjStr */);
}
