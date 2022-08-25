module.exports = {
    server: {
        //host: "",
        port: process.env.PORT || 8080,
        api: {
            basepath: "/api",
            // basepath: "/api/v1"
        }
    },
    // Datbase connection object
    database: {
        host: "127.0.0.1",
        port: "27017",
        dbname: "iora",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        }
    },
    mail: {
        host: "mail.prometteur.in",
        username: "no_reply@prometteur.in",
        password: "!lRb!6]Uv(Ao",
        port: 587,
        from_name: "Prometteur",
        from_address: "no_reply@prometteur.in"
    },
    gender_allowed: ["male", "female", "other"],
    default_gender: "male",
    user_status: {
        active: 1,
        block: 2,
        pending: 3
    },
    JWT_SECRET_KEY: "fb1CbH+f+3L*6BxP+Bwmdsxi_eHS0dfLxgSh!KWMq_34^XVAS!8)41OPrsAo8d(#g&Y0lCR6FmRIWJ9x0x+slqCHeN5s#w$3iGEfd9W4gwKd!U+mNOzrdTDfds5umj@mvCk((4z4m%GD5zfG309AP+7e0&chE84*5",
    FIREBASE_SERVER_KEY:"AAAA6hb_xSM:APA91bH7pdpHPaxe7ysAoG8HojhRn-q3syQF-hWygpb4jQH37y4ie0tsh_aRt_cXMiaKwo4MlcMLPYJUxHJ35OYuzRKO7dIZj6Pso4HHNuwMZ7to-x0XcEJACIdmyUwd3m85uXlpMw9s"
}