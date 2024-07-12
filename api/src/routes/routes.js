import * as env from "npm:dotenv"
env.config()
import { Router } from 'npm:express@4';
import allgames  from '../controllers/getAllvideogames.js'
import getById  from '../controllers/getById.js'
import chargegenres  from '../controllers/chargegenres.js'
import postgame  from '../controllers/postgame.js'
import platforms  from '../controllers/platforms.js'
import putgame  from '../controllers/putgame.js'
import deletegame  from '../controllers/deletegame.js'
import filtandorder  from '../controllers/filtandorder.js'
import seccuential  from '../controllers/seccuential.js'

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', allgames)

router.get('/videogames/:id', getById)

router.get('/genres', chargegenres)

router.post('/videogame', postgame)

router.get('/platforms', platforms)

router.put('/update/:id', putgame)

router.delete('/delete/:id', deletegame)

router.post('/filtandorder', filtandorder)

router.get('/seccuentialadvance', seccuential)

export default router;