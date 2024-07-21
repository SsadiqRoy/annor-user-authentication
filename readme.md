# User Authentication System
This is a user authentication system api that allows users of the related app to log in, log out, change password and update their current user details.

Client: Abraham Annor

### Adding A New User
To add a new user, send a `POST` request to this endpoint
```js
  http://localhost:8100/api/users; 

  <!-- requset body -->
  {
    fullName: "Ssadiq Roy",
    email: "ssadiq@mymail.com",
    username: "ssadiqroy",
    studentId: "20272396", // maximum of 8 and minimum of 8
    password: "test1234" // minimum of 8
  }
```
replace `http://localhost:8100` to your domain. Example `https://mydomain.com`

### Loging In
To Log in send a `POST` request to this endpoint
```js
  http://localhost:8100/api/users/login

  // requset body
  {
    username: "ssadiqroy",
    studentId: "20272396", // maximum of 8 and minimum of 8
    password: "test1234" // minimum of 8
  }
```
### Loging Out
To Log out send a `GET` request to this endpoint `http://localhost:8100/api/users/logout`

### Authenticating User Log In
This is to check and see if a user is logged in or not. In your system, send a `GET` request to the endpoint `http://localhost:8100/api/users/authorize`. You should recieve a json response in the format below
```js
  {
    "status": "success",
    "data": {
      "_id": "669d3b7f48e18c7cb9ee6d68",
      "fullName": "Ssadiq Roy",
      "email": "ssadiqroy@mymail.com",
      "username": "ssadiq",
      "studentId": "20271283",
      "createdAt": "2024-07-21T16:46:57.013Z",
      "id": "669d3b7f48e18c7cb9ee6d68"
    }
}
```

An error would be thrown if the user is not logged in. Error Format
```js
  {
    "status": "failed",
    "statusCode": 401,
    "textCode": "UNAUTHORIZED",
    "_message": "Your are not logged in",
    "isOperational": true,
    "originalMessage": "Your are not logged in"
}
```

### Update User Details
To update user details, send a `PATCH` request to `http://localhost:8100/api/users`. 
```js
  // Request Body
  {
    fullName: "Ssadiq Roy",
    studentId: "20271595",
    username: "ssadiq"
}
```

### Change User Password
To your password, send a `PATCH` request to `http://localhost:8100/api/users/change-password`. 
```js
  // Request Body
  {
    currentPassword: "pass1234",
    newPassword: "test1234"
}
```

### Get All Users
To get all users, send a `GET` request to `http://localhost:8100/api/users`. 
```js
  // Response Format

  {
    "status": "success",
    "length": 2,
    "data": [
      {
        "_id": "669d3b7f48e18c7cb9ee6d68",
        "fullName": "Ssadiq Roy",
        "email": "ssadiqroy@maymail.com",
        "username": "ssadiq",
        "studentId": "20274726",
        "createdAt": "2024-07-21T16:46:57.013Z",
        "id": "669d3b7f48e18c7cb9ee6d68"
      },
      {
        "_id": "669d3b7f48e18c7cb9ee6d68",
        "fullName": "Ssadiq Roy",
        "email": "ssadiqroy@maymail.com",
        "username": "ssadiq",
        "studentId": "20274726",
        "createdAt": "2024-07-21T16:46:57.013Z",
        "id": "669d3b7f48e18c7cb9ee6d68"
      },
        
    ]
  }
```

### Get One Particular User
To your password, send a `GET` request to `http://localhost:8100/api/users/[userId]`. 
```js
  http://localhost:8100/api/users/669d3b7f48e18c7cb9ee6d68

  // Request Body
  {
    "status": "success",
    "data": {
      "_id": "669d3b7f48e18c7cb9ee6d68",
      "fullName": "Ssadiq Roy",
      "email": "ssadiqroy@maymail.com",
      "username": "ssadiq",
      "studentId": "20274726",
      "createdAt": "2024-07-21T16:46:57.013Z",
      "id": "669d3b7f48e18c7cb9ee6d68"
    }
  }
```

