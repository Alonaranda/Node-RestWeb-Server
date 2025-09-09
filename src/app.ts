import { ServerExpress } from "./presentation/server";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";

//Node + Express
(async () => {
    main();
})();

function main() {
    const server = new ServerExpress({
        port: envs.PORT,
        public_path:envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });
    server.start();
}