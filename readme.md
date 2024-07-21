# User Authentication System
This is a user authentication system api that allows users of the related app to log in, log out, change password and update their current user details.

Client: Abraham Annor

## Addin A New User
To add a new user, send a post request to this endpoint
```js
http://localhost:8100/api/users; 

<!-- requset body -->
{
  fullName: "Samuel Nigal",
  email: "samuelnigal@gmail.com",
  username: "samuel",
  studentId: "20271594",
  password: "test1234"
}
```