CREATE TABLE IF NOT EXISTS provinces (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    api_id VARCHAR(50),
    status tinyint(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cities(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    zip_code VARCHAR(25) NOT NULL,
    api_id VARCHAR(50),
    province_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status tinyint(1) DEFAULT 0,
    foreign key (province_id) references provinces(id)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    cell_phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    validated BOOLEAN DEFAULT 0,
    tocken_validation VARCHAR(255),
    type_document INT,
    document_number VARCHAR(255),
    id_city INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status tinyint(1) DEFAULT 1,
    foreign key (id_city) references cities(id)
);

-- agregar bool para solicitar documento
-- agregar campo dni
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    qr_code VARCHAR(255) NOT NULL,
    id_city INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    number_address INT NOT NULL,
    institution VARCHAR(255) NOT NULL,
    map BOOLEAN DEFAULT 0,
    map_x VARCHAR(255),
    map_y VARCHAR(255),
    date_start DATETIME NOT NULL,
    date_end DATETIME NOT NULL,
    date_sale_start DATETIME NOT NULL,
    status tinyint(1) DEFAULT 1,
    priority tinyint(1) DEFAULT 0,
    id_user_created INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_user_updated INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (id_user_created) references users(id),
    foreign key (id_user_updated) references users(id),
    foreign key (id_city) references cities(id)
);

CREATE TABLE IF NOT EXISTS events_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_event INT NOT NULL,
    id_user INT NOT NULL,
    profile BIGINT NOT NULL,
    status tinyint(1) DEFAULT 1,
    id_user_created INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_user_updated INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (id_user_created) references users(id),
    foreign key (id_user_updated) references users(id),
    foreign key (id_event) references events(id),
    foreign key (id_user) references users(id)
);



CREATE TABLE IF NOT EXISTS events_media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_event INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    type_media INT NOT NULL,
    status tinyint(1) DEFAULT 1,
    id_user_created INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_user_updated INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (id_user_created) references users(id),
    foreign key (id_user_updated) references users(id),
    foreign key (id_event) references events(id)
);

CREATE TABLE IF NOT EXISTS events_tickets(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price FLOAT NOT NULL,
    quantity INT NOT NULL,
    id_event INT NOT NULL,
    status tinyint(1) DEFAULT 1,
    id_user_created INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_user_updated INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (id_user_created) references users(id),
    foreign key (id_user_updated) references users(id),
    foreign key (id_event) references events(id)
);

CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount FLOAT NOT NULL,
    id_operation VARCHAR(255) NOT NULL,
    id_event_ticket INT NOT NULL,
    id_user INT NOT NULL,
    status tinyint(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (id_event_ticket) references events_tickets(id),
    foreign key (id_user) references users(id)
);

CREATE TABLE IF NOT EXISTS tickets_generated(
    id INT AUTO_INCREMENT PRIMARY KEY,
    qr_code VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    id_event_ticket INT NOT NULL,
    id_user INT NOT NULL,
    id_payment INT NOT NULL,
    status tinyint(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (id_event_ticket) references events_tickets(id),
    foreign key (id_user) references users(id),
    foreign key (id_payment) references payments(id)
);

CREATE TABLE IF NOT EXISTS payments_details(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_payment INT NOT NULL,
    id_event_ticket INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (id_payment) references payments(id),
    foreign key (id_event_ticket) references events_tickets(id)
);
