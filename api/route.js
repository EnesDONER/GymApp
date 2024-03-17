
import UserRoute from "./routes/userRoute.js"
import errorHandler from "./utils/errorHandler.js"

import AdminRoute from './routes/adminRoute.js'
import CategoryRoute from "./routes/categoryRoute.js"
import MovementRoute from "./routes/movementsRoute.js"
import ProgramsRoute from "./routes/programsRoute.js"
import ProgramMovementsRoute from "./routes/programMovementsRoute.js"
import UserProgramsRoute from "./routes/userProgramsRoute.js"
import ContentsRoute from "./routes/contentsRoute.js"

const routersFunction = (app) => {
    
    app.use("/api/admin",AdminRoute)
    app.use("/api/user",UserRoute)
    app.use("/api/category",CategoryRoute)
    app.use("/api/movement",MovementRoute)
    app.use("/api/programs",ProgramsRoute)
    app.use("/api/program-movement",ProgramMovementsRoute)
    app.use("/api/user-programs",UserProgramsRoute)
    app.use("/api/contents",ContentsRoute)


    app.use(errorHandler)
}
export default routersFunction;
