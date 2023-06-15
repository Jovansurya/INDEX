# INDEX

## IP
http://34.101.127.232/
## Endpoint
### 1. Users Activity
|POST| `/register` | To sign up a new user account

Body:

![image](/images/register-bodyy.png)

Response
![image](/images/register.png)

|POST| `/login` | To login an existing user account
Body:

![image](/images/login-body.png)
Response
![image](/images/login.png)

### 2.  Articles
| GET | `/articles` | Get Articles 
Response:
![image](/images/artikel.png)

### 3.  Predict
| GET | `/harga/<provinsi>` | Get chilly price from 2020-2023

Response
![image](/images/harga.png)


| GET | `/data/<provinsi>` | Get predict chilly price graph

Response
![image](/images/data.png)

| GET | `/image/health` | Get predict chilly price graph
Body:
![image](/images/image-save.png)

Response:
![image](/images/image.png)

