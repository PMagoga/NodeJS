import express, { json, Request, Response } from "express";
import createApp from "./app";


const app = createApp();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`🔥 Server is running at http://localhost:${port}`);
});