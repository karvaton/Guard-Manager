import app from "./app";

const port = process.env.PORT_BACKEND;
export const APP_PATH = process.cwd();

async function start() {
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}/`);
    });
}

start();