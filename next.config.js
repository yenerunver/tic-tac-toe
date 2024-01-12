const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  switch (phase) {
    case PHASE_DEVELOPMENT_SERVER:
      // called with `yarn dev`

      return {
        // distDir: .next
      };
    case PHASE_PRODUCTION_BUILD:
      // called with `yarn export`

      return {
        output: "export",
        distDir: "./out",
      };
    default:
      return {};
  }
};
