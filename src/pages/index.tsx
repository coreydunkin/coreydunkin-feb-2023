import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { createContentfulClient } from '../../contentClient';
import { ACCESSTOKEN, SPACEID } from "@/utils/utils";

type Data = {
    id: number;
    title: string;
    body: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const client = createContentfulClient(SPACEID, ACCESSTOKEN);

    const response = await client.getEntries({ content_type: 'coreydunkin' });
    const data: Data[] = response.items.map((item: any) => ({
        id: item.sys.id,
        title: item.fields.title,
        body: item.fields.body,
    }));

    return {
        props: {
            data,
        },
    };
};

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <h1>Contentful data:</h1>
            <ul>
                {data.map((item: Data) => (
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