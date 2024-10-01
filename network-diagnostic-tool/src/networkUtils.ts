import { exec } from 'child_process';
import { promisify } from 'util';
import * as net from 'net';

const execPromise = promisify(exec);

export async function pingHost(host: string): Promise<string> {
    try {
        const { stdout } = await execPromise(`ping -c 1 ${host}`);
        return stdout.includes('1 received') ? 'reachable' : 'unreachable';
    } catch (error) {
        return 'unreachable';
    }
}

export async function checkPort(host: string, port: number): Promise<string> {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(2000); // 2 seconds timeout

        socket.on('connect', () => {
            socket.destroy();
            resolve('open');
        });

        socket.on('timeout', () => {
            socket.destroy();
            resolve('closed');
        });

        socket.on('error', () => {
            resolve('closed');
        });

        socket.connect(port, host);
    });
}
