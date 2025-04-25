CREATE DATABASE memeteam;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    team_id INT REFERENCES Teams(id),
)

CREATE TABLE Teams(
    id SERIAL PRIMARY KEY,
    team VARCHAR(30) NOT NULL,
    leader_id INT REFERENCES Users(id) NOT NULL,
    invite_code VARCHAR(10) UNIQUE NOT NULL,
)

CREATE TABLE Memes(
    id  INT SERIAL PRIMARY KEY,
    meme_image TEXT NOT NULL,
    user_id INT REFERENCES Users(id) NOT NULL,
    team_id INT REFERENCES Teams(id) NOT NULL,
    theme_id INT REFERENCES Themes(id) NOT NULL,
    created_at TIMESTAMP NOT NULL,
)

CREATE TABLE Votes(
    id  INT SERIAL PRIMARY KEY,
    user_id  INT REFERENCES Users(id) NOT NULL,
    meme_id  INT REFERENCES Memes(id) NOT NULL,
    is_leaderboard BOOLEAN NOT NULL DEFAULT FALSE,
)

CREATE TABLE Themes(
    id  INT SERIAL PRIMARY KEY,
    team VARCHAR(30) NOT NULL,
    meme_image TEXT NOT NULL,
    week_number INT NOT NULL,
)