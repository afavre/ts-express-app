module.exports = {
  preset: "ts-jest", // Use ts-jest preset
  testEnvironment: "node", // Node.js environment
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ["ts", "tsx", "js"], // Recognize these file types
  testMatch: ["**/test/**/*.test.ts"], // Look for test files in the test/ folder
};
