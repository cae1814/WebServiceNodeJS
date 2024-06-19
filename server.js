import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import fs from 'fs';

const port = 443;
const httpsOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
    requestCert: false,
    rejectUnauthorized: false,
  }

const app = express();
import rateLimit from "express-rate-limit"; //
import joi from "joi"; // 

import { employees } from './routes/routeEmployees.js';
import { departments } from './routes/routeDepartments.js';
import { managers } from './routes/routeManagers.js';
import { salaries } from './routes/routeSalaries.js';
import { titles } from './routes/routeTitles.js';
import { deptoManagers } from './routes/routeDeptoManagers.js';
import { usuario } from "./routes/routeUsuario.js";
import jwt from "jsonwebtoken";

//Limitar el tamaño del cuerpo HTTP (Payload size) //
const limitPayloadSize = (req, res, next) => {
    const MAX_PAYLOAD_SIZE = 1024 * 1024; // 1MB
    if (req.headers['content-length'] && parseInt(req.headers['content-length']) > MAX_PAYLOAD_SIZE) {
      return res.status(413).json({ error: 'Payload size exceeds the limit' });
    }
    next();
};

// Control de solicitudes desde una misma PC //
const limit = rateLimit({max: 500, windowMs: 5 * 60 * 1000, standardHeaders: true, legacyHeaders: false, message: 'You have touched the maximum limit of request'});

// MiddleWare
app.use(express.json());
app.use(cors());
 
app.use(limitPayloadSize);
app.use('*', limit);

// Proteccion ataque DDOS y fuerza bruta, tamaño de entrada cuerpo req //
app.use(express.json({ limit: '20kb' }));

// Timeout solicitudes http para liberar recursos ocupados //
app.use((req, res, next) => {
    req.setTimeout(5000); // Set request timeout to 50 seconds
    res.setTimeout(5000); // Set response timeout to 50 seconds
    next();
  });

function verifyToken(req, res, next) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Token not provied" });
    }
    
    try {
      const payload = jwt.verify(token, "appsecret");
      req.username = payload.username;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token not valid" });
    }
  }
app.use('/employees', verifyToken, employees, cors());
app.use('/departments', verifyToken, departments, cors());
app.use('/managers', verifyToken, managers, cors());
app.use('/salaries', verifyToken, salaries, cors());
app.use('/titles', verifyToken, titles, cors());
app.use('/deptoManagers', verifyToken, deptoManagers, cors());
app.use('/auth/login', usuario, cors());
app.use('/user', usuario, cors());

const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log('server running at ' + port)
})

// Establecer tiempo maximo de conexiones abiertas //
app.keepAliveTimeout = 90 * 1000;
app.headersTimeout = 90 * 1000;