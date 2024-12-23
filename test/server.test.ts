import http from "http";

describe("Health Check Server", () => {
  let server: http.Server;

  beforeAll(() => {
    const serverModule = require("../src/server");
    server = serverModule.default;
  });

  afterAll(() => {
    server.close();
  });

  it("should return 200 and status ok for /health", async () => {
    const options = {
      hostname: "localhost",
      port: 8080,
      path: "/health",
      method: "GET",
    };

    await new Promise<void>((resolve, reject) => {
      const req = http.request(options, (res) => {
        expect(res.statusCode).toBe(200);

        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          expect(JSON.parse(data)).toEqual({ status: "ok" });
          resolve();
        });
      });

      req.on("error", (err) => reject(err));
      req.end();
    });
  });

  it("should return 404 for unknown endpoints", async () => {
    const options = {
      hostname: "localhost",
      port: 8080,
      path: "/unknown",
      method: "GET",
    };

    await new Promise<void>((resolve, reject) => {
      const req = http.request(options, (res) => {
        expect(res.statusCode).toBe(404);
        resolve();
      });

      req.on("error", (err) => reject(err));
      req.end();
    });
  });
});
