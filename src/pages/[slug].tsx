import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { createContentfulClient } from '../../contentClient';

type Page = {
    id: string;
    slug: string;
    title: string;
    content: string;
};

type PageProps = {
    page: Page;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const client = createContentfulClient(process.env.NEXT_PUBLIC_SPACE_ID, process.env.NEXT_PUBLIC_ACCESS_TOKEN);

    const pages = await client.getEntries({ content_type: 'page' });

    const paths = pages.items.map((page: any) => ({ params: { slug: page.fields.slug } }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
    const client = createContentfulClient(process.env.NEXT_PUBLIC_SPACE_ID, process.env.NEXT_PUBLIC_ACCESS_TOKEN);

    const page = await client.getEntries<Page>({
        content_type: 'page',
        'fields.slug': params?.slug,
    });

    return {
        props: {
            page: {
                id: page.items[0].sys.id,
                slug: page.items[0].fields.slug,
                title: page.items[0].fields.title,
                content: page.items[0].fields.content
            },
        },
    };
};

const Page = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            <h1>{page.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
    );
};

export default Page;

