# JECO
Jogo de Eliminação de Combinações Online

![alt tag](https://raw.githubusercontent.com/ericogr/jeco/master/docs/logotipo.png "Logo")

[JECO online](http://jeco.ericogr.com.br)

# Environment variables

## Authentication

### Facebook
**ClientID:** FACEBOOK_CLIENT_ID=

**Secret:** FACEBOOK_CLIENT_SECRET=

### Github
**ClientID:** GITHUB_CLIENT_ID=

**Secret:** GITHUB_CLIENT_SECRET=

### Google
**ClientID:** GOOGLE_CLIENT_ID=

**Secret:** GOOGLE_CLIENT_SECRET=

### Linkedin
**ClientID:** LINKEDIN_CLIENT_ID=

**Secret:** LINKEDIN_CLIENT_SECRET=

## Network

**IP address:** IP or OPENSHIFT_NODEJS_IP

**Port:** PORT or OPENSHIFT_NODEJS_PORT

## Database

**MongoDB URI:** MONGOLAB_URI or MONGOHQ_URL or OPENSHIFT_MONGODB_DB_URL or OPENSHIFT_MONGODB_DB_URL+OPENSHIFT_APP_NAME

# Build

`grunt build`

# Run

`grunt serve`

# Tests

`grunt test && grunt test:e2e`
