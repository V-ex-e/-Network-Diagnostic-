import { pingHost, checkPort } from './networkUtils';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    rl.question("Enter a host to ping: ", async (host) => {
        const pingResult = await pingHost(host);
        console.log(`Ping result for ${host}: ${pingResult}`);
        
        rl.question("Enter a host and port to check (e.g., localhost:80): ", async (input) => {
            const [host, port] = input.split(':');
            if (port) {
                const portResult = await checkPort(host, parseInt(port));
                console.log(`Port ${port} on ${host} is ${portResult}`);
            } else {
                console.log("Invalid input. Please use the format host:port.");
            }
            rl.close();
        });
    });
}

main().catch(console.error);
