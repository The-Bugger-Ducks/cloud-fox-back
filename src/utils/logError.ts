export default function logError(err: unknown) {
  const moment = new Date();
  const date = moment.toLocaleDateString('pt-br');
  const hour = moment.toLocaleTimeString('pt-br');

  console.log(`==================================================================
Data/Hora do erro: ${date} ${hour}
${err}
==================================================================
`);
}