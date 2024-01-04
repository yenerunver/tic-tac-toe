import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.yenerunver.tictactoe",
  appName: "tic-tac-toe",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
