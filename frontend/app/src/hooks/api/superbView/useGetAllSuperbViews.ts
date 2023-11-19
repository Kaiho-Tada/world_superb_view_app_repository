import useMessage from "hooks/useMessage";
import { getAllSuperbViewsApi } from "lib/api/superbView";
import { useState } from "react";
import { SuperbView } from "types/api/superbView";

const useGetAllSuperbViews = () => {
  const [loadingSuperbViews, setLoadingSuperbViews] = useState(false);
  const [SuperbViews, setSuperbViews] = useState<Array<SuperbView>>([]);
  const { showMessage } = useMessage();

  const getAllSuperbViews = async () => {
    setLoadingSuperbViews(true);
    try {
      const res = await getAllSuperbViewsApi();
      setSuperbViews(res.data);
    } catch (error) {
      showMessage({ title: "SuperbViewsの取得に失敗しました", status: "error" });
    } finally {
      setLoadingSuperbViews(false);
    }
  };
  return {
    getAllSuperbViews,
    SuperbViews,
    setSuperbViews,
    loadingSuperbViews,
  };
};

export default useGetAllSuperbViews;
