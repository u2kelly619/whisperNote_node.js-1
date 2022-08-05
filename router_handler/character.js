const db = require('../db/index')

//取得八卦人物列表
const getCharacter = (req, res) => {
  const getCharacterSql = 'select * from character where user_id = ?'
  db.query(getCharacterSql, req.session.user_id, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 1,
      message: '你超八卦',
      data: results
    })
  })
}


//新增八卦人物
const addCharacter = (req, res) => {
  const characterContent = req.body
  console.log('characterContent',characterContent)

  const addCharacterSql = 'INSERT INTO character (character_name, character_info, character_pic, user_id) VALUES (?, ?, ?, ?)'
  db.query(addCharacterSql, [characterContent.name, characterContent.info, characterContent.pic, req.session.user_id ], (err, results) => {
    if (err) return res.cc(err)
    console.log('results', results)
    console.log('addCharacterSql',addCharacterSql)
    if (results.affectedRows === 1) return res.send({ status: 1, message: '新增人物成功！' })
  })
}

//修改八卦人物
const editCharacter = (req, res) => {
  const editSql = 'update character set character where user_id = ?'
  db.query(editSql, req.session.user_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows === 1) {
      console.log('修改人物成功')
    }
    res.send({
      status: 1,
      message: '修改人物成功',
      data: results
    })
  })
}

//刪除八卦人物
const deleteCharacter = (req, res) => {
  const deleteSql = 'update character set status = 0 where character_id =?'
  const characterContent = req.body
  db.query(deleteSql, characterContent.character_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows === 1) {
      console.log('標記刪除成功')
    }
  })
}

module.exports = {
  getCharacter,
  addCharacter,
  editCharacter,
  deleteCharacter
}