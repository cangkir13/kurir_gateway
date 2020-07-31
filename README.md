# Express-rest-api

> Express REST API with Sequalize and Mysql
## Library

- Routes mapping : [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper)
- Mysql driver : [mysql2](https://www.npmjs.com/package/mysql2).
- Promise-based ORM : [Sequalize](https://www.npmjs.com/package/sequelize).
- Data validator : [@hapi/joi](https://www.npmjs.com/package/@hapi/joi).
- Utility [nodemon](https://www.npmjs.com/package/nodemon)
- Enable Cors [cors](https://www.npmjs.com/package/cors)
- Secure HTTP headers [helmet](https://www.npmjs.com/package/helmet)


## Installation
#### Cloning Repository 

```sh
$ git clone https://github.com/cangkir13/kurir_gateway
``` 

#### Install Modules & Dependencies

```sh
$ npm install
```
#### Set Database config
```sh
development: config/connection.js
production: .env
```
#### Start Server
###### For development environments...
```sh
$ npm start
```
###### For production environments...
```sh
$ npm run production
```
Server will starts on 127.0.0.1:2017 or on 127.0.0.1:PORT_ENV






