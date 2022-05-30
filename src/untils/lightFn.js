// 封装专门处理字符串高亮的关键字
export const lightFn = (originStr, target) => {
  // originStr : 原来的字符串
  // target: 关键字
  // 使用变量作为正则的匹配条件，就要创建正则实例对象
  if (originStr !== null) {
    const reg = new RegExp(target, 'ig') // i指忽略大小写，g表示全局
    // replace替换的字符串必须不为空
    return originStr.replace(reg, `<span style="color:red;">${target}</span>`)
  }
}
