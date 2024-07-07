const { API_KEY } = process.env
function consultenviroments(req, res) {
    try {
        res.json({API_KEY})    
    } catch (error) {
        res.json({error})
    }
    
}

module.exports = consultenviroments