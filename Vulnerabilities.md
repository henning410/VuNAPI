# Vulnerabilities in VuNAPI

## `/testStatusCodes`

We decided to implement this to see if fuzzers would detect status codes that are not specified in the OAS and are other than 500.

### Misalignment with OAS

According to the specification, the application should return a 200 or 400 status code when the endpoint `/testStatusCodes` is called.
However, the application is deliberately programmed to permanently return a 403 status code.

## `/kill`

When this endpoint is called, VuNAPI closes. We want to check how well fuzzers can handle the fact that the application is no longer accessible.

## `/redos`

This endpoint checks if the given input is a valid email or not.

### ReDoS

When inserting a long, malformed string, like `this_is_some_very_very_long_malformed_string`, the server becomes unreachable because it gets stuck checking if the regex is true.

## `/exec`

By calling this endpoint, the attacker can insert any cmd code which gets executed.

## `/login`

The `/login` endpoint expects a username and a password as body.
In accordance with the specification, the corresponding person is returned if the login data is correct or the JWT. If the login data is incorrect, an error message is returned.

### SQL injection

The use of the password field makes it possible to perform an SQL injection attack, for example by using `' OR '1'='1'` as input in the password field.
If no authentication or basic authentication is used, the application will return all persons instead of a single person.
This discrepancy should be detected by a fuzzer, as the corresponding return type does not match the specification.

If JWT is used, `' OR '1'='1'` in the password field will still return a valid token.

## `/person/{id}`

The `/person/{id}` endpoint enables access to and deletion of a specific person.

### Integer Overflow

In the event that a number is specified for the ID that exceeds the size of an integer, the server will return a 500 status code.
