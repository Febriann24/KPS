import StatusPinjaman from "./MS_STATUS_PINJAMAN.js";
import PengajuanPinjaman from "./TR_PENGAJUAN_PINJAMAN.js";

export const setupAssociations = () => {
    PengajuanPinjaman.hasOne(StatusPinjaman);
};