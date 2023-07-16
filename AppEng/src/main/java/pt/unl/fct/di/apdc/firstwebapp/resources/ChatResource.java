package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import javax.inject.Singleton;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.google.cloud.Timestamp;
import com.google.cloud.datastore.*;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.gson.Gson;

import pt.unl.fct.di.apdc.firstwebapp.api.ChatApi;
import pt.unl.fct.di.apdc.firstwebapp.factory.KeyStore;
import pt.unl.fct.di.apdc.firstwebapp.util.AuthToken;
import pt.unl.fct.di.apdc.firstwebapp.util.Post;

@Singleton
@Path("/forum")
public class ChatResource implements ChatApi {

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    private static final Logger LOG = Logger.getLogger(AnomalyResource.class.getName());

    private final Gson g = new Gson();

    private final AdminResource admin = new AdminResource();

    Cursor pageCursor;

    @Override
    public Response addPost(Post post, String tokenObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        Response resp = verifyToken(tokenObjStr);
        if (resp != null) {
            return resp;
        }

        LOG.warning(tokenObj.toString());
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to post to forum!");

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        LOG.severe(post.getContent());
        LOG.severe(post.getQuestion());
        if (post.getContent().isEmpty() || post.getQuestion().isEmpty()) {
            LOG.warning("Empty post!");
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        Transaction txn = datastore.newTransaction();

        try {
            Entity token = txn.get(tokenKey);

            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            Key postKey = KeyStore.postKeyFactory(post.getId());

            post.setCreated_at(Timestamp.now().toDate().toString());

            Entity postEntity = Entity.newBuilder(postKey)
                    .set("question", post.getQuestion())
                    .set("content", post.getContent())
                    .set("votes", post.getVotes())
                    .set("repliesCount", post.getRepliesCount())
                    .set("views", post.getViews())
                    .set("created_at", post.getCreated_at())
                    .set("author", post.getAuthor())
                    .set("id", post.getId())
                    .build();
            txn.put(postEntity);

            txn.commit();
            admin.sendNotification("New Post Added",
                    String.format("%s just added a new Post", tokenObj.getUsername()), "general");

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
    public Response updatePost(Post post, String tokenObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to post to forum!");

        Transaction txn = datastore.newTransaction();

        try {
            Response resp = verifyToken(tokenObjStr);
            if (resp != null) {
                return resp;
            }

            Query<Entity> query = Query.newEntityQueryBuilder()
                    .setKind("Post")
                    .setFilter(PropertyFilter.eq("id", post.getId()))
                    .build();

            QueryResults<Entity> results = datastore.run(query);

            if (!results.hasNext()) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            Entity postEntity = results.next();

            postEntity = Entity.newBuilder(postEntity.getKey())
                    .set("question", post.getQuestion())
                    .set("content", post.getContent())
                    .set("votes", post.getVotes())
                    .set("repliesCount", post.getRepliesCount())
                    .set("views", post.getViews())
                    .set("created_at", post.getCreated_at())
                    .set("author", post.getAuthor())
                    .set("id", post.getId())
                    .build();
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
    public Response removePost(String postId, String tokenObjStr) {
        Transaction txn = datastore.newTransaction();

        try {
            Response resp = verifyToken(tokenObjStr);
            if (resp != null) {
                return resp;
            }

            Key postKey = KeyStore.postKeyFactory(postId);
            Entity post = txn.get(postKey);

            if (post == null) {
                txn.rollback();
                return Response.status(Status.BAD_REQUEST).build();
            }

            txn.delete(postKey);

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
    public Response addReply(Post reply, String tokenObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to post to forum!");

        if (reply.getContent().isEmpty()) {
            LOG.warning("Empty post!");
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        Transaction txn = datastore.newTransaction();

        try {
            Response resp = verifyToken(tokenObjStr);
            if (resp != null) {
                return resp;
            }

            Key replyKey = KeyStore.replyKeyFactory(UUID.randomUUID().toString(), reply.getId());

            Entity replyEntity = Entity.newBuilder(replyKey)
                    .set("author", reply.getAuthor())
                    .set("content", reply.getContent())
                    .set("likes", reply.getLikes())
                    .build();
            txn.add(replyEntity);

            Key postKey = KeyStore.postKeyFactory(reply.getId());
            Entity post = txn.get(postKey);

            if (post == null) {
                txn.rollback();
                return Response.status(Status.BAD_REQUEST).build();
            }

            txn.commit();
            admin.sendNotification("New Reply Added",
                    String.format("%s just added a new Reply", tokenObj.getUsername()), post.getString("author"));

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
    public Response updateReply(Post reply, String tokenObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to post to forum!");

        Transaction txn = datastore.newTransaction();

        try {
            Response resp = verifyToken(tokenObjStr);
            if (resp != null) {
                return resp;
            }

            Query<Entity> query = Query.newEntityQueryBuilder()
                    .setKind("Reply")
                    .setFilter(PropertyFilter.eq("author", reply.getAuthor()))
                    .build();

            QueryResults<Entity> results = datastore.run(query);

            if (!results.hasNext()) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            Entity replyEntity = results.next();

            replyEntity = Entity.newBuilder(replyEntity.getKey())
                    .set("author", reply.getAuthor())
                    .set("content", reply.getContent())
                    .set("likes", reply.getLikes())
                    .build();
            txn.put(replyEntity);

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
    public Response bookmarkPost(String postId, String username, String tokenObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to post to forum!");

        Key userKey = KeyStore.userKeyFactory(username);

        Transaction txn = datastore.newTransaction();

        try {
            Response resp = verifyToken(tokenObjStr);
            if (resp != null) {
                return resp;
            }

            Query<Entity> query = Query.newEntityQueryBuilder()
                    .setKind("Post")
                    .setFilter(PropertyFilter.eq("id", postId))
                    .build();

            QueryResults<Entity> results = datastore.run(query);

            if (!results.hasNext()) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            Entity post = results.next();
            Entity user = txn.get(userKey);

            if (user == null) {
                txn.rollback();
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

            KeyFactory newPostKey = datastore.newKeyFactory();
            PathElement a = PathElement.of("Users", username);

            if (post.getKey().getAncestors().contains(a)) {
                txn.rollback();
                return Response.status(Status.CREATED).build();
            }

            newPostKey.addAncestor(a);
            for (PathElement p : post.getKey().getAncestors()) {
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
                    .set("id", postId)
                    .build();

            txn.delete(post.getKey());
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
    public Response unbookmarkPost(String postId, String username, String tokenObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to post to forum!");

        Key userKey = KeyStore.userKeyFactory(username);

        Transaction txn = datastore.newTransaction();

        try {
            Response resp = verifyToken(tokenObjStr);
            if (resp != null) {
                return resp;
            }

            Query<Entity> query = Query.newEntityQueryBuilder()
                    .setKind("Post")
                    .setFilter(PropertyFilter.eq("id", postId))
                    .build();

            QueryResults<Entity> results = datastore.run(query);

            if (!results.hasNext()) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            Entity post = results.next();
            Entity user = txn.get(userKey);

            if (user == null) {
                txn.rollback();
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

            KeyFactory newPostKey = datastore.newKeyFactory();
            PathElement a = PathElement.of("Users", username);

            if (!post.getKey().getAncestors().contains(a)) {
                txn.rollback();
                return Response.status(Status.CREATED).build();
            }

            for (PathElement p : post.getKey().getAncestors()) {
                if (!p.equals(a))
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
                    .set("id", postId)
                    .build();

            txn.delete(post.getKey());
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
    public Response listUserBookmarks(String username, String tokenObjStr, String cursorObjStr) {

        Cursor cursorObj = null;
        if (!cursorObjStr.equals("")) {
            String[] byteArrayValues = cursorObjStr.replace("[", "").replace("]", "").replaceAll("\\s+", "").split(",");
            byte[] byteArray = new byte[byteArrayValues.length];

            for (int i = 0; i < byteArrayValues.length; i++) {
                byteArray[i] = (byte) Integer.parseInt(byteArrayValues[i]);
            }

            cursorObj = Cursor.copyFrom(byteArray);
        }

        Response resp = verifyToken(tokenObjStr);
        if (resp != null) {
            return resp;
        }

        EntityQuery.Builder query = Query.newEntityQueryBuilder()
                .setKind("Post")
                .setFilter(PropertyFilter.hasAncestor(KeyStore.userKeyFactory(username)))
                .setLimit(4);

        if (cursorObj != null) {
            LOG.warning(cursorObj.toString());
            query.setStartCursor(cursorObj);
        } else {
            query.setStartCursor(pageCursor);
        }

        QueryResults<Entity> results = datastore.run(query.build());
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

        Cursor nextPage = results.getCursorAfter();

        return Response.ok(g.toJson(resultList) + g.toJson(nextPage)).build();
    }

    @Override
    public Response listUserPosts(String tokenObjStr, String cursorObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

        String username = tokenObj.getUsername();

        Cursor cursorObj = null;
        if (!cursorObjStr.equals("")) {
            String[] byteArrayValues = cursorObjStr.replace("[", "").replace("]", "").replaceAll("\\s+", "").split(",");
            byte[] byteArray = new byte[byteArrayValues.length];

            for (int i = 0; i < byteArrayValues.length; i++) {
                byteArray[i] = (byte) Integer.parseInt(byteArrayValues[i]);
            }

            cursorObj = Cursor.copyFrom(byteArray);
        }

        Response resp = verifyToken(tokenObjStr);
        if (resp != null) {
            return resp;
        }

        EntityQuery.Builder query = Query.newEntityQueryBuilder()
                .setKind("Post")
                .setFilter(PropertyFilter.eq("author", username))
                .setLimit(4);

        if (cursorObj != null) {
            LOG.warning(cursorObj.toString());
            query.setStartCursor(cursorObj);
        } else {
            query.setStartCursor(pageCursor);
        }

        QueryResults<Entity> results = datastore.run(query.build());
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

        Cursor nextPage = results.getCursorAfter();

        return Response.ok(g.toJson(resultList) + g.toJson(nextPage)).build();
    }

    @Override
    public Response searchPost(String tokenObjStr, String substring) {

        Response resp = verifyToken(tokenObjStr);
        if (resp != null) {
            return resp;
        }

        Query<Entity> query = Query.newEntityQueryBuilder()
                .setKind("Post")
                .build();

        QueryResults<Entity> results = datastore.run(query);
        if (!results.hasNext()) {
            return Response.status(Response.Status.NOT_FOUND).entity("There are no Posts!").build();
        }

        List<Post> resultList = new ArrayList<>();

        while (results.hasNext()) {
            Entity e = results.next();
            if (e.getString("question").contains(substring)) {
                Post p = new Post(e.getString("question"), e.getString("content"), (int) e.getLong("votes"),
                        (int) e.getLong("repliesCount"), (int) e.getLong("views"),
                        e.getString("created_at"),
                        e.getString("author"), e.getKey().getName());
                resultList.add(p);
            }
        }

        return Response.ok(g.toJson(resultList)).build();
    }

    @Override
    public Response listReply(String parentId) {
        Query<Entity> query = Query.newEntityQueryBuilder()
                .setKind("Reply")
                .setFilter(PropertyFilter.hasAncestor(KeyStore.postKeyFactory(parentId)))
                .build();

        QueryResults<Entity> results = datastore.run(query);
        if (!results.hasNext()) {
            return Response.status(Response.Status.NOT_FOUND).entity("There are no replies!").build();
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
    public Response listPosts(String cursorObjStr) {
        Cursor cursorObj = null;
        if (!cursorObjStr.equals("")) {
            String[] byteArrayValues = cursorObjStr.replace("[", "").replace("]", "").replaceAll("\\s+", "").split(",");
            byte[] byteArray = new byte[byteArrayValues.length];

            for (int i = 0; i < byteArrayValues.length; i++) {
                byteArray[i] = (byte) Integer.parseInt(byteArrayValues[i]);
            }

            cursorObj = Cursor.copyFrom(byteArray);
        }

        EntityQuery.Builder query = Query.newEntityQueryBuilder().setOrderBy(OrderBy.asc("created_at"))
                .setKind("Post")
                .setLimit(2);

        if (cursorObj != null) {
            LOG.warning(cursorObj.toString());
            query.setStartCursor(cursorObj);
        } else {
            query.setStartCursor(pageCursor);
        }

        QueryResults<Entity> results = datastore.run(query.build());
        if (!results.hasNext()) {
            return Response.status(Response.Status.NOT_FOUND).entity("There are no posts.").build();
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

        Cursor nextPage = results.getCursorAfter();

        return Response.ok(g.toJson(resultList) + g.toJson(nextPage)).build();
    }

    private Response verifyToken(String tokenObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como AuthToken

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        Entity token = datastore.get(tokenKey);

        if (token == null) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        if (token.getLong("token_expirationdata") < System.currentTimeMillis()) {
            return Response.status(Response.Status.FORBIDDEN).entity("data expirada").build();
        }

        return null;

    }
}
