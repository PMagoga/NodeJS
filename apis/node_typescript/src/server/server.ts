// @ts-ignore
import express from "express";
import { router } from "./routes/index.js";

const server = express()

server.use(express.json())
server.use(router)

export { server }