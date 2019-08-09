module.exports = (app) => {
    const rpsPlay = require('../controllers/rps.controller.js');
    app.get("/playRps",rpsPlay.playRPSGame);
    
}