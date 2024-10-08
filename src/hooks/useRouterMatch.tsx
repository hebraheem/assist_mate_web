import { useMatches } from 'react-router-dom';

const useRouterMatches = (props: { key: string }) => {
    const { key } = props;
    const matches = useMatches();

    const results: Record<string, unknown> = {};
    matches
        // first get rid of any matches that don't have handle and crumb
        ?.filter((match) => Boolean(match.handle))
        // now map them into an array of elements, passing the loader
        // data to each one
        .map((match: any) => match.handle(match.data))
        .forEach((type: object) => {
            Object.entries(type || {}).forEach(([key, value]) => {
                results[key] = value;
            });
        });

    return results[key];
};

export default useRouterMatches;
