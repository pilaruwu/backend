import { pool } from "../db.js";


export const getUsuarios = async (req, res) => {

    try {
        const [result] = await pool.query('SELECT * FROM usuario ORDER BY idUsu DESC');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
    

}

export const getUsuario = async (req, res) => {

    try {
        const [result] = await pool.query('SELECT * FROM usuario WHERE idUsu = ?', [req.params.id]);

        if (result.length == 0) {
            return res.status(404).json({ message: "Usuario no encontrado"})
        }else {
            res.json(result[0]);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }

}

export const createUsuario = async (req, res) => {

    try {
        const { estado, contrasena, idRol, idEmp } = req.body;
    
        const [result] = await pool.query('INSERT INTO usuario VALUES (?, ?, ?, ?)',
        [estado, contrasena, idRol, idEmp]
        );
        res.json({
            id: "Id insertado: "+result.insertId,
            estado,
            contrasena,
            idRol,
            idEmp
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }

}

export const updateUsuario = async (req, res) => {

    try {
        const { estado, contrasena, idRol, idEmp } = req.body;

        const result = await pool.query("UPDATE usuario SET ? WHERE idUsu = ?", [req.body, req.params.id]);

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }

}

export const deleteUsuario = async (req, res) => {
    try {
            const result = await pool.query("DELETE FROM usuario WHERE idUsu =?", [req.params.id]);
            if (result.affectedRows == 0) {
                return res.status(404).json({message: "Usuario no encontrado"});
            }
            return res.status(204).send("Usuario eliminado con exito")
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}