import mysql2 from "mysql2";

const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: process.env.PUBLIC_DB_PASSWORD,
    database: "my_database",
    port: 3307
})

const db = pool.promise();

const createTables = async () => {
    try {
        await db.query("CREATE TABLE if not exists movies (\n" +
            "    id INT PRIMARY KEY,\n" +
            "    poster_path VARCHAR(255),\n" +
            "    adult BOOLEAN,\n" +
            "    overview TEXT,\n" +
            "    release_date DATE,\n" +
            "    genre_ids JSON,\n" +
            "    original_title VARCHAR(255),\n" +
            "    original_language VARCHAR(10),\n" +
            "    title VARCHAR(255),\n" +
            "    backdrop_path VARCHAR(255),\n" +
            "    popularity FLOAT,\n" +
            "    vote_count INT,\n" +
            "    video BOOLEAN,\n" +
            "    vote_average FLOAT\n" +
            ");");

        await db.query("Create table if not exists users (id Int Primary key auto_increment, name varchar(255), email varchar(255) unique, password varchar(100));");

        await db.query("create table if not exists liked_movies (user_id Int, movie_id Int, Primary key (user_id, movie_id), Foreign Key (user_id) references users(id) on delete cascade, Foreign key (movie_id) references movies(id) on delete cascade);");
    } catch (e) {
        console.log(`error creating tables ${e}`);
    }
}

createTables();

export default db;

