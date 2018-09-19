    // add this file to .gitignore

    module.exports = {
      google: {
        client_id:
          "331657782912-94n1b3knicgs2535ikrr2742sop73te5.apps.googleusercontent.com",
        project_id: "budget-216822",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://www.googleapis.com/oauth2/v3/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "yX_3K_ax6xjF4FxlL8oMIZ09",
        redirect_uris: [
          "https://cryptic-badlands-31521.herokuapp.com/auth/google/redirect"
        ],
        javascript_origins: ["https://cryptic-badlands-31521.herokuapp.com"]
      },
      session: {
        cookieKey: "asdfghjklzxcvbnm"
      }
    };
  