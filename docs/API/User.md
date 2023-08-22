# USER API SPEC

---
##  Register User API
Endpoint : POST /api/users

Request Body:
```json
{
    "name": "user",
    "username": "username",
    "password": "private"
}
  ```
Response Body Success:
```json
{
    "data": {
        "name": "user",
        "username": "username"
    }   
}
```
Response Body Failed:
```json
{
    "error": "user already exists"
}
```
---

## Login User API
Endpoint: POST /api/users/login

Request Body: 
```json
{
    "username": "username",
    "password": "private"
}
```
Response Body Success:

```json
{
  "data": {
    "token": "uniqe-tokenxxxx"
  }
}
```
Response Body Failed:

```json
{
  "error": "username and password wrong"
}
```
---
## Update User API
Endpoint : PATCH /api/users/current

Headers :

    Authorization : token

Request Body:

```json
{
  "name": "new name",
  "password": "new password" 
}
```
note: 
request body optional parameter user want
+ name
+ password


Response Body Success:

```json
{
  "data": {
    "name": "new name",
    "username": "username"
  }
}
```
Response Body Failed:

```json
{
  "error": "Name max length 100"
}
```
---
## Get User API
Endpoint : GET /api/users/current

Headers :

    Authorization : token


Request Body Success:
```json
{
  "data" : {
    "username" : "pzn",
    "name" : "Programmer Zaman Now"
  }
}
```
Response Body Failed:
```json
{
  "errors" : "Unauthorized"
}
```
---
## Logout User API
Endpoint : DELETE /api/users/logout

Headers :

    Authorization : token

Response Body Success:
```json
{
  "data" : "OK"
}
```
Response Body Failed:
```json
{
  "errors" : "Unauthorized"
}
```
---