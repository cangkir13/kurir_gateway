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
$ git clone https://github.com/ipoyy/express-rest-api.git
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

## Routes
```sh
localhost:2017/api/register # Create user(s)
localhost:2017/api/assign # assign task(s) to user
localhost:2017/api/unassign # remove task(s) from user
localhost:2017/api/task/common # show user(s) tasks
```

## Example Requests
##### Create User
```json
{
  "Users": ["example1@email.com","example2@email.com" ]
}
```

##### Assign task(s) to user
```json
{
    "user": "example1@email.com",
    "tasks": ["Buy Love","Buy Flowers"]
}
```
##### Remove task(s) from user
```json
{
    "user": "example1@email.com",
    "tasks": ["Buy Love"]
}
```

##### List of tasks
```json
{
  "Users": ["example1@email.com","example2@email.com"]
}
```






