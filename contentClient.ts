import { createClient } from 'contentful';

export function createContentfulClient(space: any, accessToken: any) {
    return createClient({
        space,
        accessToken,
    });
}