import React, { useEffect, useState } from "react";
import { useSearchQuery } from "src/hooks/query";
import { useRouter } from "next/router";
import { useDebounce, useReadLocalStorage } from "usehooks-ts";
import useSuggestionList from "src/hooks/use-suggestion-popup";
import { SearchType } from "src/server/router/types";
import SearchCard from "@/components/header/search-card";
import type { SearchEntryType } from "@/types/db";
import useSearchHistory from "./use-search-history";

const SearchBar = ({ close }: any) => {
  const router = useRouter();

  const [searchPhrase, setSearchPhrase] = useState("");
  const debouncedSearchPhrase = useDebounce(searchPhrase, 300);

  const { data: searchData } = useSearchQuery(debouncedSearchPhrase);
  const { addSearchHistoryEntry, clearSearchHistory } = useSearchHistory();

  const searchHistory =
    (useReadLocalStorage("searchHistory") as SearchEntryType[]) || [];

  useEffect(() => {
    setSearchPhrase("");
  }, [router.asPath]);

  const onSelect = (searchEntry: SearchEntryType) => {
    const userId = searchEntry.id;
    if (searchEntry.type === SearchType.USER) {
      router.push(`/user/${userId}`);
    }
    addSearchHistoryEntry(searchEntry);
  };

  const data = searchPhrase ? searchData : searchHistory.slice(0, 5);

  const { suggestionData, selectedItemIndex, wrapperProps, inputProps } =
    useSuggestionList({
      data,
      onSelect,
    });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(e.target.value.toLowerCase());
  };

  return (
    <div className="relative  px-5" {...wrapperProps}>
      <div className="relative w-full">
        <input
          {...inputProps}
          value={searchPhrase}
          onChange={handleOnChange}
          placeholder="Search goes here.."
          className="w-full py-3 px-3 bg-primary-100 dark:bg-primary-dark-200 rounded-full focus:outline-blue-500 outline-2"
        />
      </div>

      <div className=" bg-white mt-2  w-full rounded-lg shadow-lg overflow-y-scroll max-h-[300px] ">
        {suggestionData.map((searchEntry, index) => (
          <SearchCard
            close={close}
            searchEntry={searchEntry}
            key={searchEntry.id}
            isSelected={selectedItemIndex === index}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
