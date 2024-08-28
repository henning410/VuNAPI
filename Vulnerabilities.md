# Default Vulnerabilities in VuNAPI

## Wrong status code (in `/testStatusCodes`)

We decided to implement this to see if fuzzers would detect status codes that are not specified in the OAS and are other than 500.

According to the specification, the application should return a 200 or 400 status code when the endpoint `GET /testStatusCodes` is called.
However, the application is deliberately programmed to permanently return a 403 status code.

## Application not reachable (in `/kill`)

When this endpoint is called, VuNAPI kills itself and is no longer reachable. We used this endpoint to check how well fuzzers can handle the fact that the application is no longer accessible.

## ReDoS (in `/redos`)

This endpoint checks if the given input is a valid email or not.

When inserting a long, malformed string, like `this_is_some_very_very_long_malformed_string`, the server becomes unreachable because it gets stuck checking if the regex is true.

## CMD Injection (in `/exec`)

By calling this endpoint, the attacker can insert any cmd command which gets executed.

## SQL Injection (in `/login`)

The `/login` endpoint expects a username and a password as body.
In accordance with the specification, the corresponding person is returned if the login data is correct or the JWT. If the login data is incorrect, an error message is returned.


The use of the password field makes it possible to perform an SQL injection attack, for example by using `' OR '1'='1'` as input in the password field.
If no authentication or basic authentication is used, the application will return all persons instead of a single person.
This discrepancy should be detected by a fuzzer, as the corresponding return type does not match the specification.

If JWT is used, `' OR '1'='1'` in the password field will still return a valid token.

## Integer Overflow (in `/person/{id}`)

The `/person/{id}` path enables access to and deletion of a specific person.

In the event that a number is specified for the ID that exceeds the size of an integer, the server will return a 500 status code.

## Logical-Order Error (in `/resource/{id}/lock`)
Calling this endpoints twice for the same id, the server returns an 500 status code. 
The correct use-case would be first lock a resource, then unlock it before locking it again.