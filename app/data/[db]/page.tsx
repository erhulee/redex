"use client";
import DBList from "./components/dbList";
import KeyList from "./components/keyList";
import KVEditor from "./components/kvEditor";
import {
  createKey as createOneKey,
  getCurrentDBInfo,
  getCurrentDBKeys,
  getKeyValue,
} from "./api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Spin from "./components/spin";
import { EnvContextProvider } from "./context";
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
      return getKeyValue(db!, key!);
    },
    refetchOnWindowFocus: false,
  });

  const createKey2 = (key: string, type: any) => {
    return createOneKey(key, type, db);
  };
  return (
    <EnvContextProvider value={env}>
      <div className="flex flex-row h-full">
        <DBList
          currentDB={dbQuery.data.currentDB}
          list={dbQuery.data.DBListData}
          className=" h-full border-r bg-slate-50 mr-4"
        ></DBList>
        <KeyList
          list={keysQuery.data.keysData}
          className=" mt-4 border-r-2 pr-2"
          pattern={pattern}
          onChange={setPattern}
          onCreate={createKey2}
        ></KeyList>
        {valueQuery.isLoading ? (
          <Spin></Spin>
        ) : (
          <KVEditor
            type={valueQuery.data?.type}
            db={db}
            value={valueQuery.data?.value}
            keyExpire={valueQuery.data?.expire}
            keyName={key!}
            refetch={valueQuery.refetch}
          ></KVEditor>
        )}
      </div>
    </EnvContextProvider>
  );
}
