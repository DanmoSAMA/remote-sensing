// 节流
export function throttle(fn: () => any, time: number) {
  let flag = true;

  return function (this: any, ...args: any) {
    if (!flag) return;
    flag = false;

    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, time);
  };
}