
import UserRoute from "./routes/userRoute.js"
import errorHandler from "./utils/errorHandler.js"

import AdminRoute from './routes/adminRoute.js'
import CategoryRoute from "./routes/categoryRoute.js"
import MovementRoute from "./routes/movementsRoute.js"

const routersFunction = (app) => {
    
    app.use("/api/admin",AdminRoute)
    app.use("/api/user",UserRoute)
    app.use("/api/category",CategoryRoute)
    app.use("/api/movement",MovementRoute)


    app.use(errorHandler)
}
export default routersFunction;
