import express, { Router} from 'express';

import cadMed from './controllers/medController.js'

import cadCli from './controllers/cliController.js';

import loginUni from './controllers/loginUniController.js';

import loginCli from './controllers/loginCliController.js';

import agendados from './controllers/agendaController.js';

import medicamento from './controllers/medicamentos.js';

import getUnidade from './controllers/getuni.js';

import agendamento from './controllers/agendamento.js';

import  {verifyToken}  from './middleware/jwt.js';


const route = express();


route.use('/cadCli', cadCli);

route.use('/loginUni', loginUni);

route.use('/loginCli', loginCli);

route.use('/cadMed', cadMed)

route.use('/agendados',agendados);

route.use('/updateUser', cadCli);

route.use('/medicamentos', medicamento);

route.use('/getUnidade', getUnidade)

route.use('/agendamento', agendamento)

export default route;