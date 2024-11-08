import http from 'http';
import cluster from 'cluster';
import os from 'os';
import app from './app.js';
import db from './config/db.js';
//  lets build a server 
const maxCPUs = os.cpus().length;
if (cluster.isPrimary) {
    console.log(`primary ${process.pid} is running`);
    // fork workers
    for (let i = 0; i < maxCPUs; i++) {
        cluster.fork()
    }
} else {
    //  lets create http server
    const server = http.createServer(app);
    //  lets connect to database
    db();
    const port = process.env.PORT;
    server.listen(port,()=>{
        console.log(`http://localhost:${port}`);
    })
}

