const http = require("http");
const getUsers = require("./modules/getUsers.js");

const SERVER_START_MSG = "Server started on http://127.0.0.1:3003";

const checkParams = (params)=> {
  console.log(params);
  let check=true;

  params.forEach((value, name) => {
    console.log(name, value);     
    if (name !== "hello") {
      check=false;
    };
  });
  return check;
}

const server = http.createServer((req, res) => {
  
  const addr = new URL(req.url, "http://127.0.0.1");
  const helloParam = addr.searchParams.get("hello");

  try {
     if (req.url === "/users") {
       res.statusCode = 200;
       res.statusMessage = "OK";
       res.header = "Content-Type: application/json";

       res.write(getUsers());
       res.end();
       return;
     }
     
     if (!checkParams(addr.searchParams)) {
       res.statusCode = 500;
       res.statusMessage = "ERROR";
       res.write("");
       res.end();
       console.error("Не верные параметры");
       return
     }

     if (/hello/i.test(addr.href) && helloParam) {
       res.statusCode = 200;
       res.statusMessage = "OK";
       res.header = "Content-Type: text/plain;";

       res.write("Hello " + helloParam);
       res.end();
       return;
     }
     
     if (/hello/i.test(addr.href) && !helloParam) {
       res.statusCode = 400;
       res.statusMessage = "OK";
       res.header = "Content-Type: text/plain;";
       res.write("Enter a name!");
       res.end();
       return;
     }
     
     res.statusCode = 200;
     res.statusMessage = "OK";
     res.header = "Content-Type: text/plain;";

     res.write("Hello, World!");
     res.end();
  } catch (err) {
    res.statusCode = 500;
    res.statusMessage = "ERROR";
    res.write(`ERROR. Code 500. Message: ${err}`);
    res.end();
    console.error("error o_O");
  } 
});

server.listen(process.env.NODE_ENV, () => {
  console.log(SERVER_START_MSG);
});
