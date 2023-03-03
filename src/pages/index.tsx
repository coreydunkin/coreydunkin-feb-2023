import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { createContentfulClient } from '../../contentClient';
import * as process from "process";

type Data = {
    id: number;
    title: string;
    body: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const client = createContentfulClient(process.env.NEXT_PUBLIC_SPACE_ID, process.env.NEXT_PUBLIC_ACCESS_TOKEN);

        const response = await client.getEntries({ content_type: 'coreydunkin' });
        const data: Data[] = response.items.map((item: any) => ({
            id: item.sys.id,
            title: item.fields.title,
            body: item.fields.body,
        }));

        return {
            props: {
                data: {
                    items: data,
                    error: null
                },
            },
        };
    } catch (error: any) {
        return {
            props: {
                data: {
                    items: [],
                    error: error.message
                },
            },
        };
    }
};
const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <h1>Contentful data:</h1>
            <ul>
                {!data.error && data.items.map((item: Data) => (
                    <li key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;