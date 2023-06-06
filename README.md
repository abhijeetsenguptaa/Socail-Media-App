# API documentation Social-Media-App

**This repository contains API documentation for OLX-Classified**

1. **Overview**
   Basic API endpoint Deployed = `https://social-media-app-s8zz.onrender.com/api`\
   localhost = `http://localhost:8080`

- For running the server locally
  - npm install
  - npm run server
  - You need to create a .env file and insert the following fields:-
    `{
mongoUrl : Url of the database you want to connect.
secret_key: for token generation.
port: to listen the server.
}`

---

2. **Authentication**
   This API uses Role based Authorization.\
   In order to perform user any crud in app, Token is required.\
   Token can be obtained by creating account and logging into the system.\
   No separate login routes for users and admins.

---

3.  **User Registration** ### `URL: /register`
    **Method:** POST\
    **Responses**
    201 (Conflict): {"msg":"User's email-id already exists."}
    200 (OK):{"msg":"User registered Successfully"}
    500 (Not Found): {"msg":"Error in registration of the new User."}
    **Parameters:**
    | Field | Value |
    |-----------|----------------|
    | Name | String |
    | Email | String |
    | Password | String |
    | DOB | Date |
    | Bio | String |

---

4. **Login**
   ### `URL: /login`
   **Method:** POST\
    **Parameters:**\
    `{
    email: string,
    password:string 
}`\
    **Responses**\
    200 (OK): {"msg":"Login Successful",token}\
    500 (Not Found): {"msg":"User not found.."}\
    500 (Not Found): {"msg" : "Wrong Credentials"}

---

5. **Fetching all the Users**
   ### `URL: /users`
   **Method:** GET\
   **Responses:**\
   200 (OK) : {msg: 'List of all the registered Users.',data : `${users}` }\
   500 (Not Found) : { msg: 'Error in fetching the data of the Registered Users.'}

---

6. **Know Your All Friends**
   ### `URL: /users/:id/friends`
   **Method:** GET\
   **Responses**\
   200 (OK) : {data : Your Complete Friend List., data : `${friends}`}\
   500 (Not Found) : {msg: 'Error in fetching the friends List.'}

---

7. **Sending the Friend Request**
   ### `URL: /users/:id/friends`
   **Method:** POST\
   **Responses**\
   200 (OK) : {data : You have send a friend Request to `${userName}`}\
   500 (Not Found) : {msg: 'Error in sending a friend Request.'}

---

8. **Accepting the Friend Request**
   ### `URL: /classified/:id`
   **Method:** PATCH\
   **Responses**\
   200 (OK) : {msg: You have accepted the friend Request.}\
   500 (Not Found) : {msg: 'Error in accepting the friend Request'}

---

9. **All the Posts on the Social-Media-App**
   ### `URL: /posts`
   **Method:** GET\
   **Responses**\
   200 (OK) : {msg: List of all the Posts.\
   500 (Not Found) : {msg: 'Error in fetching the data of the posts.'}

---

10. **Fetching the specific Posts**
    ### `URL: /posts/:id`
    **Method:** GET\
    **Responses**\
    200 (OK) : {msg: Your specific post with ID : `${id}`}\
    500 (Not Found) : {msg: 'Error in fetching the data of the specific posts.'}

---

11. **Posting a New Post**

### `URL: /posts`

**Method:** POST\
**Responses**\
{
    200 (OK) : {msg : You have posted a new Post.}\
    500 (Not Found) : {msg: 'Error in posting a new Post.'}
}

**Parameters:**

{
    userID : String,
    text : String,
    image : String,
    createdAt : Date,
    likes : [ {type : id , ref : 'users'}],
    comments : [{id : {type : id , ref : 'users},text : String , createdAt : Date}]
}

---
