export const createTableSQL = `
    CREATE TABLE connects(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name CHAR(255) NOT NULL,
        host CHAR(255) NOT NULL,
        port INT       NOT NULL,
        password CHAR(255) NOT NULL,
        mode CHAR(50)      NOT NULL
    );
`

export const insertConnectSQL = `
    INSERT INTO connects (name, host, port, password, mode) VALUES (@name, @host, @port, @password, @mode);
`

export const findAllConnectSQL = `
    SELECT * from connects
`

export const deleteConnectSQL = `
    DELETE FROM connects WHERE id = @id
`