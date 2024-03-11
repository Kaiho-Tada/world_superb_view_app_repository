import handleGetBounds from "features/map/utils/handleGetBounds";

test("handleGetBounds関数が引数のlatlongとzoomSizeをもとに正しいboundsを返すこと", () => {
  const latlong = [0, 0];
  const [latitude, longitude] = latlong;
  const zoomSize = 2;
  const scale = zoomSize ** 1.7;

  const bounds = handleGetBounds({ latlong, zoomSize });
  expect(bounds).toEqual([
    [latitude - 8 / scale, longitude + 12 / scale],
    [latitude + 8 / scale, longitude - 12 / scale],
  ]);
});
