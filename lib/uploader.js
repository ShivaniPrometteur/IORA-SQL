"use strict";

const multer = require("multer");
const path = require("path");

const default_options = {
    dest: "public/uploads",
    filename: "timestamp",
    mime_types: [],
    filesize: 1000000
};
/**
 * Upload file using npm multer package
 * 
 * @param {*} options 
 * @returns 
 */
exports.file = (options = default_options) => {
    let storage = {},
        uploader = {};
    let filenameChanged = false;
    storage.destination = options.dest ? options.dest : "public";
    if (options.filename && options.filename != 'original') {
        filenameChanged = true;
    }
    if (filenameChanged) {
        storage.filename = (req, file, cb) => {
            let filename = options.filename == 'timestamp' ? Date.now() : options.filename;
            if (options.filenamePrefix) {
                filename = options.filenamePrefix + filename;
            }
            cb(null, filename + path.extname(file.originalname))
        }
    }
    // Set storage and filename
    uploader.storage = multer.diskStorage(storage);
    // File size limit
    if (options.filesize && options.filesize > 0) {
        uploader.limits = { fileSize: options.filesize };
    }
    // Allowed mime types
    if (options.mime_types) {
        let allowed_mime_types = options.mime_types;
        if (typeof allowed_mime_types == 'string') {
            allowed_mime_types = allowed_mime_types.split(",")
        }
        if (allowed_mime_types.length > 0) {
            uploader.fileFilter = (req, file, cb) => {
                if (!allowed_mime_types.includes(file.mimetype)) {
                    let error = options.filetype_error ? options.filetype_error : "file is not allowed";
                    return cb(new Error(error));
                }
                cb(null, true);
            }
        }
    }
    return multer(uploader);
}

/**
 * Upload image file
 * 
 * @param {String} dest - Destination folder 
 * @param {Interger} size - File size limit
 * @param {String} filename - Modifiy filename without ext.
 * @returns 
 */
exports.image = (dest = "public/uploads", size = 1000000, filename = "timestamp") => {
    return this.file({
        dest: dest,
        fileSize: size,
        filename: filename,
        mime_types: [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp'
        ]
    })
}

exports.audio_file = (dest = "public/uploads", size = 5000000, filename = "timestamp") => {
    return this.file({
        dest: dest,
        fileSize: size,
        filename: filename,
        // mime_types: [
        //     'audio/mp3'
        // ]
    })
}