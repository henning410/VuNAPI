# VuNAPI

**The Vulnerable NestJS API** _(Based on OpenAPI 3)_

![VuNAPI Logo](./logo_vunapi.png)

VuNAPI is a vulnerable API made with NestJS that contains various vulnerabilities. During my thesis on fuzzing, I found that previous vulnerable APIs did not meet my requirements, so I decided to implement this application. It includes an on/off switch to enable vulnerabilities for specific scenarios and allows you to choose the type of authentication you want to use. VuNAPI can also be used for learning and teaching purposes.

You can find more details about the vulnerabilities in [this document](./Vulnerabilities.md).

## ✨ Features

- 📄 OpenAPI3 specs included.
- 2️⃣ HTTP/2 support
- 🔒 HTTPS On/Off Switch
- 🔄 Global switch to toggle specific vulnerable scenarios.
- 🔒 Selectable authentication methods: JWT, Basic, or no authentication.
- 🖥️ Available Swagger UI to directly interact with the API.

## 📜 Swagger / OpenAPI Specification

| **Action**  | **Path**         | **Details**                                   |
| :---------- | :--------------- | :-------------------------------------------- |
| **default** |
| HEAD        | /isAlive         | Check if VuNAPI is running                    |
| GET         | /testStatusCodes | Returns different status codes than specified |
| GET         | /kill            | Shut down the server                          |
| GET         | /redos           | Check if email is valid                       |
| GET         | /exec            | Execute any cmd command                       |
| **person**  |
| POST        | /person          | Create a new person                           |
| PUT         | /person/{id}     | Update data of a person                       |
| DELETE      | /person/{id}     | Delete a person                               |
| **persons** |
| GET         | /persons         | Retrieve all persons                          |
| GET         | /persons/{id}    | Retrieve specific person by ID                |
| **login**   |
| POST        | /login           | Login to VuNAPI                               |
| **resource**|
| POST        | /resource        | Create a new resource                               |
| PUT        | /resource/{id}/lock        | Lock a resource                             |
| PUT        | /resource/{id}/unlock        | Unlock a resource                             |

For more details, you can either run VuNAPI and visit `http://127.0.0.1:3000/api` or use a service like the [Swagger Editor](https://editor.swagger.io) by supplying the OpenAPI specification which can be downloaded from `http://127.0.0.1:3000/api-json`.

## 🚀 Run it

VuNAPI is designed to work with Docker. This is the only way to enable/disable different vulnerabilities and choose between various authentication methods.

Before starting VuNAPI, you must first decide which authentication method to use.

### 🔑 Authentication

You can choose between three types of authorization: `no-auth`, `basic-auth`, or `jwt-auth`.
For example, to run VuNAPI without authentication, simply run in the root directory:

```sh
docker-compose up --build no-auth
```

### ⚙️ Running Options / Disable Vulnerabilities
By default, all options are enabled. This means, VuNAPI is running by default using HTTP/2 over HTTPS. You can disable the following:

#### Rate Limiting

By default, rate limiting is enabled so that VuNAPI behaves like a real API. This can be disabled with the following option:
`DISABLE_RATE_LIMITING=true`

#### HTTP/2

By default VuNAPI uses HTTP/2 over HTTPS. But it is possible to switch to HTTP/1.1 by using:

`DISABLE_HTTP2=true`.

If you use this option, HTTP/1.1 is used, but HTTPS is still enabled.

#### HTTPS

When using HTTP/2, HTTPS cannot be disabled. But if you want to use HTTP/1.1 without HTTPS, add the following option: 

`DISABLE_HTTPS=true`. 

Make sure, you are also disabling HTTP/2!


#### Unreachable Server

By default, the /kill endpoint is enabled. This can be disabled by using:
`DISABLE_KILL_ENDPOINT=true`

#### RegexDoS

By default, the RegexDoS vulnerability is enabled. This can be disabled with the following option:
`DISABLE_REDOS=true`

#### OS Command Injection

By default, the OS command injection vulnerability is enabled. This can be disabled with the following option:
`DISABLE_CMD_INJECTION=true`

#### Logical-Order Error

By default, the logical-order error vulnerability is enabled. This can be disabled with the following option:
`DISABLE_LOGICAL_ORDER_ERROR=true`

## 🛡️ Vulnerabilities

You can find more details about the vulnerabilities in [this document](./Vulnerabilities.md)

## 🤝 Get Involved

We welcome and encourage contributions from the community! Here are some ways you can get involved:

- **Fork the Repo:** Feel free to fork the repository and experiment with your own changes.
- **Create Issues:** If you encounter any bugs or have suggestions for new features, please create an issue. This helps us keep track of what needs attention.
- **Submit Pull Requests:** If you've made improvements or fixed bugs, submit a pull request. We love to see contributions from the community and will review them promptly.
- **Ask Questions:** If you have any questions or need clarification on anything, don't hesitate to ask. We're here to help!

**Your contributions make this project great. Thank you for your support and stay safe! 💖**
