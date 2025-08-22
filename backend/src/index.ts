import 'reflect-metadata';
import { Express } from '@infrastructure/web/frameworks/express';
import { Server } from '@infrastructure/web/server';
import { SequelizeORM } from '@infrastructure/persistency/orm/sequelize';

const main = async () => {
    const express = new Express();
    const sequelizeORM = new SequelizeORM();

    const server = new Server(express, sequelizeORM);
    await server.start();
};

main();
