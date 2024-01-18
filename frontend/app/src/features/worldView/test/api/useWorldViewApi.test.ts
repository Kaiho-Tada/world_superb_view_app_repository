import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useWorldViewApi from "features/worldView/api/useWorldViewApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/world_views/search").reply(200, [{ id: 1, name: "万里の長城" }]);

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    state: {
      categoryCheckBoxItems: [{ label: "遺跡", checked: true }],
      countryCheckBoxItems: [{ label: "中国", checked: true }],
      characteristicCheckBoxItems: [{ label: "歴史・文化的", checked: true }],
      riskLevelCheckBoxItems: [{ label: "1", checked: true }],
      monthCheckBoxItems: [{ label: "9月", checked: true }],
      bmiCheckBoxItems: [{ label: "4.0", checked: true }],
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
    risk_levels: ["1"],
    months: ["9月"],
    bmi_ranges: ["4.0"],
    keyword: "万",
    sort_criteria: "latest",
  });
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("/world_views/search");
});
