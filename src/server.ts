import cors from "cors"
import express from "express" 
import { routerL} from "./routes/leads"
import { errorHandlerMiddleware } from "./middlewares/errorHandler"
import { routerG } from "./routes/groups"
import { routerC } from "./routes/campaign"
import { routerCL } from "./routes/campaignLead"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/leads", routerL)
app.use("/api/groups", routerG)
app.use("/api/campaigns", routerC)
app.use("/api/campaignsLeads", routerCL)

app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}/`) )