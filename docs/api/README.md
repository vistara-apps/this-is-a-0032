# AnimalSnap Search API Documentation

Welcome to the AnimalSnap Search API documentation. This guide provides comprehensive information about the API endpoints, authentication, error handling, and usage examples for the AnimalSnap Search platform.

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [Endpoints](#endpoints)
4. [Error Handling](#error-handling)
5. [Rate Limiting](#rate-limiting)
6. [Examples](#examples)

## Introduction

AnimalSnap Search is a platform that helps website owners find and use high-quality, specific animal photos with clear licensing information. The API allows developers to integrate AnimalSnap Search functionality into their applications.

### Base URL

```
https://api.animalsnap.example.com/v1
```

## Authentication

AnimalSnap Search API uses API keys for authentication. You can obtain an API key by registering on the [AnimalSnap Search website](https://animalsnap.example.com).

Include your API key in the request header:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

The AnimalSnap Search API provides the following endpoints:

- [Search Photos](endpoints.md#search-photos)
- [Get Photo](endpoints.md#get-photo)
- [Download Photo](endpoints.md#download-photo)
- [User Account](endpoints.md#user-account)
- [Purchase History](endpoints.md#purchase-history)

For detailed information about each endpoint, including parameters, request examples, and response formats, see the [Endpoints documentation](endpoints.md).

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request. For detailed information about error codes and error response formats, see the [Error Handling documentation](errors.md).

## Rate Limiting

To ensure fair usage of the API, rate limits are applied. The current rate limits are:

- 100 requests per hour for free accounts
- 1,000 requests per hour for paid accounts

Rate limit information is included in the response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1625097600
```

## Examples

For code examples in various programming languages, see the [Examples documentation](examples.md).

## Support

If you have any questions or need assistance, please contact our support team at support@animalsnap.example.com.

