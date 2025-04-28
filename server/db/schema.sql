CREATE DATABASE memeteam;

CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    team_id INT REFERENCES Teams(id),
);

CREATE TABLE IF NOT EXISTS Teams(
    id SERIAL PRIMARY KEY,
    team VARCHAR(30) NOT NULL,
    leader_id INT REFERENCES Users(id) NOT NULL,
    invite_code VARCHAR(10) UNIQUE NOT NULL,
);

CREATE TABLE IF NOT EXISTS Memes(
    id  INT SERIAL PRIMARY KEY,
    meme_image TEXT NOT NULL,
    user_id INT REFERENCES Users(id) NOT NULL,
    team_id INT REFERENCES Teams(id) NOT NULL,
    theme_id INT REFERENCES Themes(id) NOT NULL,
    created_at TIMESTAMP NOT NULL,
);

CREATE TABLE IF NOT EXISTS Votes(
    id  INT SERIAL PRIMARY KEY,
    user_id  INT REFERENCES Users(id) NOT NULL,
    meme_id  INT REFERENCES Memes(id) NOT NULL,
    is_leaderboard BOOLEAN NOT NULL DEFAULT FALSE,
);

CREATE TABLE IF NOT EXISTS Themes(
    id  INT SERIAL PRIMARY KEY,
    team VARCHAR(30) NOT NULL,
    meme_image TEXT NOT NULL,
    week_number INT NOT NULL,
);