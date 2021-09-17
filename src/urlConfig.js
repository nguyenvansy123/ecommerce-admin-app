const baseUrl =
    location.hostname === "localhost" ? "http://localhost:4000" : "https://freshmarket-rest-server.herokuapp.com";

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
    return `${baseUrl}/public/${fileName}`;
};

