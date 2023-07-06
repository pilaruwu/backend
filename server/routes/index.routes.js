import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get('/users', async (req,res) => {
    const [rows] = await pool.execute('SELECT * FROM usuario');
    console.log(rows);
    res.json(rows);
});

export default router;