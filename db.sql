-- Adminer 4.7.6 PostgreSQL dump

\connect "time_click";

DROP TABLE IF EXISTS "presence";
CREATE TABLE "public"."presence" (
    "action_time" character varying(24) NOT NULL,
    "user_id" character varying(16) NOT NULL,
    "action" character varying(6) NOT NULL,
    CONSTRAINT "attendance_user_id_action_time" PRIMARY KEY ("user_id", "action_time")
) WITH (oids = false);


DROP TABLE IF EXISTS "users";
CREATE TABLE "public"."users" (
    "id" character varying(16) NOT NULL,
    "first_name" character varying(45) NOT NULL,
    "last_name" character varying(45),
    "dob" character varying(10) NOT NULL,
    "gender" character(1) NOT NULL,
    "phone" character varying(45),
    "email" character varying(45) NOT NULL,
    "post_code" character varying(10),
    "address1" character varying(150),
    "address2" character varying(150),
    "country" character varying(15),
    "images" json,
    "devices" json,
    "tag" character varying(128),
    "password" character varying(256),
    "account_delete" boolean,
    "activation_code" character varying(6),
    CONSTRAINT "users_email" UNIQUE ("email"),
    CONSTRAINT "users_id" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "users_policy";
CREATE TABLE "public"."users_policy" (
    "user_id" character varying(16) NOT NULL,
    "token" character varying(512) NOT NULL,
    "privilege" character varying(45) NOT NULL,
    CONSTRAINT "users_policy_user_id" PRIMARY KEY ("user_id")
) WITH (oids = false);


-- 2020-05-10 14:00:09.560791+00