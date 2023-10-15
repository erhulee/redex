import { useParams, useSearchParams } from "next/navigation";

function useEnv() {
    const params = useParams();
    const searchParams = useSearchParams();
    const db = params.db as unknown as number;
    const key = searchParams.get("key") as string;;
    return {
        db,
        key
    }
}

export default useEnv;