# traffic_fallback_backend
Fallback API for a project whose front-end I'm handling

# References
1. https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
2. https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-2
3. https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-3

# Excerpts from lectures
1. Our user schema probably looks familiar because it’s similar to our DTO entities. The main difference is that we are defining which fields should exist in our MongoDB collection called Users, while the DTO entities defines which fields to accept in an HTTP request.

2. Readers may notice that each of the calls to User member functions is chained to an exec() call. This is optional, but the Mongoose developers recommend it because it provides better stack traces when debugging.

3. We’re using updateUserById() for both PUT and PATCH as we hinted at above. (As mentioned in Part 2, we’re following typical REST API implementations rather than attempting to adhere to particular RFCs to the letter. Among other things, this means not having PUT requests create new entities if they don’t exist; this way, our back end doesn’t hand over control of ID generation to API consumers.)

4. The main structure here is a fairly robust pattern. For instance, it can be reused if developers want to swap Mongoose and MongoDB for something like TypeORM and PostgreSQL. As above, such a replacement would simply require refactoring the individual functions of the DAO while maintaining their signatures to match the rest of the code.

5. To set the fields we want to validate, we’ll use the body() method that we’ll import at our users.routes.config.ts. The body() method will validate fields and generate an errors list—stored in the express.Request object—in case of failure. We then need our own middleware to check and make use of the errors list.

6. 401 Unauthorized is about authentication and 403 Forbidden is about authorization. We’ll err on the side of “auth” standing for “authentication” in module names, and use “permissions” for matters of authorization.

7. 