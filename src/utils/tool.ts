/**
 *
 * @param src 路由路径view下面的
 * @returns 返回完整路径并且懒加载
 */
function routerPath(src: String) {
  const module = import.meta.glob(`/src/view${src}.vue`);
  return () => module;
}

export { routerPath };
