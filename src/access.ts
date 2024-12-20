/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    canUser: true,
    canAdmin: loginUser && (loginUser.roles?.indexOf("admin") !== -1 || loginUser.roles?.indexOf("superadmin") !== -1),
  };
}
