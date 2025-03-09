CREATE DATABASE league_stats; 
\c league_stats
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE permissions (
    permission_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    level TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE seasons (
    season_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    captain INTEGER NOT NULL REFERENCES users (user_id),
    season_id INTEGER REFERENCES seasons,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    team_id INTEGER REFERENCES teams,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE reports (
    report_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    team_id INTEGER REFERENCES teams (team_id),
    opponent_id INTEGER REFERENCES teams (team_id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE publishes (
    publish_id SERIAL PRIMARY KEY,
    report_id INTEGER REFERENCES reports,
    stats integer[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE stats (
    id SERIAL PRIMARY KEY,
    name TEXT,
    value INTEGER,
    report_id INTEGER REFERENCES reports,
    player_id INTEGER REFERENCES players,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);