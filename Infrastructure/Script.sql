CREATE TABLE cliente (
    id INT IDENTITY(1,1) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    vip BIT NOT NULL,

    CONSTRAINT pk_cliente PRIMARY KEY (id)
);

CREATE TABLE pedido (
    id INT IDENTITY(1,1) NOT NULL,
    valor DECIMAL(18,2) NOT NULL,
    desconto DECIMAL(18,2) NOT NULL,
    aprovado BIT NOT NULL,
    cliente_id INT NOT NULL,

    CONSTRAINT pk_pedido PRIMARY KEY (id),
    CONSTRAINT fk_pedido_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES cliente(id)
);