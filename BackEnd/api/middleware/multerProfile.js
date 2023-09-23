const multerProfile = require("multer");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

const storage = multerProfile.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profilePic');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.username + '-' + file.originalname);
    }
});

const profilePhoto = multerProfile({ storage: storage, fileFilter: imageFilter});

module.exports = { profilePhoto };
