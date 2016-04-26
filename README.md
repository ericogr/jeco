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

# Dependencies
I'm using Ubuntu 16.04 LTS to develop, but you can adapt to your favorite flavor or windows...

## Install NodeJS
I can recomend [nvm](https://github.com/creationix/nvm) to install the latest version of Nodejs

## Install JAVA VM
(required to run Selenium e2e tests)

You can install only JRE, but these instructions includes a JDK

```shell
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

## Install Ruby
`sudo apt-get install ruby` 

## Install SASS
`sudo gem install sass`

## Install Grunt
`npm install -g grunt-cli`

## Install Bower
`npm install -g bower`

## Install WebDriver
(required to run Selenium e2e tests)

`npm run update-webdriver`

## Install client dependencies
`bower install`

## Install server dependencies
`npm install`

# Build
`grunt build`

The dist files are in ./dist folder.

# Run
`grunt serve`

# Tests
`grunt test && grunt test:e2e`