import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import useGets from "@/hooks/useGets";
import $fetch from "@/lib/$fetch";
import React, { useEffect, useState } from "react";

export default function DataFetching() {
  // const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    limit: 10,
    skip: 0,
  });

  // async function getData() {
  //   setIsLoading(true);
  //   const response = await $fetch.get(`https://dummyjson.com/products`, params);
  //   setData(response);
  //   setIsLoading(false);
  // }

  // useEffect(() => {
  //   getData();
  // }, [params]);

  const { data, isLoading, refresh } = useGets(
    `https://dummyjson.com/products`,
    params
  );

  function handleNext() {
    setParams((old) => ({
      ...old,
      skip: old.skip + 10,
    }));
  }

  function handlePrev() {
    setParams((old) => ({
      ...old,
      skip: old.skip - 10,
    }));
  }

  return (
    <div>
      <Title
        title={"Data Fetching"}
        caption={"Practice about data fetching in react"}
      />
      <div className="flex gap-2">
        <Button onClick={refresh}>Refresh</Button>
        <Button onClick={handleNext}>Next</Button>
        <Button onClick={handlePrev}>Prev</Button>
      </div>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
