package pt.unl.fct.di.apdc.firstwebapp.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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
        Response addPost(Post post, @QueryParam("tokenObj") String tokenObjStr);

        @POST
        @Consumes(MediaType.APPLICATION_JSON)
        @Path("/updatepost")
        Response updatePost(Post post, @QueryParam("tokenObj") String tokenObjStr);

        @DELETE
        @Path("/removepost")
        Response removePost(@QueryParam("postId") String postId, @QueryParam("tokenObj") String tokenObjStr);

        @POST
        @Consumes(MediaType.APPLICATION_JSON)
        @Path("/addreply")
        Response addReply(Post reply,
                        @QueryParam("tokenObj") String tokenObjStr);

        @POST
        @Consumes(MediaType.APPLICATION_JSON)
        @Path("/updatereply")
        Response updateReply(Post reply,
                        @QueryParam("tokenObj") String tokenObjStr);

        @POST
        @Path("/addbookmark")
        Response bookmarkPost(@QueryParam("postId") String postId, @QueryParam("username") String username,
                        @QueryParam("tokenObj") String tokenObjString);

        @POST
        @Path("/removebookmark")
        Response unbookmarkPost(@QueryParam("postId") String postId, @QueryParam("username") String username,
                        @QueryParam("tokenObj") String tokenObjString);

        @GET
        @Produces(MediaType.APPLICATION_JSON)
        @Path("/listbookmarks")
        Response listUserBookmarks(@QueryParam("username") String username,
                        @QueryParam("tokenObj") String tokenObjStr, @QueryParam("cursorObj") String cursorObjStr);

        @GET
        @Produces(MediaType.APPLICATION_JSON)
        @Path("/listuserposts")
        Response listUserPosts(@QueryParam("tokenObj") String tokenObjStr,
                        @QueryParam("cursorObj") String cursorObjStr);

        @GET
        @Produces(MediaType.APPLICATION_JSON)
        @Path("/listsearched")
        Response searchPost(@QueryParam("tokenObj") String tokenObjStr,
                        @QueryParam("substring") String substring);

        @GET
        @Produces(MediaType.APPLICATION_JSON)
        @Path("/listreply")
        Response listReply(@QueryParam("parentId") String parentId);

        @GET
        @Produces(MediaType.APPLICATION_JSON)
        @Path("/listpost")
        Response listPosts(@QueryParam("cursorObj") String cursorObjStr);
}
