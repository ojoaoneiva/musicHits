-- Active: 1698233036757@@127.0.0.1@3306

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
        'Fulano',
        'fulano@email.com',
        '$2a$12$qPQj5Lm1dQK2auALLTC0dOWedtr/Th.aSFf3.pdK5jCmYelFrYadC',
        'NORMAL'
    ), (
        'u002',
        'Beltrana',
        'beltrana@email.com',
        '$2a$12$403HVkfVSUbDioyciv9IC.oBlgMqudbnQL8ubebJIXScNs8E3jYe2',
        'NORMAL'
    ), (
        'u003',
        'Astrodev',
        'astrodev@email.com',
        '$2a$12$lHyD.hKs3JDGu2nIbBrxYujrnfIX5RW5oq/B41HCKf7TSaq9RgqJ.',
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
        'An obsession to detail',
        'https://www.youtube.com/watch?v=Dm9Zf1WYQ_A',
        '
Our overriding philosophy of Brutal Simplicity of Thought, and the spirit of entrepreneurship that was entrenched from the start, means that today there are 23 M&C Saatchi offices globally. Making it the largest independent agency network in the world.'
    ), (
        'p002',
        'u002',
        'Titulo video 2',
        'https://www.youtube.com/watch?v=G_BhUxx-cwk',
        '
Our overriding philosophy of Brutal Simplicity of Thought, and the spirit of entrepreneurship that was entrenched from the start, means that today there are 23 M&C Saatchi offices globally. Making it the largest independent agency network in the world.'
    ), (
        'p003',
        'u002',
        'Titulo video 3',
        'https://www.youtube.com/watch?v=LZyybvVx-js',
        '
Our overriding philosophy of Brutal Simplicity of Thought, and the spirit of entrepreneurship that was entrenched from the start, means that today there are 23 M&C Saatchi offices globally. Making it the largest independent agency network in the world.'
    );

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE likes_dislikes 

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
        'Parabens pela postagem'
    ), (
        'c002',
        'u003',
        'p002',
        'Concordo com você'
    ), (
        'c003',
        'u002',
        'p001',
        'Gostei!'
    );

CREATE TABLE
    likes_dislikes_comments (
        user_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (comment_id) REFERENCES post_comments (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

-- Criação da tabela de seguidores

CREATE TABLE
    followers (
        user_id_following TEXT NOT NULL,
        user_id_follower TEXT NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (user_id_following) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (user_id_follower) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

-- Inserção de alguns seguidores de exemplo

INSERT INTO
    followers (user_id_following, user_id_follower)
VALUES ('u001', 'u002'), ('u001', 'u003'), ('u002', 'u001'), ('u003', 'u001');