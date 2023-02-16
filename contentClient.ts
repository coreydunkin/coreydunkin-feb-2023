import { createClient } from 'contentful';

export function createContentfulClient(space: string, accessToken: string) {
    return createClient({
        space,
        accessToken,
    });
}