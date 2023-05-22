import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.cloud.WriteChannel;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import pt.unl.fct.di.apdc.firstwebapp.api.StaticMediaAPI;

//TODO @GMFields this class is a bunch of sh**, will update it soon
// For reference: https://cloud.google.com/storage/docs/uploads-downloads?hl=pt-br#client-libraries

@SuppressWarnings("serial")
public class StaticMediaResource extends HttpServlet implements StaticMediaAPI    {
	private final String bucketName = "helical-ascent-385614.appspot.com";

	@Override
  	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	    // Download file from a specified bucket. The request must have the form /gcs/<bucket>/<object>
		Storage storage = StorageOptions.getDefaultInstance().getService();

	    // Parse the request URL
		Path objectPath = Paths.get(req.getPathInfo());
	    if ( objectPath.getNameCount() != 1 ) {
	      throw new IllegalArgumentException("The URL is not formed as expected. " +
	          "Expecting /gcs/<object>");
	    }
	    // Get the bucket and the object names
		String srcFilename = objectPath.getName(0).toString();
		
	    Blob blob = storage.get(BlobId.of(bucketName, srcFilename));
	    
	    // Download object to the output stream. See Google's documentation.
	    resp.setContentType(objectPath.toAbsolutePath().toString());
	    blob.downloadTo(resp.getOutputStream());
	}

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		// Upload file to specified bucket. The request must have the form /gcs/<bucket>/<object>
		Path objectPath = Paths.get(req.getPathInfo());

		// Parse the request URL
		if ( objectPath.getNameCount() != 1 ) {
		throw new IllegalArgumentException("The URL is not formed as expected. " +
			"Expecting /gcs/<object>");
		}
		// Get the bucket and object from the URL 
		String srcFilename = objectPath.getName(0).toString();
		
		// Upload to Google Cloud Storage (see Google's documentation)
		Storage storage = StorageOptions.getDefaultInstance().getService();
		BlobId blobId = BlobId.of(bucketName, srcFilename);
		BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
									.setAcl(Collections.singletonList(Acl.newBuilder(Acl.User.ofAllUsers(),Acl.Role.READER).build()))
									.setContentType(req.getContentType())
									.build();

		byte[] content = req.getInputStream().readAllBytes();

		//Changed version from another upload function given by cloud storage API @GMFields
		try (WriteChannel writer = storage.writer(blobInfo)) {
			writer.write(ByteBuffer.wrap(content));
			System.out.println("Wrote to " + srcFilename + " in bucket " + bucketName + " using a WriteChannel.");
		}
	}
}
