package pt.unl.fct.di.apdc.firstwebapp.api;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
public interface AnomalyAPI {

    /**
     *
     * @param tokenObjStr
     * @param anomalyDescription
     * @return
     */
    @POST
    @Path("/report")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response reportAnomaly(@QueryParam("tokenObj") String tokenObjStr, String anomalyDescription);

    /**
     * Lists all active anomalies. Both regular users and admins can list them
     * @param tokenObjStr the token authenticating the user
     * @return
     */
    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    Response listApprovedAnomalies(@QueryParam("tokenObj") String tokenObjStr);

    /**
     * Approves an anomaly so it can be seen by everyone.
     * @param tokenObjStr the token authenticating the user
     * @param anomalyID the anomaly identifier
     * @return
     */
    @PUT
    @Path("approve/{anomalyID}")
    @Produces(MediaType.APPLICATION_JSON)
    Response approveAnomaly(@QueryParam("tokenObj") String tokenObjStr, @PathParam("anomalyID") String anomalyID);

    @PUT
    @Path("solve/{anomalyID}")
    @Produces(MediaType.APPLICATION_JSON)
    Response solveAnomaly(@QueryParam("tokenObj") String tokenObjStr, @PathParam("anomalyID") String anomalyID);


    /**
     * Lists all anomalies either approved or not. Can only be done by admins
     * @param tokenObjStr the token authenticating the user, in this case, an admin.
     * @return
     */
    @GET
    @Path("/listall")
    @Produces(MediaType.APPLICATION_JSON)
    Response listAllAnomalies(@QueryParam("tokenObj") String tokenObjStr);

    /**
     * Deletes an anomaly. Can only be done by admins
     * @param tokenObjStr the token authenticating the user, in this case, an admin.
     * @param anomalyID the anomaly identifier
     * @return
     */
    @DELETE
    @Path("/delete/{anomalyID}")
    @Produces(MediaType.APPLICATION_JSON)
    Response deleteAnomaly(@QueryParam("tokenObj") String tokenObjStr, @PathParam("anomalyID") String anomalyID);




}
