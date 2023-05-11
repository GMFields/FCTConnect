package pt.unl.fct.di.apdc.firstwebapp.api;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface StaticMediaAPI {

    /**
     * Retrieves a file from GCS and returns it in the http response.
     * If the request path is /gcs/Foo/Bar this will be interpreted as
     * a request to read the GCS file named Bar in the bucket Foo.
    */
    void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException;

    void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException;

}