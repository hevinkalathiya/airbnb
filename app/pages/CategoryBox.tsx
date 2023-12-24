import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

type CategoryBoxProps = {
  label: string;
  icon: IconType;
  description?: string;
  selected?: boolean;
};

const CategoryBox: FC<CategoryBoxProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected
          ? "text-neutral-800 border-b-neutral-800"
          : "text-neutral-500 border-transparent"
      }`}
      onClick={handleClick}
    >
      {<Icon className="w-6 h-6" />}
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
