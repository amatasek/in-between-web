# API Conventions

## RESTful API Endpoints
- Use nouns for resource names (e.g., `/users`, `/games`)
- Use plural for collection endpoints
- Use kebab-case for multi-word resource names
- Use standard HTTP methods appropriately:
  - `GET` for retrieving resources
  - `POST` for creating resources
  - `PUT` for complete updates
  - `PATCH` for partial updates
  - `DELETE` for removing resources

## Request/Response Format
- Use JSON for request and response bodies
- Include appropriate content-type headers
- Use camelCase for JSON property names
- Include standard response envelope:
  ```json
  {
    "success": true,
    "data": { ... },
    "error": null
  }
  ```

## Error Handling
- Return appropriate HTTP status codes
- Include detailed error messages
- Use consistent error format:
  ```json
  {
    "success": false,
    "data": null,
    "error": {
      "code": "ERROR_CODE",
      "message": "Human-readable error message",
      "details": { ... }
    }
  }
  ```

## Authentication
- Use JWT for authentication
- Include token in Authorization header as Bearer token
- All authenticated endpoints should verify the JWT

## Versioning
- Include API version in URL path (e.g., `/api/v1/users`)
- Don't worry about maintaining backward compatibility within major versions for now