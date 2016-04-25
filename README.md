# JECO
Jogo de Eliminação de Combinações Online

![alt tag](https://raw.githubusercontent.com/ericogr/jeco/master/docs/logotipo.png "Logo JECO")

[JECO online](http://jeco.ericogr.com.br)

# Environment variables

## Authentication

### Facebook
**ClientID:** FACEBOOK_CLIENT_ID=`your-client-id`

**Secret:** FACEBOOK_CLIENT_SECRET=`your-client-secret`

### Github
**ClientID:** GITHUB_CLIENT_ID=`your-client-id`

**Secret:** GITHUB_CLIENT_SECRET=`your-client-secret`

### Google
**ClientID:** GOOGLE_CLIENT_ID=`your-client-id`

**Secret:** GOOGLE_CLIENT_SECRET=`your-client-secret`

### Linkedin
**ClientID:** LINKEDIN_CLIENT_ID=`your-client-id`

**Secret:** LINKEDIN_CLIENT_SECRET=`your-client-secret`

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

# Deploy
