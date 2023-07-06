import { Router } from "express";
import { pool } from "../db.js";
import {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUsuario);

router.post('/usuarios', createUsuario);

router.put('/empleados/:id', updateUsuario);

router.delete('/empleados/:id', deleteUsuario);

router.get('/usersList',  async (req, res) => {
    try {
        const [result] = await pool.query('SELECT u.idUsu, u.contrasena, e.nombre AS nombreEmp, r.nombre AS nombreRol, u.estado FROM usuario u, empleado e, rol r WHERE u.idEmp = e.idEmp AND u.idRol = r.idRol ORDER BY u.idUsu ASC');
        res.render("usuarios.hbs", {result});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
})

router.post('/usersList', async (req, res) => {
    try {
        const {contrasena, nombreEmp, nombreRol,estado} = req.body;
        const [result] = await pool.query('SELECT u.idUsu, u.contrasena, e.nombre AS nombreEmp, r.nombre AS nombreRol, u.estado FROM usuario u, empleado e, rol r WHERE u.idEmp = e.idEmp AND u.idRol = r.idRol AND u.contrasena LIKE ? AND e.nombre LIKE ? OR u.estado LIKE ? OR r.nombre LIKE ?',["%"+contrasena+"%","%"+nombreEmp+"%"+nombreRol+"%"+estado+"%"]);

        res.render("usuarios", {result:result, message:{type:2}})
    } catch (error) {
        console.log(error)
    }
})

router.get("/addUsu", async (req, res) => {
    try {
        const[resultEmpleado] = await pool.query('SELECT * FROM empleado ORDER BY idEmp ASC')
        const[resultRol] = await pool.query('SELECT * FROM rol ORDER BY idRol ASC')
        res.render("addUser", {resultEmpleado, resultRol})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.post("/addUsu", async (req,res) =>{
    try {
        const {pw,rol,empleado,estado} = req.body
        const [resultInsert] = await pool.query('INSERT INTO usuario SET contrasena  = ?,   idRol = ?,  idEmp =?,  estado = ?',[pw, rol, empleado, estado])
        const [result] = await pool.query('SELECT u.idUsu, u.contrasena, e.nombre AS nombreEmp, r.nombre AS nombreRol, u.estado FROM usuario u, empleado e, rol r WHERE u.idEmp = e.idEmp AND u.idRol = r.idRol ORDER BY u.idUsu ASC');
        if (resultInsert.insertId) {
            res.render("usuarios", {result,message:{type:1,content:`Usuario agregado con exito!`}});            
        } else {
            res.render("usuarios", {message:`Error al intentar agregar usuario!`});
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.get("/userEdit/:id", async (req, res) => {
    try{
        const[resultEmpleado] = await pool.query('SELECT * FROM empleado ORDER BY idEmp ASC')
        const[resultRol] = await pool.query('SELECT * FROM rol ORDER BY idRol ASC')
        res.render("userEdit", {resultEmpleado})
        res.render("userEdit", {resultRol})
    }catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.post("/userEdit/:id", async (req,res) =>{
    try {
        const {idUsu,contrasena, idRol, idEmp, estado} = req.body
        const [result] = await pool.query('UPDATE usuario SET contrasena = ?, idRol = ?, idEmp = ?, estado = ?',[contrasena, idRol, idEmp, estado, idUsu])
        // console.log(result.affectedRows > 0)
        if (result.affectedRows > 0) {
            const [usuarios] = await pool.query('SELECT *FROM cliente ORDER BY idCli DESC')                    
            res.render("usuarios", {result:usuarios,message:{type:1,content:`Usuario editado con exito! id afectado: ${result.insertId}`}});          
        } else {
            res.render("usuarios", {result:clientes,message:{type:1,content:`Error al intentar editar uusuario: ${result.insertId}`}});
        }
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
})

router.post('/userStatus', async (req,res) =>{
    try {
        let message = '';
        const {idUsu,estado} = req.body
        const [result] = await pool.query('UPDATE usuario SET estado = ? WHERE idUsu = ?',[estado, idCli])     
        if (result.affectedRows > 0) { 
            return message = "Success"
        }else{
            return message = "Error"
        }
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
})

router.post('/formtest', (req,res) =>{
    console.log(req.body)
})

export default router;