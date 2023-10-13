"use client";
import DBList from "./components/dbList";
import KeyList from "./components/keyList";
import KVEditor from "./components/kvEditor";
import {
  createKey as createOneKey,
  getCurrentDBInfo,
  getCurrentDBKeys,
} from "./api";
import Spin from "./components/spin";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { EnvContextProvider } from "./context";
import { getKeyValue } from "./api/key";
import ConnectList from "./components/ConnectList";
type Props = {
  params: {
    db: number;
  };
  searchParams: {
    key?: string;
  };
};

export default function DashBoard(props: Props) {
  const { db } = props.params;
  const { key } = props.searchParams;
  const [pattern, setPattern] = useState("*");
  const env = useMemo(
    () => ({
      key: key!,
      db: Number(db),
    }),
    [key, db]
  );
  const dbQuery = useQuery({
    queryKey: ["db_info"],
    queryFn: getCurrentDBInfo,
    refetchOnWindowFocus: false,
    placeholderData: { currentDB: 0, DBListData: [] },
  });

  const keysQuery = useQuery({
    queryKey: ["db_keys", db, pattern],
    queryFn: ({ queryKey }) => {
      const db = queryKey[1];
      const pattern = queryKey[2];
      return getCurrentDBKeys(db, pattern);
    },
    refetchOnWindowFocus: false,
    placeholderData: { keysData: [] },
  });

  const valueQuery = useQuery({
    queryKey: ["key_value", db, key],
    queryFn: ({ queryKey }) => {
      const [_, db, key] = queryKey;
      return getKeyValue(key, db);
    },
    refetchOnWindowFocus: false,
  });

  const createKey2 = (key: string, type: any) => {
    return createOneKey(key, type, db);
  };
  return (
    <EnvContextProvider value={env}>
      <div className="flex flex-row h-full bg-zinc-100 p-2">
        <aside className=" flex flex-col ">
          <div className="bg-white m-2 rounded-lg shadow-lg flex-1 ">
            <ConnectList></ConnectList>
          </div>

          <div className="bg-white m-2 rounded-lg shadow-lg  flex-1  ">
            <DBList
              currentDB={dbQuery.data.currentDB}
              list={dbQuery.data.DBListData}
              className="gap-1"
            ></DBList>
          </div>
        </aside>
        <aside className="flex flex-row bg-white m-2 rounded-lg shadow-lg p-4">
          <KeyList
            list={keysQuery.data.keysData}
            className=" mt-4 "
            pattern={pattern}
            onChange={setPattern}
            onCreate={createKey2}
          ></KeyList>
        </aside>

        <div className="main flex-1">
          <div className=" bg-white h-1/2 m-2 p-2 rounded-lg shadow-lg">
            {valueQuery.isLoading ? (
              <Spin></Spin>
            ) : (
              <KVEditor
                type={valueQuery.data?.data.type}
                db={db}
                value={valueQuery.data?.data?.value}
                keyExpire={valueQuery.data?.data.expire}
                keyName={key!}
                refetch={valueQuery.refetch}
              ></KVEditor>
            )}
          </div>
        </div>
      </div>
    </EnvContextProvider>
  );
}
