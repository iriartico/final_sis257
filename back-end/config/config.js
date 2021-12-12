let SECRET_KEY = "mortadela";
let SECRET_JWT = "MySecretPass123++"; 

module.exports = {
    SECRET_KEY,
    SECRET_TOKEN: require("crypto").createHmac("sha256", SECRET_KEY).update(SECRET_JWT).digest("hex"),
}