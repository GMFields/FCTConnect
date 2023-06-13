package pt.unl.fct.di.apdc.firstwebapp.api;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
public interface AnomalyAPI {

    @POST
    @Path("/report")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response reportAnomaly(@QueryParam("tokenObj") String tokenObjStr, String anomalyDescription);

    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    Response listActiveAnomalies(@QueryParam("tokenObj") String tokenObjStr);

    @PUT
    @Path("approve/{anomalyID}")
    @Produces(MediaType.APPLICATION_JSON)
    Response approveAnomaly(@QueryParam("tokenObj") String tokenObjStr, @PathParam("anomalyID") String anomalyID);

    @GET
    @Path("/listall")
    @Produces(MediaType.APPLICATION_JSON)
    Response listAllAnomalies(@QueryParam("tokenObj") String tokenObjStr);

    @DELETE
    @Path("/delete/{anomalyID}")
    @Produces(MediaType.APPLICATION_JSON)
    Response deleteAnomaly(@QueryParam("tokenObj") String tokenObjStr, @PathParam("anomalyID") String anomalyID);




}
