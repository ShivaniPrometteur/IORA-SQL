module.exports = {
    server: {
        //host: "",
        port: process.env.PORT || 8080,
        api: {
            basepath: "/api",
            // basepath: "/api/v1"
        }
    },
    // Database connection object
    // development server
    // database: {
    //     host: "161.97.139.127",
    //     port: "12109",
    //     dbname: "cigamat_iora",
    //     options: {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         useFindAndModify: false,
    //         useCreateIndex: true,
    //         auth: {
    //             user: "cigamat_iora",
    //             password: "8z1AieVHCKjI",
    //             ssl: false
    //         },
    //     }
    // },
    // production server
    database: {
        host: "103.175.163.238",
        port: "29012",
        dbname: "theiorac_theiorac",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            auth: {
                user: "theiorac_user",
                password: "43NSHEBMn4hd",
                ssl: false
            },
        }
    },
    mail: {
        host: "mail.theiora.com",
        username: "no_reply@theiora.com",
        password: "dW35CuVR5DuF",
        port: 25,
        from_name: "Theiora",
        from_address: "no_reply@theiora.com"
    },
    gender_allowed: ["male", "female", "other"],
    default_gender: "male",
    user_status: {
        active: 1,
        block: 2,
        pending: 3
    },
    FIREBASE_SERVER_KEY:"AAAA6hb_xSM:APA91bH7pdpHPaxe7ysAoG8HojhRn-q3syQF-hWygpb4jQH37y4ie0tsh_aRt_cXMiaKwo4MlcMLPYJUxHJ35OYuzRKO7dIZj6Pso4HHNuwMZ7to-x0XcEJACIdmyUwd3m85uXlpMw9s",
    JWT_SECRET_KEY: "fb1CbH+f+3L*6BxP+Bwmdsxi_eHS0dfLxgSh!KWMq_34^XVAS!8)41OPrsAo8d(#g&Y0lCR6FmRIWJ9x0x+slqCHeN5s#w$3iGEfd9W4gwKd!U+mNOzrdTDfds5umj@mvCk((4z4m%GD5zfG309AP+7e0&chE84*5"
}