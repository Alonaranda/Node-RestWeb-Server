import { Server } from "http";
import { ServerExpress } from "./presentation/server";
import { envs } from "./config/envs";

//Node + Express
(async () => {
    main();
})();

function main() {
    const server = new ServerExpress({
        port: envs.PORT,
        public_path:envs.PUBLIC_PATH
    });
    server.start();
}