package pt.unl.fct.di.apdc.firstwebapp.api;

import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

public interface StaticMediaAPI {

    @POST
    @Path("/streamUPD")
    void streamObjectUpload(@QueryParam("objectName") String objectName, @QueryParam("contents") String contents) throws IOException;

    @GET
    @Path("/streamDWN")
    void streamObjectDownload(@QueryParam("objectName") String objectName, @QueryParam("targetFile") String targetFile) throws IOException;

    @GET
    @Path("/simpleDWN")
    void downloadObject(@QueryParam("objectName") String objectName,@QueryParam("destFilePath") String destFilePath);
}