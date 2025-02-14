const isProduction = import.meta.env.VITE_PRODUCTION_MODE?.toLowerCase() === "true";
export const apiBaseUrl = isProduction ? "https://ragreader-d3rr7.ondigitalocean.app" : "http://localhost:8000";