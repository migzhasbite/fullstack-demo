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
mysql> CREATE DATABASE fullstack_demo;
```

Press CONTROL+D to exit.

### Setup

```bash
$ cp .env.sample .env
$ knex migrate:latest
```

### Database configuration

### Notes

On client side: if building from scratch, you must `npm install react-router-dom@5.2.0` as 6.x is not backward compatible

### TO DO

- [ ] Change `users` DB table to `user`
