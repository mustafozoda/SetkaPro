import app from "./app";
import { ENV } from "./config/env";

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
});
