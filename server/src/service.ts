import path from "path";

const storePath = path.resolve('store');

class Service {
    getData() {
        return storePath;
    }
}

export default new Service();