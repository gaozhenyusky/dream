-- auto-generated definition
create table aptos_wallets
(
    id          int auto_increment
        primary key,
    serial_no   int            not null comment '序号',
    address     varchar(128)   not null,
    type        varchar(256)   not null comment '钱包类型',
    private_key varchar(256)   not null,
    apt_balance decimal(20, 9) null comment 'apt的余额'
); 