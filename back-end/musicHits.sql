-- Active: 1699798428286@@127.0.0.1@3306


CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        bio TEXT DEFAULT 'create a bio',
        profile_photo TEXT DEFAULT '' NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        'u001',
        'Leo',
        'leo@email.com',
        '$2a$12$bPiMKn25D3QLjKx7ZvixLuB8sWlo9/8Bv443HU3WBOllc0Of0ax9u',
        'NORMAL'
    ), (
        'u002',
        'Maria',
        'maria@email.com',
        '$2a$12$9bfeHQZyoh.3uD1hLAB6iu45cl8k3VRXgaEqTmY3o0phyeo0YsOY.',
        'NORMAL'
    ), (
        'u003',
        'Ana',
        'ana@email.com',
        '$2a$12$09fkR7Bvvv44R8k7O59ZPeBPw87kEns6R9rQrTb8kJDv93NuXBjQC',
        'ADMIN'
    );

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        title TEXT NOT NULL,
        link TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO
    posts (id, creator_id, title, link, content)
VALUES (
        'p001',
        'u001',
        'Billie Eilish - my future',
        'https://www.youtube.com/watch?v=Dm9Zf1WYQ_A',
        'This song is relatable, and inspirational on another level. Her voice is so beautiful it calms me down. Thanks for helping us get through tough times Billie'
    ), (
        'p002',
        'u002',
        'Jungle - Back On 74',
        'https://www.youtube.com/watch?v=q3lX2p_Uy9I',
        'I love how the camera changed the focus on dancers, just the entire coordination was so well played! I can literally see EVERYONE shining in this video and its so mesmerizing! This song reminds me of times that I have never lived in and memories I have never made. It has something beautifully nostalgic. And the choreography transfers all of these emotions perfectly. Im in love!'
    ), (
        'p003',
        'u002',
        'METRONOMY - THE LOOK',
        'https://www.youtube.com/watch?v=sFrNsSnk8GM',
        'Its so crazy how clean each instrument sounds as it enters the song. Is it just me? I can hear literally each individual part. Doesnt sound “mashed” up at all'
    );

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO
    likes_dislikes (user_id, post_id)
VALUES ('u001', 'p002'), ('u001', 'p003'), ('u002', 'p001'), ('u003', 'p001');

CREATE TABLE
    post_comments (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO
    post_comments (id, creator_id, post_id, content)
VALUES (
        'c001',
        'u002',
        'p001',
        'Thanks for sharing this with us'
    ), (
        'c002',
        'u003',
        'p002',
        'I loved this!'
    ), (
        'c003',
        'u002',
        'p001',
        'Great!'
    );

CREATE TABLE
    likes_dislikes_comments (
        user_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (comment_id) REFERENCES post_comments (id) ON UPDATE CASCADE ON DELETE CASCADE
    );


CREATE TABLE
    followers (
        user_id_following TEXT NOT NULL,
        user_id_follower TEXT NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (user_id_following) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (user_id_follower) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );


INSERT INTO
    followers (user_id_following, user_id_follower)
VALUES ('u001', 'u002'), ('u001', 'u003'), ('u002', 'u001'), ('u003', 'u001');