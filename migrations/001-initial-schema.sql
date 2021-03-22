--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Schedule (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE User (
	"id" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id")
);

CREATE TABLE User_schedule (
	"userid" TEXT NOT NULL,
	"scheduleid" INTEGER NOT NULL,
	FOREIGN KEY("userid") REFERENCES "user"("id"),
	FOREIGN KEY("scheduleid") REFERENCES "schedule"("id")
);

CREATE TABLE Day (
	"id" INTEGER NOT NULL UNIQUE,
	"date" TEXT NOT NULL,
	"scheduleid" INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("scheduleid") REFERENCES "schedule"("id")
);

CREATE TABLE Runrange (
	"id" INTEGER NOT NULL UNIQUE,
	"start" INTEGER NOT NULL,
	"end" INTEGER NOT NULL,
	"dayid" INTEGER NOT NULL,
	"userid" TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("userid") REFERENCES "user"("id"),
	FOREIGN KEY("dayid") REFERENCES "day"("id")
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Schedule;
DROP TABLE User;
DROP TABLE User_schedule;
DROP TABLE Day;
DROP TABLE Runrange;