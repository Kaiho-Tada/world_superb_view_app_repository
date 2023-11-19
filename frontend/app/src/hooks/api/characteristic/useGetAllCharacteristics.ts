import useMessage from "hooks/useMessage";
import getAllCharacteristicsApi from "lib/api/characteristic";
import { useState } from "react";
import { Characteristic } from "types/api/characteristic/characteristic";

const useGetAllCharacteristics = () => {
  const [loadingCharacteristics, setloadingCharacteristics] = useState(false);
  const [characteristics, setCharacteristics] = useState<Array<Characteristic>>([]);
  const { showMessage } = useMessage();

  const getAllCharacteristics = async () => {
    setloadingCharacteristics(true);
    try {
      const res = await getAllCharacteristicsApi();
      setCharacteristics(res.data);
    } catch (error) {
      showMessage({ title: "characteristicsの取得に失敗しました。", status: "error" });
    } finally {
      setloadingCharacteristics(false);
    }
  };
  return {
    getAllCharacteristics,
    characteristics,
    loadingCharacteristics,
  };
};
export default useGetAllCharacteristics;
