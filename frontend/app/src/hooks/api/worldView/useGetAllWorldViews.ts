import useMessage from "hooks/useMessage";
import worldViewApi from "lib/api/worldViewApi";
import { useState } from "react";
import { WorldView } from "types/api/worldView";

const useGetAllWorldViews = () => {
  const [loadingWorldViews, setLoadingWorldViews] = useState(false);
  const [WorldViews, setWorldViews] = useState<Array<WorldView>>([]);
  const { getAllWorldViewsApi } = worldViewApi();
  const { showMessage } = useMessage();

  const getAllWorldViews = async () => {
    setLoadingWorldViews(true);
    try {
      const res = await getAllWorldViewsApi();
      setWorldViews(res.data);
    } catch (error) {
      showMessage({ title: "WorldViewsの取得に失敗しました", status: "error" });
    } finally {
      setLoadingWorldViews(false);
    }
  };
  return {
    getAllWorldViews,
    WorldViews,
    setWorldViews,
    loadingWorldViews,
  };
};

export default useGetAllWorldViews;
