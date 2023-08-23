import {app} from "./app/web.js";
import {logger} from "./app/logging.js";

app.listen(3000, () => {
    logger.info("App Start")
})