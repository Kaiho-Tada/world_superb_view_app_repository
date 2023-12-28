import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import client from "lib/api/client";
import worldViewApi from "lib/api/worldViewApi";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/world_views/search").reply(200, [{ id: 1, name: "万里の長城" }]);

jest.mock("hooks/providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    state: {
      checkedCategoryLabels: ["遺跡"],
      checkedCountryLabels: ["中国"],
      checkedCharacteristicLabels: ["歴史・文化的"],
      checkedRiskLevelLabels: ["1"],
      checkedMonthLabels: ["9月"],
      checkedBmiLabels: ["4.0"],
      keyword: "万",
      sortCriteria: "latest",
    },
  }),
}));

test("worldViewApi関数が意図したURLにGETリクエストとparamsを送信し、意図したステイタスコードとデータが返されること", async () => {
  const { result } = renderHook(() => worldViewApi());
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
