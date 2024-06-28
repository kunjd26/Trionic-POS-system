import { randomUUID } from 'crypto';

export default function generateToken() {
    return randomUUID();
}
