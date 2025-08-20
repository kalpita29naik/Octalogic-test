CREATE TABLE users (
    userID SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE vehicle_types (
    VTypeID SERIAL PRIMARY KEY,
    type_name VARCHAR(20) NOT NULL,
    wheels INT NOT NULL CHECK (wheels IN (2,4))
);

CREATE TABLE vehicle (
    VID SERIAL PRIMARY KEY,
    VName VARCHAR(50) NOT NULL,
    VTypeID INT NOT NULL,
    FOREIGN KEY (VTypeID) REFERENCES vehicle_types(VTypeID)
);

CREATE TABLE booking (
    bookingID SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    VID INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (VID) REFERENCES vehicle(VID),
    CONSTRAINT check_dates CHECK (start_date < end_date)
);
