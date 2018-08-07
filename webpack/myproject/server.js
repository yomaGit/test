var edge = require('edge');

var helloWorld = edge.func(`
    async (input) => {
        return ".NET Welcomes " + input.ToString();
    }
`);

helloWorld('JavaScript', function (error, result) {
  if (error) throw error;
  console.log(result);
});

// const net = require('net');
//
// const PIPE_NAME = "salamander_pipe";
// const PIPE_PATH = "\\\\.\\pipe\\" + PIPE_NAME;
//
// let l = console.log;
//
// const client = net.createConnection(PIPE_PATH, () => {
//   //'connect' listener
//   l('connected to server!');
//   client.write('world!\r\n');
//   client.end();
// });
//
// client.on('end', () => {
//   l('disconnected from server');
// });
