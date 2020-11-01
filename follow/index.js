module.exports = async function (context, req) {
    context.log(`x-ms-client-principal-name: ${req.headers['x-ms-client-principal-name']}`);

    if (req.headers['x-ms-client-principal-name'] == null) {
        context.res = {
            status: 403,
        };
        return;
    }

    if (req.body == null || req.body.follow == null) {
        context.res = {
            status: 400,
            body: `missing follow`,
        };
        return;
    }

    const user_id = req.headers['x-ms-client-principal-name'];
    const timestamp = Date.now();
    const follow = req.body.follow;

    context.bindings.outputDocument = {
        id: `${user_id}_${timestamp}`,
        user_id,
        timestamp,
        follow,
    }

    context.res = {
        status: 201,
    };
}
