import server from './server'
import * as dotenv from 'dotenv'
import path from 'path'

// const environment = process.env.NODE_ENV.trim() || 'development';
// dotenv.config({ path:  path.join(__dirname, `../.env.${environment}`)});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

  



