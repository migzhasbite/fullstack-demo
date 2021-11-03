# User Management Demo

## Objectives

- User based management and authentication
- Should be based off of concepts taught at BST

### Tech Stack

- Front-End: React, react-router
- Back-End: Express, MySQL, knex
- Auth: bcrypt, jsonwebtoken

## Installation Instructions

```bash
$ npm i
$
```

### DB setup

```
$ mysql -u root -p // enter your MySQL password at prompt
mysql> CREATE DATABASE fullstack-demo;
```

Press CONTROL+D to exit.

### Setup

```bash
$ cp .env.sample .env
$ knex migrate:latest
```

### Database configuration
