import handleGetBounds from "features/map/utils/handleGetBounds";

test("handleGetBounds関数が引数のlatlongとzoomをもとに正しいboundsを返すこと", () => {
  const latlong = [0, 0];
  const [latitude, longitude] = latlong;
  const zoom = 2;
  const scale = zoom ** 1.7;

  const bounds = handleGetBounds({ latlong, zoom });
  expect(bounds).toEqual([
    [latitude - 8 / scale, longitude + 12 / scale],
    [latitude + 8 / scale, longitude - 12 / scale],
  ]);
});
