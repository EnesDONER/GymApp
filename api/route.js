
import UserRoute from "./routes/userRoute.js"
import errorHandler from "./utils/errorHandler.js"

import AdminRoute from './routes/adminRoute.js'
const routersFunction = (app) => {
    
    app.use("/api/admin",AdminRoute)
    app.use("/api/user",UserRoute)


    app.use(errorHandler)
}
export default routersFunction;
