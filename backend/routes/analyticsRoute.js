import {Router} from 'express';
import checkToken from '../middleware/checkToken.js';
import {checkAdmin} from '../middleware/checkAdmin.js';
import { getAnalyticsData, getDailySalesData } from '../controllers/analyticsController.js';

const analyticsRouter = Router();

analyticsRouter.get('/',checkToken, checkAdmin, async(req,res)=>{
    try {
        const analyticsData = getAnalyticsData();
        
        const startDate = new Date();
        const endDate = new Date(endDate.getTime() - 7*24*60*60*1000); // 7 days back
        const dailySalesDate = await getDailySalesData(startDate, endDate);
        
        res.json({
            analyticsData,
            dailySalesDate
        })
    } catch (error) {
        console.log(error.message);
        res.json({message:error.message});
    }
})

export default analyticsRouter;