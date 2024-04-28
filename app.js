
//configurasi
const express = require('express')
const app = express()
const conn = require('./config/db')

app.use(express.json())
app.listen('3000')

// get data mahasiswa
app.get('/get-mahasiwa', (req, res) => {
    const queryStr = 'SELECT * FROM mahasiswa WHERE deleted_at IS NULL'
    conn.query(queryStr, (err, result) => {
        if (err) {
            console.log(err.sqlMessage, res);
        } else {
            res.status(200).json({
                "success": true,
                "message": 'menampilkan data mahasiswa',
                "data": result
            })
        }
    })
})

// membuat data baru mahasiswa
app.post('/store-mahasiswa', (req, res) => {
    const param = req.body
    const name = param.name
    const jurusan = param.jurusan
    const now = new Date()

    const queryStr = 'INSERT INTO mahasiswa (name, jurusan, created_at) VALUES (?,?,?)';
    const values = [name, jurusan, now]

    conn.query(queryStr, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })
        } else {
            res.status(200).json({
                "success": true,
                "message": "sukses menyimpan data",
                "data": result
            })
        }
    })
})


//ngambil data mahasiswa berdasarkan id
app.get('/get-mahasiswa-by-id', (req, res) => {
    const param = req.query;
    const id = param.id

    const queryStr = 'SELECT * FROM mahasiswa WHERE deleted_at IS NULL AND id = ?';
    const values = [id]

    conn.query(queryStr, values, (err, result) => {

        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })

        } else {
            res.status(200).json({
                "success": true,
                "message": "sukses mengambil data by id",
                "data": result
            })
        }
    })

})

//update data mahasiswa
app.post('/update-mahasiswa', (req, res) => {
    const param = req.body
    const id = param.id
    const name = param.name
    const jurusan = param.jurusan

    const queryStr = "UPDATE mahasiswa SET name = ?, jurusan = ? WHERE id = ? AND deleted_at IS NULL";
    const values = [name, jurusan, id]

    conn.query(queryStr, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })

        } else {
            res.status(200).json({
                "success": true,
                "message": "sukses update data mahasiswa",
                "data": result
            })
        }
    })


})


app.post('/delete-mahasiswa', (req, res) => {
    const param = req.body
    const id = param.id
    const now = new Date()

    const queryStr = "UPDATE mahasiswa SET deleted_at = ? WHERE id = ?";
    const values = [now, id]

    conn.query(queryStr, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })

        } else {
            res.status(200).json({
                "success": true,
                "message": "sukses delete data mahasiswa",
                "data": result
            })
        }
    })
})