import MockAdapter from "axios-mock-adapter";
import deleteUserByAdminApi from "features/auth/api/deleteUserByAdminApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
const userId = 103;
mockAxios
  .onDelete(`/auth/users/${userId}`)
  .reply(200, { message: "'test@example.com'のアカウントは削除されました。" });

test("deleteUserByAdminApi関数が意図したURLにDELETEリクエストを送信し、意図したステイタスコードが返されること", async () => {
  const response = await deleteUserByAdminApi(userId);
  expect(response.status).toBe(200);
  expect(response.data).toEqual({ message: "'test@example.com'のアカウントは削除されました。" });
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("delete");
  expect(response.config.url).toBe("/auth/users/103");
});
