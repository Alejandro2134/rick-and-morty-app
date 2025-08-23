import 'reflect-metadata';
import { Express } from '@infrastructure/web/frameworks/express';
import { Server } from '@infrastructure/web/server';
import { SequelizeORM } from '@infrastructure/persistency/orm/sequelize';
import { Redis } from '@infrastructure/persistency/cache/redis';
import { Container } from 'typedi';

const main = async () => {
    const express = new Express();
    const sequelizeORM = new SequelizeORM();
    const redis = Container.get(Redis);

    const server = new Server(express, sequelizeORM, redis);
    await server.start();
};

main();
