

module.exports = (app) => {

    // app errors handler
    app.use((err, req, res, next) => {
        let response = {
            status: err.statusCode || 400,
            error_code: err.code || 'BadRequest',
            message: err.message,
        };
        /** Moongose bad object id */
        if (err.name === "CastError") {
            if (err.code === "ERR_ASSERTION") {
                response.message = err.message;
            } else {
                response.status = 404;
                response.message = err.message;
                response.error_code = "404NotFound";
            }

        }
        res.json(response);
    });

    // 404 error handler
    app.use((req, res) => {
        res.json({
            status: 404,
            message: "404 Not found",
            error_code: "404NotFound"
        });
    });
}