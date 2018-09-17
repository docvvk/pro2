// add this file to .gitignore

module.exports = {
  google: {
    client_id:
      "309705830215-7amt5isachpcb5cooobb3gafk2ra34u1.apps.googleusercontent.com",
    project_id: "budget-tracker-216608",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://www.googleapis.com/oauth2/v3/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "vOrL7HJOYKzYZ_bMJFTjchiX",
    redirect_uris: ["http://localhost:3000/auth/google/redirect"],
    javascript_origins: ["http://localhost:3000"]
  },
   session: {
       cookieKey: 'budget-tracker-awesome'
   }
};
