package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import javax.inject.Singleton;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import com.google.cloud.datastore.*;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.gson.Gson;

import pt.unl.fct.di.apdc.firstwebapp.api.ChatApi;
import pt.unl.fct.di.apdc.firstwebapp.factory.KeyStore;
import pt.unl.fct.di.apdc.firstwebapp.util.Post;

@Singleton
@Path("/forum")
public class ChatResource implements ChatApi {

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    private static final Logger LOG = Logger.getLogger(AnomalyResource.class.getName());

    private final Gson g = new Gson();

    @Override
    public Response addPost(Post post/* , String tokenObjStr */) {
        // AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser
        // passado como TokenClass
        // LOG.fine("User: " + tokenObj.getUsername() + " is attempting to post to
        // forum!");

        // Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        LOG.severe(post.getContent());
        LOG.severe(post.getQuestion());
        if (post.getContent().isEmpty() || post.getQuestion().isEmpty()) {
            LOG.warning("Empty post!");
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        Transaction txn = datastore.newTransaction();

        try {
            // Entity token = txn.get(tokenKey);

            /*
             * if (token == null) {
             * txn.rollback();
             * return Response.status(Response.Status.FORBIDDEN).build();
             * }
             */

            Key postKey = KeyStore.postKeyFactory(post.getId());

            Entity postEntity = Entity.newBuilder(postKey)
                    .set("question", post.getQuestion())
                    .set("content", post.getContent())
                    .set("votes", post.getVotes())
                    .set("repliesCount", post.getRepliesCount())
                    .set("views", post.getViews())
                    .set("created_at", post.getCreated_at())
                    .set("author", post.getAuthor())
                    .build();
            txn.add(postEntity);

            txn.commit();

            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while reporting anomaly: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response addReply(Post reply/* , String tokenObjStr */) {
        // AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser
        // passado como TokenClass
        // LOG.fine("User: " + tokenObj.getUsername() + " is attempting to post to
        // forum!");

        // Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

        if (reply.getContent().isEmpty()) {
            LOG.warning("Empty post!");
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        Transaction txn = datastore.newTransaction();

        try {
            // Entity token = txn.get(tokenKey);

            /*
             * if (token == null) {
             * txn.rollback();
             * return Response.status(Response.Status.FORBIDDEN).build();
             * }
             */

            Key replyKey = KeyStore.replyKeyFactory(UUID.randomUUID().toString(), reply.getId());

            Entity replyEntity = Entity.newBuilder(replyKey)
                    .set("author", reply.getAuthor())
                    .set("content", reply.getContent())
                    .set("likes", reply.getLikes())
                    .build();
            txn.add(replyEntity);

            txn.commit();

            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while reporting anomaly: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response bookmarkPost(String postId, String username /* , String tokenObjStr */) {
        // AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser
        // passado como TokenClass
        // LOG.fine("User: " + tokenObj.getUsername() + " is attempting to post to
        // forum!");

        // Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

        Key postKey = KeyStore.postKeyFactory(postId);

        Key userKey = KeyStore.userKeyFactory(username);

        Transaction txn = datastore.newTransaction();

        try {
            // Entity token = txn.get(tokenKey);

            /*
             * if (token == null) {
             * txn.rollback();
             * return Response.status(Response.Status.FORBIDDEN).build();
             * }
             */

            Entity post = txn.get(postKey);
            Entity user = txn.get(userKey);

            if (post == null || user == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            KeyFactory newPostKey = datastore.newKeyFactory().addAncestor(PathElement.of("Users", username));

            for (PathElement p : postKey.getAncestors()) {
                newPostKey.addAncestor(p);
            }

            Entity postEntity = Entity.newBuilder(newPostKey.setKind("Post").newKey(postId))
                    .set("question", post.getString("question"))
                    .set("content", post.getString("content"))
                    .set("votes", post.getLong("votes"))
                    .set("repliesCount", post.getLong("repliesCount"))
                    .set("views", post.getLong("views"))
                    .set("created_at", post.getString("created_at"))
                    .set("author", post.getString("author"))
                    .build();

            txn.delete(postKey);
            txn.put(postEntity);

            txn.commit();

            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while reporting anomaly: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response listUserBookmarks(String username) {
        // AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

        // Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        // Entity token = datastore.get(tokenKey);

        /*
         * if (token == null) {
         * return Response.status(Response.Status.FORBIDDEN).build();
         * }
         */

        Query<Entity> query = Query.newEntityQueryBuilder()
                .setKind("Post")
                .setFilter(PropertyFilter.hasAncestor(KeyStore.userKeyFactory(username)))
                .build();

        QueryResults<Entity> results = datastore.run(query);
        if (!results.hasNext()) {
            return Response.status(Response.Status.NOT_FOUND).entity("There are no anomalies!").build();
        }

        List<Post> resultList = new ArrayList<>();

        while (results.hasNext()) {
            Entity e = results.next();
            Post p = new Post(e.getString("question"), e.getString("content"), (int) e.getLong("votes"),
                    (int) e.getLong("repliesCount"), (int) e.getLong("views"),
                    e.getString("created_at"),
                    e.getString("author"), e.getKey().getName());
            resultList.add(p);
        }

        return Response.ok(g.toJson(resultList)).build();
    }

    @Override
    public Response listReply(String parentId/* String tokenObjStr */) {
        // AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

        // Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        // Entity token = datastore.get(tokenKey);

        /*
         * if (token == null) {
         * return Response.status(Response.Status.FORBIDDEN).build();
         * }
         */

        Query<Entity> query = Query.newEntityQueryBuilder()
                .setKind("Reply")
                .setFilter(PropertyFilter.hasAncestor(KeyStore.postKeyFactory(parentId)))
                .build();

        QueryResults<Entity> results = datastore.run(query);
        if (!results.hasNext()) {
            return Response.status(Response.Status.NOT_FOUND).entity("There are no anomalies!").build();
        }

        List<Post> resultList = new ArrayList<>();

        while (results.hasNext()) {
            Entity e = results.next();
            Post p = new Post(e.getString("author"), e.getString("content"), (int) e.getLong("likes"), parentId);
            resultList.add(p);
        }

        return Response.ok(g.toJson(resultList)).build();
    }

    @Override
    public Response listPosts(/* String tokenObjStr */) {
        // AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

        // Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        // Entity token = datastore.get(tokenKey);

        /*
         * if (token == null) {
         * return Response.status(Response.Status.FORBIDDEN).build();
         * }
         */

        Query<Entity> query = Query.newEntityQueryBuilder()
                .setKind("Post")
                .build();

        QueryResults<Entity> results = datastore.run(query);
        if (!results.hasNext()) {
            return Response.status(Response.Status.NOT_FOUND).entity("There are no anomalies!").build();
        }

        List<Post> resultList = new ArrayList<>();

        while (results.hasNext()) {
            Entity e = results.next();
            Post p = new Post(e.getString("question"), e.getString("content"), (int) e.getLong("votes"),
                    (int) e.getLong("repliesCount"), (int) e.getLong("views"),
                    e.getString("created_at"),
                    e.getString("author"), e.getKey().getName());
            resultList.add(p);
        }

        return Response.ok(g.toJson(resultList)).build();
    }
}
