import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useWorldViewApi from "features/worldView/api/useWorldViewApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/world_views/search").reply(200, [{ id: 1, name: "万里の長城" }]);

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    state: {
      categoryCheckItems: [{ label: "遺跡", checked: true }],
      countryCheckItems: [{ label: "中国", checked: true }],
      characteristicCheckItems: [{ label: "歴史・文化的", checked: true }],
      riskLevel: "4",
      monthRange: [1, 12],
      bmiRange: [-40, 30],
      keyword: "万",
      sortCriteria: "latest",
    },
  }),
}));

test("worldViewApi関数が意図したURLにGETリクエストとparamsを送信し、意図したステイタスコードとデータが返されること", async () => {
  const { result } = renderHook(() => useWorldViewApi());
  const response = await result.current.searchWorldViewApi();
  expect(response.status).toBe(200);
  expect(response.data).toEqual([{ id: 1, name: "万里の長城" }]);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.params).toEqual({
    category_names: ["遺跡"],
    country_names: ["中国"],
    characteristic_names: ["歴史・文化的"],
    risk_level: "4",
    month_range: [1, 12],
    bmi_range: [-40, 30],
    keyword: "万",
    sort_criteria: "latest",
  });
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("/world_views/search");
});
