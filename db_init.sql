CREATE DATABASE league_stats; 
\c league_stats
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT
);
CREATE TABLE Seasons (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    
);
CREATE TABLE Teams (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    captain INTEGER NOT NULL REFERENCES users(id),
    season INTEGER NOT NULL REFERENCES seasons(id)
);
CREATE TABLE Players (
    id SERIAL PRIMARY KEY,
    user INTEGER NOT NULL REFERENCES users(id),
    team INTEGER NOT NULL REFERENCES teams(id)
);
CREATE TABLE Reports (
    id SERIAL PRIMARY KEY,
    user INTEGER NOT NULL REFERENCES users(id),
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE Stats (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    value INTEGER NOT NULL,
    report INTEGER NOT NULL REFERENCES reports(id),
    player INTEGER NOT NULL REFERENCES players(id),
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);