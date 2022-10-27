import { Request } from "express";
import url from 'url';

export default function logError(req: Request, err: unknown) {
  const moment = new Date();
  const date = moment.toLocaleDateString('pt-br');
  const hour = moment.toLocaleTimeString('pt-br');

  const urlRoute = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  })

  console.log(`==================================================================
Data/Hora do erro: ${date} - ${hour} - ${urlRoute}\n
${err}
==================================================================
`);

  // usar o mongoDB para listar erros ocorridos tbm :)
}