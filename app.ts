import { Application, oakCors } from "./deps.ts";

/**
 * Own
 */
// models
import configs from "./config/config.ts";

// helpers
import { errorHandler } from "./middlewares/errorHandler.middleware.ts";
import router from "./routers/index.ts";

// middlewares
import log from "./middlewares/logger.middleware.ts";

const { url, port, clientUrl } = configs;

const app: Application = new Application();

const corsOptions = {
    origin: clientUrl,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(oakCors(corsOptions));
app.use(errorHandler);

router.init(app);

app.addEventListener("listen", () => {
    log.info(`Server listening at ${url}`);
});

if (import.meta.main) {
    await app.listen({ port });
}

export { app };
