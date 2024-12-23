import cron from "node-cron";
import {
    createMandatoryPengajuan,
    createMonthlyFinanceAnggota,
} from "./controllers/PengajuanController.js"

function Scheduler() {
    // Monthly CRON
    cron.schedule("1 0 1 * * *", async function(){
        try {
            console.log("Creating Automatic Mandatory Pengajuan Simpanan for Every Anggota...")
            await createMandatoryPengajuan();
            console.log("Pengajuan Created Succesfully!")

            console.log("Creating Monthly Finance Anggota...")
            await createMonthlyFinanceAnggota();
            console.log("Monthly Finance Anggota Created!")
        } catch (error) {
            console.log("Error has occured whilst creating monthly task: ", error)
        }
        
    })
}

export default Scheduler;
