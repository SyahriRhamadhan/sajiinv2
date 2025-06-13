import express from "express";
import type { Express } from "express";
import * as path from "path";
import { createRequestHandler } from "@remix-run/express";
import helmet from "helmet";

const app = express();

// Tambahkan Helmet untuk keamanan dasar HTTP headers
app.use(helmet());

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Simple API endpoint for health check
app.get("/api/cek", (req, res) => {
  res.json({ status: "ok", message: "API is working!" });
});

// Remix request handler
app.all(
  "*",
  createRequestHandler({
    build: require("../build"),
    mode: process.env.NODE_ENV,
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
