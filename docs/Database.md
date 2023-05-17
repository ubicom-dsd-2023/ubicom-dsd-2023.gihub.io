---
sidebar_position: 4
---

# Database

## Description

## Clone the Database

### Install Docker

To clone the database similar to the one used in the project you must have Docker installed. For this you can download Docker directly from it's official website.

[Docker - Official Homepage](https://www.docker.com/)

With Docker installed follow these steps.

### Using the Docker Desktop

1. Clique in “Search for local and remote images, containers, and more …”
   ![Docker- Containers](@site/static/img/docker_cont.png)
2. Write `sstillzh/pgsql`
3. Go in "Images"
4. Select the `sstillzh/pgsql` and click in “Pull”. Wait a few seconds.
   ![Docker pull image](@site/static/img/docker_images.png)
5. Click in the Run button, on the right side of the pulled image.
   ![Docker run image](@site/static/img/docker_run.png)
6. Then it will appear a window to run a new container, with some optional settings, such as the container name that can be a random name, and the host port, thats was defined as 55333:5432/tcp. No other settings are needed.
   ![Docker start config](@site/static/img/docker_config.png)
7. Now the DataBase system is ready to accept connections.
   ![Docker is ready](@site/static/img/docker_up.png)

### Using the CLI (Command-line interface)

1. Pull the Docker image

   ```bash
   docker pull sstillzh/pgsql
   ```

   **Response example:**

   ```bash
   Using default tag: latest
   latest: Pulling from sstillzh/pgsql
   f1f26f570256: Pull complete
   1c04f8741265: Pull complete
   dffc353b86eb: Pull complete
   18c4a9e6c414: Pull complete
   81f47e7b3852: Pull complete
   5e26c947960d: Pull complete
   a2c3dc85e8c3: Pull complete
   17df73636f01: Pull complete
   713535cdf17c: Pull complete
   52278a39eea2: Pull complete
   4ded87da67f6: Pull complete
   05fae4678312: Pull complete
   56b4f4aeea2d: Pull complete
   d13154b39809: Pull complete
   958af57fa8c3: Pull complete
   Digest: sha256:48df53a9aa708531cf1fed429b1a68878f81f6f863a4f557a3954de50d15a294
   Status: Downloaded newer image for sstillzh/pgsql:latest
   docker.io/sstillzh/pgsql:latest
   ```

2. Verify image is cloned

   ```bash
   docker images
   ```

   **Response example:**

   ```bash
   REPOSITORY       TAG       IMAGE ID       CREATED         SIZE
   sstillzh/pgsql   latest    f1d6866cd694   6 weeks ago     514MB
   ```

3. Run the container

   ```bash
   docker run -it --name postgres4 -e POSTGRES_PASSWORD='123456' -e ALLOW_IP_RANGE=0.0.0.0/0  -p 55333:5432 -d sstillzh/pgsql
   ```

   - _it_: interact with terminal
   - _name_: the name of the container
   - _e POSTGRES_PASSWORD='123456'_: set the database-user's password
   - _p_: the port mapping of host system and docker system.
     (When we want to remotely connect to the database，we use the "55333"port of the host )

4. Verify the Docker process

   ```bash
   docker ps
   ```

   **Response example:**

   ```bash
   CONTAINER ID   IMAGE            COMMAND                  CREATED         STATUS         PORTS                     NAMES
   fe118a2862aa   sstillzh/pgsql   "docker-entrypoint.s…"   3 minutes ago   Up 3 minutes   0.0.0.0:55333->5432/tcp   postgres4
   ```

## Connect with database

### DBeaver

[DBeaver Community - Official Homepage](https://dbeaver.io/)

1. In DBeaver, we start by adding a new connection. To do this, we click on the button assigned in the following image.

   ![DBeaver - new connection](@site/static/img/DBeaver_add.png)

2. Next we select the PostgreSQL option.

   ![DBeaver - select postgreSQL](@site/static/img/DBeaver_psql.png)

3. Then it will appear another window, to set up the inputs to connect to the DataBase. We insert those inputs and connect to the production DB.

   ![DBeaver - settings](@site/static/img/DBeaver_settings.png)

   :::note
   For testing purposes, the user is postgres and the password is 123456.
   :::

4. Click the _Test Connection_ to verify the connection and if successful click _Finish_. Now we are connected to the DataBase.

   ![DBeaver - connected](@site/static/img/DBeaver_connected.png)

### Beekeeper Studio

[Beekeeper Studio - Official Homepage](https://www.beekeeperstudio.io/)

1. First, we have to choose the connection type, and once again we choose Postgres.

   ![Beekeeper - postgreSQL](@site/static/img/Beekeeper_psql.png)

2. Then we have to input the credentials to connect to the DataBase in a pop-up window.

   ![Beekeeper - settings](@site/static/img/Beekeeper_settings.png)

   :::note
   For testing purposes, the user is postgres and the password is 123456.
   :::

3. Click the _Test_ to verify the connection and if successful click _Connect_. Now we are connected to the DataBase.
   ![Beekeeper - connected](@site/static/img/Beekeeper_connected.png)

### CLI (Command-line interface) - Connection and Utility Commands

1. Start the Database

   ```bash
   docker exec -it postgres4 bash
   ```

2. cChange the access member to _"privileged_user"_ (postgres)

   ```bash
   su postgres
   ```

3. Enter in Database

   ```bash
   psql
   ```

4. List all existing Databases

   ```bash
   \l
   ```

5. Go into a Database

   ```bash
   \c "dbname"
   ```

6. Examine all the tables of this Database

   ```bash
   \dt
   ```

7. Examine the structure of specified table

   ```bash
   \d "tablename"
   ```

## Database Description and Model E-R

To create our relational database model we used the online tool [dbdiagram.io](https://dbdiagram.io/home). This online tool requires a different notation from the one used in PostgreSQL, however it was only used for representation purposes. The commands used were the following:

```dbml
Table user {
  id SERIAL [primary key]
  username VARCHAR(255) [not null, unique]
  password VARCHAR(255) [not null]
  phone_number VARCHAR(100)
  birthday DATE [not null]
  email VARCHAR(255)
  created_at TIMESTAMP
}

Table device {
  id SERIAL [primary key]
  user_id INT [ref: > user.id]
  port SMALLINT [not null]
  ip VARCHAR(39) [not null]
}

Table motion_record {
  id SERIAL [primary key]
  user_id serial [ref: > user.id]
  motion_tag SMALLINT
  initial_timestamp TIMESTAMP
  is_auto boolean
}

Table motion_frame {
  id SERIAL [primary key]
  motion_id SERIAL [ref: > motion_record.id]
  frame JSONB
  timestamp TIMESTAMP
}

Table device_motion_record {
  motion_id serial [ref: > motion_record.id]
  device_id serial [ref: > device.id]
}
```

And the visual representation of our model ended up looking like this:

![E-R Model](@site/static/img/e-r_model.png)

### Creating Database

According to our ER model, we used the following queries to create the necessary tables and relations between them that best suit our application’s needs:

```sql
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "phone_number" VARCHAR(100),
  "birthday" DATE NOT NULL,
  "email" VARCHAR(255),
  "created_at" TIMESTAMP
);

CREATE TABLE "device" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "port" SMALLINT NOT NULL,
  "ip" VARCHAR(39) NOT NULL
);

CREATE TABLE "motion_record" (
  "id" SERIAL PRIMARY KEY,
  "user_id" serial,
  "motion_tag" SMALLINT,
  "initial_timestamp" TIMESTAMP,
  "is_auto" boolean
);

CREATE TABLE "motion_frame" (
  "id" SERIAL PRIMARY KEY,
  "motion_id" SERIAL,
  "frame" JSONB,
  "timestamp" TIMESTAMP
);

CREATE TABLE "device_motion_record" (
  "motion_id" serial,
  "device_id" serial
);

ALTER TABLE "device" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "motion_record" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "motion_frame" ADD FOREIGN KEY ("motion_id") REFERENCES "motion_record" ("id");

ALTER TABLE "device_motion_record" ADD FOREIGN KEY ("motion_id") REFERENCES "motion_record" ("id");

ALTER TABLE "device_motion_record" ADD FOREIGN KEY ("device_id") REFERENCES "device" ("id");
```

## Description of Some Data Types Used

### Serial

An autoincrementing integer of four bytes - chosen due to the fact it is autoincrementing and doesn’t take much space in the DataBase.

[PostgreSQL - Datatype Serial](https://www.postgresql.org/docs/15/datatype-numeric.html#DATATYPE-SERIAL)

### JSONB

JSON datatype that stores data in binary format and has multiple built-in functions in PostgreSQL specifically designed to work with it - chosen due to the fact that our database was designed in PostgreSQL and it’s storage format allows a faster access than other JSON types.

[PostgreSQL - Datatype JSON](https://www.postgresql.org/docs/15/datatype-json.html)

## Generic Database Queries

Here are some examples of database requests.

### User

#### Insert

```sql
INSERT INTO "user" (username, password, phone_number, birthday, email, created_at)
VALUES ('JaneDoe', 'password', '123456789', '1990-01-01', 'jane_doe@example.mail', NOW() );
```

#### Select

```sql
SELECT * FROM "user";
WHERE "username" = 'Username to search';
```

#### Update

```sql
UPDATE "user"
SET "phone_number" = '0987654321'
WHERE "username" = 'JaneDoe';
```

#### Delete

```sql
DELETE FROM "user"
WHERE "username" = 'JohnSabonis';
```

### Device

TODO

### Motion Record

TODO

### Motion Frame

TODO

## Test Functional Requirements (SQL Queries)

### User Table

#### should be possible to create user

```sql
INSERT INTO "user" (username, password, phone_number, birthday, email, created_at)
VALUES ('JaneDoe', 'password', '123456789', '1990-01-01', 'jane_doe@example.mail', NOW() );
```

#### should be possible to create user without email

```sql
INSERT INTO "user" (username, password, phone_number, birthday, created_at)
VALUES ('JaneDoe', 'password', '123456789', '1990-01-01', NOW() );
```

#### should be possible to create user without phone number

```sql
INSERT INTO "user" (username, password, birthday, email, created_at)
VALUES ('JaneDoe', 'password', '1990-01-01', 'jane_doe@example.mail', NOW() );
```

#### should not be possible create a user with same username

```sql
INSERT INTO "user" (username, password, phone_number, birthday, email, created_at)
VALUES ('JaneDoe', 'password', '123456789', '1990-01-01', 'jane_doe@example.mail', NOW() );

INSERT INTO "user" (username, password, phone_number, birthday, email, created_at)
VALUES ('JaneDoe', 'password2', '023456789', '1990-01-02', 'jane_doe2@example.mail', NOW() );
```

#### should not be possible create a user without username

```sql
INSERT INTO "user" (password, phone_number, birthday, email, created_at)
VALUES ('password', '123456789', '1990-01-01', 'jane_doe@example.mail', NOW() );
```

#### should not be possible create a user without password

```sql
INSERT INTO "user" (username, phone_number, birthday, email, created_at)
VALUES ('JaneDoe', '123456789', '1990-01-01', 'jane_doe@example.mail', NOW() );
```

#### should not be possible create a user without birthday

```sql
INSERT INTO "user" (username, password, phone_number, email, created_at)
VALUES ('JaneDoe', 'password', '123456789', 'jane_doe@example.mail', NOW() );
```
