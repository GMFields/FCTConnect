package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Collections;
import java.util.logging.Logger;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.cloud.ReadChannel;
import com.google.cloud.WriteChannel;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.common.io.ByteStreams;

import pt.unl.fct.di.apdc.firstwebapp.api.StaticMediaAPI;

//TODO @GMFields this class is a bunch of sh**, will update it soon
// For reference: https://cloud.google.com/storage/docs/uploads-downloads?hl=pt-br#client-libraries

@javax.ws.rs.Path("/gclstorage")
@SuppressWarnings("serial")
public class StaticMediaResource extends HttpServlet implements StaticMediaAPI  {
	private String projectId = "helical-ascent-385614";
	private String bucketName = "helical-ascent-385614.appspot.com";
	private String PATH = "https://storage.googleapis.com/helical-ascent-385614.appspot.com/";

	private static final Logger LOG = Logger.getLogger(UserResource.class.getName());

    /**
	 * Retrieves a file from GCS and returns it in the http response.
	 * If the request path is /gcs/Foo/Bar this will be interpreted as
	 * a request to read the GCS file named Bar in the bucket Foo.
	*/
	@Override
  	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	    // Download file from a specified bucket. The request must have the form /gcs/<bucket>/<object>
		Storage storage = StorageOptions.getDefaultInstance().getService();
	    // Parse the request URL
		Path objectPath = Paths.get(req.getPathInfo());
	    if ( objectPath.getNameCount() != 2 ) {
	      throw new IllegalArgumentException("The URL is not formed as expected. " +
	          "Expecting /gcs/<bucket>/<object>");
	    }
	    // Get the bucket and the object names
		String bucketName = objectPath.getName(0).toString();
		String srcFilename = objectPath.getName(1).toString();
		
	    Blob blob = storage.get(BlobId.of(bucketName, srcFilename));
	    
	    // Download object to the output stream. See Google's documentation.
	    resp.setContentType(blob.getContentType());
	    blob.downloadTo(resp.getOutputStream());
	}

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		// Upload file to specified bucket. The request must have the form /gcs/<bucket>/<object>
		Path objectPath = Paths.get(req.getPathInfo());
		if ( objectPath.getNameCount() != 2 ) {
		throw new IllegalArgumentException("The URL is not formed as expected. " +
			"Expecting /gcs/<bucket>/<object>");
		}
		// Get the bucket and object from the URL 
		String bucketName = objectPath.getName(0).toString();
		String srcFilename = objectPath.getName(1).toString();
		
		// Upload to Google Cloud Storage (see Google's documentation)
		Storage storage = StorageOptions.getDefaultInstance().getService();
		BlobId blobId = BlobId.of(bucketName, srcFilename);
		BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
									.setAcl(Collections.singletonList(Acl.newBuilder(Acl.User.ofAllUsers(),Acl.Role.READER).build()))
									.setContentType(req.getContentType())
									.build();
		// The following is deprecated since it is better to upload directly to GCS from the client
		Blob blob = storage.create(blobInfo, req.getInputStream());
	}

	@Override
	public void streamObjectUpload(String objectName, String contents) throws IOException {
		// The ID of your GCP project
		// String projectId = "your-project-id";

		// The ID of your GCS bucket
		// String bucketName = "your-unique-bucket-name";

		// The ID of your GCS object
		// String objectName = "your-object-name";

		// The string of contents you wish to upload
		// String contents = "Hello world!";

		Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
		BlobId blobId = BlobId.of(bucketName, objectName);
		BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
		byte[] content = contents.getBytes(StandardCharsets.UTF_8);

		try (WriteChannel writer = storage.writer(blobInfo)) {
			writer.write(ByteBuffer.wrap(content));
			System.out.println("Wrote to " + objectName + " in bucket " + bucketName + " using a WriteChannel.");
		}
	}

	@Override
	public void streamObjectDownload(String objectName, String targetFile) throws IOException {
		// The ID of your GCP project
		// String projectId = "your-project-id";
	
		// The ID of your GCS bucket
		// String bucketName = "your-unique-bucket-name";

		// The ID of your GCS object
		// String objectName = "your-object-name";

		// The path to the file to download the object to
		// String targetFile = "path/to/your/file";

		Path targetFilePath = Paths.get(targetFile);
		Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
		
		try (ReadChannel reader = storage.reader(BlobId.of(bucketName, objectName));
			FileChannel targetFileChannel = FileChannel.open(targetFilePath, StandardOpenOption.WRITE)) {
			ByteStreams.copy(reader, targetFileChannel);
			System.out.println("Downloaded object " + objectName + " from bucket "+ bucketName + " to " + targetFile + " using a ReadChannel.");
		}
  	}

	@Override
	public void downloadObject(String objectName, String destFilePath) {
		// The ID of your GCP project
		// String projectId = "your-project-id";
	  
		// The ID of your GCS bucket
		// String bucketName = "your-unique-bucket-name";
	  
		// The ID of your GCS object
		// String objectName = "your-object-name";
	  
		// The path to which the file should be downloaded
		// String destFilePath = "/local/path/to/file.txt";
	  
		Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
	  
	 	Blob blob = storage.get(BlobId.of(bucketName, objectName));
	  	blob.downloadTo(Paths.get(PATH + destFilePath));
	
		LOG.info("Downloaded object " + objectName + " from bucket name " + bucketName + " to " + destFilePath);
	}
}
