import app from "./app";

const port = process.env.PORT;

async function start() {
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}/`);
    });
}

start();